import {useCallback, useState} from "react";
import {SOURCE, TYPES} from "../../constants";
import accessories from "../../store/store2.json";
import Item from "../item/Item";
import Modal from "../modal/Modal";
import { makeKey } from "../../helper";

import './Board.css';

const Board = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const openModal = useCallback((item) => {
    if (item.id !== activeItem?.id) {
      setShowModal(true);
      setActiveItem(item);
    }
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
      {showModal && <Modal
        item={activeItem}
        setShowModal={setShowModal}
        setActiveItem={setActiveItem}
      />}
    </div>
  );
};

export default Board;
