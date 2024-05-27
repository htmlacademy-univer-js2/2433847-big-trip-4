import Observable from '../framework/observable';
import {FilterType} from '../const';

export default class Filter extends Observable{
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._notify('filterChange', filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
