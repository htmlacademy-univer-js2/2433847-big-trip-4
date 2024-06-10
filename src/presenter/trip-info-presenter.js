import TripInfoView from '../view/trip-info-view';
import {render, RenderPosition, replace} from '../framework/render';
import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #route;
  #tripInfoComponent;
  #tripInfoContainer;
  #destinationModel;
  constructor(tripInfoContainer, routeModel, destinationModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#route = routeModel;
    this.#destinationModel = destinationModel;
    this.#tripInfoComponent = null;

    this.#handleModelEvent = this.#handleModelEvent.bind(this);
    this.#route.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#tripInfoComponent = new TripInfoView(this.#getTripInfo());
    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #updateTripInfo() {
    const oldInfo = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(this.#getTripInfo());
    replace(this.#tripInfoComponent, oldInfo);
  }

  #handleModelEvent = async () => {
    this.#updateTripInfo();
  };

  #getTripInfo() {
    const routePoints = this.#route.getPoints();
    return {
      title: this.#getRouteTitle(routePoints),
      dates: this.#getRouteDate(routePoints),
      total: this.#getRouteCost(routePoints),
    };
  }

  #getRouteTitle(routePoints) {
    if (routePoints.length === 0) {
      return '';
    }
    const firstPoint = routePoints[0];
    const lastPoint = routePoints[routePoints.length - 1];
    const destinations = this.#destinationModel.destinations;
    const firstDestination = destinations.find((destination) => destination.id === firstPoint.destination);
    const lastDestination = destinations.find((destination) => destination.id === lastPoint.destination);
    if (routePoints.length > 3) {
      return `${firstDestination.name} —...— ${lastDestination.name}`;
    } else {
      return `${firstDestination.name} — ${lastDestination.name}`;
    }
  }

  #getRouteDate(routePoints) {
    if (routePoints.length === 0) {
      return '';
    }
    const startDate = dayjs(routePoints[0].timeFrom);
    const endDate = dayjs(routePoints[routePoints.length - 1].timeTo);
    return `${startDate.format('DD MMM')} — ${endDate.format('DD MMM')}`;
  }

  #getRouteCost(routePoints) {
    return routePoints.reduce((total, point) => total + point.price, 0);
  }
}
