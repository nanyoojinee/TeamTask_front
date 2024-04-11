import { get, post, put, patch } from "./index"; // 수정된 API 함수를 임포트합니다.
import { User, Project } from "../types/index";

// 사용자 정보 타입 정의

// 계정 정보 조회
export const fetchAccountInfo = async (userId: number): Promise<User> => {
  const response = await get(`/accounts/${userId}`);
  return response.data;
};

// 계정 권한 변경
export const updateAccountRole = async (
  userId: number,
  newRole: string
): Promise<User> => {
  const response = await put(`/accounts/${userId}`, {
    role: newRole,
  });
  return response.data;
};

// 계정 등급 변경 (이 함수는 예시로만 제공되며, 실제 API 엔드포인트에 따라 달라질 수 있습니다.)
export const updateAccountLevel = async (
  userId: number,
  newLevel: string
): Promise<User> => {
  const response = await put(`/accounts/${userId}/level`, {
    level: newLevel,
  });
  return response.data;
};
// 사용자 프로필 조회
export const fetchUserProfile = async (): Promise<User> => {
  const response = await get(`/user/profile`);
  console.log(response.data);
  return response.data;
};

// 사용자 정보 수정
export const updateUser = async (
  userId: number,
  userInfo: Partial<User>
): Promise<User> => {
  const response = await patch(`/user/${userId}`, userInfo);

  return response.data;
};

// 사용자가 속한 프로젝트 조회
export const fetchUserProjects = async (): Promise<Project[]> => {
  const response = await get(`/user/project`);
  return response.data;
};
// 모든 사용자 정보 조회
export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await get(`/user`);
  return response.data;
};

// 특정 팀에 속한 사용자 정보 조회
export const fetchUsersByTeam = async (teamId: number): Promise<User[]> => {
  const response = await get(`/user/${teamId}`);
  return response.data;
};
