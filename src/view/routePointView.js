import {getFormattedDate, getFormattedDuration} from '../utils/utils';
import AbstractView from '../framework/view/abstract-view';

const routePointTemplate = (routePoint) => `<li class="trip-events__item">
    <div class="event">
        <time class="event__date" datetime=${routePoint.timeFrom.toISOString()}>${getFormattedDate(routePoint.timeFrom)}</time>
        <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${routePoint.type.toLowerCase() ?? 'taxi'}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${routePoint.type} ${routePoint.destination.name}</h3>
        <div class="event__schedule">
            <p class="event__time">
                <time class="event__start-time" datetime=${routePoint.timeFrom.toISOString()}>${routePoint.timeFrom.toLocaleString([], {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</time>
                &mdash;
                <time class="event__end-time" datetime=${routePoint.timeTo.toISOString()}>${routePoint.timeTo.toLocaleString([], {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</time>
            </p>
            <p class="event__duration">${getFormattedDuration(routePoint.timeFrom, routePoint.timeTo)}</p>
        </div>
        <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${routePoint.price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            <li class="event__offer">
                <span class="event__offer-title">${routePoint.options[0].title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${routePoint.options[0].price}</span>
            </li>
        </ul>
        <button class="event__favorite-btn ${routePoint.favorite ? 'event__favorite-btn--active' : ''}" type="button">
            <span class="visually-hidden">Toggle favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
        </button>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
    </div>
</li>`;

export default class RoutePointView extends AbstractView {
  constructor(routePoint) {
    super();
    this.routePoint = routePoint;
  }

  setClickHandler(handler) {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', handler);
  }

  get template() {
    return routePointTemplate(this.routePoint);
  }
}
