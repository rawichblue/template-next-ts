'use client';
import React, { useState } from 'react';
import { Avatar, Badge, Button, Dropdown, Popover, Switch, Tag, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoonFilled,
  SunFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';
import { useTheme } from '@/contexts/theme';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'success' | 'pending';
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'อนุมัติรายการชำระเงิน', description: 'PAY-2568-0011 ได้รับการอนุมัติแล้ว', time: '5 นาทีที่แล้ว', read: false, type: 'success' },
  { id: '2', title: 'รายการรอดำเนินการ', description: 'PAY-2568-0009 รอการตรวจสอบ', time: '1 ชั่วโมงที่แล้ว', read: false, type: 'pending' },
  { id: '3', title: 'อนุมัติรายการชำระเงิน', description: 'PAY-2568-0008 ได้รับการอนุมัติแล้ว', time: '3 ชั่วโมงที่แล้ว', read: false, type: 'success' },
  { id: '4', title: 'รายการรอดำเนินการ', description: 'PAY-2568-0007 รอการตรวจสอบ', time: '1 วันที่แล้ว', read: true, type: 'pending' },
  { id: '5', title: 'อนุมัติรายการชำระเงิน', description: 'PAY-2568-0006 ได้รับการอนุมัติแล้ว', time: '1 วันที่แล้ว', read: true, type: 'success' },
];

interface AppHeaderProps {
  onMobileMenuClick: () => void;
}

const AppHeader = ({ onMobileMenuClick }: AppHeaderProps) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const initials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() ?? 'U';

  const notificationContent = (
    <div className='w-80'>
      <div className='flex items-center justify-between border-b border-gray-100 pb-2 dark:border-slate-700'>
        <span className='font-semibold text-gray-900 dark:text-white'>การแจ้งเตือน</span>
        {unreadCount > 0 && (
          <Button type='link' size='small' onClick={markAllRead} className='text-xs'>
            อ่านทั้งหมด
          </Button>
        )}
      </div>
      <div className='max-h-72 overflow-y-auto'>
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex gap-3 border-b border-gray-50 px-1 py-3 last:border-0 dark:border-slate-700/50 ${!n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
          >
            <span className={`mt-0.5 text-lg ${n.type === 'success' ? 'text-green-500' : 'text-amber-500'}`}>
              {n.type === 'success' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
            </span>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <p className='text-sm font-medium text-gray-800 dark:text-slate-200'>{n.title}</p>
                {!n.read && <span className='h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0' />}
              </div>
              <p className='text-xs text-gray-500 dark:text-slate-400 truncate'>{n.description}</p>
              <p className='mt-1 text-xs text-gray-400 dark:text-slate-500'>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      {unreadCount === 0 && (
        <p className='py-4 text-center text-xs text-gray-400 dark:text-slate-500'>ไม่มีการแจ้งเตือนใหม่</p>
      )}
    </div>
  );

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'info',
      label: (
        <div className='py-1'>
          <p className='font-medium text-gray-900 dark:text-white'>{user?.name}</p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{user?.role}</p>
          <Tag color='blue' className='mt-1 text-xs'>{user?.email}</Tag>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'โปรไฟล์',
      onClick: () => router.push('/profile'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'ออกจากระบบ',
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-slate-700 dark:bg-slate-800'>
      {/* Left */}
      <div className='flex items-center gap-3'>
        <button
          onClick={onMobileMenuClick}
          className='rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700 lg:hidden'
        >
          <MenuOutlined />
        </button>
      </div>

      {/* Right */}
      <div className='flex items-center gap-2'>
        {/* Dark mode toggle */}
        <Tooltip title={isDark ? 'โหมดสว่าง' : 'โหมดมืด'}>
          <Switch
            checked={isDark}
            onChange={toggleTheme}
            checkedChildren={<MoonFilled />}
            unCheckedChildren={<SunFilled />}
            className='bg-gray-300 dark:bg-blue-600'
          />
        </Tooltip>

        {/* Notifications */}
        <Popover
          content={notificationContent}
          trigger='click'
          placement='bottomRight'
          overlayClassName='notification-popover'
          overlayInnerStyle={{ padding: '12px 8px' }}
        >
          <Tooltip title='การแจ้งเตือน'>
            <Badge count={unreadCount} size='small' offset={[-2, 2]}>
              <button className='rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-700'>
                <BellOutlined />
              </button>
            </Badge>
          </Tooltip>
        </Popover>

        {/* User menu */}
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement='bottomRight'>
          <button className='flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-slate-700'>
            <Avatar size={32} className='bg-blue-500 text-sm font-bold select-none'>
              {initials}
            </Avatar>
            <span className='hidden text-sm font-medium text-gray-700 dark:text-slate-300 sm:block'>
              {user?.name}
            </span>
          </button>
        </Dropdown>
      </div>
    </header>
  );
};

export default AppHeader;
