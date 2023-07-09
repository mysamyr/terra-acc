import { useMemo } from "react";
import { v4 } from "uuid";
import Item from "../item/Item";

const Recipe = ({
	recipe,
	activeItem,
	parentItem,
	setActiveItem,
	accessories,
}) => {
	const changeActive = (item) => {
		if (item.id !== activeItem.id) {
			return setActiveItem(item);
		}
	};

	const items = useMemo(
		() =>
			recipe.ingredients.map((ingredient) => {
				const complexIngredient = Array.isArray(ingredient);
				const item = complexIngredient
					? accessories[ingredient[0]]
					: accessories[ingredient];

				return (
					<div style={{ display: "flex", alignItems: "center" }} key={v4()}>
						<Item item={item} onClick={() => changeActive(item)} />
						{complexIngredient && ingredient[1]}
					</div>
				);
			}),
		[accessories, recipe],
	);

	const stations = useMemo(
		() =>
			recipe.stations.map((station) => {
				const item = accessories[station];
				// render and / or / By Hand
				if (!item) return station;
				return <Item item={item} key={v4()} />;
			}),
		[accessories, recipe],
	);

	return (
		<tr key={v4()}>
			<td>{items}</td>
			<td>
				<div style={{ display: "flex", alignItems: "center" }}>{stations}</div>
			</td>
			<td>
				<Item
					item={parentItem}
					key={v4()}
					onClick={() => changeActive(parentItem)}
				/>
			</td>
		</tr>
	);
};

export default Recipe;
