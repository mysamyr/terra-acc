import accessories from "../../../store/store2.json";
import Item from "../../../components/item/Item";
import {makeKey} from "../../../helper";
import {SOURCE} from "../../../constants";
import {v4} from "uuid";

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

export default Recipe;