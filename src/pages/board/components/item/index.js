import { useCallback, useMemo } from "react";
import { IMG_PATH } from "../../../../constants";

import "./Item.css";

const Item = ({ list, item, onClick, type }) => {
	const isClickable = useMemo(() => {
		return item.type === type;
	}, [item]);

	const clickItem = useCallback(() => {
		isClickable && onClick(item);
	}, [item, isClickable]);

	const isPremium = useMemo(() => {
		if (item.recipes.length && !item.used_in.length) {
			if (
				item.recipes.some((recipe) =>
					recipe.ingredients.some((ingredient) => {
						const id = Array.isArray(ingredient) ? ingredient[0] : ingredient;
						return !!list[id];
					}),
				)
			) {
				return true;
			}
		}
	}, [item, list]);

	const className = useMemo(() => {
		let res = "item";
		if (isPremium) res += " premium-item";
		if (isClickable) res += " active-item";
		return res;
	}, [item]);

	return (
		<div className={className} onClick={clickItem} title={item.name}>
			<img src={IMG_PATH + item.path} alt={item.name} />
		</div>
	);
};

export default Item;
