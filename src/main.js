import TripPresenter from './presenter/tripPresenter';
import TripInfoView from './view/tripInfoView';
import Route from './model/route';
import {render, RenderPosition} from './framework/render';
import {generateHeaderData} from './mock/headerInfo';
import FilterPresenter from './presenter/filterPresenter';
import Filter from './model/filter';

const header = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const route = new Route();
route.generatePoints(4);

const filter = new Filter();
const tripPresenter = new TripPresenter(tripEvents, route, filter);
const filterPresenter = new FilterPresenter(tripFilters, filter);

const headerData = generateHeaderData();
render(new TripInfoView(headerData), header, RenderPosition.AFTERBEGIN);

filterPresenter.init();
tripPresenter.init(tripEvents);
