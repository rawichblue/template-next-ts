import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType, TablePaginationConfig } from 'antd';

export interface DataTableProps<T> {
  columns: TableColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  total?: number;
  pageSize?: number;
  current?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  rowKey?: string;
}

const DataTable = <T extends object>({
  columns,
  dataSource,
  loading,
  total,
  pageSize = 10,
  current = 1,
  onPageChange,
  rowKey = 'id',
}: DataTableProps<T>) => {
  const pagination: TablePaginationConfig = {
    total,
    pageSize,
    current,
    showSizeChanger: true,
    showTotal: (t) => `ทั้งหมด ${t} รายการ`,
    onChange: onPageChange,
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      scroll={{ x: 'max-content' }}
      size='middle'
      rowClassName='hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors'
    />
  );
};

export default DataTable;
