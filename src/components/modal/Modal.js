import {v4} from "uuid";
import {IMG_PATH, SOURCE} from "../../constants";
import accessories from "../../store/store.json";
import Item from "../item/Item";
import {makeKey} from "../../helper";

import "./Modal.css";

const Modal = ({item, setShowModal, setActiveItem}) => {
  const closeModal = () => {
    setShowModal(false);
    setActiveItem(null);
  };

  const recipes = item.recipes.map(recipe => Recipe(recipe, item, item, setActiveItem));
  const usedIn = item.used_in.map(result => {
    const parent = accessories[result];
    return parent.recipes
      .filter(({ingredients}) => ingredients.includes(item.id))
      .map(recipe => Recipe(recipe, item, parent, setActiveItem));
  });

  return (
    <div className="modal">
      <div className="element-info">
        <h2>{item.name}</h2>
        <img
          src={IMG_PATH + item.path}
          alt={item.name}
          className="element-icon"/>
      </div>
      <pre>{item.effect}</pre>
      {item.obtain && <p>Obtain from: <b>{item.obtain}</b></p>}
      <div className="recipes">
        {!!recipes.length && <div className="recipe">
          <h3>Recipes</h3>
          <table>
            <thead>
            <tr>
              <th>Ingredients</th>
              <th>Crafting Station</th>
              <th>Result</th>
            </tr>
            </thead>
            <tbody>
            {recipes}
            </tbody>
          </table>
        </div>}
        {!!usedIn.length && <div className="recipe">
          <h3>Used in</h3>
          <table>
            <thead>
            <tr>
              <th>Ingredients</th>
              <th>Crafting Station</th>
              <th>Result</th>
            </tr>
            </thead>
            <tbody>
            {usedIn}
            </tbody>
          </table>
        </div>}
      </div>
      <button id="close" onClick={closeModal}>X</button>
    </div>
  );
};

const Recipe = (recipe, activeItem, parentItem, setActiveItem) => {
  const changeActive = (item) => {
    if (item.id !== activeItem.id) {
      return setActiveItem(item);
    }
  };

  const craftingStation = accessories[recipe.station];
  const items = recipe.ingredients.map(ingredient => {
    const item = accessories[ingredient];
    return (
      <Item
        item={item}
        key={makeKey(SOURCE.RECIPE, item.id)}
        onClick={() => changeActive(item)}/>
    );
  });

  return (
      <tr key={v4()}>
        <td>{items}</td>
        <td>
          <Item
            item={craftingStation}
            key={v4()}/>
        </td>
        <td>
          <Item
            item={parentItem}
            key={makeKey(SOURCE.USED_IN, parentItem.id)}
            onClick={() => changeActive(parentItem)}/>
        </td>
      </tr>
  );
};

export default Modal;
