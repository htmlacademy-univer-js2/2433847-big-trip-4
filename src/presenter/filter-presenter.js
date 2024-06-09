import FilterView from '../view/filter-view';
import {render, RenderPosition} from '../framework/render';

export default class FilterPresenter {
  constructor(container, filterModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init() {
    this._filterView = new FilterView();
    this._filterView.setFilterTypeChangeHandler(this._handleFilterTypeChange.bind(this));
    render(this._filterView, this._container, RenderPosition.BEFOREEND);

    this._filterModel.addObserver((event, payload) => {
      if (event === 'filterChange') {
        this._filterView.updateFilter(payload);
      }
    });
  }

  _handleFilterTypeChange(filterType) {
    this._filterModel.setFilter(filterType);
  }
}
