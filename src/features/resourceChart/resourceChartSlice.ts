// features/resourceChart/resourceChartSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchResourceChartData } from '../../api/resourceChartApi';
import { ResourceChartData } from '../../api/resourceChartApi';
// 리소스 차트 데이터를 비동기적으로 불러오는 비동기 액션
export const getResourceChartData = createAsyncThunk(
  'resourceChart/getResourceChartData',
  async () => {
    const response = await fetchResourceChartData();
    return response;
  }
);

// 리소스 차트의 초기 상태 정의
interface ResourceChartState {
  data: ResourceChartData[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ResourceChartState = {
  data: null,
  isLoading: false,
  error: null,
};

// 리소스 차트 슬라이스 생성
const resourceChartSlice = createSlice({
  name: 'resourceChart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResourceChartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResourceChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getResourceChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default resourceChartSlice.reducer;
