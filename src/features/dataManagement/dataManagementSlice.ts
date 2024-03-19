// features/dataManagement/dataManagementSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDataItems } from '../../api/dataManagementApi';
import { DataManagementItem } from '../../api/dataManagementApi';
export const getDataItems = createAsyncThunk(
  'dataManagement/getDataItems',
  async () => {
    const response = await fetchDataItems();
    return response;
  }
);

const dataManagementSlice = createSlice({
  name: 'dataManagement',
    initialState: {
        items: []  as DataManagementItem[],
        isLoading: false,
        error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getDataItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default dataManagementSlice.reducer;
