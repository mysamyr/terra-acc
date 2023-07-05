import {Component} from "react";

import "./Modal.css";

class Modal extends Component {
  _handleClickModalWrapper = (e) => {
    if (e.target.className === "modal-wrapper") {
      this.props.onHideModal();
    }
  }

  _handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onHideModal();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this._handleKeyDown);
  }


  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  render() {
    return (
      <div className="modal-wrapper" onClick={this._handleClickModalWrapper}>
        <div className="modal">
          {this.props.children}
          <button id="close" onClick={this.props.onHideModal}>&times;</button>
        </div>
      </div>
    );
  }
}

export default Modal;
