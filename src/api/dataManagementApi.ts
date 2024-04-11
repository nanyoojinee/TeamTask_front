import { get, post } from "./index";
import { getToken } from "./token/token"; // 액세스 토큰을 가져오는 함수의 정확한 경로를 확인해주세요.

export interface DataManagementItem {
  id: number;
  name: string;
  // 추가 필드...
}

// 데이터 목록을 가져오는 함수
export const fetchDataItems = async (): Promise<DataManagementItem[]> => {
  if (!getToken()) {
    console.error("Unauthorized - User is logged out.");
    return Promise.reject("Unauthorized - User is logged out.");
  }

  try {
    const response = await get("/data-management/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching data items:", error);
    throw error;
  }
};

// 데이터 항목을 추가하는 함수
export const addDataItem = async (
  item: DataManagementItem
): Promise<DataManagementItem> => {
  if (!getToken()) {
    console.error("Unauthorized - User is logged out.");
    return Promise.reject("Unauthorized - User is logged out.");
  }

  try {
    const response = await post("/data-management/items", item);
    return response.data;
  } catch (error) {
    console.error("Error adding data item:", error);
    throw error;
  }
};
