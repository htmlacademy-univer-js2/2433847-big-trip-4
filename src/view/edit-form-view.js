import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {POINT_EMPTY, SHAKE_ANIMATION_TIMEOUT} from '../const';
import {editFormTemplate} from '../template/edit-form-template';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

export default class EditFormView extends AbstractStatefulView {
  #point;
  #destinations;
  #offers;
  #endTime;
  #startTime;


  constructor(destinations, offers, routePoint = POINT_EMPTY) {
    super();
    this._callback = {};
    this.#point = routePoint;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#typeChangeHandler = this.#typeChangeHandler.bind(this);
    this.#destinationChangeHandler = this.#destinationChangeHandler.bind(this);
    this.#priceChangeHandler = this.#priceChangeHandler.bind(this);
    this._setState({routePoint});
    this._restoreHandlers();
  }

  get template() {
    return editFormTemplate(this._state.routePoint, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.setSubmitHandler(this._callback.submit);
    this.setClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);


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

  resetFields() {
    this.updateElement({routePoint: this.#point});
    this.#startTime.setDate(POINT_EMPTY.timeFrom);
    this.#endTime.setDate(POINT_EMPTY.timeTo);
  }

  removeElement() {
    super.removeElement();
    this.#endTime.destroy();
    this.#startTime.destroy();
  }


  setSubmitHandler(handler) {
    this._callback.submit = handler;
    this.element.querySelector('form').addEventListener('submit', this._callback.submit);
  }

  setClickHandler(handler) {
    this._callback.click = handler;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._callback.click);
  }

  setDeleteClickHandler(handler) {
    this._callback.deleteClick = handler;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this._callback.deleteClick);
  }

  #typeChangeHandler = (evt) => {
    const type = evt.target.value;
    this.updateElement({routePoint: {...this._state.routePoint, type: type, offers: this.#offers}});
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      routePoint: {
        ...this._state.routePoint,
        destination: this.#destinations.find((destination) => destination.name === evt.target.value).id,
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this.updateElement({routePoint: {...this._state.routePoint, price: evt.target.value}});
  };

  #offerChangeHandler = (evt) => {
    const offer = evt.target.dataset.id;
    const newOffers = this._state.routePoint.offers.includes(offer)
      ? this._state.routePoint.offers.filter((o) => o !== offer)
      : [...this._state.routePoint.offers, offer];
    this.updateElement({
      routePoint: {
        ...this._state.routePoint,
        offers: newOffers
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

  setSaving() {
    this.element.querySelector('.event__save-btn').textContent = 'Saving...';
    this.element.querySelector('.event__reset-btn').textContent = 'Deleting...';
    this.element.querySelectorAll('input, button').forEach((element) => element.disabled = true);
  }

  setSaved() {
    this.element.querySelector('.event__save-btn').textContent = 'Save';
    this.element.querySelector('.event__reset-btn').textContent = 'Delete';
    this.element.querySelectorAll('input, button').forEach((element) => element.disabled = false);
  }

  setDeleting() {
    this.element.querySelector('.event__reset-btn').textContent = 'Deleting...';
    this.element.querySelectorAll('input, button').forEach((element) => element.disabled = true);
  }

  setAborted() {
    this.element.classList.add('shake');
    this.element.querySelector('.event__save-btn').textContent = 'Save';
    this.element.querySelector('.event__reset-btn').textContent = 'Delete';
    this.element.querySelectorAll('input, button').forEach((element) => element.disabled = false);

    setTimeout(() => {
      this.element.classList.remove('shake');
    }, SHAKE_ANIMATION_TIMEOUT);
  }


}
