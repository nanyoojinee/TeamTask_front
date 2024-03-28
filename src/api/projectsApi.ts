// types/index.ts 파일에 정의된 인터페이스 import
import { get, post, put, patch, del } from "./index";
import { Project, UpdateProject } from "../types/index";

// 전체 프로젝트 목록 조회
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await get("/project");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 개별 프로젝트 조회
export const fetchProjectById = async (projectId: number): Promise<Project> => {
  try {
    const response = await get(`/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 업데이트
export const updateProject = async (
  id: number,
  projectData: UpdateProject
): Promise<Project> => {
  try {
    const response = await patch(`/project/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Assuming the delete function is in the same projectsApi.js file

export const deleteProject = async (id: number): Promise<void> => {
  try {
    await del(`/project/${id}`);
    console.log("Project successfully deleted");
  } catch (error) {
    console.error("Failed to delete project", error);
    throw error; // Optionally re-throw the error for further handling
  }
};
