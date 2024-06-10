import FilterView from '../view/filter-view';
import {render, RenderPosition} from '../framework/render';
import {filter} from '../utils/filter';
import {FilterType} from '../const';

export default class FilterPresenter {
  constructor(container, filterModel, routeModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._routeModel = routeModel;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._routeModel.addObserver(this._handleModelEvent.bind(this));
  }

  init() {
    this._filterView = new FilterView();
    this._filterView.setFilterTypeChangeHandler(this._handleFilterTypeChange.bind(this));

    this.#updateFilterButtons();

    render(this._filterView, this._container, RenderPosition.BEFOREEND);
    this._filterModel.addObserver((event, payload) => {
      if (event === 'filterChange') {
        this._filterView.updateFilter(payload);
      }
    });
  }

  #updateFilterButtons() {
    const points = this._routeModel.getPoints();
    this._filterView.toggleFilter(FilterType.FUTURE, !filter[FilterType.FUTURE](points).length);
    this._filterView.toggleFilter(FilterType.PAST, !filter[FilterType.PAST](points).length);
    this._filterView.toggleFilter(FilterType.PRESENT, !filter[FilterType.PRESENT](points).length);
  }

  _handleFilterTypeChange(filterType) {
    this._filterModel.setFilter(filterType);
  }

  _handleModelEvent() {
    this.#updateFilterButtons();
  }
}
