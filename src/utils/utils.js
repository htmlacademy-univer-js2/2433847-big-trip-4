export const getFormattedDuration = (timeFrom, timeTo) => {
  const duration = timeTo - timeFrom;
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  let result = '';
  if (days > 0) {
    result += `${days}D `;
    result += `${hours}H `;
  } else if (hours > 0) {
    result += `${hours}H `;
  }
  result += `${minutes}M`;
  return result;
};

export const getFormattedDate = (date) => `${date.toLocaleString('default', { month: 'short' }).toUpperCase()} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

export const getFormattedDay = (date) => `${date.toLocaleString('default', { month: 'short' }).toUpperCase()} ${date.getDate()}`;
