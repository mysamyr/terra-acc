import { v4 } from "uuid";
import Item from "../item/Item";

import "./Category.css";

const Category = ({ name, items, onClick }) => {
	const list = items.map((item) => (
		<Item item={item} key={v4()} onClick={onClick} />
	));

	return (
		<div className="category">
			<h3>{name}</h3>
			<div className="category-list">{list}</div>
		</div>
	);
};

export default Category;
