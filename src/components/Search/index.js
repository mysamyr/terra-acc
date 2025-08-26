import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import './Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchString = useMemo(
    () => searchParams.get('search') || '',
    [searchParams]
  );

  const handleOnChange = useCallback(
    e => {
      const params = e.target.value ? { search: e.target.value } : {};
      setSearchParams(params);
    },
    [setSearchParams]
  );

  return (
    <input
      className="search-input"
      type="search"
      placeholder={'Search...'}
      onChange={handleOnChange}
      value={searchString}
    />
  );
};

export default Search;
