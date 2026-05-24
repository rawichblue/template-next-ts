import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import StoreProvider from '@/store/provider';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider } from '@/contexts/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextTemplate',
  description: 'Next.js 14 Enterprise Template',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='th' suppressHydrationWarning>
      <body className='antialiased'>
        <AntdRegistry>
          <StoreProvider>
            <ThemeProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </ThemeProvider>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
