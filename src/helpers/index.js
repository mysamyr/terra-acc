import { TYPES } from '../constants/index.js';

export const objToArr = obj => Object.values(obj);

export const arrayToObj = arr =>
  arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

export const getItemsByType = (obj, searchString, type) => {
  const array = objToArr(obj).filter(item => item.type === type);
  const filteredArray = searchString
    ? array.filter(acc =>
        acc.name.toLowerCase().includes(searchString.toLowerCase())
      )
    : array;

  return arrayToObj(filteredArray);
};

export const separateCategories = items => {
  const array = objToArr(items);
  const categories = array.reduce((acc, item) => {
    item.category.forEach(category => {
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
    });
    return acc;
  }, {});

  return sortCategories(categories);
};

export const sortCategories = obj =>
  Object.entries(obj).sort((a, b) => {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
  });

export const validateAddAccessory = ({
  name,
  img,
  type,
  recipes,
  usedIn,
  obtain,
  categories,
}) => {
  if (!name || !img || !type || !categories.length) {
    return;
  }
  if (type === TYPES.ACCESSORY && !recipes.length && !usedIn.length && !obtain)
    return;
  for (let recipe of recipes) {
    if (!recipe.stations || !recipe.stations.trim().length) return;
    if (!recipe.ingredients.length) return;
  }
  for (let item of usedIn) {
    if (!item.trim().length) return;
  }
  return true;
};
