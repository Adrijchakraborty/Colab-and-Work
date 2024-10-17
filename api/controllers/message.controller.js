import Message from "../model/messageModel.js";
import Clan from "../model/clanModel.js";
import { createError } from "../utils/error.js";
import UserConversation from "../model/userConversation.js";
import ClanConversation from "../model/clanConversation.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const createMessage = async (req, res, next) => {
  try {
    const sender = req.user.id;
    const receiver = req.params.id;
    const { content, attachments } = req.body;

    if (!sender || !receiver) {
      return next(createError(400, "Sender or receiver is missing or invalid."));
    }


    if (sender === receiver) return next(createError(403, "You cannot message yourself"));
    let conversation;
    const clan = await Clan.findById(receiver)

    if (clan && clan.creator != sender && !clan.members.some(id => id.equals(sender))) return next(createError(403, "Not a member of the clan"))

    if (!clan) {
      conversation = await UserConversation.findOne({
        participants: { $all: [sender, receiver] },
      });

      if (!conversation) {
        conversation = await UserConversation.create({
          participants: [sender, receiver], 
        });
      }

    }
    else {
      conversation = await ClanConversation.findOne({
        clanChat: receiver,
      });

      if (!conversation) {
        conversation = await ClanConversation.create({
          clanChat: receiver,
        });
      }
    }

    const newMessage = new Message({ sender, receiver, content, attachments });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    //socket io logic goes here
    const receiverSocketId = getReceiverSocketId(receiver);
    if(receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    next(error);
  }
}

export const getMessages = async (req, res, next) => {
  try {
    const sender = req.user.id;
    const receiver = req.params.id;

    const clan = await Clan.findById(receiver);

    let messages;

    if (!clan) {
      messages = await UserConversation.findOne({
        participants: { $all: [sender, receiver] },
      }).populate({
        path: 'messages',
        populate: {
          path: 'sender', // Populating the sender field within messages
        },
      });
    }
    else {
      messages = await ClanConversation.findOne({
        clanChat: { $all : receiver},
      }).populate({
        path: 'messages',
        populate: {
          path: 'sender',
        },
      });
    }


    if (!messages) return next(createError(404, "Message not found"));

    res.status(200).json(messages.messages);
  } catch (error) {
    next(error);
  }
}

export const getUserList = async (req, res, next) => {
  try {
    const sender = req.user.id;
    const conversations = await UserConversation.find({
      participants: sender,
    }).select("-messages").populate("participants");
    if (!conversations || conversations.length === 0) {
      return next(createError(404, 'No messages found'));
    }
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};