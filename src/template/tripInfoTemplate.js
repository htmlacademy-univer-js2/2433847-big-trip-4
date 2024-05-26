export const TripInfoTemplate = (data) =>
  `<section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
        <h1 class="trip-info__title">${data.title}</h1>

        <p class="trip-info__dates">${data.dates}</p>
    </div>

    <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${data.total}</span>
    </p>
</section>`;
