'use client';
import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

export default function ReportsPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>รายงานสรุป</h1>
        <p className='text-sm text-gray-500 dark:text-slate-400'>ภาพรวมสถิติการชำระเงิน</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
            <Statistic
              title='ยอดรวมทั้งปี'
              value={1097250}
              prefix={<DollarOutlined />}
              suffix='บาท'
              valueStyle={{ color: '#3b82f6' }}
              formatter={(v) => Number(v).toLocaleString('th-TH')}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
            <Statistic
              title='รายการอนุมัติ'
              value={7}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#22c55e' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
            <Statistic
              title='รายการปฏิเสธ'
              value={2}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ef4444' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
            <Statistic
              title='รายการทั้งหมด'
              value={11}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#f59e0b' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title='สรุปรายเดือน'
        className='shadow-sm dark:border-slate-700 dark:bg-slate-800'
      >
        <div className='flex h-48 items-center justify-center text-gray-400 dark:text-slate-500'>
          <div className='text-center'>
            <FileTextOutlined className='mb-2 text-4xl' />
            <p className='text-sm'>กราฟรายงานจะแสดงที่นี่</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
