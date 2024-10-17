import mongoose, { Types } from "mongoose";

const clan = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description:{
      type: String,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Clan = mongoose.model('Clan',clan);

export default Clan;