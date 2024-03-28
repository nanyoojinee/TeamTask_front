import { get, post } from "./index";
import { ProjectData } from "../types";
// 수정된 프로젝트 데이터의 타입을 정의하는 인터페이스

// 프로젝트 목록 조회
export const fetchProjects = async () => {
  try {
    const response = await get("/project");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 추가
export const addProject = async (projectData: ProjectData) => {
  try {
    const response = await post("/project", projectData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
