import dayjs from 'dayjs';

export const filter = {
  Everything: (p) => p,
  Future: (p) => p.filter((point) => dayjs().isBefore(point.timeFrom)),
  Present: (p) => p.filter((point) => (dayjs().isAfter(point.timeFrom) && dayjs().isBefore(point.timeTo))),
  Past: (p) => p.filter((point) => dayjs().isAfter(point.timeTo))
};
