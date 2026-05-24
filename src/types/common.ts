export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
}

export interface PaginationRequest {
  page: number;
  size: number;
}

export interface ApiListResponse<T> {
  content: T[];
  totalElements: number;
}

export interface CodeName {
  code: string;
  name: string;
}

export type SortOrder = 'ascend' | 'descend' | null;

export interface TableSorter {
  field: string;
  order: SortOrder;
}
