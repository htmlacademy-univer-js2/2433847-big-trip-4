export const emptyRouteTemplate = (filter) =>
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
