import Post from "../model/postModel.js";
import { createError } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
}

export const viewPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate({
      path:"comments.user"
    });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

export const updateCommentPost = async (req, res, next) => {
  const { comments } = req.body;
  if (!comments || !comments.user || !comments.content) {
    return next(createError(400, "Invalid request body"));
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(createError(404, "Post not found"));
    }

    const existingComment = post.comments.find(comment => comment.user.equals(comments.user));

    if (existingComment) {
      existingComment.content = existingComment.content.concat(comments.content);
    } else {
      post.comments.push({
        user: comments.user,
        content: comments.content,
      });
    }

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const allPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find().populate("userRef");
    res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
}

export const posts = async (req, res,next) => {
  try {
    const user = req.user.id;

    const posts = await Post.find({userRef:user});
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}