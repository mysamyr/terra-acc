import { useEffect, useCallback } from 'react';
import {
  EVENT_NAMES,
  KEYBOARD_CODES,
  CLASS_NAMES,
} from '../../constants/index.js';

import './Modal.css';

const Modal = ({ onHideModal, children }) => {
  const handleClickModalWrapper = useCallback(
    e => {
      if (e.target.className === CLASS_NAMES.MODAL_WRAPPER_CLASS_NAME) {
        onHideModal();
      }
    },
    [onHideModal]
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.code === KEYBOARD_CODES.ESC) {
        onHideModal();
      }
    },
    [onHideModal]
  );

  useEffect(() => {
    document.addEventListener(EVENT_NAMES.KEYDOWN, handleKeyDown);
    document.body.classList.add(CLASS_NAMES.MODAL_OPEN);
    return () => {
      document.removeEventListener(EVENT_NAMES.KEYDOWN, handleKeyDown);
      document.body.classList.remove(CLASS_NAMES.MODAL_OPEN);
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
