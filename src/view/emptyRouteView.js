import AbstractView from '../framework/view/abstract-view';


const emptyRouteView = (filter) =>
{
  let text = '';
  switch (filter) {
    case 'Everything':
      text = 'Click New Event to create your first point';
      break;
    case 'Past':
      text = 'There are no past events now';
      break;
    case 'Present':
      text = 'There are no present events now';
      break;
    case 'Future':
      text = 'There are no future events now';
      break;
  }
  return `<p class="trip-events__msg">${text}</p>`;
};


export default class EmptyRouteView extends AbstractView {
  constructor(filter) {
    super();
    this.filter = filter;
  }

  get template() {
    return emptyRouteView(this.filter);
  }
}
