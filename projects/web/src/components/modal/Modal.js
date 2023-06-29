import "./Modal.css";

const Modal = ({children, onHideModal}) => {
  return (
    <div className="modal">
      {children}
      <button id="close" onClick={onHideModal}>X</button>
    </div>
  );
};

export default Modal;
