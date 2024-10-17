import mongoose, { Types } from "mongoose";

const conversation = new mongoose.Schema(
  {
    messages:[{
        type:Types.ObjectId,
        ref:"Message",
        required:true
    }],
    clanChat:{
        type:Types.ObjectId,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

const ClanConversation = mongoose.model('ClanConversation',conversation);

export default ClanConversation;