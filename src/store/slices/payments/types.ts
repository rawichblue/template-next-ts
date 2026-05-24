import { PaymentDetail, PaymentListItem, PaymentMethod, PaymentStatus } from '@/types';

export const sliceName = 'payments';

export interface PaymentFilterState {
  referenceNo: string;
  payerName: string;
  status: PaymentStatus | '';
  method: PaymentMethod | '';
  page: number;
  size: number;
}

export interface PaymentsState {
  // list
  loadingList: boolean;
  list: PaymentListItem[];
  totalElements: number;
  filter: PaymentFilterState;
  // detail
  loadingDetail: boolean;
  detail: PaymentDetail | null;
  // form
  loadingSubmit: boolean;
}

export const defaultFilter: PaymentFilterState = {
  referenceNo: '',
  payerName: '',
  status: '',
  method: '',
  page: 0,
  size: 10,
};

export const initialState: PaymentsState = {
  loadingList: false,
  list: [],
  totalElements: 0,
  filter: defaultFilter,
  loadingDetail: false,
  detail: null,
  loadingSubmit: false,
};
