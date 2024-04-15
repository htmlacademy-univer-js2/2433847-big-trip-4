import TripPresenter from './presenter/tripPresenter';
import FilterView from './view/filterView';
import TripInfoView from './view/tripInfoView';
import Route from './model/route';
import {render, RenderPosition} from './framework/render';

const header = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const route = new Route();
const filters = [
  {name: 'Everything', checked: true},
  {name: 'Future', checked: false},
  {name: 'Present', checked: false},
  {name: 'Past', checked: false},
];
const presenter = new TripPresenter(route, filters);

render(new TripInfoView(), header, RenderPosition.AFTERBEGIN);
render(new FilterView(filters), tripFilters);

presenter.init(tripEvents);
