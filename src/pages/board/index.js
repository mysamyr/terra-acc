import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { v4 } from 'uuid';
import store from '../../store/store.json';
import ItemDetails from './components/ItemDetails/index.js';
import Category from './components/Category/index.js';
import Header from './components/Header/index.js';
import Modal from '../../components/modal/index.js';
import { getItemsByType, separateCategories } from '../../helpers/index.js';

import './Board.css';

const Board = ({ type, header }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState({});
  const [searchParams] = useSearchParams();

  const searchString = useMemo(
    () => searchParams.get('search') || '',
    [searchParams]
  );

  const openModal = useCallback(
    item => {
      if (item.id !== activeItem.id) {
        setShowModal(true);
        setActiveItem(item);
      }
    },
    [activeItem, setShowModal]
  );

  const onHideModal = useCallback(() => {
    setShowModal(false);
    setActiveItem({});
  }, [setShowModal, setActiveItem]);

  const categories = useMemo(() => {
    const items = getItemsByType(store, searchString, type);

    return separateCategories(items).map(([key, category]) => (
      <Category
        key={v4()}
        name={key}
        items={category}
        onClick={openModal}
        list={store}
        type={type}
      />
    ));
  }, [store, searchString, type, separateCategories]);

  return (
    <div className="container">
      <Header header={header} />
      <div className="categories">{categories}</div>
      {showModal && (
        <Modal onHideModal={onHideModal}>
          <ItemDetails
            list={store}
            item={activeItem}
            setActiveItem={setActiveItem}
            type={type}
          />
        </Modal>
      )}
    </div>
  );
};

export default Board;
