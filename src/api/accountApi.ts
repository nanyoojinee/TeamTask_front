import { get, post, put, patch } from "./index";
import { User, Project } from "../types/index";
import { getToken } from "./token/token";

// 계정 정보 조회
export const fetchAccountInfo = async (userId: number): Promise<User> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await get(`/accounts/${userId}`);
  return response.data;
};

// 계정 권한 변경
export const updateAccountRole = async (
  userId: number,
  newRole: string
): Promise<User> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await put(`/accounts/${userId}`, { role: newRole });
  return response.data;
};

// 계정 등급 변경
export const updateAccountLevel = async (
  userId: number,
  newLevel: string
): Promise<User> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await put(`/accounts/${userId}/level`, { level: newLevel });
  return response.data;
};

// 사용자 프로필 조회
export const fetchUserProfile = async (): Promise<User> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await get(`/user/profile`);
  return response.data;
};

// 사용자 정보 수정
export const updateUser = async (
  userId: number,
  userInfo: Partial<User>
): Promise<User> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await patch(`/user/${userId}`, userInfo);
  return response.data;
};

// 사용자가 속한 프로젝트 조회
export const fetchUserProjects = async (): Promise<Project[]> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await get(`/user/project`);
  return response.data;
};

// 모든 사용자 정보 조회
export const fetchAllUsers = async (): Promise<User[]> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await get(`/user`);
  return response.data;
};

// 특정 팀에 속한 사용자 정보 조회
export const fetchUsersByTeam = async (teamId: number): Promise<User[]> => {
  if (!getToken()) {
    throw new Error("Unauthorized - User is logged out.");
  }
  const response = await get(`/user/${teamId}`);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  const response = await post("/auth/logout", {});
  return response.data;
};
