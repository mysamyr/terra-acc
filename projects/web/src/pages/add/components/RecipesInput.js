import { v4 } from "uuid";
import accessories from "../../../store/store.json";
import { TYPES } from "../../../constants";

const RecipesInput = ({ header, recipes, setRecipes }) => {
	const stations = Object.values(accessories)
		.filter((i) => i.type === TYPES.STATION)
		.map((i) => (
			<option key={v4()} value={i.id}>
				{i.name}
			</option>
		));

	const onChangeIngredients = (value, index) => {
		setRecipes((prevState) => {
			prevState[index] = { ...prevState[index], ingredients: value };
			return [...prevState];
		});
	};

	const onChangeStation = (value, index) => {
		setRecipes((prevState) => {
			prevState[index] = { ...prevState[index], station: value };
			return [...prevState];
		});
	};

	const onClickAddRow = () => {
		setRecipes((prevState) => {
			return [...prevState, { ingredients: "", station: "" }];
		});
	};

	const onClickDeleteRow = (index) => {
		setRecipes((prevState) => prevState.filter((_, idx) => idx !== index));
	};

	const inputs = recipes.map((recipe, index) => (
		<div
			key={index}
			style={{ display: "flex", justifyContent: "space-between" }}
		>
			<label>
				Ingredients:
				<input
					type="text"
					onChange={(e) => onChangeIngredients(e.target.value, index)}
					value={recipe.ingredients}
				/>
			</label>
			<label>
				Crafting station:
				<input
					type="search"
					list="stations"
					onChange={(e) => onChangeStation(e.target.value, index)}
					value={recipe.station}
				/>
			</label>
			<div
				style={{
					width: 20,
					padding: 2,
					textAlign: "center",
					backgroundColor: "#fbb",
					color: "red",
					cursor: "pointer",
				}}
				onClick={() => onClickDeleteRow(index)}
			>
				X
			</div>
		</div>
	));

	return (
		<div style={{ width: "50%" }}>
			<h2>{header}</h2>
			{inputs}
			<div
				style={{
					width: 20,
					padding: 2,
					margin: "0 auto",
					textAlign: "center",
					backgroundColor: "#a2e090",
					color: "green",
					cursor: "pointer",
				}}
				onClick={onClickAddRow}
			>
				+
			</div>
			<datalist id="stations">{stations}</datalist>
		</div>
	);
};

export default RecipesInput;
