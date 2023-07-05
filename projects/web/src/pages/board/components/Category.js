import {v4} from "uuid";
import Item from "../../../components/item/Item";

const Category = ({name, items, onClick}) => {
  const list = items
    .map(item =>
      <Item
      item={item}
      key={v4()}
      onClick={onClick}/>
    );

  return (
    <div className="category">
      <h2>{name}</h2>
      <div className="items">
        {list}
      </div>
    </div>
  );
};

export default Category;
