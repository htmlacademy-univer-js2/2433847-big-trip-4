function adaptToServer(point) {
  const adaptedPoint = {
    ...point,
    'base_price': parseInt(point.price, 10),
    'date_from': new Date(point.timeFrom).toISOString(),
    'date_to': new Date(point.timeTo).toISOString(),
    'is_favorite': point.favorite,
    'type': point.type.toLowerCase(),
  };
  delete adaptedPoint.id;
  delete adaptedPoint.price;
  delete adaptedPoint.timeFrom;
  delete adaptedPoint.timeTo;
  delete adaptedPoint.favorite;
  return adaptedPoint;
}

function adaptToClient(point) {
  const adaptedPoint = {
    ...point,
    price: point['base_price'],
    timeFrom: point['date_from'],
    timeTo: point['date_to'],
    favorite: point['is_favorite'],
  };
  delete adaptedPoint['base_price'];
  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['is_favorite'];
  return adaptedPoint;
}

export {adaptToServer, adaptToClient};
