import {useMemo, useRef, useState} from "react";
import accessories from "../../store/store2.json";
import Select from "../../components/input/Select";
import TextInput from "../../components/input/TextInput";

import './AddAccessory.css';
import RadioInput from "../../components/input/RadioInput";
import ImageInput from "../../components/input/ImageInput";

const AddAccessory = () => {
  const nameRef = useRef();
  const effectRef = useRef();
  const obtainRef = useRef();
  const usedInRef = useRef();
  const [img, setImg] = useState("");
  const [type, setType] = useState("A");
  const [recipes, setRecipes] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const effect = effectRef.current.value;
    const obtain = obtainRef.current.value;
    const usedIn = usedInRef.current.value.split(" ").map(i => i.trim());
    debugger;
    if (!name || !img || !type) {
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("img", img);
    formData.append("type", type);
    formData.append("usedIn", JSON.stringify(usedIn));
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

  const typeConfig = useMemo(() => ([
    {
      name: "Accessory",
      type: "A",
    },
    {
      name: "Ingredient",
      type: "I",
    },
    {
      name: "Station",
      type: "S",
    },
  ]), []);

  return <div className="form-fields">
    <TextInput header="Attribute name" reference={nameRef}/>
    <ImageInput name="Attribute image" setImg={setImg}/>
    <RadioInput config={typeConfig} header="Type" selectedType={type} setType={setType}/>
    <TextInput header="Used in" reference={usedInRef}/>
    <TextInput header="Effect" reference={effectRef}/>
    <TextInput header="Obtain from" reference={obtainRef}/>

    <button onClick={handleSave}>SAVE</button>
  </div>;
};

export default AddAccessory;

//       recipes