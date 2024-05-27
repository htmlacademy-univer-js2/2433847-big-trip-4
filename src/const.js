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


export const possibleTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant',];

export const possibleOffers = [
  {
    title: 'Add luggage',
    price: 50,
    type: ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant']
  },
  {
    title: 'Switch to comfort',
    price: 80,
    type: ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant']
  },
  {title: 'Add meal', price: 15, type: ['Flight', 'Train', 'Ship', 'Check-in', 'Sightseeing', 'Restaurant']},
  {title: 'Choose seats', price: 5, type: ['Flight', 'Train', 'Bus', 'Check-in', 'Sightseeing', 'Restaurant']},
  {title: 'Travel by train', price: 40, type: ['Train', 'Check-in', 'Sightseeing', 'Restaurant']},
];
export const cities = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'London', 'Moscow', 'New York', 'Tokyo', 'Sydney', 'Rio de Janeiro', 'Cape Town', 'Dubai',];


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
