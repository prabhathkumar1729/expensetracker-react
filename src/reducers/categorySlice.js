import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryServices from "../services/categoryServices";
import { toast } from "react-toastify";
const initialState = {
  categories: [
    "Food",
    "Entertainment",
    "Shopping",
    "Medical",
    "Loans",
    "Bills",
    "Others",
  ],
  error: null,
  message: null,
  loaded: false,
};

export const getUserCategories = createAsyncThunk(
  "category/getUserCategories",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await CategoryServices.getUserCategories(userId);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategory: (state) => {
      state.categories = initialState.categories;
      state.error = null;
      state.message = null;
      state.loaded = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearAll: (state) => {
      state.categories = initialState.categories;
      state.error = null;
      state.message = null;
      state.loaded = false;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
      state.categories = [
        ...new Set(initialState.categories.concat(state.categories)),
      ];
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      state.categories = state.categories.map((category) =>
        category === action.payload.oldCategory
          ? action.payload.newCategory
          : category
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserCategories.fulfilled, (state, action) => {
      state.categories = [...new Set([...state.categories, ...action.payload])];
      state.error = false;
      state.message = "User Categories Fetched Successfully";
      toast.success("User Categories Fetched Successfully");
      state.loaded = true;
    });
    builder.addCase(getUserCategories.rejected, (state, action) => {
      state.categories = initialState.categories;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const {
  clearCategory,
  clearError,
  clearMessage,
  clearAll,
  deleteCategory,
  addCategory,
  updateCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
