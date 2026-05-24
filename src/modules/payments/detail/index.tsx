'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Descriptions, Skeleton, Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { StatusBadge } from '@/components/common';
import { usePayments } from '@/hooks';
import { formatCurrency, formatDateTime } from '@/utils';
import { ROUTES } from '@/constants/configPage';
import { PaymentLineItem } from '@/types';

interface DetailModuleProps {
  id: string;
}

const lineItemColumns: TableColumnsType<PaymentLineItem> = [
  { title: 'รายการ', dataIndex: 'description', key: 'description' },
  { title: 'จำนวน', dataIndex: 'quantity', key: 'quantity', align: 'right', width: 100 },
  {
    title: 'ราคาต่อหน่วย',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    align: 'right',
    width: 140,
    render: (v: number) => formatCurrency(v),
  },
  {
    title: 'รวม',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
    width: 140,
    render: (v: number) => formatCurrency(v),
  },
];

const DetailModule = ({ id }: DetailModuleProps) => {
  const router = useRouter();
  const { detail, loadingDetail, fetchDetail, clearDetailData } = usePayments();

  useEffect(() => {
    fetchDetail(id);
    return () => { clearDetailData(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white'>รายละเอียดการชำระเงิน</h1>
          <p className='text-sm text-gray-500 dark:text-slate-400'>
            เลขที่อ้างอิง: {detail?.referenceNo ?? '—'}
          </p>
        </div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push(ROUTES.payments.list)}
        >
          กลับ
        </Button>
      </div>

      {loadingDetail || !detail ? (
        <Card className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
          <Skeleton active paragraph={{ rows: 6 }} />
        </Card>
      ) : (
        <>
          <Card
            title='ข้อมูลการชำระเงิน'
            className='shadow-sm dark:border-slate-700 dark:bg-slate-800'
          >
            <Descriptions bordered column={{ xs: 1, sm: 2 }} size='small'>
              <Descriptions.Item label='เลขที่อ้างอิง'>{detail.referenceNo}</Descriptions.Item>
              <Descriptions.Item label='สถานะ'>
                <StatusBadge status={detail.status} />
              </Descriptions.Item>
              <Descriptions.Item label='ชื่อผู้ชำระ'>{detail.payerName}</Descriptions.Item>
              <Descriptions.Item label='จำนวนเงิน'>{formatCurrency(detail.amount)}</Descriptions.Item>
              <Descriptions.Item label='รายละเอียด' span={2}>{detail.description}</Descriptions.Item>
              {detail.approvedBy && (
                <Descriptions.Item label='อนุมัติโดย'>{detail.approvedBy}</Descriptions.Item>
              )}
              {detail.approvedAt && (
                <Descriptions.Item label='วันที่อนุมัติ'>{formatDateTime(detail.approvedAt)}</Descriptions.Item>
              )}
              {detail.remark && (
                <Descriptions.Item label='หมายเหตุ' span={2}>{detail.remark}</Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          <Card
            title='รายการย่อย'
            className='shadow-sm dark:border-slate-700 dark:bg-slate-800'
          >
            <Table
              columns={lineItemColumns}
              dataSource={detail.items}
              rowKey='id'
              pagination={false}
              size='small'
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3} align='right'>
                    <strong>รวมทั้งสิ้น</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align='right'>
                    <strong>{formatCurrency(detail.amount)}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default DetailModule;
