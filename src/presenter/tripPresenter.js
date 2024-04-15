import {render} from '../render.js';
import EditFormView from '../view/editFormView';
import TripView from '../view/tripView';
import SorterView from '../view/sorterView';
import RoutePointView from '../view/routePointView';

export default class TripPresenter {
  constructor(route) {
    this.route = route;
  }

  eventListComponent = new TripView();

  init(container) {
    render(new SorterView(), container);
    render(this.eventListComponent, container);
    render(new EditFormView(this.route.getPoints()[0]), this.eventListComponent.getElement());
    for (const routePoint of this.route.getPoints().slice(1)) {
      render(new RoutePointView(routePoint), this.eventListComponent.getElement());
    }
  }
}
