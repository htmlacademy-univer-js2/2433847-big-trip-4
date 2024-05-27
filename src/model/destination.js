export default class DestinationModel {
  #apiService = null;
  #destinations = [];

  constructor(apiService) {
    this.#apiService = apiService;
  }

  async init() {
    this.#destinations = await this.#apiService.getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }
}
