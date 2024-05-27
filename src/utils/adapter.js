function adaptToServer(point) {
  const adaptedPoint = {
    ...point,
    'base_price': parseInt(point.price, 10),
    'date_from': new Date(point.timeFrom),
    'date_to': new Date(point.timeTo),
    'is_favorite': point.isFavorite,
    'offers': point.offers.map((offer) => offer.id),
  };
  delete adaptedPoint.price;
  delete adaptedPoint.timeFrom;
  delete adaptedPoint.timeTo;
  delete adaptedPoint.isFavorite;
  return adaptedPoint;
}

function adaptToClient(point) {
  const adaptedPoint = {
    ...point,
    price: point['base_price'],
    timeFrom: point['date_from'],
    timeTo: point['date_to'],
    isFavorite: point['is_favorite'],
    offers: point['offers'],
  };
  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];
  return adaptedPoint;
}

export {adaptToServer, adaptToClient};
