import {useRef, useState} from "react";
import accessories from "../../store/store2.json";

import './AddAccessory.css';
import Select from "../select/Select";
import RecipesInput from "../recipes-input/RecipesInput";
import TextInput from "../text-input/TextInput";

const AddAccessory = () => {
  const nameRef = useRef();
  const effectRef = useRef();
  const obtainRef = useRef();
  const [img, setImg] = useState("");
  const [type, setType] = useState("A");
  const [usedIn, setUsedIn] = useState(new Set());
  const [recipes, setRecipes] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const effect = effectRef.current.value;
    const obtain = obtainRef.current.value;
    debugger;
    if (!name || !img || !type) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("img", img);
    formData.append("type", type);
    formData.append("usedIn", [...usedIn].join("/"));
    formData.append("recipes", JSON.stringify(recipes));
    formData.append("effect", effect);
    formData.append("obtain", obtain);
    const response = await fetch("http://localhost:3000/new", {
      method: "POST",
      body: formData,
      mode: 'no-cors',
    });

    if (response.status !== 201) {
      console.error("atata");
    }
  };

  return <div className="formFields">
    <TextInput header="Attribute name" reference={nameRef}/>

    <label>
      Attribute image:
      <input type="file" accept="image/png" onInput={(e) => setImg(e.target.files[0])}/>
    </label>

    <h4>Type:</h4>
    <label>
      Accessory
      <input type="radio"
             checked={type === "A"}
             onChange={() => setType("A")}
      />
    </label>
    <label>
      Ingredient
      <input type="radio"
             checked={type === "I"}
             onChange={() => setType("I")}
      />
    </label>
    <label>
      Station
      <input type="radio"
             checked={type === "S"}
             onChange={() => setType("S")}
      />
    </label>

    <Select
      header="Used in"
      accessories={accessories}
      setUsedIn={setUsedIn}
      usedIn={usedIn}/>

    <RecipesInput accessories={accessories} setRecipes={setRecipes}/>

    <TextInput header="Effect" reference={effectRef}/>
    <TextInput header="Obtain from" reference={obtainRef}/>

    <button onClick={handleSave}>SAVE</button>
    <hr/>
    <p>{[...usedIn].join(", ")}</p>
  </div>;
};

export default AddAccessory;

//       recipes