export default class OfferModel {
  apiService = null;
  #offers = [];

  constructor(apiService) {
    this.apiService = apiService;
  }

  async init() {
    this.#offers = await this.apiService.getOffers();
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.filter((offer) => offer.type === type).offers;
  }
}
