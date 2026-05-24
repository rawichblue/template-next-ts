import type { TableColumnsType } from 'antd';
import { PaymentListItem, PaymentStatus, PaymentMethod } from '@/types';
import { formatCurrency } from '@/utils';
import { formatDate } from '@/utils';

const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'รอดำเนินการ',
  [PaymentStatus.APPROVED]: 'อนุมัติแล้ว',
  [PaymentStatus.REJECTED]: 'ปฏิเสธ',
  [PaymentStatus.CANCELLED]: 'ยกเลิก',
};

const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: 'เงินสด',
  [PaymentMethod.TRANSFER]: 'โอนเงิน',
  [PaymentMethod.CHEQUE]: 'เช็ค',
};

export const paymentColumns: TableColumnsType<PaymentListItem> = [
  {
    title: 'เลขที่อ้างอิง',
    dataIndex: 'referenceNo',
    key: 'referenceNo',
    width: 160,
  },
  {
    title: 'ชื่อผู้ชำระ',
    dataIndex: 'payerName',
    key: 'payerName',
  },
  {
    title: 'จำนวนเงิน',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    width: 160,
    render: (val: number) => formatCurrency(val),
  },
  {
    title: 'วิธีชำระ',
    dataIndex: 'method',
    key: 'method',
    width: 120,
    render: (val: PaymentMethod) => PAYMENT_METHOD_LABEL[val] ?? val,
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (val: PaymentStatus) => PAYMENT_STATUS_LABEL[val] ?? val,
  },
  {
    title: 'วันที่',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    render: (val: string) => formatDate(val),
  },
];
