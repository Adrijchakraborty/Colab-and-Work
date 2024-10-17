import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import authRouter from "./router/auth.router.js"
import postRouter from "./router/post.router.js"
import clanRouter from "./router/clan.router.js"
import messageRouter from "./router/message.router.js"
import reqRouter from "./router/request.router.js"
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

dotenv.config();

const connect = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("error");
  }
};

const port = process.env.PORT;



//middlewares

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);
app.use("/api/clan",clanRouter);
app.use("/api/req",reqRouter);
app.use("/api",messageRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).json({
      success:false,
      status: errorStatus,
      message: errorMessage,
      stack:err.stack
  })
})



server.listen(port, () => {
  connect();
  console.log(`Listening on port ${port}`);
});

