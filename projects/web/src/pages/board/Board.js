import { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
import { TYPES } from "../../constants";
import accessories from "../../store/store.json";
import ItemDetails from "./components/ItemDetails";
import Category from "./components/Category";
import Modal from "../../components/modal/Modal";

import "./Board.css";

const Board = () => {
	const [showModal, setShowModal] = useState(false);
	const [activeItem, setActiveItem] = useState({});

	const styles = {
		container: {
			margin: "0 auto",
			padding: "20px 0",
			maxWidth: "1080px",
			backgroundColor: "#e7f4e4",
			color: "#112e51",
		},
	};

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

	const separateCategories = useMemo(() => {
		const accessoriesArray = Object.values(accessories).filter(
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
			<div className="categories">{categories}</div>
			{showModal && (
				<Modal onHideModal={onHideModal}>
					<ItemDetails
						accessories={accessories}
						item={activeItem}
						setActiveItem={setActiveItem}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Board;
