// features/accountManagement/accountSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAccountInfo, updateAccountRole } from '../../api/accountApi';

interface ChangeRolePayload {
  userId: number;
  newRole: string;
}

export const getAccountInfo = createAsyncThunk(
  'account/getAccountInfo',
  async (userId:number) => {
    const response = await fetchAccountInfo(userId);
    return response;
  }
);

export const changeAccountRole = createAsyncThunk(
  'account/changeAccountRole',
  async ({ userId, newRole }: ChangeRolePayload) => {
    const response = await updateAccountRole(userId, newRole);
    return response;
  }
);


const accountSlice = createSlice({
  name: 'account',
  initialState: {
    userInfo: {},
    isLoading: false,
    error: null as string | null, // 여기서 오류 타입을 'string | null'로 명시적으로 선언했습니다.
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
        // 오류 메시지가 undefined일 경우를 대비하여 기본값 할당
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(changeAccountRole.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      });
  },
});

export default accountSlice.reducer;

