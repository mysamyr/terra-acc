import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => (
	<div className="header">
		<h1>Terraria accessories</h1>
		<nav>
			<Link to="/">List</Link>
			<Link to="/new">Add new</Link>
		</nav>
	</div>
);

export default NavBar;
