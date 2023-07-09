import { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
import { TYPES } from "../../constants";
import store from "../../store/store.json";
import ItemDetails from "./components/item-details/ItemDetails";
import Category from "./components/category/Category";
import Modal from "../../components/modal/Modal";
import Header from "./components/header/Header";
import { objToArr } from "../../helpers";

import "./Board.css";

const Board = () => {
	const [showModal, setShowModal] = useState(false);
	const [activeItem, setActiveItem] = useState({});
	const [searchString, setSearchString] = useState("");

	const openModal = useCallback(
		(item) => {
			if (item.id !== activeItem.id) {
				setShowModal(true);
				setActiveItem(item);
			}
		},
		[activeItem, setShowModal],
	);

	const onHideModal = useCallback(() => {
		setShowModal(false);
		setActiveItem({});
	}, [setShowModal, setActiveItem]);

	const accessories = useMemo(() => {
		const accessoriesArray = objToArr(store);
		if (!searchString) return accessoriesArray;

		return accessoriesArray.filter((acc) =>
			acc.name.toLowerCase().includes(searchString.toLowerCase()),
		);
	}, [store, searchString]);

	const separateCategories = useMemo(() => {
		const accessoriesArray = accessories.filter(
			(item) => item.type === TYPES.ACCESSORY,
		);
		const categories = accessoriesArray.reduce((acc, item) => {
			item.category.forEach((category) => {
				if (!acc[category]) {
					acc[category] = [];
				}
				acc[category].push(item);
			});
			return acc;
		}, {});
		return Object.entries(categories);
	}, [accessories]);

	const categories = separateCategories.map(([key, category]) => {
		return (
			<Category key={v4()} name={key} items={category} onClick={openModal} />
		);
	});

	return (
		<div className="container">
			<Header string={searchString} setString={setSearchString} />
			<div className="categories">{categories}</div>
			{showModal && (
				<Modal onHideModal={onHideModal}>
					<ItemDetails
						accessories={store}
						item={activeItem}
						setActiveItem={setActiveItem}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Board;
