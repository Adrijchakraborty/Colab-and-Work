import mongoose, { Types } from "mongoose";

const request = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted"],
    },

    sender: {
      type: Types.ObjectId,
      ref:"User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('Request',request);

export default Request;