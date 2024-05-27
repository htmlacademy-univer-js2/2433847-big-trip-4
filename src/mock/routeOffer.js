import {possibleOffers} from '../const';

export const getOffersByType = (type) => possibleOffers.filter((offer) => offer.type.map((t) => t.toLowerCase()).includes(type.toLowerCase())).map((offer) => ({
  id: crypto.randomUUID(),
  title: offer.title,
  price: offer.price,
  checked: false,
}));
