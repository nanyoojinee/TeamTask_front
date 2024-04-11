import { get } from "./index"; // 수정된 API 함수를 임포트합니다.

// 대시보드 데이터의 예시 타입 정의
export interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  ongoingProjects: number;
  // 필요에 따라 추가적인 대시보드 데이터 필드를 정의할 수 있습니다.
}

// 대시보드 데이터를 조회하는 함수
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await get("/dashboard"); // '/dashboard'는 대시보드 데이터를 조회하는 백엔드 엔드포인트
    return response.data; // Axios 응답의 data 속성이 DashboardData 타입과 일치한다고 가정
  } catch (error) {
    console.error(error);
    throw error; // 에러 처리는 프로젝트의 요구사항에 맞게 조정할 수 있습니다.
  }
};
