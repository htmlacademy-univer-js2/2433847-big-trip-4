import PointView from '../view/routePointView';
import {remove, render, replace} from '../framework/render';
import EditFormView from '../view/editFormView';

export default class PointPresenter {
  #container;
  #changeDataCallback;
  #resetViewsCallback;
  #currentView;
  #point;
  #pointView;
  #editFormView;
  constructor(container, changeData, resetViews) {
    this.#container = container;
    this.#changeDataCallback = changeData;
    this.#resetViewsCallback = resetViews;
    this.#handleEscKeyDown = this.#handleEscKeyDown.bind(this);
  }

  init(point) {
    const currentView = this.#currentView;
    this.#point = point;
    this.#pointView = new PointView(this.#point);
    this.#pointView.setClickHandler(this.#handlePointClick.bind(this));
    this.#pointView.setFavoriteClickHandler(this.#handleFavoriteClick.bind(this));
    this.#editFormView = new EditFormView(this.#point);
    this.#editFormView.setClickHandler(this.#handlePointClick.bind(this));
    this.#editFormView.setSubmitHandler(this.#handlePointClick.bind(this));

    if (currentView === undefined) {
      render(this.#pointView, this.#container);
    } else {
      replace(this.#pointView, currentView);
    }
    this.#currentView = this.#pointView;
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.resetView();
    }
  };

  resetView() {
    if (this.#currentView instanceof EditFormView) {
      document.removeEventListener('keydown', this.#handleEscKeyDown);
      this.#currentView = this.#pointView;
      replace(this.#currentView, this.#editFormView);
    }
  }

  #handleFavoriteClick() {
    this.#changeDataCallback({
      ...this.#point,
      favorite: !this.#point.favorite
    });
  }

  #handlePointClick() {
    if (this.#currentView instanceof PointView) {
      this.#resetViewsCallback();
      document.addEventListener('keydown', this.#handleEscKeyDown);
      this.#currentView = this.#editFormView;
      replace(this.#currentView, this.#pointView);
    } else {
      this.resetView();
    }
  }

  destroy() {
    if (this.#currentView instanceof EditFormView) {
      document.removeEventListener('keydown', this.#handleEscKeyDown);
    }
    remove(this.#editFormView);
    remove(this.#pointView);
  }
}
