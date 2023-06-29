import {useCallback, useMemo} from "react";

const Select = ({header, accessories, setRecipes}) => {

  const stations = accessories.filter(i => i.type === "S").map(i => i.id);

  const inputs = useMemo(() => {
    // return array with input lines (input, station, delete icon)
    return [<div>

    </div>];
  }, [])

  return <div className="select">
    <h2>{header}</h2>
  </div>;
};

export default Select;
