import EditFormView from '../view/editFormView';
import TripView from '../view/tripView';
import SorterView from '../view/sorterView';
import RoutePointView from '../view/routePointView';
import {render, replace} from '../framework/render';
import EmptyRouteView from '../view/emptyRouteView';

export default class TripPresenter {
  constructor(route, filters) {
    this.route = route;
    this.filters = filters;
  }

  #eventListComponent = new TripView();

  #renderRoutePoint(routePoint) {
    const routePointView = new RoutePointView(routePoint);
    const editFormView = new EditFormView(routePoint);

    let swapToRoutePoint = () => null;
    const handleEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        swapToRoutePoint();
      }
    };
    swapToRoutePoint = () => {
      replace(routePointView, editFormView);
      document.removeEventListener('keydown', handleEscKeyDown);
    };
    const swapToEditForm = () => {
      replace(editFormView, routePointView);
      document.addEventListener('keydown', handleEscKeyDown);
    };

    routePointView.setClickHandler(swapToEditForm);
    editFormView.setSubmitHandler((e) => {
      e.preventDefault();
      swapToRoutePoint();
    });

    editFormView.setClickHandler(swapToRoutePoint);

    render(routePointView, this.#eventListComponent.element);
  }

  init(container) {
    render(new SorterView(), container);
    render(this.#eventListComponent, container);
    if (this.route.getPoints().length === 0) {
      const noRouteMessage = new EmptyRouteView(this.filters.find((filter) => filter.checked).name);
      render(noRouteMessage, this.#eventListComponent.element);
    }
    else {
      for (const routePoint of this.route.getPoints()) {
        this.#renderRoutePoint(routePoint);
      }
    }
  }
}
