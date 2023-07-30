import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserServices from "../services/userServices";

const initialState = {
  user: {},
  error: null,
  message: null,
};

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserServices.getProfile(userId);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearAll: (state) => {
      state.user = {};
      state.error = null;
      state.message = null;
    },
    setUser: (state, action) => {
      state.user = {
        Id: action.payload.Id,
        Name: action.payload.Name,
        Email: action.payload.Email,
      };
      state.error = false;
      state.message = "User details set sucessfully";
    }
  }
});

export const { clearUser, clearError, clearMessage, clearAll, setUser } =  UserSlice.actions;

export default UserSlice.reducer;
