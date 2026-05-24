import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, PaymentFilterState, PaymentsState, sliceName } from './types';
import { getPaymentDetail, getPaymentList, submitPaymentForm } from './thunks';
import type { RootState } from '@/store/store';

const paymentsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<PaymentFilterState>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
    clearDetail: (state) => {
      state.detail = null;
    },
    clearAll: () => initialState,
  },
  extraReducers: (builder) => {
    // list
    builder
      .addCase(getPaymentList.pending, (state) => { state.loadingList = true; })
      .addCase(getPaymentList.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.list;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(getPaymentList.rejected, (state) => { state.loadingList = false; });

    // detail
    builder
      .addCase(getPaymentDetail.pending, (state) => { state.loadingDetail = true; })
      .addCase(getPaymentDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detail = action.payload;
      })
      .addCase(getPaymentDetail.rejected, (state) => { state.loadingDetail = false; });

    // submit
    builder
      .addCase(submitPaymentForm.pending, (state) => { state.loadingSubmit = true; })
      .addCase(submitPaymentForm.fulfilled, (state) => { state.loadingSubmit = false; })
      .addCase(submitPaymentForm.rejected, (state) => { state.loadingSubmit = false; });
  },
});

export const { setFilter, resetFilter, clearDetail, clearAll } = paymentsSlice.actions;
export default paymentsSlice.reducer;
export const paymentsSelector = (state: RootState): PaymentsState => state.payments;
