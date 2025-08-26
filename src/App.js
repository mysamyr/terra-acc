import { useContext } from 'react';
import { Routes, Route } from 'react-router';
import Board from './pages/board/index.js';
import AddAccessory from './pages/add/index.js';
import NavBar from './components/Navbar/index.js';
import Snackbar from './components/Snackbar/index.js';
import SnackbarContext from './components/Snackbar/context.js';
import { BOARD_CONFIGS } from './enums/index.js';

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
