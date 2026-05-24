'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CreditCardOutlined,
  FileTextOutlined,
  LeftOutlined,
  MenuOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import clsx from 'clsx';

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'payments', label: 'รายการชำระเงิน', icon: <CreditCardOutlined />, href: '/payments' },
  { key: 'reports', label: 'รายงาน', icon: <FileTextOutlined />, href: '/reports' },
  { key: 'settings', label: 'ตั้งค่า', icon: <SettingOutlined />, href: '/settings' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
}

const Sidebar = ({ mobileOpen, onMobileClose, collapsed, onCollapse }: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/payments') return pathname === '/payments' || pathname.startsWith('/payments/');
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-20 bg-black/50 lg:hidden'
          onClick={onMobileClose}
        />
      )}

      <aside
        className={clsx(
          'fixed left-0 top-0 z-30 flex h-full flex-col bg-slate-900 text-white transition-all duration-300',
          collapsed ? 'w-16' : 'w-60',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Logo */}
        <div className='flex h-16 items-center justify-between border-b border-slate-700 px-4'>
          {!collapsed && (
            <span className='text-lg font-bold tracking-wide text-white'>
              <span className='text-blue-400'>Next</span>Template
            </span>
          )}
          <button
            onClick={() => onCollapse(!collapsed)}
            className='hidden rounded-md p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white lg:block'
          >
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </button>
          <button
            onClick={onMobileClose}
            className='rounded-md p-1.5 text-slate-400 hover:bg-slate-700 hover:text-white lg:hidden'
          >
            <MenuOutlined />
          </button>
        </div>

        {/* Nav */}
        <nav className='flex-1 overflow-y-auto py-4'>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const content = (
              <Link
                key={item.key}
                href={item.href}
                onClick={onMobileClose}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white',
                  collapsed && 'justify-center px-0',
                )}
              >
                <span className='text-base'>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
            return collapsed ? (
              <Tooltip key={item.key} title={item.label} placement='right'>
                {content}
              </Tooltip>
            ) : (
              content
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className='border-t border-slate-700 px-4 py-3 text-xs text-slate-500'>
            v1.0.0 • Template Next
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
