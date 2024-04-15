import {generateRoutePoint} from '../mock/routePoint';

export default class Route {
  constructor(points) {
    this.points = points || [];
  }

  getPoints() {
    return this.points;
  }

  generatePoints(num) {
    for (let i = 0; i < num; i++) {
      this.points.push(generateRoutePoint());
    }
  }
}
