import express from 'express';
import { allPosts, createPost, posts, updateCommentPost, viewPost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post("/create-post",verifyToken,createPost);
router.get("/view-post/:id",verifyToken,viewPost);
router.get("/getallposts",verifyToken,allPosts);
router.get("/getposts",verifyToken,posts);
router.put("/update-comments-post/:id",verifyToken,updateCommentPost);


export default router;