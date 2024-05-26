import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {POINT_EMPTY} from '../const';
import {editFormTemplate} from '../template/editFormTemplate';
import {getOffersByType} from '../mock/routeOffer';
import {generateDestinationByCity} from '../mock/routeDestination';


export default class EditFormView extends AbstractStatefulView {
  constructor(routePoint = POINT_EMPTY) {
    super();

    this.#typeChangeHandler = this.#typeChangeHandler.bind(this);
    this.#destinationChangeHandler = this.#destinationChangeHandler.bind(this);
    this._setState({routePoint});
    this._restoreHandlers();
  }

  setSubmitHandler(handler) {
    this.element.querySelector('form').addEventListener('submit', handler);
  }

  setClickHandler(handler) {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', handler);
  }

  get template() {
    return editFormTemplate(this._state.routePoint);
  }

  #typeChangeHandler = (evt) => {
    const type = evt.target.value;
    const offers = getOffersByType(type);
    this.updateElement({routePoint: {...this._state.routePoint, type: type, options: offers}});
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      routePoint: {
        ...this._state.routePoint,
        destination: generateDestinationByCity(evt.target.value)
      }
    });
  };

  _restoreHandlers() {
    this.setSubmitHandler(this._callback.submit);
    this.setClickHandler(this._callback.click);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

}
