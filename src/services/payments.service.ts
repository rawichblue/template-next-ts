import { ApiListResponse, PaymentDetail, PaymentListItem, CreatePaymentRequest, PaymentMethod, PaymentStatus } from '@/types';
import { MOCK_PAYMENT_DETAILS, MOCK_PAYMENTS } from './payments.mock';

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export interface PaymentFilterRequest {
  referenceNo?: string;
  payerName?: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  page: number;
  size: number;
}

// ─── swap mock ↔ real API here without touching thunks ───────────────────────

export const fetchPaymentList = async (
  filter: PaymentFilterRequest,
): Promise<ApiListResponse<PaymentListItem>> => {
  await delay();

  let result = [...MOCK_PAYMENTS];

  if (filter.referenceNo)
    result = result.filter((p) => p.referenceNo.toLowerCase().includes(filter.referenceNo!.toLowerCase()));
  if (filter.payerName)
    result = result.filter((p) => p.payerName.toLowerCase().includes(filter.payerName!.toLowerCase()));
  if (filter.status) result = result.filter((p) => p.status === filter.status);
  if (filter.method) result = result.filter((p) => p.method === filter.method);

  const totalElements = result.length;
  const content = result.slice(filter.page * filter.size, (filter.page + 1) * filter.size);

  return { content, totalElements };
};

export const fetchPaymentById = async (id: string): Promise<PaymentDetail> => {
  await delay();
  const detail = MOCK_PAYMENT_DETAILS[id];
  if (!detail) throw new Error(`Payment ${id} not found`);
  return detail;
};

export const createPayment = async (_body: CreatePaymentRequest): Promise<{ id: string }> => {
  await delay(800);
  return { id: `PAY-NEW-${Date.now()}` };
};
