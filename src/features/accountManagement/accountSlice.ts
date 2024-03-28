import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountInfo, updateAccountRole } from "../../api/accountApi";

interface ChangeRolePayload {
  userId: number;
  newRole: string;
}

export const getAccountInfo = createAsyncThunk(
  "account/getAccountInfo",
  async (userId: number) => {
    const response = await fetchAccountInfo(userId);
    return response;
  }
);

export const changeAccountRole = createAsyncThunk(
  "account/changeAccountRole",
  async ({ userId, newRole }: ChangeRolePayload) => {
    const response = await updateAccountRole(userId, newRole);
    return response;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    userInfo: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getAccountInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(changeAccountRole.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      });
  },
});

export default accountSlice.reducer;
