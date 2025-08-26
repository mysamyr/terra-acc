import { v4 } from 'uuid';
import accessories from '../../../store/store.json';
import { TYPES } from '../../../constants';
import { objToArr } from '../../../helpers';

// todo
const RecipesInput = ({ header, recipes, setRecipes }) => {
  const stations = objToArr(accessories)
    .filter(i => i.type === TYPES.STATION)
    .map(i => (
      <option key={v4()} value={i.id}>
        {i.name}
      </option>
    ));

  const onChangeIngredients = (value, index) => {
    setRecipes(prevState => {
      prevState[index] = { ...prevState[index], ingredients: value };
      return [...prevState];
    });
  };

  const onChangeStation = (value, index) => {
    setRecipes(prevState => {
      prevState[index] = { ...prevState[index], stations: value };
      return [...prevState];
    });
  };

  const onClickAddRow = () => {
    setRecipes(prevState => [...prevState, { ingredients: '', stations: '' }]);
  };

  const onClickDeleteRow = index => {
    setRecipes(prevState => prevState.filter((_, idx) => idx !== index));
  };

  const inputs = recipes.map((recipe, index) => (
    <div
      key={index}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <label>
        Ingredients:
        <input
          type="text"
          onChange={e => onChangeIngredients(e.target.value, index)}
          value={recipe.ingredients}
        />
      </label>
      <label>
        Crafting stations:
        <input
          type="search"
          list="stations"
          onChange={e => onChangeStation(e.target.value, index)}
          value={recipe.stations}
        />
      </label>
      <div
        className="icon-button remove-row"
        onClick={() => onClickDeleteRow(index)}
      >
        &times;
      </div>
    </div>
  ));

  return (
    <div style={{ width: '50%' }}>
      <h2>{header}</h2>
      {inputs}
      <div className="icon-button add-row" onClick={onClickAddRow}>
        +
      </div>
      <datalist id="stations">{stations}</datalist>
    </div>
  );
};

export default RecipesInput;
