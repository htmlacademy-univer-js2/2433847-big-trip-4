export class RoutePoint {
  constructor(data) {
    this.id = data.id;
    this.favorite = data.favorite;
    this.type = data.type;
    this.options = data.options;
    this.destination = data.destination;
    this.price = data.price;
    this.timeFrom = data.timeFrom;
    this.timeTo = data.timeTo;
  }
}

export class RoutePointOption {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.price = data.price;
  }
}

export class Destination {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location;
    this.description = data.description;
    this.pictures = data.pictures;
  }
}
