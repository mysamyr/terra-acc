import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => (
	<div className="header">
		<h1>TERRA HELPER</h1>
		<nav>
			<Link to="/">Accessories</Link>
			<Link to="/potions">Potions</Link>
			<Link to="/new">Add new</Link>
		</nav>
	</div>
);

export default NavBar;
