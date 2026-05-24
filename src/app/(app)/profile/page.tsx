'use client';
import React from 'react';
import { Avatar, Button, Card, Descriptions, Tag } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/auth';

export default function ProfilePage() {
  const { user } = useAuth();

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() ?? 'U';

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>โปรไฟล์</h1>
        <p className='text-sm text-gray-500 dark:text-slate-400'>ข้อมูลบัญชีผู้ใช้งาน</p>
      </div>

      <Card className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
        <div className='flex flex-col items-center gap-4 pb-6 sm:flex-row sm:items-start'>
          <Avatar size={80} className='bg-blue-500 text-2xl font-bold'>
            {initials}
          </Avatar>
          <div className='flex-1 text-center sm:text-left'>
            <h2 className='text-lg font-bold text-gray-900 dark:text-white'>{user?.name}</h2>
            <p className='text-sm text-gray-500 dark:text-slate-400'>{user?.email}</p>
            <Tag color='blue' className='mt-1'>{user?.role}</Tag>
          </div>
          <Button icon={<EditOutlined />}>แก้ไขข้อมูล</Button>
        </div>

        <Descriptions bordered column={{ xs: 1, sm: 2 }} size='small'>
          <Descriptions.Item label='ชื่อ-นามสกุล'>{user?.name}</Descriptions.Item>
          <Descriptions.Item label='อีเมล'>{user?.email}</Descriptions.Item>
          <Descriptions.Item label='บทบาท'>{user?.role}</Descriptions.Item>
          <Descriptions.Item label='รหัสผู้ใช้'>{user?.id}</Descriptions.Item>
          <Descriptions.Item label='สถานะบัญชี'>
            <Tag color='green'>ใช้งานอยู่</Tag>
          </Descriptions.Item>
          <Descriptions.Item label='เข้าสู่ระบบล่าสุด'>
            {new Date().toLocaleDateString('th-TH', { dateStyle: 'long' })}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title='เปลี่ยนรหัสผ่าน' className='shadow-sm dark:border-slate-700 dark:bg-slate-800'>
        <p className='text-sm text-gray-500 dark:text-slate-400'>
          ฟีเจอร์นี้จะเปิดใช้งานในเวอร์ชันถัดไป
        </p>
      </Card>
    </div>
  );
}
