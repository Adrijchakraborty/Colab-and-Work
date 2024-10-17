import mongoose, { Types } from "mongoose";

const conversation = new mongoose.Schema(
  {
    messages:[{
        type:Types.ObjectId,
        ref:"Message",
        required:true
    }],
    participants:[{
        type:Types.ObjectId,
        ref:"User",
        required:true
    }]
  },
  {
    timestamps: true,
  }
);

const UserConversation = mongoose.model('UserConversation',conversation);

export default UserConversation;