// api/dataManagementApi.ts
import instance from './index';

// 데이터 관리에 사용될 데이터 타입 정의
export interface DataManagementItem {
  id: number;
  name: string;
  // 추가 필드...
}

// 데이터 목록을 가져오는 함수
export const fetchDataItems = async (): Promise<DataManagementItem[]> => {
  const response = await instance.get('/data-management/items');
  return response.data;
};

// 데이터 항목을 추가하는 함수
export const addDataItem = async (item: DataManagementItem): Promise<DataManagementItem> => {
  const response = await instance.post('/data-management/items', item);
  return response.data;
};
