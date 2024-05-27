import TripPresenter from './presenter/tripPresenter';
import TripInfoView from './view/tripInfoView';
import RouteModel from './model/route';
import {render, RenderPosition} from './framework/render';
import {generateHeaderData} from './mock/headerInfo';
import FilterPresenter from './presenter/filterPresenter';
import Filter from './model/filter';
import DestinationModel from './model/destination';
import Api from './api';
import {AUTHORIZATION, END_POINT} from './const';
import OfferModel from './model/offer';

const header = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const apiService = new Api(END_POINT, AUTHORIZATION);
const destinationModel = new DestinationModel(apiService);
const offersModel = new OfferModel(apiService);
const routeModel = new RouteModel({
  apiService,
  destinationModel,
  offersModel,
});

const filterModel = new Filter();
const tripPresenter = new TripPresenter(tripEvents, routeModel, filterModel, destinationModel, offersModel);
const filterPresenter = new FilterPresenter(tripFilters, filterModel);

const headerData = generateHeaderData();
render(new TripInfoView(headerData), header, RenderPosition.AFTERBEGIN);

filterPresenter.init();
tripPresenter.init(tripEvents);
routeModel.init();
