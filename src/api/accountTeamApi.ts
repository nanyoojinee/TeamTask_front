import { patch } from "./index";

interface PatchResponse {
  success: boolean;
  message?: string;
}

// API 함수
export const updateTeam = async (team: number): Promise<PatchResponse> => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰을 가져옵니다.
    console.log("team", team);
    const response = await patch("/auth/team", { team }); // patch 함수 호출 시, 액세스 토큰 처리는 생략
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
