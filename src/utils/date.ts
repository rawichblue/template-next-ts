import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);
dayjs.locale('th');

export const formatDate = (date: string | Date, format = 'DD/MM/YYYY'): string => {
  if (!date) return '-';
  return dayjs(date).format(format);
};

export const formatDateThai = (date: string | Date): string => {
  if (!date) return '-';
  return dayjs(date).format('DD/MM/BBBB');
};

export const formatDateTime = (date: string | Date): string => {
  if (!date) return '-';
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};
