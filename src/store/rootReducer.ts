import { commonReducer } from './slices/common';
import { paymentsReducer } from './slices/payments';

const rootReducer = {
  common: commonReducer,
  payments: paymentsReducer,
};

export default rootReducer;
