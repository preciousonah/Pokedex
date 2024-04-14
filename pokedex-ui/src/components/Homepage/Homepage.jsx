import React, { useEffect, useState } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import Navbar from "../Navbar/Navbar";
import PokemonCard from '../PokemonCard/PokemonCard';
import './Homepage.css';

const options = {
  protocol: 'https',
  versionPath: '/api/v2/',
  cache: true,
  timeout: 5 * 1000
}
const P = new Pokedex(options);

function Homepage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(60);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    P.getPokemonsList({ limit: itemsPerPage, offset })
      .then(response => {
        setPokemonList(response.results);
        setTotalPokemon(response.count);
      })
      .catch(error => console.error("Error fetching Pokemon list: ", error));
  }, [currentPage, itemsPerPage]);
  
  const totalPages = Math.ceil(totalPokemon / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1));
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  const handleSearchClick = () => {
    setSearchTerm(searchInput);
  };

  const handleCancelSearch = () => {
    setSearchTerm('');
    setSearchInput('');
  };

  const filteredPokemonList = searchTerm
    ? pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : pokemonList;

  const noResults = searchTerm && filteredPokemonList.length === 0;

  return (
    <div className="home">
      <Navbar
        searchTerm={searchInput}
        onSearch={handleSearchClick}
        onCancel={handleCancelSearch}
        onSearchInputChange={handleSearchChange}
      />

      <div className="pokemon-grid">
        {filteredPokemonList.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
        ))}
        {noResults && <div className="no-results">No results found.</div>}
      </div>

      {!noResults && (
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Homepage;
