import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Navbar.css';

function Navbar({ searchTerm, onSearch, onCancel, onSearchInputChange }) {
  const [searchInput, setSearchInput] = useState(searchTerm);
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    onSearchInputChange(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchInput);
  };

  const handleCancelClick = () => {
    setSearchInput('');
    onCancel();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Pokedex</div>
      <div className="search-container">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e)}
          className="search-input"
          placeholder="Search Pokémon"
        />
        <button onClick={handleSearchClick} className="search-button">Search</button>
        <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
      </div>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </nav>
  );
}

export default Navbar;
