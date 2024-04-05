import { get, post } from "./index";
import { ProjectData } from "../types";
import { getToken } from "./token/token";

// 프로젝트 목록 조회
export const fetchProjects = async () => {
  if (!getToken()) {
    console.error("No access token found. User is likely logged out.");
    return Promise.reject("Unauthorized - User is logged out.");
  }

  try {
    const response = await get("/project");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// 프로젝트 추가
export const addProject = async (projectData: ProjectData) => {
  if (!getToken()) {
    console.error("No access token found. User is likely logged out.");
    return Promise.reject("Unauthorized - User is logged out.");
  }

  try {
    const response = await post("/project", projectData);
    console.log("Project added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};
