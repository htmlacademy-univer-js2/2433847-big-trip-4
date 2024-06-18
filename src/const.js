const POINT_EMPTY = {
  id: null,
  favorite: false,
  type: 'Flight',
  offers: [
  ],
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  price: 100,
  timeFrom: new Date(),
  timeTo: new Date(new Date().setDate(new Date().getDate() + 1)),
};

const AUTHORIZATION = 'Basic pojsdfxhvpsijfbn';
const ENDPOINT = 'https://21.objects.htmlacademy.pro/big-trip';

const SHAKE_ANIMATION_TIMEOUT = 600;

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past'
};
const SortType = {
  DAY: 'Day',
  TIME: 'Time',
  PRICE: 'Price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const ModelEvent = {
  INIT: 'INIT',
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  DELETE: 'DELETE',
};

export {POINT_EMPTY, AUTHORIZATION, ENDPOINT, SHAKE_ANIMATION_TIMEOUT, FilterType, SortType, UserAction, ModelEvent};
