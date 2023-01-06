import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});
const initialState = {
  allChatsApi: {},
  allConversations: [],
  allGroups: [],
  selectedConversation: null,
  conversationMessages: [],
  newMessage: null,
  newBroadcast: null,
  publicMessages: [],
};

export const startConversation = createAsyncThunk(
  "chats/startConversation",
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`conversations/`, data);
      // console.log({ data: response?.data });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const startGroupConversation = createAsyncThunk(
  "chats/startGroupConversation",
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`conversations/group`, data);
      // console.log({ data: response?.data });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllConversations = createAsyncThunk(
  "chats/getAllConversations",
  async (data, thunkAPI) => {
    try {
      const response = await api.get(`conversations/${data}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getGroupConversations = createAsyncThunk(
  "chats/getGroupConversations",
  async (data, thunkAPI) => {
    try {
      const response = await api.get(`conversations/group/${data}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getConversationMessages = createAsyncThunk(
  "chats/getConversationMessages",
  async (data, thunkAPI) => {
    try {
      const response = await api.get(`messages/${data}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getPublicMessages = createAsyncThunk(
  "chats/getPublicMessages",
  async (data, thunkAPI) => {
    try {
      const response = await api.get(`messages/`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    resetApi: (state) => {
      state.allChatsApi = {};
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    },
    setNewBroadcast: (state, action) => {
      state.newBroadcast = action.payload;
    },
    updateAllConversations: (state, action) => {
      state.allConversations = action.payload;
    },
    updateGroupConversations: (state, action) => {
      state.allGroups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startConversation.pending, (state) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          startingConversation: true,
        };
      })
      .addCase(startConversation.fulfilled, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          startingConversation: false,
        };
        state.allConversations = [
          ...state.allConversations,
          action.payload?.newConversation,
        ];
      })
      .addCase(startConversation.rejected, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          startingConversation: false,
          error: action.payload,
        };
      })
      //start group
      .addCase(startGroupConversation.pending, (state) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          creatingGroup: true,
        };
      })
      .addCase(startGroupConversation.fulfilled, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          creatingGroup: false,
        };
        state.allGroups = [...state.allGroups, action.payload?.newConversation];
      })
      .addCase(startGroupConversation.rejected, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          creatingGroup: false,
          error: action.payload,
        };
      })
      //get all conversations
      .addCase(getAllConversations.pending, (state) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingConversation: true,
        };
      })
      .addCase(getAllConversations.fulfilled, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingConversation: false,
        };
        state.allConversations = action.payload?.allConversations;
      })
      .addCase(getAllConversations.rejected, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingConversation: false,
          error: action.payload,
        };
      })
      //get group conversations
      .addCase(getGroupConversations.pending, (state) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingGroups: true,
        };
      })
      .addCase(getGroupConversations.fulfilled, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingGroups: false,
        };
        state.allGroups = action.payload?.allConversations;
      })
      .addCase(getGroupConversations.rejected, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingGroups: false,
          error: action.payload,
        };
      })
      //get all conversations messages
      .addCase(getConversationMessages.pending, (state) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingConversationMessages: true,
        };
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingConversationMessages: false,
        };
        state.conversationMessages = action.payload?.allMessages;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingConversationMessages: false,
          error: action.payload,
        };
      })
      //get all public messages
      .addCase(getPublicMessages.pending, (state) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingPublicMessages: true,
        };
      })
      .addCase(getPublicMessages.fulfilled, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingPublicMessages: false,
        };
        state.publicMessages = action.payload?.allMessages;
      })
      .addCase(getPublicMessages.rejected, (state, action) => {
        state.allChatsApi = {
          ...state.allChatsApi,
          gettingPublicMessages: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetBidsApi,
  setSelectedConversation,
  setNewMessage,
  updateAllConversations,
  updateGroupConversations,
  setNewBroadcast,
} = chatSlice.actions;
export default chatSlice.reducer;
