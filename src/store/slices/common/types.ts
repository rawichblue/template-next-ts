export interface CommonState {
  globalLoading: boolean;
  alertMessage: AlertMessage | null;
}

export interface AlertMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  description?: string;
}

export const initialState: CommonState = {
  globalLoading: false,
  alertMessage: null,
};
