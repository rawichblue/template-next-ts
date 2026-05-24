import React from 'react';
import { Card } from 'antd';

export interface FilterCardProps {
  children: React.ReactNode;
  title?: string;
}

const FilterCard = ({ children, title = 'ค้นหา' }: FilterCardProps) => {
  return (
    <Card title={title} className='shadow-sm'>
      {children}
    </Card>
  );
};

export default FilterCard;
