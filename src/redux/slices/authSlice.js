import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});
const initialState = {
  loginApi: {},
  usersApi: {},
  currentUser: null,
  allUsers: null,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await api.post(`auth/`, data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`auth/register`, data);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (data, thunkAPI) => {
    try {
      const response = await api.get(`auth/getAll`);
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
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginApi: (state) => {
      state.loginApi = {};
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loginApi = { ...state.loginApi, loading: true };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginApi = {
          ...state.loginApi,
          loading: false,
          response: { ...action.payload?.user, token: action?.payload?.token },
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loginApi = {
          ...state.loginApi,
          loading: false,
          error: action.payload,
        };
      })
      // register
      .addCase(register.pending, (state) => {
        state.loginApi = { ...state.loginApi, loading: true };
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loginApi = {
          ...state.loginApi,
          loading: false,
          response: { ...action.payload?.user, token: action?.payload?.token },
        };
      })
      .addCase(register.rejected, (state, action) => {
        state.loginApi = {
          ...state.loginApi,
          loading: false,
          error: action.payload,
        };
      })
      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.usersApi = { ...state.usersApi, loading: true };
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersApi = {
          ...state.usersApi,
          loading: false,
        };
        state.allUsers = action.payload?.allUsers;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersApi = {
          ...state.usersApi,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const { resetLoginApi, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
