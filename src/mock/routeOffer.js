const possibleOffers = [{title: 'Add luggage', price: 50}, {title: 'Switch to comfort', price: 80}, {
  title: 'Add meal', price: 15
}, {title: 'Choose seats', price: 5}, {title: 'Travel by train', price: 40},];

export const generateOffers = () => {
  const offers = [];
  for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
    offers.push(possibleOffers[Math.floor(Math.random() * possibleOffers.length)]);
    offers[i].id = crypto.randomUUID();
  }
  return offers;
};
