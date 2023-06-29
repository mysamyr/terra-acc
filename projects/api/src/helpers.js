export const makeId = (string) => {
  if (typeof string === 'string') {
    const res = string.trim().toLowerCase().replaceAll(" ", "_");
    if (res.length) return res;
  }
};

const arrayToObj = (arr) => arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

export const sort = (arr) => {
  const sortedArr = arr.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
  return arrayToObj(sortedArr);
};