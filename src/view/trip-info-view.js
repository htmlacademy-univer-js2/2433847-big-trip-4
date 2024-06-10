import AbstractView from '../framework/view/abstract-view';
import {TripInfoTemplate} from '../template/trip-info-template';


export default class TripInfoView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return TripInfoTemplate(this.data);
  }
}
