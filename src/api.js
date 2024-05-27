import ApiService from './framework/api-service';

export default class Api extends ApiService {
  constructor(endPoint, authorization) {
    super(endPoint, authorization);
  }

  getPoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  getDestinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  getOffers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updatePoint(id, data) {
    return this._load({
      url: `points/${id}`,
      method: 'PUT',
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'})
    })
      .then(ApiService.parseResponse);
  }

  createPoint(data) {
    return this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'})
    })
      .then(ApiService.parseResponse);
  }

  deletePoint(id) {
    return this._load({
      url: `points/${id}`,
      method: 'DELETE'
    });
  }
}


