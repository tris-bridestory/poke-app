import React, { createContext, useCallback } from 'react';
import { usePokemonReducer } from './usePokemonReducer';
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS, FETCH_POKEMON, UPDATE_CAPTURED_POKEMON } from './actions';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons, capturedPokemons, currentPokemon } = state;

  const capture = useCallback((pokemon) => dispatch({ type: CAPTURE, pokemon }), [dispatch]);
  const release = (pokemon) => () => dispatch({ type: RELEASE, pokemon });
  const addPokemon = (pokemon) => dispatch({ type: ADD_POKEMON, pokemon });
  const addPokemons = useCallback((pokemons) => dispatch({ type: ADD_POKEMONS, pokemons }), [dispatch]);
  const fetchCurrentPokemon = useCallback((pokemon) => dispatch({ type : FETCH_POKEMON, pokemon }), [dispatch]);
  const updateCapturedPokemon = useCallback((pokemons) => dispatch({ type : UPDATE_CAPTURED_POKEMON, pokemons }), [dispatch])

  const providerValue = {
    pokemons,
    capturedPokemons,
    currentPokemon,
    capture,
    release,
    addPokemon,
    addPokemons,
    fetchCurrentPokemon,
    updateCapturedPokemon
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  )
};

export { PokemonContext, PokemonProvider };
