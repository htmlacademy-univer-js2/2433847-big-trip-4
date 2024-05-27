import AbstractView from '../framework/view/abstract-view';
import {routePointTemplate} from '../template/routePointTemplate';


export default class RoutePointView extends AbstractView {
  #routePoint;
  #destinations;
  #offers;
  constructor(routePoint, destinations, offers) {
    super();
    this.#routePoint = routePoint;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  setClickHandler(handler) {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', handler);
  }

  setFavoriteClickHandler(handler) {
    this.element.querySelector('.event__favorite-btn').addEventListener('click', handler);
  }

  get template() {
    return routePointTemplate(this.#routePoint, this.#destinations, this.#offers);
  }
}
