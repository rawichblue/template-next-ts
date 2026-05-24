'use client';
import React from 'react';
import { Card, Form, Input, Button, Divider, Switch } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

export default function SettingsPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>ตั้งค่าระบบ</h1>
        <p className='text-sm text-gray-500 dark:text-slate-400'>จัดการการตั้งค่าทั่วไปของระบบ</p>
      </div>

      <Card title='ทั่วไป' className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
        <Form layout='vertical' className='max-w-lg'>
          <Form.Item label='ชื่อระบบ'>
            <Input defaultValue='NextTemplate' />
          </Form.Item>
          <Form.Item label='อีเมลผู้ดูแล'>
            <Input defaultValue='admin@example.com' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' icon={<SaveOutlined />}>บันทึก</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title='การแจ้งเตือน' className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
        <div className='flex flex-col gap-4'>
          {[
            { label: 'แจ้งเตือนเมื่อมีรายการใหม่', defaultChecked: true },
            { label: 'แจ้งเตือนเมื่ออนุมัติรายการ', defaultChecked: true },
            { label: 'แจ้งเตือนทางอีเมล', defaultChecked: false },
          ].map((item) => (
            <div key={item.label} className='flex items-center justify-between'>
              <span className='text-sm text-gray-700 dark:text-slate-300'>{item.label}</span>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
        <Divider />
        <Button type='primary' icon={<SaveOutlined />}>บันทึก</Button>
      </Card>
    </div>
  );
}
