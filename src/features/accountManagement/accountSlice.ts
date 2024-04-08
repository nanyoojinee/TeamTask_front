import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountInfo, updateAccountRole } from "../../api/accountApi";
import {
  fetchUserProfile,
  updateUser,
  fetchUserProjects,
  logoutUser,
} from "../../api/accountApi";
import { User, Project } from "../../types/index";
import { post } from "../../api/index";
interface ChangeRolePayload {
  userId: number;
  newRole: string;
}
interface AccountState {
  userInfo: User | null;
  userProjects: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  userInfo: null, // null로 초기화
  userProjects: [],
  isLoading: false,
  error: null,
};
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
// 사용자 프로필 조회
// 사용자 정보 수정
export const updateUserProfile = createAsyncThunk(
  "account/updateUserProfile",
  async ({ userId, userInfo }: { userId: number; userInfo: Partial<User> }) => {
    const response = await updateUser(userId, userInfo); // API 호출 수정
    return response;
  }
);
export const logoutAsync = createAsyncThunk(
  "account/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logoutUser();
      // 성공적으로 로그아웃한 경우, 여기서 로컬 스토리지를 정리할 수도 있습니다.
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// // 사용자 정보 수정
// export const updateUserProfile = createAsyncThunk(
//   "account/updateUserProfile",
//   async (userInfo: Partial<User>) => {
//     const response = await updateUser(userInfo);
//     return response;
//   }
// );

// 사용자가 속한 프로젝트 조회
export const getUserProjects = createAsyncThunk(
  "account/getUserProjects",
  async () => {
    const response = await fetchUserProjects();
    return response;
  }
);
// 사용자 프로필 조회 비동기 액션 생성
export const fetchUserProfileThunk = createAsyncThunk(
  "account/fetchUserProfile",
  async () => {
    const response = await fetchUserProfile(); // API 호출
    return response; // 비동기 액션의 payload로 설정될 데이터
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.userProjects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        // 로그아웃 성공 시 상태 업데이트
        state.userInfo = null;
        state.userProjects = [];
      })
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
      })
      .addCase(fetchUserProfileThunk.pending, (state) => {
        // 비동기 액션이 대기 상태일 때의 상태 업데이트 로직
        state.isLoading = true;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        // 비동기 액션이 성공적으로 이행되었을 때의 상태 업데이트 로직
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        // 비동기 액션이 거부되었을 때의 상태 업데이트 로직
        state.isLoading = false;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.userProjects = action.payload; // state에 userProjects 필드 추가가 필요
      });
  },
});
export const { logout } = accountSlice.actions;
export default accountSlice.reducer;
