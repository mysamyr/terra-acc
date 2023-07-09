import { useCallback } from "react";

import "./Search.css";

const Search = ({ string, setString }) => {
	const handleOnChange = useCallback(
		(e) => {
			setString(e.target.value);
		},
		[setString],
	);

	return (
		<div className="search-container">
			<label htmlFor="search-input">Search:</label>
			<input
				id="search-input"
				type="search"
				onChange={handleOnChange}
				value={string}
			/>
		</div>
	);
};

export default Search;
