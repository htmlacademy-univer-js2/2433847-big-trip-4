import Observable from '../framework/observable';
import {adaptToClient, adaptToServer} from '../utils/adapter';

export default class RouteModel extends Observable {
  #points;
  #apiService;
  #destinationModel;
  #offersModel;
  constructor({apiService, destinationModel, offersModel}) {
    super();
    this.#apiService = apiService;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#points = [];
  }

  async init(){
    try {
      await Promise.all([
        this.#destinationModel.init(),
        this.#offersModel.init()
      ]);
      const points = await this.#apiService.getPoints();
      this.#points = points.map((point) => adaptToClient(point, this.#destinationModel.destinations, this.#offersModel.offers));
      this._notify('init', {error: false});
    } catch (e) {
      this.#points = [];
      this._notify('init', {error: e});
    }
  }

  getPoints() {
    return this.#points;
  }

  async updatePoint(newPoint) {
    await this.#apiService.updatePoint(newPoint.id, adaptToServer(newPoint))
      .then((response) => adaptToClient(response)).then(
        (response) => {
          this.#points = this.#points.map((point) => point.id === response.id ? response : point);
          this._notify('update', response);
        }
      );
  }

  deletePoint(id) {
    this.#points = this.#points.filter((point) => point.id !== id);
    this._notify('delete', id);
  }

  addPoint(point) {
    this.#points.push(point);
    this._notify('add', point);
  }
}
