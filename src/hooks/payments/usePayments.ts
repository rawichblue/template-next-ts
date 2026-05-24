'use client';
import { useCallback } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import {
  paymentsSelector,
  getPaymentList,
  getPaymentDetail,
  submitPaymentForm,
  setFilter,
  resetFilter,
  clearDetail,
  PaymentFilterState,
} from '@/store/slices/payments';
import { CreatePaymentRequest } from '@/types';

const usePayments = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(paymentsSelector);

  const fetchList = useCallback(
    (filter?: Partial<PaymentFilterState>) => {
      const merged = { ...state.filter, ...filter };
      dispatch(setFilter(merged));
      return dispatch(getPaymentList(merged));
    },
    [dispatch, state.filter],
  );

  const fetchDetail = useCallback(
    (id: string) => dispatch(getPaymentDetail(id)),
    [dispatch],
  );

  const submitForm = useCallback(
    (body: CreatePaymentRequest) => dispatch(submitPaymentForm(body)),
    [dispatch],
  );

  const updateFilter = useCallback(
    (partial: Partial<PaymentFilterState>) => dispatch(setFilter(partial)),
    [dispatch],
  );

  const reset = useCallback(() => dispatch(resetFilter()), [dispatch]);

  const clearDetailData = useCallback(() => dispatch(clearDetail()), [dispatch]);

  return {
    ...state,
    fetchList,
    fetchDetail,
    submitForm,
    updateFilter,
    reset,
    clearDetailData,
  };
};

export default usePayments;
