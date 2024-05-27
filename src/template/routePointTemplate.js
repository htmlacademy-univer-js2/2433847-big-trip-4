import {getFormattedDate, getFormattedDay, getFormattedDuration} from '../utils/utils';

function createOfferListItems(pointOffers, routePoint) {
  return pointOffers.map((offer) => {
    if (routePoint.offers.includes(offer.id)) {
      return `<li class="event__offer">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                    </li>`;
    }
    return '';
  }).join('');
}

export const routePointTemplate = (routePoint, destinations, offers) => {
  const destination = destinations.find((d) => d.id === routePoint.destination);
  const pointOffers = offers.find((o) => o.type === routePoint.type).offers;
  return `<li class="trip-events__item">
      <div class="event">
          <time class="event__date" datetime=${routePoint.timeFrom}>${getFormattedDay(routePoint.timeFrom)}</time>
          <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${routePoint.type.toLowerCase() ?? 'taxi'}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${routePoint.type} ${destination.name}</h3>
          <div class="event__schedule">
              <p class="event__time">
                  <time class="event__start-time" datetime=${routePoint.timeFrom}>${getFormattedDate(routePoint.timeFrom)}</time>
                  &mdash;
                  <time class="event__end-time" datetime=${routePoint.timeTo}>${getFormattedDate(routePoint.timeTo)}</time>
              </p>
              <p class="event__duration">${getFormattedDuration(routePoint.timeFrom, routePoint.timeTo)}</p>
          </div>
          <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${routePoint.price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
              ${createOfferListItems(pointOffers, routePoint)}
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
};
