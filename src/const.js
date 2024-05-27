export const POINT_EMPTY = {
  id: null,
  favorite: false,
  type: 'Taxi',
  offers: [
  ],
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  price: 0,
  timeFrom: new Date(),
  timeTo: new Date(),
};

export const AUTHORIZATION = 'Basic pojsdfxhvpsijfbn';
export const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past'
};
export const SortType = {
  DAY: 'Day',
  TIME: 'Time',
  PRICE: 'Price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const ModelEvent = {
  INIT: 'INIT',
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  DELETE: 'DELETE',
};
