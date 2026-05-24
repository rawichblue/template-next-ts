import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertMessage, CommonState, initialState } from './types';
import type { RootState } from '@/store/store';

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    setAlert: (state, action: PayloadAction<AlertMessage>) => {
      state.alertMessage = action.payload;
    },
    clearAlert: (state) => {
      state.alertMessage = null;
    },
  },
});

export const { setGlobalLoading, setAlert, clearAlert } = commonSlice.actions;
export default commonSlice.reducer;
export const commonSelector = (state: RootState): CommonState => state.common;
