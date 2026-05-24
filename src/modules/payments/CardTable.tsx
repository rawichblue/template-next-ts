'use client';
import React, { useEffect } from 'react';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { DataTable, StatusBadge } from '@/components/common';
import { usePayments } from '@/hooks';
import { paymentColumns } from '@/constants/tableColumns';
import { ROUTES } from '@/constants/configPage';
import { PaymentListItem, PaymentStatus } from '@/types';

const CardTable = () => {
  const router = useRouter();
  const { list, loadingList, totalElements, filter, fetchList } = usePayments();

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page: number, pageSize: number) => {
    fetchList({ page: page - 1, size: pageSize });
  };

  const columnsWithActions = [
    ...paymentColumns.map((col) =>
      col.key === 'status'
        ? { ...col, render: (val: PaymentStatus) => <StatusBadge status={val} /> }
        : col,
    ),
    {
      title: '',
      key: 'actions',
      width: 120,
      render: (_: unknown, record: PaymentListItem) => (
        <Button
          type='link'
          size='small'
          onClick={() => router.push(ROUTES.payments.detail(record.id))}
        >
          ดูรายละเอียด
        </Button>
      ),
    },
  ];

  return (
    <Card
      title='รายการชำระเงิน'
      className='shadow-sm dark:border-slate-700 dark:bg-slate-800'
      extra={
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => router.push(ROUTES.payments.form)}
        >
          บันทึกรายการ
        </Button>
      }
    >
      <DataTable
        columns={columnsWithActions}
        dataSource={list}
        loading={loadingList}
        total={totalElements}
        pageSize={filter.size}
        current={filter.page + 1}
        onPageChange={handlePageChange}
      />
    </Card>
  );
};

export default CardTable;
