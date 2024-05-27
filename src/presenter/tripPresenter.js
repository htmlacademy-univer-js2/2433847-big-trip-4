import PointPresenter from './pointPresenter';
import {render} from '../framework/render';
import EmptyRouteView from '../view/emptyRouteView';
import SorterView from '../view/sorterView';
import TripView from '../view/tripView';
import {FilterType, SortType} from '../const';

export default class TripPresenter {
  #container;
  #route;
  #filter;

  constructor(container, route, filter) {
    this.#container = container;
    this.#route = route;
    this.#handlePointChange = this.#handlePointChange.bind(this);
    this.#filter = filter;
    this.#filter.addObserver(this.#handleFilterTypeChange.bind(this));
  }


  #pointPresenters = new Map();
  #eventListComponent = new TripView();
  #sorterComponent = new SorterView();
  #currentSortType = SortType.DAY;


  init() {
    this.#initSorter();
    render(this.#eventListComponent, this.#container);
    this.#initPoints();
  }

  #resetViews() {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #initSorter() {
    this.#sorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange.bind(this));
    render(this.#sorterComponent, this.#container);
  }

  #initPoints() {
    const filteredPoints = this.#filterPoints(this.#route.getPoints());
    const sortedPoints = this.#sortPoints(filteredPoints);
    if (sortedPoints.length === 0) {
      const noRouteMessage = new EmptyRouteView(this.#filter.getFilter());
      render(noRouteMessage, this.#eventListComponent.element);
      return;
    }
    sortedPoints.forEach((point) => {
      const pointPresenter = new PointPresenter(this.#eventListComponent.element, this.#handlePointChange, this.#resetViews.bind(this));
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #removePoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleFilterTypeChange() {
    this.#currentSortType = SortType.DAY;
    this.#removePoints();
    this.#initPoints();
    this.#sorterComponent.resetSortType();
  }

  #filterPoints(points) {
    const filterType = this.#filter.getFilter();
    switch (filterType) {
      case FilterType.EVERYTHING:
        return points;
      case FilterType.FUTURE:
        return points.filter((point) => new Date(point.timeFrom) > new Date());
      case FilterType.PRESENT:
        return points.filter((point) => new Date(point.timeTo) < new Date());
      case FilterType.PAST:
        return points.filter((point) => new Date(point.timeTo) < new Date());
      default:
        throw new Error(`Unknown filter type ${filterType}`);
    }
  }

  #sortPoints(points) {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return points.sort((a, b) => new Date(a.timeFrom) - new Date(b.timeFrom));
      case SortType.TIME:
        return points.sort((a, b) => (b.timeTo - b.timeFrom) - (a.timeTo - a.timeFrom));
      case SortType.PRICE:
        return points.sort((a, b) => b.price - a.price);
      default:
        throw new Error(`Unknown filter type ${this.#currentSortType}`);
    }
  }

  #handleSortTypeChange(sortType) {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#pointPresenters.forEach((presenter) => presenter.destroy());
      this.#initPoints();
    }
  }


  #handlePointChange = (updatedPoint) => {
    this.#route.updatePoint(updatedPoint.id, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
}
