import { io } from "socket.io-client";

// ==========================================
// SOCKET SERVER URL
// ==========================================

const SOCKET_URL = import.meta.env.VITE_API_URL;


// ==========================================
// CREATE SOCKET CONNECTION
// ==========================================

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true,
});


// ==========================================
// SOCKET CONNECTED
// ==========================================

socket.on("connect", () => {
  console.log("Market socket connected:", socket.id);
});


// ==========================================
// SOCKET DISCONNECTED
// ==========================================

socket.on("disconnect", () => {
  console.log("Market socket disconnected");
});


// ==========================================
// SOCKET CONNECTION ERROR
// ==========================================

socket.on("connect_error", (error) => {
  console.error(
    "Market socket connection error:",
    error.message
  );
});


export default socket;