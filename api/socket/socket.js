import http from 'http'; // For creating an HTTP server
import { Server } from 'socket.io'; // Import Socket.io
import express from "express"


const app = express();

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
}); // Initialize Socket.io

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}



io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

export {server,app,io}