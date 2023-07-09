import { useCallback, useMemo } from "react";
import { IMG_PATH, TYPES } from "../../../../constants";

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

	const className = useMemo(() => {
		let res = "item";
		if (isPremium) res += " premium-item";
		if (isAccessory) res += " active-item";
		return res;
	}, [item]);

	return (
		<div className={className} onClick={clickAccessory} title={item.name}>
			<img src={IMG_PATH + item.path} alt={item.name} />
		</div>
	);
};

export default Item;
