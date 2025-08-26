import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Board from '../../pages/board';
import AddAccessory from '../../pages/add';
import NavBar from '../navbar';
import Snackbar from '../snackbar';
import SnackbarContext from '../store/snackbar-context';
import { BOARD_CONFIGS } from '../../enums';

import './App.css';

const App = () => {
  const snackbarCtx = useContext(SnackbarContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/new" element={<AddAccessory />} />
        <Route path="/potions" element={<Board {...BOARD_CONFIGS.POTION} />} />
        <Route path="/" element={<Board {...BOARD_CONFIGS.ACCESSORY} />} />
      </Routes>
      {snackbarCtx.isDisplayed && <Snackbar />}
    </>
  );
};

export default App;
