import PointPresenter from './pointPresenter';
import {remove, render} from '../framework/render';
import EmptyRouteView from '../view/emptyRouteView';
import SorterView from '../view/sorterView';
import TripView from '../view/tripView';
import {FilterType, POINT_EMPTY, SortType, UserAction} from '../const';

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
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#handleCreateEventClick);
  }

  #pointPresenters = new Map();
  #eventListComponent = new TripView();
  #sorterComponent = new SorterView();
  #currentSortType = SortType.DAY;
  #noPointsBanner;
  #createNewPointPresenter;

  init() {
    this.#sorterComponent.setSortTypeChangeHandler(this.#handleSortTypeChange.bind(this));
    render(this.#sorterComponent, this.#container);
    render(this.#eventListComponent, this.#container);
    this.#initPoints();
  }

  #resetViews() {
    if (this.#createNewPointPresenter) {
      this.#createNewPointPresenter.destroy();
      this.#createNewPointPresenter = null;
    }
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #initPoints() {
    this.#removePoints();
    const filteredPoints = this.#filterPoints(this.#route.getPoints());
    const sortedPoints = this.#sortPoints(filteredPoints);
    if (sortedPoints.length === 0 && !this.#createNewPointPresenter) {
      this.#noPointsBanner = new EmptyRouteView(this.#filter.getFilter());
      render(this.#noPointsBanner, this.#eventListComponent.element);
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
    if (this.#noPointsBanner) {
      remove(this.#noPointsBanner);
    }
  }

  #handleFilterTypeChange() {
    this.#currentSortType = SortType.DAY;
    this.#sorterComponent.resetSortType();
    this.#initPoints();
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


  #handlePointChange = (actionType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#route.updatePoint(update.id, update);
        this.#pointPresenters.get(update.id).init(update);
        break;
      case UserAction.ADD_POINT:
        this.#createNewPointPresenter.destroy();
        this.#createNewPointPresenter = null;
        this.#route.addPoint(update);
        this.#initPoints();
        break;
      case UserAction.DELETE_POINT:
        this.#route.deletePoint(update.id);
        this.#pointPresenters.get(update.id).destroy();
        this.#pointPresenters.delete(update.id);
        break;
    }
  };

  #handleCreateEventClick = () => {
    if (this.#createNewPointPresenter) {
      this.#createNewPointPresenter.destroy();
    }
    this.#createNewPointPresenter = new PointPresenter(this.#eventListComponent.element, this.#handlePointChange, this.#resetViews.bind(this));
    this.#createNewPointPresenter.init(POINT_EMPTY, true);
    this.#initPoints();
  };
}
