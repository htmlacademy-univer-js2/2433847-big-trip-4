import Observable from '../framework/observable';
import {adaptToClient, adaptToServer} from '../utils/adapter';
import {ModelEvent} from '../const';

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
      this._notify(ModelEvent.INIT, {error: false});
    } catch (e) {
      this.#points = [];
      this._notify(ModelEvent.INIT, {error: e});
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
          this._notify(ModelEvent.UPDATE, response);
        }
      );
  }

  async addPoint(point) {
    await this.#apiService.createPoint(adaptToServer(point))
      .then((response) => adaptToClient(response)).then(
        (response) => {
          this.#points.push(response);
          this._notify(ModelEvent.ADD, response);
        }
      );
  }

  async deletePoint(id) {
    await this.#apiService.deletePoint(id)
      .then(() => {
        this.#points = this.#points.filter((point) => point.id !== id);
        this._notify(ModelEvent.DELETE, id);
      });
  }
}
