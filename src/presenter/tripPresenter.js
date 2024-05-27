import PointPresenter from './pointPresenter';
import {remove, render} from '../framework/render';
import EmptyRouteView from '../view/emptyRouteView';
import SorterView from '../view/sorterView';
import TripView from '../view/tripView';
import {POINT_EMPTY, SortType, UserAction} from '../const';
import {sort} from '../utils/sort';
import {filter} from '../utils/filter';
import LoadingView from '../view/loadingView';

export default class TripPresenter {
  #container;
  #route;
  #filter;
  #destinationModel;
  #offersModel;

  constructor(container, route, filterModel, destinationModel, offersModel) {
    this.#container = container;
    this.#route = route;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handlePointChange = this.#handlePointChange.bind(this);
    this.#filter = filterModel;
    this.#filter.addObserver(this.#handleFilterTypeChange.bind(this));
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#handleCreateEventClick);
    this.#route.addObserver(this.#handleModelEvent);
  }

  #pointPresenters = new Map();
  #tripView = new TripView();
  #sorterView = new SorterView();
  #loadingView = new LoadingView();
  #isLoading = true;
  #currentSortType = SortType.DAY;
  #noPointsBanner;
  #createNewPointPresenter;

  init() {
    this.#sorterView.setSortTypeChangeHandler(this.#handleSortTypeChange.bind(this));
    render(this.#sorterView, this.#container);
    render(this.#tripView, this.#container);
  }

  #resetViews() {
    if (this.#createNewPointPresenter) {
      this.#createNewPointPresenter.destroy();
      this.#createNewPointPresenter = null;
    }
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #initPoints() {
    if (this.#isLoading) {
      render(this.#loadingView, this.#tripView.element);
      return;
    }
    this.#removePoints();
    const filteredPoints = this.#filterPoints(this.#route.getPoints());
    const sortedPoints = this.#sortPoints(filteredPoints);
    if (sortedPoints.length === 0 && !this.#createNewPointPresenter) {
      this.#noPointsBanner = new EmptyRouteView(this.#filter.getFilter());
      render(this.#noPointsBanner, this.#tripView.element);
      return;
    }
    sortedPoints.forEach((point) => {
      const pointPresenter = new PointPresenter(this.#tripView.element, this.#handlePointChange, this.#resetViews.bind(this), this.#destinationModel, this.#offersModel);
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #handleModelEvent = async (updateType, data) => {
    switch (updateType) {
      case 'points':
        this.#initPoints();
        break;
      case 'update':
        this.#pointPresenters.get(data.id).init(data);
        break;
      case 'init':
        this.#isLoading = false;
        this.#initPoints();
        break;
    }
  };

  #removePoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    if (this.#noPointsBanner) {
      remove(this.#noPointsBanner);
    }
  }

  #handleFilterTypeChange() {
    this.#currentSortType = SortType.DAY;
    this.#sorterView.resetSortType();
    this.#initPoints();
  }

  #filterPoints(points) {
    return filter[this.#filter.getFilter()](points);
  }

  #sortPoints(points) {
    return sort[this.#currentSortType](points);
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
        this.#route.updatePoint(update);
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
    this.#createNewPointPresenter = new PointPresenter(this.#tripView.element, this.#handlePointChange, this.#resetViews.bind(this));
    this.#createNewPointPresenter.init(POINT_EMPTY, true);
    this.#initPoints();
  };
}
