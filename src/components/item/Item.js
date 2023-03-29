import {IMG_PATH, TYPES} from "../../constants";
import {useMemo} from "react";

const Item = ({item, onClick}) => {
  const isAccessory = useMemo(() => {
    return item.type === TYPES.ACCESSORY;
  }, [item]);

  const clickAccessory = () => {
    isAccessory && onClick(item);
  };

  return (
    <div
      className="item"
      style={{cursor: isAccessory ? "pointer" : "auto"}}
      onClick={clickAccessory}>
      <img
        src={IMG_PATH + item.path}
        alt={item.name}
      />
    </div>
  );
};

export default Item;