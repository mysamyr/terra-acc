import { useCallback, useRef, useState } from 'react';
import { CLASS_NAMES, ICON_CODES } from '../../constants';

import './Search.css';

const Search = ({ string, setString }) => {
  const iconRef = useRef();
  const [isSearchOpen, setSearchStatus] = useState(false);

  const handleOpenInput = useCallback(() => {
    if (isSearchOpen) {
      iconRef.current.innerHTML = ICON_CODES.SEARCH;
      iconRef.current.classList.remove(CLASS_NAMES.CLOSE_SEARCH_ICON);
      iconRef.current.classList.add(CLASS_NAMES.SEARCH_ICON);
      setSearchStatus(false);
      setString('');
    } else {
      iconRef.current.innerHTML = ICON_CODES.CLOSE;
      iconRef.current.classList.remove(CLASS_NAMES.SEARCH_ICON);
      iconRef.current.classList.add(CLASS_NAMES.CLOSE_SEARCH_ICON);
      setSearchStatus(true);
    }
  }, [isSearchOpen, setSearchStatus, setString]);
  const handleOnChange = useCallback(
    e => {
      setString(e.target.value);
    },
    [setString]
  );

  return (
    <div className="search-container">
      <div
        ref={iconRef}
        className="icon-button search-icon"
        onClick={handleOpenInput}
      >
        &#x1F50E;&#xFE0E;
      </div>
      {isSearchOpen && (
        <input
          className="search-input"
          type="search"
          onChange={handleOnChange}
          value={string}
        />
      )}
    </div>
  );
};

export default Search;
