import { useContext } from 'react';
import SnackbarContext from '../Snackbar/context.js';

import './Snackbar.css';

const Snackbar = () => {
  const snackbarCtx = useContext(SnackbarContext);
  return (
    <div className="snackbar-container">
      <div className="snackbar-label">{snackbarCtx.msg}</div>
      <div className="snackbar-dismiss" onClick={snackbarCtx.onClose}>
        &times;
      </div>
    </div>
  );
};

export default Snackbar;
