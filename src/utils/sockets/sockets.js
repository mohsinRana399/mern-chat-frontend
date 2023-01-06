import io from "socket.io-client";
import { setNewBroadcast, setNewMessage } from "../../redux/slices/chatSlice";
import { SOCKET_EVENTS } from "../constants";
let socket;

export const joinChatService = (userId) => {
  socket = io.connect(process.env.REACT_APP_SERVER_API);
  if (socket && userId)
    socket.emit(SOCKET_EVENTS.JOIN, {
      user_id: userId,
    });
};
export const disconnectChatService = () => {
  // console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const joinConversion = (conversation) => {
  if (socket && conversation)
    // console.log("joining conversation: ", conversation);
    socket.emit(SOCKET_EVENTS.JOIN_CONVERSATION, {
      conversation,
    });
};
export const receiveMessages = (dispatch) => {
  if (!socket) return true;
  // console.log("receiving...");
  socket.on(SOCKET_EVENTS.SOLO_MESSAGE, (message) => {
    // console.log("Websocket event received!", { message: JSON.parse(message) });
    dispatch(setNewMessage(JSON.parse(message)));
  });
};
export const sendMessage = (sender, content, conversation) => {
  // console.log("sending..", { sender, content, conversation });
  if (socket)
    socket.emit(SOCKET_EVENTS.SOLO_MESSAGE, { content, conversation, sender });
};
export const newConversationListener = (setData) => {
  // console.log("listening for new conversations...");
  socket.on(SOCKET_EVENTS.UPDATE_CONVERSATIONS, (val) => {
    setData(val?.conversation);
  });
};
export const newGroupListener = (setData) => {
  // console.log("listening for new Groups...");
  socket.on(SOCKET_EVENTS.UPDATE_GROUPS, (val) => {
    setData(val?.conversation);
  });
};
export const receiveBroadcast = (dispatch) => {
  // console.log("listening for new broadcasts...");
  if (!socket) return true;
  socket.on(SOCKET_EVENTS.BROADCAST_MESSAGE, (message) => {
    dispatch(setNewBroadcast(JSON.parse(message)));
  });
};
export const sendBroadcast = (sender, message) => {
  if (socket) socket.emit(SOCKET_EVENTS.BROADCAST_MESSAGE, { sender, message });
};
