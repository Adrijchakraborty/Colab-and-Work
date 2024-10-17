import express from 'express';
import {verifyToken} from "../utils/verifyToken.js"
import { acceptReq, getAllReq, rejecttReq, sendReq } from '../controllers/request.controller.js';

const router = express.Router();



router.post("/send-req/:id",verifyToken,sendReq);
router.get("/getreq/:id",verifyToken,getAllReq);
router.put("/accept-req/",verifyToken,acceptReq);
router.delete("/reject-req/:id",verifyToken,rejecttReq);

export default router;