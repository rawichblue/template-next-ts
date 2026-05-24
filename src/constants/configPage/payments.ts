export const payments = {
  payments: {
    root: {
      url: '#',
      text: 'การเงิน',
      breadcrumb: ['root'],
    },
    paymentList: {
      url: '/payments',
      text: 'รายการชำระเงิน',
      breadcrumb: ['root', 'paymentList'],
    },
    paymentDetail: {
      url: '/payments/[id]',
      text: 'รายละเอียดการชำระเงิน',
      breadcrumb: ['root', 'paymentList', 'paymentDetail'],
    },
    paymentForm: {
      url: '/payments/form',
      text: 'บันทึกการชำระเงิน',
      breadcrumb: ['root', 'paymentList', 'paymentForm'],
    },
  },
};
