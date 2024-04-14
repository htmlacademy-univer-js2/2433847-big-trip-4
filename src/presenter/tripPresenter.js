import { render } from '../render.js';
import EditFormView from '../view/editFormView';
import TripView from '../view/tripView';
import SorterView from '../view/sorterView';
import RoutePointView from '../view/routePointView';

export default class TripPresenter {
  eventListComponent = new TripView();

  init(container) {
    render(new SorterView(), container);
    render(this.eventListComponent, container);
    render(new EditFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), this.eventListComponent.getElement());
    }
  }
}
