import AbstractView from '../framework/view/abstract-view';

export default class FilterView extends AbstractView {
  constructor(filters) {
    super();
    this.filters = filters;
  }

  get template() {
    const template = this.filters.map((filter) => `
      <div class="trip-filters__filter">
        <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.checked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
      </div>
    `);
    return `<form class="trip-filters" action="#" method="get">${template.join('')}<button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
  }
}
