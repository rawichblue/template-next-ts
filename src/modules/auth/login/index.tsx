'use client';
import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';
import { ROUTES } from '@/constants/configPage';

interface LoginForm {
  email: string;
  password: string;
}

const LoginModule = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleFinish = async (values: LoginForm) => {
    setLoading(true);
    const result = await login(values.email, values.password);
    setLoading(false);
    if (result.success) {
      router.push(ROUTES.payments.list);
    } else {
      message.error(result.message ?? 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* Left — Branding */}
      <div className='hidden flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-12 lg:flex lg:w-1/2'>
        <div className='max-w-sm text-center text-white'>
          <div className='mb-6 text-6xl font-black tracking-tight'>
            <span className='text-white'>Next</span>
            <span className='text-blue-200'>Template</span>
          </div>
          <p className='text-xl font-light leading-relaxed text-blue-100'>
            ระบบบริหารจัดการการเงิน
          </p>
          <p className='mt-3 text-sm text-blue-200'>
            ออกแบบด้วย Next.js 14 · Redux Toolkit · Ant Design
          </p>

          {/* Feature list */}
          <div className='mt-10 space-y-3 text-left'>
            {[
              'Feature-based architecture',
              'Service layer separation',
              'Type-safe Redux Toolkit',
              'Dark / Light theme',
            ].map((f) => (
              <div key={f} className='flex items-center gap-3 text-sm text-blue-100'>
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white'>
                  ✓
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className='flex flex-1 flex-col items-center justify-center bg-white px-6 dark:bg-slate-900'>
        <div className='w-full max-w-sm'>
          {/* Mobile logo */}
          <div className='mb-8 text-center lg:hidden'>
            <span className='text-3xl font-black'>
              <span className='text-blue-600'>Next</span>Template
            </span>
          </div>

          <h2 className='mb-1 text-2xl font-bold text-gray-900 dark:text-white'>ยินดีต้อนรับ</h2>
          <p className='mb-8 text-sm text-gray-500 dark:text-slate-400'>
            กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
          </p>

          <Form layout='vertical' onFinish={handleFinish} size='large'>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'กรุณากรอกอีเมล' },
                { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' },
              ]}
            >
              <Input prefix={<MailOutlined className='text-gray-400' />} placeholder='อีเมล' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
            >
              <Input.Password
                prefix={<LockOutlined className='text-gray-400' />}
                placeholder='รหัสผ่าน'
              />
            </Form.Item>

            <Form.Item className='mb-0'>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                block
                className='h-11 text-base font-medium'
              >
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>

          {/* Demo credentials */}
          <div className='mt-6 rounded-lg bg-blue-50 p-4 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'>
            <p className='font-semibold'>บัญชีทดสอบ</p>
            <p className='mt-1'>อีเมล: admin@example.com</p>
            <p>รหัสผ่าน: 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModule;
