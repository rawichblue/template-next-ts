import { payments } from './payments';

export const PAGE_CONFIG = {
  ...payments,
};

export const ROUTES = {
  payments: {
    list: '/payments',
    detail: (id: string) => `/payments/${id}`,
    form: '/payments/form',
  },
};
