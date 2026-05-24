import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

const PageHeader = ({ title, breadcrumbs, actions }: PageHeaderProps) => {
  return (
    <div className='flex items-start justify-between mb-4'>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb
            className='mb-1'
            items={breadcrumbs.map((b) => ({
              title: b.href ? <Link href={b.href}>{b.label}</Link> : b.label,
            }))}
          />
        )}
        <h1 className='text-xl font-semibold text-gray-800'>{title}</h1>
      </div>
      {actions && <div className='flex gap-2'>{actions}</div>}
    </div>
  );
};

export default PageHeader;
