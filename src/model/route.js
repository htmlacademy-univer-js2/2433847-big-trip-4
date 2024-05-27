import {generateRoutePoint} from '../mock/routePoint';

export default class Route {
  constructor(points) {
    this.#points = points ?? [];
  }

  #points = [];

  getPoints() {
    return this.#points;
  }

  setPoints(points) {
    this.#points = points;
  }

  updatePoint(id, newPoint) {
    const index = this.#points.findIndex((point) => point.id === id);
    if (index !== -1) {
      this.#points[index] = newPoint;
    }
  }

  generatePoints(num) {
    for (let i = 0; i < num; i++) {
      this.#points.push(generateRoutePoint());
    }
  }
}
