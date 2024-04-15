import TripPresenter from './presenter/tripPresenter';
import {render, RenderPosition} from './render';
import FilterView from './view/filterView';
import TripInfoView from './view/tripInfoView';
import Route from './model/route';

const header = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const route = new Route();
route.generatePoints(4);
const presenter = new TripPresenter(route);

render(new TripInfoView(), header, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFilters);

presenter.init(tripEvents);
