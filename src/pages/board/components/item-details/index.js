import { v4 } from "uuid";
import { IMG_PATH } from "../../../../constants";
import Recipe from "../recipe";

import "./ItemDetails.css";

const ItemDetails = ({ item, setActiveItem, list, type }) => {
	const recipes = item.recipes.map((recipe) => (
		<Recipe
			key={v4()}
			recipe={recipe}
			activeItem={item}
			parentItem={item}
			setActiveItem={setActiveItem}
			list={list}
			type={type}
		/>
	));
	const usedIn = item.used_in.map((result) => {
		const parent = list[result];
		return parent.recipes
			.filter(
				({ ingredients }) =>
					ingredients.includes(item.id) ||
					(Array.isArray(ingredients) &&
						ingredients.some((i) => i.includes(item.id))),
			)
			.map((recipe) => (
				<Recipe
					key={v4()}
					recipe={recipe}
					activeItem={item}
					parentItem={parent}
					setActiveItem={setActiveItem}
					list={list}
					type={type}
				/>
			));
	});

	return (
		<>
			<div className="element-info">
				<h2>{item.name}</h2>
				<img
					src={IMG_PATH + item.path}
					alt={item.name}
					className="element-icon"
				/>
			</div>
			<pre>{item.effect}</pre>
			{item.obtain && (
				<p>
					Obtain from: <b>{item.obtain}</b>
				</p>
			)}
			<div className="recipes">
				{!!recipes.length && (
					<div className="recipe">
						<h3>Recipes</h3>
						<table>
							<thead>
								<tr>
									<th>Ingredients</th>
									<th>Crafting Station</th>
									<th>Result</th>
								</tr>
							</thead>
							<tbody>{recipes}</tbody>
						</table>
					</div>
				)}
				{!!usedIn.length && (
					<div className="recipe">
						<h3>Used in</h3>
						<table>
							<thead>
								<tr>
									<th>Ingredients</th>
									<th>Crafting Station</th>
									<th>Result</th>
								</tr>
							</thead>
							<tbody>{usedIn}</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
};

export default ItemDetails;
