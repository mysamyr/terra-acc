import './Header.css';
import Search from '../../../../components/search';

const Header = ({ string, setString, header }) => (
  <div className="board-header">
    <h2>{header}</h2>
    <Search string={string} setString={setString} />
  </div>
);

export default Header;
