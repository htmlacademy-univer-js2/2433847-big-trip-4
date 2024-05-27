import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {POINT_EMPTY} from '../const';
import {editFormTemplate} from '../template/editFormTemplate';
import {getOffersByType} from '../mock/routeOffer';
import {generateDestinationByCity} from '../mock/routeDestination';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

export default class EditFormView extends AbstractStatefulView {
  constructor(routePoint = POINT_EMPTY) {
    super();

    this.#typeChangeHandler = this.#typeChangeHandler.bind(this);
    this.#destinationChangeHandler = this.#destinationChangeHandler.bind(this);
    this._setState({routePoint});
    this._restoreHandlers();
  }

  #endTime;
  #startTime;
  setSubmitHandler(handler) {
    this._callback.submit = handler;
    this.element.querySelector('form').addEventListener('submit', this._callback.submit);
  }

  setClickHandler(handler) {
    this._callback.click = handler;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._callback.click);
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

  #startTimeChangeHandler = (selectedDates) => {
    this.updateElement({routePoint: {...this._state.routePoint, timeFrom: selectedDates[0]}});
    this.#endTime.set('minDate', selectedDates[0]);
  };

  #endTimeChangeHandler = (selectedDates) => {
    this.updateElement({routePoint: {...this._state.routePoint, timeTo: selectedDates[0]}});
  };

  _restoreHandlers() {
    this.setSubmitHandler(this._callback.submit);
    this.setClickHandler(this._callback.click);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);


    this.#endTime = flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
      defaultDate: this._state.routePoint.timeTo,
      onChange: this.#endTimeChangeHandler,
    });

    this.#startTime = flatpickr(this.element.querySelector('#event-start-time-1'), {
      enableTime: true,
      dateFormat: 'd/m/Y H:i',
      defaultDate: this._state.routePoint.timeFrom,
      onChange: this.#startTimeChangeHandler,
    });
  }

  removeElement() {
    super.removeElement();
    this.#endTime.destroy();
    this.#startTime.destroy();
  }

}
