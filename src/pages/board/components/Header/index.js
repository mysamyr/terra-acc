import Search from '../../../../components/Search/index.js';

import './Header.css';

const Header = ({ header }) => (
  <div className="board-header">
    <h2>{header}</h2>
    <Search />
  </div>
);

export default Header;
