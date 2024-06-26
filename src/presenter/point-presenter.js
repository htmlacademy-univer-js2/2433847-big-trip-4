import PointView from '../view/route-point-view';
import {remove, render, replace} from '../framework/render';
import EditFormView from '../view/edit-form-view';
import {POINT_EMPTY, UserAction} from '../const';

export default class PointPresenter {
  #container;
  #changeDataCallback;
  #resetViewsCallback;
  #currentView;
  #point;
  #destinationModel;
  #offersModel;
  #pointView;
  #editFormView;
  #isNewPoint = false;

  constructor(container, changeData, resetViews, destinationModel, offersModel) {
    this.#container = container;
    this.#changeDataCallback = changeData;
    this.#resetViewsCallback = resetViews;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleEscKeyDown = this.#handleEscKeyDown.bind(this);
  }

  init(point, isNewPoint = false) {
    const currentView = this.#currentView;
    const editFormView = this.#editFormView;

    this.#isNewPoint = isNewPoint;
    this.#point = point;
    if (this.#isNewPoint) {
      this.#point = POINT_EMPTY;
      document.addEventListener('keydown', this.#handleEscKeyDown);
    } else {
      this.#pointView = new PointView(this.#point, this.#destinationModel.destinations, this.#offersModel.offers);
      this.#pointView.setClickHandler(this.#handlePointClick.bind(this));
      this.#pointView.setFavoriteClickHandler(this.#handleFavoriteClick.bind(this));
    }

    this.#editFormView = new EditFormView(this.#destinationModel.destinations, this.#offersModel.offers, this.#point);
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

  resetView() {
    if (this.#currentView instanceof EditFormView) {
      document.removeEventListener('keydown', this.#handleEscKeyDown);
      this.#currentView = this.#pointView;
      if (this.#isNewPoint) {
        this.#resetViewsCallback();
        this.destroy();
        return;
      }
      this.#editFormView.resetFields();
      replace(this.#currentView, this.#editFormView);
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    remove(this.#editFormView);
    if (this.#pointView) {
      remove(this.#pointView);
    }
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.resetView();
    }
  };


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
    this.#editFormView.setSaving();
    this.#changeDataCallback(this.#isNewPoint ? UserAction.ADD_POINT : UserAction.UPDATE_POINT, this.#editFormView._state.routePoint)
      .then(() => {
        this.#editFormView.setSaved();
      })
      .catch(() => {
        this.#editFormView.setAborted();
      });
  }

  #handleDeleteClick() {
    this.#editFormView.setDeleting();
    if (this.#isNewPoint) {
      this.#resetViewsCallback();
    } else {
      this.#changeDataCallback(UserAction.DELETE_POINT, this.#point)
        .catch(() => {
          this.#editFormView.setAborted();
        });
    }
  }
}
