import PointPresenter from './pointPresenter';
import {render} from '../framework/render';
import EmptyRouteView from '../view/emptyRouteView';
import SorterView from '../view/sorterView';
import TripView from '../view/tripView';

export default class TripPresenter {
  constructor(container, points, filters) {
    this._container = container;
    this._points = points;
    this._handlePointChange = this._handlePointChange.bind(this);
    this.filters = filters;
  }

  resetViews() {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #pointPresenters = new Map();
  #eventListComponent = new TripView();


  init() {
    render(new SorterView(), this._container);
    render(this.#eventListComponent, this._container);

    if (this._points.length === 0) {
      const noRouteMessage = new EmptyRouteView(this.filters.find((filter) => filter.checked).name);
      render(noRouteMessage, this.#eventListComponent.element);
    } else {
      this._points.forEach((point) => {
        const pointPresenter = new PointPresenter(this.#eventListComponent.element, this._handlePointChange, this.resetViews.bind(this));
        pointPresenter.init(point);
        this.#pointPresenters.set(point.id, pointPresenter);
      });
    }
  }

  _handlePointChange(updatedPoint) {
    this._points = this._points.map((point) => (point.id === updatedPoint.id ? updatedPoint : point));
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }
}
