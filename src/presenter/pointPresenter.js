import PointView from '../view/routePointView';
import {remove, render, replace} from '../framework/render';
import EditFormView from '../view/editFormView';
import {POINT_EMPTY, UserAction} from '../const';
import {getOffersByType} from '../mock/routeOffer';

export default class PointPresenter {
  #container;
  #changeDataCallback;
  #resetViewsCallback;
  #currentView;
  #point;
  #pointView;
  #editFormView;
  #isNewPoint = false;

  constructor(container, changeData, resetViews) {
    this.#container = container;
    this.#changeDataCallback = changeData;
    this.#resetViewsCallback = resetViews;
    this.#handleEscKeyDown = this.#handleEscKeyDown.bind(this);
  }

  init(point, isNewPoint = false) {
    const currentView = this.#currentView;
    const editFormView = this.#editFormView;
    this.#isNewPoint = isNewPoint;
    this.#point = point;
    if (this.#isNewPoint) {
      this.#point = {...POINT_EMPTY, options: getOffersByType(this.#point.type)};
    }
    this.#pointView = new PointView(this.#point);
    this.#pointView.setClickHandler(this.#handlePointClick.bind(this));
    this.#pointView.setFavoriteClickHandler(this.#handleFavoriteClick.bind(this));
    this.#editFormView = new EditFormView(this.#point);
    this.#editFormView.setClickHandler(this.#handlePointClick.bind(this));
    this.#editFormView.setSubmitHandler(this.#handleSubmitClick.bind(this));
    this.#editFormView.setDeleteClickHandler(this.#handleDeleteClick.bind(this));
    this.#currentView = this.#isNewPoint ? this.#editFormView : this.#pointView;
    if (currentView === undefined) {
      render(this.#currentView, this.#container);
    } else {
      replace(this.#currentView, currentView);
    }
    editFormView?.removeElement();
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
      if (this.#isNewPoint) {
        this.destroy();
      }
      this.#editFormView.resetFields();
      replace(this.#currentView, this.#editFormView);
    }
  }

  #handleFavoriteClick() {
    this.#changeDataCallback(UserAction.UPDATE_POINT, {
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

  #handleSubmitClick(event) {
    event.preventDefault();
    this.#changeDataCallback(this.#isNewPoint ? UserAction.ADD_POINT : UserAction.UPDATE_POINT, this.#editFormView._state.routePoint);
  }

  #handleDeleteClick() {
    if (this.#isNewPoint) {
      this.#resetViewsCallback();
    } else {
      this.#changeDataCallback(UserAction.DELETE_POINT, this.#point);
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    remove(this.#editFormView);
    remove(this.#pointView);
  }
}
