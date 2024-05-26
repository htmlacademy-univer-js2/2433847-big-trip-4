import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getFormattedDuration = (start, end) => {
  const dur = dayjs.duration(dayjs(end).diff(dayjs(start)));
  const days = dur.days();
  const hours = dur.hours();
  const minutes = dur.minutes();

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes}M`;
  }
};

export const getFormattedDate = (date) => dayjs(date).format('DD.MM HH:mm');

export const getFormattedDay = (date) => dayjs(date).format('MMM DD').toUpperCase();
