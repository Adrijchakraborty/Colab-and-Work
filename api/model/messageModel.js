import mongoose, { Types } from "mongoose";

const message = new mongoose.Schema(
  {
    content: {
      type:String,
      required: true
    },

    attachments: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],

    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver:{
      type: Types.ObjectId,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message',message);

export default Message;