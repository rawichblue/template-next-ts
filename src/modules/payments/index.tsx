'use client';
import React from 'react';
import CardFilter from './CardFilter';
import CardTable from './CardTable';
import StatsCards from './StatsCards';

const PaymentsModule = () => {
  return (
    <div className='flex flex-col gap-4 p-6'>
      <div>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>รายการชำระเงิน</h1>
        <p className='text-sm text-gray-500 dark:text-slate-400'>
          จัดการและติดตามรายการชำระเงินทั้งหมด
        </p>
      </div>
      <StatsCards />
      <CardFilter />
      <CardTable />
    </div>
  );
};

export default PaymentsModule;
