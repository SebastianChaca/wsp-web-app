import dayjs from 'dayjs';
import es from 'dayjs/locale/es';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.locale(es);

export const getHour = (date: string): string => dayjs(date).format('HH:mm');

export const formatDateSideBar = (date: string) => {
  const currentDate = dayjs();
  const formattedDate = dayjs(date);

  // Check if the date is today
  if (formattedDate.isSame(currentDate, 'day')) {
    return formattedDate.format('HH:mm');
  }

  // Check if the date is from yesterday
  if (formattedDate.isSame(currentDate.subtract(1, 'day'), 'day')) {
    return 'Ayer';
  }

  // Check if the date is within the past week
  const oneWeekAgo = currentDate.subtract(1, 'week');

  if (
    formattedDate.isAfter(oneWeekAgo) &&
    formattedDate.isBefore(currentDate)
  ) {
    return formattedDate.format('dddd');
  }

  return formattedDate.format('D/M/YYYY');
};

export const getLastActive = (date: string): string => {
  const day = dayjs(date).format('d');
  const dayToName = dayjs.weekdays()[parseInt(day, 10)];
  const hour = dayjs(date).format('HH:mm');

  return `ult vez ${dayToName} a la(s) ${hour}`;
};
