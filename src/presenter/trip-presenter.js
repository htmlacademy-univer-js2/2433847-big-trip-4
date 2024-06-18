import PointPresenter from './point-presenter';
import {remove, render} from '../framework/render';
import EmptyRouteView from '../view/empty-route-view';
import SorterView from '../view/sorter-view';
import TripView from '../view/trip-view';
import {ModelEvent, POINT_EMPTY, SortType, UserAction} from '../const';
import {sort} from '../utils/sort';
import {filter} from '../utils/filter';
import LoadingView from '../view/loading-view';

export default class TripPresenter {
  #currentSortType = SortType.DAY;
  #container;
  #route;
  #filter;
  #destinationModel;
  #offersModel;
  #pointPresenters = new Map();
  #tripView = new TripView();
  #sorterView = new SorterView();
  #loadingView = new LoadingView();
  #isLoading = true;
  #noPointsBanner;
  #createNewPointPresenter;

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
      case ModelEvent.DELETE:
        this.#pointPresenters.get(data).destroy();
        this.#pointPresenters.delete(data);
        break;
      case ModelEvent.UPDATE:
        this.#initPoints();
        break;
      case ModelEvent.ADD:
        this.#initPoints();
        break;
      case ModelEvent.INIT:
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
        return this.#route.updatePoint(update);
      case UserAction.ADD_POINT:
        return this.#route.addPoint(update).then(() => {
          this.#createNewPointPresenter.destroy();
          this.#createNewPointPresenter = null;
          this.#initPoints();
        });
      case UserAction.DELETE_POINT:
        return this.#route.deletePoint(update.id).then(
          () => {
            if (this.#filterPoints(this.#route.getPoints()).length === 0) {
              this.#initPoints();
            }
          }
        );
    }
  };

  #handleCreateEventClick = () => {
    if (this.#createNewPointPresenter) {
      this.#createNewPointPresenter.destroy();
    }
    this.#createNewPointPresenter = new PointPresenter(this.#tripView.element, this.#handlePointChange, this.#resetViews.bind(this), this.#destinationModel, this.#offersModel);
    this.#createNewPointPresenter.init(POINT_EMPTY, true);
    this.#initPoints();
  };
}
