import { useMemo } from "react";
import { v4 } from "uuid";
import Item from "../item";

const Recipe = ({
	recipe,
	activeItem,
	parentItem,
	setActiveItem,
	list,
	type,
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
				const item = complexIngredient ? list[ingredient[0]] : list[ingredient];

				return (
					<div style={{ display: "flex", alignItems: "center" }} key={v4()}>
						<Item
							list={list}
							item={item}
							onClick={() => changeActive(item)}
							type={type}
						/>
						{complexIngredient && ingredient[1]}
					</div>
				);
			}),
		[list, recipe],
	);

	const stations = useMemo(
		() =>
			recipe.stations.map((station) => {
				const item = list[station];
				// render and / or / By Hand
				if (!item) return station;
				return <Item list={list} item={item} key={v4()} type={type} />;
			}),
		[list, recipe],
	);

	return (
		<tr key={v4()}>
			<td>{items}</td>
			<td>
				<div style={{ display: "flex", alignItems: "center" }}>{stations}</div>
			</td>
			<td>
				<Item
					list={list}
					item={parentItem}
					key={v4()}
					onClick={() => changeActive(parentItem)}
					type={type}
				/>
			</td>
		</tr>
	);
};

export default Recipe;
