import { useCallback, useMemo } from "react";
import { IMG_PATH, TYPES } from "../../constants";

import "./Item.css";

const Item = ({ item, onClick }) => {
	const isAccessory = useMemo(() => {
		return item.type === TYPES.ACCESSORY;
	}, [item]);

	const clickAccessory = useCallback(() => {
		isAccessory && onClick(item);
	}, [item, isAccessory]);

	const isPremium = useMemo(() => {
		return item.recipes.length && !item.used_in.length;
	}, [item]);

	return (
		<div
			className="item"
			style={{
				backgroundColor: isPremium ? "#fddc5c" : "azure",
				cursor: isAccessory ? "pointer" : "auto",
				borderRight: isAccessory ? "1px solid black" : 0,
				borderBottom: isAccessory ? "1px solid black" : 0,
			}}
			onClick={clickAccessory}
			title={item.name}
		>
			<img src={IMG_PATH + item.path} alt={item.name} />
		</div>
	);
};

export default Item;
