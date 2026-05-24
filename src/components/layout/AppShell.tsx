'use client';
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useTheme } from '@/contexts/theme';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ConfigProvider, Spin, theme as antdTheme } from 'antd';
import thTH from 'antd/locale/th_TH';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const { isDark } = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-50 dark:bg-slate-900'>
        <div className='flex flex-col items-center gap-4'>
          <Spin size='large' />
          <p className='text-gray-500 dark:text-slate-400'>กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider
      locale={thTH}
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: '#3b82f6', borderRadius: 8 },
      }}
    >
      <div className='flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900'>
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          collapsed={collapsed}
          onCollapse={setCollapsed}
        />

        {/* Main area — offset by sidebar width, adjusts when sidebar collapses */}
        <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
          <AppHeader onMobileMenuClick={() => setMobileOpen(true)} />

          <main className='flex-1 overflow-y-auto'>
            {children}
          </main>

          <AppFooter />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AppShell;
