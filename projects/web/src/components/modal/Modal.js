import {useEffect, useCallback} from "react";

import "./Modal.css";

const Modal = ({onHideModal, children}) => {
  const handleClickModalWrapper = useCallback((e) => {
    if (e.target.className === "modal-wrapper") {
      onHideModal();
    }
  }, [onHideModal]);

  const handleKeyDown = useCallback((e) => {
    if (e.code === "Escape") {
      onHideModal();
    }
  }, [onHideModal]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="modal-wrapper" onClick={handleClickModalWrapper}>
      <div className="modal">
        {children}
        <button id="close" onClick={onHideModal}>&times;</button>
      </div>
    </div>
  );
};

export default Modal;
