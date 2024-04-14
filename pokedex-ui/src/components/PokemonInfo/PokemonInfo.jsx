import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokedex } from 'pokeapi-js-wrapper';
import ClipLoader from 'react-spinners/ClipLoader';
import './PokemonInfo.css';

const P = new Pokedex();

function PokemonInfo() {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    P.getPokemonByName(pokemonName)
      .then(data => {
        setPokemonDetails(data);
        const idMatch = data.species.url.match(/\/(\d+)\/?$/);
        const pokemonId = idMatch ? idMatch[1] : null;

        if (pokemonId) {
          P.getCharacteristic(pokemonId)
            .then(characteristicData => {
              const engDescriptionEntry = characteristicData.descriptions.find(desc => desc.language.name === 'en');
              if (engDescriptionEntry) {
                setPokemonDescription(engDescriptionEntry.description);
              } else {
                setPokemonDescription('No English description available.');
              }
            })
            .catch(error => {
              console.error(`Could not fetch characteristic data for ID ${pokemonId}`, error);
              setPokemonDescription('Error fetching description.');
            });
        } else {
          console.error('Pokemon ID could not be extracted from URL');
          setPokemonDescription('Error fetching description.');
        }
      })
      .catch(error => {
        console.error("Could not fetch pokemon data", error);
        setPokemonDetails(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pokemonName]);

  if (loading) {
    return <ClipLoader color="#000000" loading={loading} size={80} />;
  }

  if (!pokemonDetails) {
    return <div className="pokemon-info">No data found.</div>;
  }

  return (
    <div className="pokemon-info">
      <img src={pokemonDetails.sprites.other['official-artwork'].front_default} alt={pokemonDetails.name} />
      <div className="pokemon-details">
        <h1 className="pokemon-name">{pokemonDetails.name.toUpperCase()} #{pokemonDetails.id}</h1>
        <div className="descriptions">
          <h2>Description</h2>
          <p className="description">{pokemonDescription}</p>
        </div>
        <div className="descriptions">
          <h2>Abilities</h2>
          <span>{pokemonDetails.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</span>
        </div>
        <div className="descriptions">
          <h2>Stats</h2>
          {pokemonDetails.stats.map(stat => (
            <div className="description" key={stat.stat.name}>
              <span>{stat.stat.name.replace('-', ' ')}</span>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </div>
        <div className="descriptions">
          <h2>Moves</h2>
          {pokemonDetails.moves.slice(0, 4).map(moveInfo => (
            <div className="description" key={moveInfo.move.name}>{moveInfo.move.name}</div>
          ))}
        </div>
        <div className="descriptions">
          <h2>Types</h2>
          {pokemonDetails.types.map(typeInfo => (
            <span className="description" key={typeInfo.type.name}>{typeInfo.type.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
