export const formatCurrency = (value: number, currency = 'THB'): string => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('th-TH').format(value);
};
