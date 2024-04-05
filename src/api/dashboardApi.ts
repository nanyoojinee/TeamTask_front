import { get } from "./index";
import { getToken } from "./token/token"; // 액세스 토큰을 가져오는 함수의 정확한 경로를 확인해주세요.

export interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  ongoingProjects: number;
  // 필요에 따라 추가적인 대시보드 데이터 필드를 정의할 수 있습니다.
}

// 대시보드 데이터를 조회하는 함수
export const fetchDashboardData = async (): Promise<DashboardData> => {
  if (!getToken()) {
    console.error("Unauthorized - User is logged out.");
    // 여기서 Promise.reject를 사용하여 로그인 페이지로 리다이렉션하거나, 적절한 처리를 할 수 있습니다.
    return Promise.reject("Unauthorized - User is logged out.");
  }

  try {
    const response = await get("/dashboard"); // '/dashboard'는 대시보드 데이터를 조회하는 백엔드 엔드포인트
    return response.data; // Axios 응답의 data 속성이 DashboardData 타입과 일치한다고 가정
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error; // 에러 처리는 프로젝트의 요구사항에 맞게 조정할 수 있습니다.
  }
};
