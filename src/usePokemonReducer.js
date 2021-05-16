import { useReducer } from 'react';
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS, FETCH_POKEMON, UPDATE_CAPTURED_POKEMON } from './actions';

const getCapturedPokemons = (capturedPokemons, releasedPokemon) =>
  capturedPokemons.filter(pokemon => pokemon.name !== releasedPokemon.name)

const releasePokemon = (releasedPokemon, state) => ({
  pokemons: state.pokemons,
  capturedPokemons: getCapturedPokemons(state.capturedPokemons, releasedPokemon),
  currentPokemon: state.currentPokemon
});

const updateCapturedPokemon = (capturedPokemons, state) => ({
  pokemons: state.pokemons,
  capturedPokemons: capturedPokemons,
  currentPokemon: state.currentPokemon
})

const setCapturedPokemons = (capturedPokemon, state) => {
  const found = state.capturedPokemons.some(p => p.id === capturedPokemon.id)

  if (!found) {
    state.capturedPokemons.push(capturedPokemon)
    return state.capturedPokemons
  } else {
    let temp = state.capturedPokemons
    let index = parseInt(temp.findIndex(x => x.id === capturedPokemon.id));
    temp[index] = capturedPokemon
    
    return temp
  }
}

const capturePokemon = (pokemon, state) => ({
  pokemons: state.pokemons,
  capturedPokemons: setCapturedPokemons(pokemon, state),
  currentPokemon: state.currentPokemon
});

const addPokemon = (pokemon, state) => ({
  pokemons: [...state.pokemons, pokemon],
  capturedPokemons: state.capturedPokemons
});

const addPokemons = (pokemons, state) => ({
  pokemons: pokemons,
  capturedPokemons: state.capturedPokemons,
  currentPokemon: {}
});

const fetchCurrentPokemon = (pokemon, state) => ({
  pokemons: state.pokemons,
  capturedPokemons: state.capturedPokemons,
  currentPokemon: pokemon
})

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case CAPTURE:
      return capturePokemon(action.pokemon, state);
    case RELEASE:
      localStorage.setItem('pokedex', JSON.stringify(getCapturedPokemons(state.capturedPokemons, action.pokemon)))
      return releasePokemon(action.pokemon, state);
    case ADD_POKEMON:
      return addPokemon(action.pokemon, state);
    case ADD_POKEMONS:
      return addPokemons(action.pokemons, state);
    case FETCH_POKEMON:
      return fetchCurrentPokemon(action.pokemon, state);
    case UPDATE_CAPTURED_POKEMON:
      return updateCapturedPokemon(action.pokemons, state);
    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(pokemonReducer, {
    pokemons: [],
    capturedPokemons: localStorage.getItem('pokedex') ? JSON.parse(localStorage.getItem('pokedex')) : [],
    currentPokemon: {}
  });
