export default class OfferModel {
  apiService = null;
  #offers = [];

  constructor(apiService) {
    this.apiService = apiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.apiService.getOffers();
  }

  getByType(type) {
    return this.#offers.filter((offer) => offer.type === type).offers;
  }
}
