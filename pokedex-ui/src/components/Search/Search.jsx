import React from 'react';

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchTerm}
        onChange={setSearchTerm}
      />
    </div>
  );
}

export default Search;
