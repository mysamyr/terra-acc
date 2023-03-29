import React, { useState } from "react";

export const SnackBarContextProvider = (props) => {
	const [msg, setMsg] = useState("");
	const [isDisplayed, setIsDisplayed] = useState(false);
	let timer;
	const displayHandler = (msg) => {
		setMsg(msg);
		setIsDisplayed(true);
		timer = setTimeout(() => {
			closeHandler();
		}, 5000);
	};
	const closeHandler = () => {
		clearTimeout(timer);
		setIsDisplayed(false);
	};
	return (
		<SnackbarContext.Provider
			value={{
				msg,
				isDisplayed,
				displayMsg: displayHandler,
				onClose: closeHandler,
			}}
		>
			{props.children}
		</SnackbarContext.Provider>
	);
};

const SnackbarContext = React.createContext({
	isDisplayed: false,
	displayMsg: (msg) => {},
	onClose: () => {},
});
export default SnackbarContext;
