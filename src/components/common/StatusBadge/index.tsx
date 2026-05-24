import React from 'react';
import { Tag } from 'antd';
import { PaymentStatus } from '@/types';

const STATUS_CONFIG: Record<PaymentStatus, { label: string; color: string }> = {
  [PaymentStatus.PENDING]: { label: 'รอดำเนินการ', color: 'gold' },
  [PaymentStatus.APPROVED]: { label: 'อนุมัติแล้ว', color: 'green' },
  [PaymentStatus.REJECTED]: { label: 'ปฏิเสธ', color: 'red' },
  [PaymentStatus.CANCELLED]: { label: 'ยกเลิก', color: 'default' },
};

interface StatusBadgeProps {
  status: PaymentStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  if (!config) return <Tag>{status}</Tag>;
  return <Tag color={config.color}>{config.label}</Tag>;
};

export default StatusBadge;
