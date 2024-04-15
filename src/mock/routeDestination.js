const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateDescription = () => {
  const sentences = lorem.split('. ');
  const randomSentences = sentences.toSorted(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 5) + 1);
  return randomSentences.join('. ');
};


const generatePhotos = () => {
  const photos = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    photos.push(`https://loremflickr.com/248/152?random=${Math.random()}`);
  }
  return photos;
};

const cities = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'London', 'Moscow', 'New York', 'Tokyo', 'Sydney', 'Rio de Janeiro', 'Cape Town', 'Dubai',];
const generateCity = () => cities[Math.floor(Math.random() * cities.length)];


export const generateDestination = () => ({
  id: crypto.randomUUID(),
  name: generateCity(),
  location: generateCity(),
  description: generateDescription(),
  pictures: generatePhotos(),
});
