import AbstractView from '../framework/view/abstract-view';
import {routePointTemplate} from '../template/routePointTemplate';


export default class RoutePointView extends AbstractView {
  constructor(routePoint) {
    super();
    this.routePoint = routePoint;
  }

  setClickHandler(handler) {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', handler);
  }

  setFavoriteClickHandler(handler) {
    this.element.querySelector('.event__favorite-btn').addEventListener('click', handler);
  }

  get template() {
    return routePointTemplate(this.routePoint);
  }
}
