// features/projects/projectsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjects, addProject } from "../../api/projectsModalApi"; // 가정한 API 함수
import { ProjectData } from "../../types/index";

export const getProjects = createAsyncThunk("project/getProjects", async () => {
  const response = await fetchProjects();
  return response.data;
});

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData: ProjectData) => {
    // 여기서 ProjectData 타입을 명시
    const response = await addProject(projectData);
    return response;
  }
);

const projectsModalSlice = createSlice({
  name: "project",
  initialState: {
    list: [] as ProjectData[], // list의 타입을 ProjectData[]로 명시적으로 표시
    isLoading: false,
    error: null as string | null, // 여기서 타입을 string | null로 명시
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default projectsModalSlice.reducer;
