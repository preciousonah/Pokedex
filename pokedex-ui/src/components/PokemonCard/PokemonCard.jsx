import React, { useEffect, useState } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import { Link } from 'react-router-dom'; 
import './PokemonCard.css';

const P = new Pokedex();

function PokemonCard({ pokemonUrl }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    P.resource([pokemonUrl])
      .then(response => {
        setPokemonDetails(response[0]);
      })
      .catch(error => console.error("Error fetching Pokemon details: ", error));
  }, [pokemonUrl]);

  if (!pokemonDetails) {
    return (
      <div className="pokemon-card shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    );
  }

  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemonDetails.name}`} className='link'>
        <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
        <p>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</p>
      </Link>
    </div>
  );
}

export default PokemonCard;
