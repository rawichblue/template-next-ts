export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
  CHEQUE = 'CHEQUE',
}

export interface PaymentListItem {
  id: string;
  referenceNo: string;
  payerName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}

export interface PaymentDetail extends PaymentListItem {
  description: string;
  approvedBy?: string;
  approvedAt?: string;
  remark?: string;
  items: PaymentLineItem[];
}

export interface PaymentLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CreatePaymentRequest {
  payerName: string;
  amount: number;
  method: PaymentMethod;
  description: string;
  remark?: string;
}
