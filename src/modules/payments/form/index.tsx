'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Form, Input, InputNumber, message, Select } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { ConfirmModal } from '@/components/common';
import { usePayments } from '@/hooks';
import { submitPaymentForm } from '@/store/slices/payments';
import { ROUTES } from '@/constants/configPage';
import { CreatePaymentRequest, PaymentMethod } from '@/types';

const METHOD_OPTIONS = [
  { label: 'เงินสด', value: PaymentMethod.CASH },
  { label: 'โอนเงิน', value: PaymentMethod.TRANSFER },
  { label: 'เช็ค', value: PaymentMethod.CHEQUE },
];

const FormModule = () => {
  const router = useRouter();
  const [form] = Form.useForm<CreatePaymentRequest>();
  const { loadingSubmit, submitForm } = usePayments();
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<CreatePaymentRequest | null>(null);

  const handleFinish = (values: CreatePaymentRequest) => {
    setPendingValues(values);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingValues) return;
    const result = await submitForm(pendingValues);
    if (submitPaymentForm.fulfilled.match(result)) {
      message.success('บันทึกรายการสำเร็จ');
      router.push(ROUTES.payments.list);
    } else {
      message.error('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
    setModalOpen(false);
  };

  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white'>บันทึกการชำระเงิน</h1>
          <p className='text-sm text-gray-500 dark:text-slate-400'>กรอกข้อมูลการชำระเงินใหม่</p>
        </div>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push(ROUTES.payments.list)}
        >
          กลับ
        </Button>
      </div>

      <Card
        title='ข้อมูลการชำระเงิน'
        className='shadow-sm dark:border-slate-700 dark:bg-slate-800'
      >
        <Form form={form} layout='vertical' onFinish={handleFinish}>
          <div className='grid grid-cols-1 gap-x-6 sm:grid-cols-2'>
            <Form.Item
              label='ชื่อผู้ชำระ'
              name='payerName'
              rules={[{ required: true, message: 'กรุณาระบุชื่อผู้ชำระ' }]}
            >
              <Input placeholder='ระบุชื่อผู้ชำระ' />
            </Form.Item>

            <Form.Item
              label='วิธีชำระ'
              name='method'
              rules={[{ required: true, message: 'กรุณาเลือกวิธีชำระ' }]}
            >
              <Select options={METHOD_OPTIONS} placeholder='เลือกวิธีชำระ' />
            </Form.Item>

            <Form.Item
              label='จำนวนเงิน (บาท)'
              name='amount'
              rules={[{ required: true, message: 'กรุณาระบุจำนวนเงิน' }]}
            >
              <InputNumber
                className='w-full'
                min={0}
                precision={2}
                formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                placeholder='0.00'
              />
            </Form.Item>

            <Form.Item label='หมายเหตุ' name='remark'>
              <Input placeholder='ระบุหมายเหตุ (ถ้ามี)' />
            </Form.Item>

            <Form.Item
              label='รายละเอียด'
              name='description'
              className='sm:col-span-2'
              rules={[{ required: true, message: 'กรุณาระบุรายละเอียด' }]}
            >
              <Input.TextArea rows={3} placeholder='ระบุรายละเอียดการชำระเงิน' />
            </Form.Item>
          </div>

          <div className='flex justify-end gap-2 border-t border-gray-100 pt-4 dark:border-slate-700'>
            <Button onClick={() => router.push(ROUTES.payments.list)}>ยกเลิก</Button>
            <Button type='primary' htmlType='submit' icon={<SaveOutlined />}>
              บันทึก
            </Button>
          </div>
        </Form>
      </Card>

      <ConfirmModal
        open={modalOpen}
        confirmLoading={loadingSubmit}
        onOk={handleConfirm}
        onCancel={() => setModalOpen(false)}
        description='คุณต้องการบันทึกรายการชำระเงินนี้ใช่หรือไม่?'
      />
    </div>
  );
};

export default FormModule;
