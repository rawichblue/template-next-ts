import { createAsyncThunk } from '@reduxjs/toolkit';
import { paymentsService } from '@/services';
import { CreatePaymentRequest, PaymentDetail, PaymentListItem } from '@/types';
import { PaymentFilterState, sliceName } from './types';

export const getPaymentList = createAsyncThunk(
  `${sliceName}/getPaymentList`,
  async (filter: PaymentFilterState): Promise<{ list: PaymentListItem[]; totalElements: number }> => {
    const response = await paymentsService.fetchPaymentList({
      referenceNo: filter.referenceNo || undefined,
      payerName: filter.payerName || undefined,
      status: filter.status || undefined,
      method: filter.method || undefined,
      page: filter.page,
      size: filter.size,
    });

    return {
      list: response.content,
      totalElements: response.totalElements,
    };
  },
);

export const getPaymentDetail = createAsyncThunk(
  `${sliceName}/getPaymentDetail`,
  async (id: string): Promise<PaymentDetail> => {
    return await paymentsService.fetchPaymentById(id);
  },
);

export const submitPaymentForm = createAsyncThunk(
  `${sliceName}/submitPaymentForm`,
  async (body: CreatePaymentRequest): Promise<{ id: string }> => {
    return await paymentsService.createPayment(body);
  },
);
