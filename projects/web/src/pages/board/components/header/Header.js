import "./Header.css";
import Search from "../../../../components/search/Search";

const Header = ({ string, setString }) => {
	return (
		<div className="board-header">
			<h2>Accessories List</h2>
			<Search string={string} setString={setString} />
		</div>
	);
};

export default Header;
