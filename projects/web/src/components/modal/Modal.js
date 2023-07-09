import { useEffect, useCallback } from "react";
import {
	EVENT_NAMES,
	KEYBOARD_CODES,
	MODAL_WRAPPER_CLASS_NAME,
} from "../../constants";

import "./Modal.css";

const Modal = ({ onHideModal, children }) => {
	const handleClickModalWrapper = useCallback(
		(e) => {
			if (e.target.className === MODAL_WRAPPER_CLASS_NAME) {
				onHideModal();
			}
		},
		[onHideModal],
	);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.code === KEYBOARD_CODES.ESC) {
				onHideModal();
			}
		},
		[onHideModal],
	);

	useEffect(() => {
		document.addEventListener(EVENT_NAMES.KEYDOWN, handleKeyDown);
		document.body.classList.add("modal-open");
		return () => {
			document.removeEventListener(EVENT_NAMES.KEYDOWN, handleKeyDown);
			document.body.classList.remove("modal-open");
		};
	}, []);

	return (
		<div className="modal-wrapper" onClick={handleClickModalWrapper}>
			<div className="modal">
				{children}
				<button className="icon-button close-modal" onClick={onHideModal}>
					&times;
				</button>
			</div>
		</div>
	);
};

export default Modal;
