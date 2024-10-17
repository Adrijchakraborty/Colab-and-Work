import express from 'express';
import { createMessage, getMessages, getUserList } from '../controllers/message.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();


router.post("/create-message/:id",verifyToken,createMessage);
router.get("/message/:id",verifyToken,getMessages);
router.get("/messages",verifyToken,getUserList);


export default router;