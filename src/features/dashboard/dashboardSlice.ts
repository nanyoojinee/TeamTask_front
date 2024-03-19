// features/dashboard/dashboardSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardData } from '../../api/dashboardApi'; // 가정한 API 함수k
import { DashboardData } from '../../api/dashboardApi';

export const getDashboardData = createAsyncThunk(
  'dashboard/getDashboardData',
  async () => {
    const response = await fetchDashboardData();
    return response;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
  data: null as DashboardData | null, // DashboardData 타입이거나 null이 될 수 있음을 명시
  isLoading: false,
  error: null as string | null | undefined,
},

  

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null; // 'undefined' 값을 'null'로 처리
      });
      
  },
});

export default dashboardSlice.reducer;
