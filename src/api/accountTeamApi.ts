import { patch } from "./index";
import { getToken } from "./token/token"; // 액세스 토큰을 가져오는 함수의 정확한 경로를 확인해주세요.

interface PatchResponse {
  success: boolean;
  message?: string;
}

// API 함수
export const updateTeam = async (team: number): Promise<PatchResponse> => {
  if (!getToken()) {
    console.error("Unauthorized - User is logged out.");
    // 로그아웃 상태일 때 처리, 예를 들어 Promise.reject 사용
    return Promise.reject("Unauthorized - User is logged out.");
  }

  try {
    const response = await patch("/auth/team", { team });
    return {
      success: true,
      message: response.data.message, // 성공 메시지 반환
    };
  } catch (error) {
    console.error("Team update failed:", error);
    return {
      success: false,
      message: "Team update failed due to an error.", // 실패 메시지 반환
    };
  }
};
