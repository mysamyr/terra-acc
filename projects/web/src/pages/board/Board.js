import {useCallback, useState} from "react";
import { SOURCE, TYPES} from "../../constants";
import accessories from "../../store/store2.json";
import ItemDetails from "./components/ItemDetails";
import Item from "../../components/item/Item";
import Modal from "../../components/modal/Modal";
import { makeKey } from "../../helper";

import './Board.css';

const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const openModal = useCallback((item) => {
    if (item.id !== activeItem.id) {
      setShowModal(true);
      setActiveItem(item);
    }
  }, []);

  const onHideModal = useCallback(() => {
    setShowModal(false);
    setActiveItem({});
  }, []);

  const cards = Object.values(accessories)
    .map(item => {
      return item.type === TYPES.ACCESSORY && (
        <Item
          item={item}
          key={makeKey(SOURCE.BOARD, item.id)}
          onClick={openModal}/>
      );
    }
  );

  return (
    <div className="container">
      <div className="items">{cards}</div>
      {
        showModal &&
        <Modal onHideModal={onHideModal}>
          <ItemDetails accessories={accessories} item={activeItem} setActiveItem={setActiveItem}/>
        </Modal>
      }
    </div>
  );
};

export default Board;
