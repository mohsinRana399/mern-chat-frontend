export const SERVER_URL = process.env.REACT_APP_SERVER_API;
export const SOCKET_EVENTS = {
  JOIN: "join_service",
  SOLO_MESSAGE: "solo_message",
  DISCONNECT: "leave_service",
  JOIN_CONVERSATION: "join_conversation",
  UPDATE_CONVERSATIONS: "update_conversations",
  BROADCAST_MESSAGE: "broadcast_message",
  UPDATE_GROUPS: "update_groups",
};
