// api/accountApi.ts
import instance from './index';

// 사용자 정보 타입 정의
interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: string;
}

// 계정 정보 조회
export const fetchAccountInfo = async (userId: number): Promise<UserInfo> => {
  const response = await instance.get(`/accounts/${userId}`);
  return response.data;
};

// 계정 권한 변경
export const updateAccountRole = async (userId: number, newRole: string): Promise<UserInfo> => {
  const response = await instance.patch(`/accounts/${userId}`, {
    role: newRole,
  });
  return response.data;
};

// 계정 등급 변경 (이 함수는 예시로만 제공되며, 실제 API 엔드포인트에 따라 달라질 수 있습니다.)
export const updateAccountLevel = async (userId: number, newLevel: string): Promise<UserInfo> => {
  const response = await instance.patch(`/accounts/${userId}/level`, {
    level: newLevel,
  });
  return response.data;
};
