'use client';
import React from 'react';
import { Card, Skeleton } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { usePayments } from '@/hooks';
import { PaymentStatus } from '@/types';
import { formatCurrency } from '@/utils';

const StatsCards = () => {
  const { list, loadingList } = usePayments();

  const stats = {
    total: list.reduce((s, p) => s + p.amount, 0),
    approved: list.filter((p) => p.status === PaymentStatus.APPROVED).length,
    pending: list.filter((p) => p.status === PaymentStatus.PENDING).length,
    rejected: list.filter((p) => p.status === PaymentStatus.REJECTED || p.status === PaymentStatus.CANCELLED).length,
  };

  const cards = [
    {
      title: 'ยอดรวมทั้งหมด',
      value: formatCurrency(stats.total),
      icon: <DollarOutlined />,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'อนุมัติแล้ว',
      value: stats.approved,
      icon: <CheckCircleOutlined />,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
      suffix: 'รายการ',
    },
    {
      title: 'รอดำเนินการ',
      value: stats.pending,
      icon: <ClockCircleOutlined />,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      suffix: 'รายการ',
    },
    {
      title: 'ปฏิเสธ / ยกเลิก',
      value: stats.rejected,
      icon: <CloseCircleOutlined />,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      suffix: 'รายการ',
    },
  ];

  if (loadingList) {
    return (
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
            <Skeleton active paragraph={{ rows: 1 }} />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {cards.map((c) => (
        <Card
          key={c.title}
          className='shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800'
        >
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-xs text-gray-500 dark:text-slate-400'>{c.title}</p>
              <p className='mt-1 text-xl font-bold text-gray-900 dark:text-white'>
                {c.value}
                {c.suffix && (
                  <span className='ml-1 text-sm font-normal text-gray-500 dark:text-slate-400'>
                    {c.suffix}
                  </span>
                )}
              </p>
            </div>
            <div className={`rounded-lg p-2 ${c.bg}`}>
              <span className={`text-lg ${c.color}`}>{c.icon}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
