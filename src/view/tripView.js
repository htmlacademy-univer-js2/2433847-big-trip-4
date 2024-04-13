import {createElement} from '../render';

const tripTemplate =
`<ul class="trip-events__list"></ul>`;

export default class TripView {
  getTemplate() {
    return tripTemplate;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
