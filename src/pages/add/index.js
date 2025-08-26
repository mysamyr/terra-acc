import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import TextInput from '../../components/input/TextInput';
import TextArea from '../../components/input/TextArea';
import RadioInput from '../../components/input/RadioInput';
import ImageInput from '../../components/input/ImageInput';
import RecipesInput from './components/RecipesInput';
import ListInput from './components/ListInput/ListInput';
import { validateAddAccessory } from '../../helpers';
import SnackbarContext from '../../components/store/snackbar-context';
import { TYPES } from '../../constants';

import './AddAccessory.css';

const AddAccessory = () => {
  const snackbarCtx = useContext(SnackbarContext);

  const nameRef = useRef();
  const effectRef = useRef();
  const obtainRef = useRef();
  const [img, setImg] = useState('');
  const [type, setType] = useState(TYPES.ACCESSORY);
  const [usedIn, setUsedIn] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState(['']);

  const handleSave = e => {
    e.preventDefault();
    const name = nameRef.current.value;
    const effect = effectRef.current.value;
    const obtain = obtainRef.current.value;
    const formattedRecipes = recipes.map(recipe => ({
      ingredients: recipe.ingredients.split(' '),
      stations: recipe.stations.trim(),
    }));
    const isValid = validateAddAccessory({
      name,
      img,
      type,
      recipes: formattedRecipes,
      usedIn,
      obtain,
      categories,
    });
    if (!isValid) return snackbarCtx.displayMsg('Fill all fields');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('img', img);
    formData.append('type', type);
    formData.append('usedIn', JSON.stringify(usedIn));
    formData.append('recipes', JSON.stringify(formattedRecipes));
    formData.append('effect', effect);
    formData.append('obtain', obtain);
    formData.append('category', JSON.stringify(categories));
    fetch(`${process.env.SERVER_URL}/new`, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    })
      .then(response => {
        if (!response.ok) {
          return snackbarCtx.displayMsg('You got an error while adding');
        }
        snackbarCtx.displayMsg('Item added');
        return clearState();
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  };

  const clearState = useCallback(() => {
    nameRef.current.value = '';
    effectRef.current.value = '';
    obtainRef.current.value = '';
    setImg('');
    setType(TYPES.ACCESSORY);
    setUsedIn([]);
    setRecipes([]);
    setCategories([]);
  }, [
    nameRef,
    effectRef,
    obtainRef,
    setImg,
    setType,
    setUsedIn,
    setRecipes,
    setCategories,
  ]);

  const typeConfig = useMemo(
    () => [
      {
        name: 'Accessory',
        type: TYPES.ACCESSORY,
      },
      {
        name: 'Ingredient',
        type: TYPES.INGREDIENT,
      },
      {
        name: 'Station',
        type: TYPES.STATION,
      },
    ],
    []
  );

  return (
    <div className="form-fields">
      <h1>In development!!!</h1>
      <TextInput header="Accessory name" reference={nameRef} />
      <ImageInput name="Accessory image" setImg={setImg} />
      <RadioInput
        config={typeConfig}
        header="Type"
        selectedType={type}
        setType={setType}
      />
      <ListInput header="Used in" list={usedIn} setList={setUsedIn} />
      <RecipesInput
        header="Recipes"
        recipes={recipes}
        setRecipes={setRecipes}
      />
      <TextArea header="Effect" reference={effectRef} />
      <TextInput header="Obtain from" reference={obtainRef} />
      <ListInput header="Category" list={categories} setList={setCategories} />

      <button className="button" onClick={handleSave}>
        SAVE
      </button>
    </div>
  );
};

export default AddAccessory;
