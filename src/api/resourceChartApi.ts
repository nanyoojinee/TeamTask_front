// api/resourceChartApi.ts
import instance from './index';

// 리소스 차트 데이터 타입 정의
export interface ResourceChartData {
  date: string;
  value: number;
}

export const fetchResourceChartData = async (): Promise<ResourceChartData[]> => {
  const response = await instance.get('/resource-chart');
  return response.data;
};
