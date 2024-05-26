import AbstractView from '../framework/view/abstract-view';
import {emptyRouteTemplate} from '../template/emptyRouteTemplate';


export default class EmptyRouteView extends AbstractView {
  constructor(filter) {
    super();
    this.filter = filter;
  }

  get template() {
    return emptyRouteTemplate(this.filter);
  }
}
