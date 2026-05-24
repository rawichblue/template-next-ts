'use client';
import React from 'react';
import { Button, Card, Form, Input, Select } from 'antd';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { usePayments } from '@/hooks';
import { PaymentMethod, PaymentStatus } from '@/types';

const STATUS_OPTIONS = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'รอดำเนินการ', value: PaymentStatus.PENDING },
  { label: 'อนุมัติแล้ว', value: PaymentStatus.APPROVED },
  { label: 'ปฏิเสธ', value: PaymentStatus.REJECTED },
  { label: 'ยกเลิก', value: PaymentStatus.CANCELLED },
];

const METHOD_OPTIONS = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'เงินสด', value: PaymentMethod.CASH },
  { label: 'โอนเงิน', value: PaymentMethod.TRANSFER },
  { label: 'เช็ค', value: PaymentMethod.CHEQUE },
];

const EMPTY_FILTER = { referenceNo: '', payerName: '', status: '', method: '' };

const CardFilter = () => {
  const [form] = Form.useForm();
  const { fetchList, reset } = usePayments();

  const handleSearch = (values: typeof EMPTY_FILTER) => {
    fetchList({ ...values, page: 0 });
  };

  const handleReset = () => {
    form.resetFields();
    form.setFieldsValue(EMPTY_FILTER);
    reset();
    // Pass explicit empty filter to avoid stale-closure merge
    fetchList({ ...EMPTY_FILTER, page: 0 });
  };

  return (
    <Card
      title='ค้นหา'
      className='shadow-sm dark:border-slate-700 dark:bg-slate-800'
    >
      <Form form={form} initialValues={EMPTY_FILTER} onFinish={handleSearch} layout='vertical'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Form.Item label='เลขที่อ้างอิง' name='referenceNo' className='mb-0'>
            <Input placeholder='PAY-2568-XXXX' allowClear />
          </Form.Item>
          <Form.Item label='ชื่อผู้ชำระ' name='payerName' className='mb-0'>
            <Input placeholder='ระบุชื่อผู้ชำระ' allowClear />
          </Form.Item>
          <Form.Item label='สถานะ' name='status' className='mb-0'>
            <Select options={STATUS_OPTIONS} />
          </Form.Item>
          <Form.Item label='วิธีชำระ' name='method' className='mb-0'>
            <Select options={METHOD_OPTIONS} />
          </Form.Item>
        </div>
        <div className='mt-4 flex justify-end gap-2'>
          <Button icon={<UndoOutlined />} onClick={handleReset}>
            ล้างค่า
          </Button>
          <Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
            ค้นหา
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CardFilter;
