import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApis } from "../../../utils/apis/authApis";
import { userApis } from "../../../utils/apis/userApis";

// ---------------------- VALIDATE TOKEN ---------------------- //
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, rejectWithValue }) => {
    const { logoutReason } = getState().auth;

    if (logoutReason === "tokenExpired") return rejectWithValue("No token");

    try {
      const response = await userApis.getUserDetails();
      return response.data;
    } catch {
      return rejectWithValue("Token invalid");
    }
  },
);

// ---------------------- LOGIN ---------------------- //
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApis.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue({
        response: {
          data: error.response?.data
        }
      });
    }
  },
);

// ---------------------- LOGOUT ---------------------- //
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (logoutReason, { rejectWithValue }) => {
    try {
      await authApis.logout();
      return logoutReason;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  },
);

// ---------------------- INITIAL STATE ---------------------- //
const getInitialState = () => {
  return {
    userData: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    logoutReason: "",
  };
};

// ---------------------- SLICE ---------------------- //
const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    updateUserData: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },

    clearError: (state) => {
      state.error = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;

        if (action.payload === "Token invalid") {
          state.isAuthenticated = false;
          state.userData = null;
          state.logoutReason = "tokenExpired";
        }

        state.error = action.payload;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.userData = action.payload?.data?.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.logoutReason = "";
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.response?.data?.message || "Login failed";
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.userData = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.logoutReason = action.payload || "manual";
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateUserData,
  clearError,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;


