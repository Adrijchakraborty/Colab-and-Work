import mongoose, { Types } from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: Array,
  },
  details: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: Types.ObjectId,
        ref: "User",
      },
      content: {
        type: Array,
      },
    },
  ],
  userRef: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
