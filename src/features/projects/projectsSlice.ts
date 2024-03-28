// Redux Toolkit 및 API 함수를 임포트
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProjects,
  updateProject,
  fetchProjectById,
} from "../../api/projectsApi";
import { Project, UpdateProject } from "../../types/index";

export const getProjects = createAsyncThunk<Project[], void>(
  "projects/getProjects",
  async () => {
    const response = await fetchProjects();
    return response;
  }
);

export const fetchProject = createAsyncThunk<Project, number>(
  "projects/fetchProject",
  async (projectId, { rejectWithValue }) => {
    try {
      return await fetchProjectById(projectId);
    } catch (error) {
      return rejectWithValue("프로젝트 조회 중 오류가 발생했습니다.");
    }
  }
);

export const updateProjectThunk = createAsyncThunk<
  Project,
  { id: number; projectData: UpdateProject }
>("projects/updateProject", async ({ id, projectData }) => {
  try {
    return await updateProject(id, projectData);
  } catch (error) {
    throw error;
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    list: [] as Project[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        // 프로젝트 목록을 가져오는 작업이 시작될 때 로딩 상태를 true로 설정
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        // 프로젝트 목록을 성공적으로 가져왔을 때
        state.isLoading = false;
        state.list = action.payload; // 가져온 프로젝트 목록으로 상태 업데이트
      })
      .addCase(getProjects.rejected, (state, action) => {
        // 프로젝트 목록을 가져오는 작업이 실패했을 때
        state.isLoading = false;
        state.error = action.error.message || "An error occurred"; // 오류 메시지 설정
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        // 특정 프로젝트를 성공적으로 가져왔을 때 (예시로 추가, 실제 구현 필요)
        // 여기에 특정 프로젝트 처리 로직을 추가할 수 있습니다.
      })
      .addCase(updateProjectThunk.fulfilled, (state, action) => {
        // 프로젝트 업데이트를 성공적으로 완료했을 때
        const index = state.list.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload; // 기존 목록에서 해당 프로젝트를 업데이트
        }
      });
    // 필요에 따라 추가적인 case들을 여기에 구현할 수 있습니다.
  },
});

export default projectsSlice.reducer;
