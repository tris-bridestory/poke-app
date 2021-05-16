import React, { lazy, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { PokemonContext } from '../../PokemonContext';
import { PokeCard } from '../../components/card';
const PokeTab = lazy(() => import('../tab'));

const Pokedex = () => {
  const { capturedPokemons, release, updateCapturedPokemon } = useContext(PokemonContext);

  const releasePokemon = (pokemon, release) => {
    let updated = pokemon.owned.filter(own => own.name !== release.name)
    pokemon.owned = updated
    
    let temp = JSON.parse(localStorage.getItem('pokedex'))
    let index = parseInt(temp.findIndex(x => x.id === pokemon.id));

    if (pokemon.owned.length > 0) {
      temp[index] = pokemon
    } else {
      temp.splice(index, 1)
    }

    localStorage.setItem('pokedex', JSON.stringify(temp))
    updateCapturedPokemon(temp)
  }

  return (
    <div>
      <h2>Pokedex</h2>
      <PokeTab />
      {
        capturedPokemons && capturedPokemons.map((pokemons) => (
          <Row key={pokemons.name}>
            {
              pokemons.owned.map((pokemon, idx) => (
                <Col xs={6} md={3} key={idx}>
                  <PokeCard pokemon={pokemons} isPokedex={true} owned={pokemon} />
                  <button onClick={() => releasePokemon(pokemons, pokemon)}>Release Pokemon</button>  
                </Col>
              ))
            }
            
          </Row>
        ))
      }
    </div>
  )
}

export default Pokedex;
