import PointView from '../view/routePointView';
import {render, replace} from '../framework/render';
import EditFormView from '../view/editFormView';

export default class PointPresenter {
  constructor(container, changeData, resetViews) {
    this._container = container;
    this._changeDataCallback = changeData;
    this._resetViewsCallback = resetViews;
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init(point) {
    const currentView = this._currentView;

    this._point = point;
    this._pointView = new PointView(this._point);
    this._pointView.setClickHandler(this._handlePointClick.bind(this));
    this._pointView.setFavoriteClickHandler(this._handleFavoriteClick.bind(this));
    this._editFormView = new EditFormView(this._point);
    this._editFormView.setClickHandler(this._handlePointClick.bind(this));

    if (currentView === undefined) {
      render(this._pointView, this._container);
    } else {
      replace(this._pointView, currentView);
    }
    this._currentView = this._pointView;
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.resetView();
    }
  }

  resetView() {
    if (this._currentView instanceof EditFormView) {
      document.removeEventListener('keydown', this._handleEscKeyDown);
      this._currentView = this._pointView;
      replace(this._currentView, this._editFormView);
    }
  }

  _handleFavoriteClick() {
    this._changeDataCallback({
      ...this._point,
      favorite: !this._point.favorite
    });
  }

  _handlePointClick() {
    if (this._currentView instanceof PointView) {
      this._resetViewsCallback();
      document.addEventListener('keydown', this._handleEscKeyDown);
      this._currentView = this._editFormView;
      replace(this._currentView, this._pointView);
    } else {
      this.resetView();
    }
  }
}
