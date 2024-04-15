import AbstractView from '../framework/view/abstract-view';

const tripTemplate = '<ul class="trip-events__list"></ul>';

export default class TripView extends AbstractView {
  get template() {
    return tripTemplate;
  }
}
