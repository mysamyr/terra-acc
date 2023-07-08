import { useContext } from "react";
import SnackbarContext from "../store/snackbar-context";

import "./Snackbar.css";

const Snackbar = () => {
	const snackbarCtx = useContext(SnackbarContext);
	return (
		<div className="snackbar__container">
			<div className="snackbar__label">{snackbarCtx.msg}</div>
			<div className="snackbar__dismiss" onClick={snackbarCtx.onClose}>
				&times;
			</div>
		</div>
	);
};

export default Snackbar;
