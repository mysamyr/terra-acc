import { v4 } from "uuid";
import Item from "../item";

import "./Category.css";

const Category = ({ name, items, onClick, list, type }) => (
	<div className="category">
		<h3>{name}</h3>
		<div className="category-list">
			{items.map((item) => (
				<Item
					list={list}
					item={item}
					key={v4()}
					onClick={onClick}
					type={type}
				/>
			))}
		</div>
	</div>
);

export default Category;
