import { get } from "./index";
import { getToken } from "./token/token"; // 액세스 토큰을 가져오는 함수의 정확한 경로를 확인해주세요.

export interface ResourceChartData {
  date: string;
  value: number;
}

export const fetchResourceChartData = async (): Promise<
  ResourceChartData[]
> => {
  if (!getToken()) {
    console.error("Unauthorized - User is logged out.");
    // 로그아웃 상태일 때 처리, 예를 들어 Promise.reject 사용
    return Promise.reject("Unauthorized - User is logged out.");
  }

  try {
    const response = await get("/resource-chart", "");
    return response.data;
  } catch (error) {
    console.error("Error fetching resource chart data:", error);
    throw error;
  }
};
