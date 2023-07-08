import {useMemo} from "react";
import {IMG_PATH, TYPES} from "../../constants";

const Item = ({item, onClick, title}) => {
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
      onClick={clickAccessory}
      title={title}>
      <img
        src={IMG_PATH + item.path}
        alt={item.name}
      />
    </div>
  );
};

export default Item;