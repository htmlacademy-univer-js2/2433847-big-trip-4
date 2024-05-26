import PointPresenter from './pointPresenter';
import {render} from '../framework/render';
import EmptyRouteView from '../view/emptyRouteView';
import SorterView from '../view/sorterView';
import TripView from '../view/tripView';

export default class TripPresenter {
  #container;
  #points;
  #filters;
  constructor(container, points, filters) {
    this.#container = container;
    this.#points = points;
    this.#handlePointChange = this.#handlePointChange.bind(this);
    this.#filters = filters;
  }


  #pointPresenters = new Map();
  #eventListComponent = new TripView();
  #currentSortType = 'day';


  init() {
    const sorterView = new SorterView();
    sorterView.setSortTypeChangeHandler(this.#handleSortTypeChange.bind(this));
    render(sorterView, this.#container);
    render(this.#eventListComponent, this.#container);
    this.#sortPoints();
    this.#initPoints();
  }

  #resetViews() {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #initPoints() {
    if (this.#points.length === 0) {
      const noRouteMessage = new EmptyRouteView(this.#filters.find((filter) => filter.checked).name);
      render(noRouteMessage, this.#eventListComponent.element);
    } else {
      this.#points.forEach((point) => {
        const pointPresenter = new PointPresenter(this.#eventListComponent.element, this.#handlePointChange, this.#resetViews.bind(this));
        pointPresenter.init(point);
        this.#pointPresenters.set(point.id, pointPresenter);
      });
    }
  }

  #sortPoints() {
    switch (this.#currentSortType) {
      case 'day':
        this.#points.sort((a, b) => new Date(a.timeFrom) - new Date(b.timeFrom));
        break;
      case 'time':
        this.#points.sort((a, b) => (b.timeTo - b.timeFrom) - (a.timeTo - a.timeFrom));
        break;
      case 'price':
        this.#points.sort((a, b) => b.price - a.price);
        break;
      default:
        throw new Error('Unknown sort type');
    }
  }

  #handleSortTypeChange(sortType) {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#pointPresenters.forEach((presenter) => presenter.destroy());
      this.#sortPoints();
      this.#initPoints();
    }
  }


  #handlePointChange = (updatedPoint) => {
    this.#points = this.#points.map((point) => (point.id === updatedPoint.id ? updatedPoint : point));
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
}
