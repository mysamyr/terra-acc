import { useCallback, useMemo } from "react";
import { TYPES } from "../../constants";

import "./Select.css";
import { objToArr } from "../../helpers";

const Select = ({ header, accessories, usedIn, setUsedIn }) => {
	const usedInString = [...usedIn].join(", ");

	const onSelectOption = useCallback(
		(e) => {
			const id = e.target.value;
			setUsedIn((prevState) => {
				const newState = new Set([...prevState]);
				if (prevState.has(id)) {
					newState.delete(id);
				} else {
					newState.add(id);
				}
				return newState;
			});
		},
		[setUsedIn],
	);

	const options = useMemo(() => {
		return objToArr(accessories)
			.filter((i) => i.type === TYPES.ACCESSORY)
			.map((item) => (
				<option key={item.id} value={item.id} onClick={onSelectOption}>
					{item.name}
				</option>
			));
	}, [accessories, usedIn, onSelectOption]);

	return (
		<div className="select">
			<h2>{header}</h2>
			<input type="search" value={usedInString} />
			<select multiple>{options}</select>
		</div>
	);
};

export default Select;
