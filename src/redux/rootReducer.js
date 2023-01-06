import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import authSlice from "./slices/authSlice";
import ChatSlice from "./slices/chatSlice";

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
};
export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  chats: ChatSlice,
});
