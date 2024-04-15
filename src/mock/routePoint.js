import {generateOffers} from './routeOffer';
import {generateDestination} from './routeDestination';
import {RoutePoint} from '../model/routePoint';


const possibleTypes = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant',];

const generateType = () => possibleTypes[Math.floor(Math.random() * possibleTypes.length)];

const generateDates = () => {
  const daysGap = Math.floor(Math.random() * 10);
  const start = new Date();
  start.setDate(start.getDate() + daysGap);
  const end = new Date(start);
  end.setHours(start.getHours() + Math.floor(Math.random() * 10));
  return {start, end};
};

export const generateRoutePoint = () => {
  const {start, end} = generateDates();
  return new RoutePoint({
    id: crypto.randomUUID(),
    type: generateType(),
    options: generateOffers(),
    favorite: Math.random() > 0.5,
    price: Math.floor(Math.random() * 1000),
    destination: generateDestination(),
    timeFrom: start,
    timeTo: end,
  });
};
