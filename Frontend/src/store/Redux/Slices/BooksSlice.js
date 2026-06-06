import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { booksApis } from "../../../utils/apis/booksApis";

const initialState = {
  books: [],
  nextCursor: null,
  hasMore: false,
  loading: false,
  fetchingMore: false,
  error: null,
};

export const fetchAllBooks = createAsyncThunk(
  "fetchAllBooks",
  async (filters, thunkAPI) => {
    try {
      console.log("Filters :", filters);

      const response = await booksApis.getAllBooks(filters);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch books",
      );
    }
  },
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state, action) => {
        if (action.meta.arg?.cursor) {
          state.fetchingMore = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchingMore = false;
        const { data, nextCursor, hasMore } = action.payload;

        if (action.meta.arg?.cursor) {
          state.books = [...state.books, ...data];
        } else {
          state.books = data;
        }

        state.nextCursor = nextCursor;
        state.hasMore = hasMore;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.fetchingMore = false;
        state.error = action?.payload;
      });
  },
});

export default bookSlice.reducer;
