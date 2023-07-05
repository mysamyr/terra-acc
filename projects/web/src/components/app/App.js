import {useContext} from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Board from "../../pages/board/Board";
import AddAccessory from "../../pages/add/AddAccessory";
import NavBar from "../navbar/NavBar";
import SnackbarContext from "../store/snackbar-context";
import Snackbar from "../snackbar/Snackbar";

import './App.css';

const App = () => {
  const snackbarCtx = useContext(SnackbarContext);
  return <>
    <NavBar/>
    <Routes>
      <Route path="/new" element={<AddAccessory />}>
        new
      </Route>
      <Route path="/" element={<Board/>} />
    </ Routes>
    {snackbarCtx.isDisplayed && <Snackbar />}
  </>
};

export default App;
