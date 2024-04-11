import { getToken } from "./token/token";
import { get, post, put, patch, del } from "./index";
import { Project, UpdateProject } from "../types/index";

// 전체 프로젝트 목록 조회
export const fetchProjects = async (): Promise<Project[]> => {
  if (!getToken()) {
    console.error("No access token found. User is likely logged out.");
    // 로그인 페이지로 리다이렉트하거나, 적절한 처리를 하세요.
    // 예: throw new Error("Unauthorized");
    return Promise.reject("Unauthorized"); // 이 예제에서는 Promise.reject를 사용합니다.
  }

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
  if (!getToken()) {
    console.error("No access token found. User is likely logged out.");
    return Promise.reject("Unauthorized");
  }

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
  if (!getToken()) {
    console.error("No access token found. User is likely logged out.");
    return Promise.reject("Unauthorized");
  }

  try {
    const response = await patch(`/project/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 삭제
export const deleteProject = async (id: number): Promise<void> => {
  if (!getToken()) {
    console.error("No access token found. User is likely logged out.");
    return Promise.reject("Unauthorized");
  }

  try {
    await del(`/project/${id}`);
    console.log("Project successfully deleted");
  } catch (error) {
    console.error("Failed to delete project", error);
    throw error;
  }
};
