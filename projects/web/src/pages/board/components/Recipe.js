import {useMemo} from "react";
import {v4} from "uuid";
import Item from "../../../components/item/Item";

const Recipe = ({recipe, activeItem, parentItem, setActiveItem, accessories}) => {
  const changeActive = (item) => {
    if (item.id !== activeItem.id) {
      return setActiveItem(item);
    }
  };

  const items = useMemo(() => recipe.ingredients.map(ingredient => {
    const ingredientHasNumber = typeof ingredient !== "object";
    const item = ingredientHasNumber
      ? accessories[ingredient]
      : accessories[ingredient.name];

    return (
      <div style={{display: "flex", alignItems: 'center'}} key={v4()}>
        <Item
          item={item}
          onClick={() => changeActive(item)}/>
        {!ingredientHasNumber && `x${ingredient.number}`}
      </div>
    );
  }), [accessories, recipe]);

  const stations = useMemo(() => recipe.station.map((station, index) => {
    const item = accessories[station];
    // render and / or
    if (!item) return station;
    return (
      <Item
        item={item}
        key={v4()}/>
    );
  }), [accessories, recipe]);

  return (
    <tr key={v4()}>
      <td>{items}</td>
      <td>
        <div style={{display: "flex", alignItems: 'center'}}>
          {stations}
        </div>
      </td>
      <td>
        <Item
          item={parentItem}
          key={v4()}
          onClick={() => changeActive(parentItem)}/>
      </td>
    </tr>
  );
};

export default Recipe;
