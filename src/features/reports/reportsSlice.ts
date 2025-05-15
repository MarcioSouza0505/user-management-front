import * as api from '../../api/report';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ByMonthResponseDTO } from '../../types/reports/ByMonthResponseDTO';


interface ReportsState {
  count?: number;
  byMonth: ByMonthResponseDTO[];
  loading: boolean;
  error?: string;
}

const initialState: ReportsState = {
  byMonth: [],
  loading: false,
};

export const fetchCount = createAsyncThunk('reports/fetchCount', async () => {
  const res = await api.getUserCount();
  return res.data.total;
});

export const fetchByMonth = createAsyncThunk('reports/fetchByMonth', async () => {
  const res = await api.getUsersByMonth();
  return res.data;
});

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchCount.pending, state => { state.loading = true; })
      .addCase(fetchCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.count = action.payload;
        state.loading = false;
      })
      .addCase(fetchCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchByMonth.pending, state => { state.loading = true; })
      .addCase(fetchByMonth.fulfilled, (state, action: PayloadAction<ByMonthResponseDTO[]>) => {
        state.byMonth = action.payload;
        state.loading = false;
      })
      .addCase(fetchByMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
});

export default reportsSlice.reducer;
