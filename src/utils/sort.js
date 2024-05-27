export const sort = {
  Day: (p) => p.sort((a, b) => a.timeFrom - b.timeFrom),
  Time: (p) => p.sort((a, b) => a.timeFrom - b.timeFrom),
  Price: (p) => p.sort((a, b) => b.price - a.price),
};
