import express from 'express';
import {verifyToken} from "../utils/verifyToken.js"
import { addMembers, createClan, getAllClans, getClan } from '../controllers/clan.controller.js';

const router = express.Router();


router.post("/create-clan",verifyToken,createClan);
router.put("/add-members/:id",verifyToken,addMembers);
router.get("/getclan/:id",verifyToken,getClan);
router.get("/getclans",verifyToken,getAllClans);


export default router;