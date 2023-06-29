import {
  Routes,
  Route,
} from "react-router-dom";
import Board from "../../pages/board/Board";
import NavBar from "../navbar/NavBar";
import AddAccessory from "../../pages/add/AddAccessory";

import './App.css';

const App = () => (<>
    <NavBar/>
    <Routes>
      <Route path="/new" element={<AddAccessory />}>
        new
      </Route>
      <Route path="/" element={<Board/>} />
    </ Routes>
  </>);

export default App;
