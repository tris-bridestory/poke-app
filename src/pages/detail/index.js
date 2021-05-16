/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useContext, lazy, useState } from 'react';
import { css, jsx } from '@emotion/react'
import { useParams } from 'react-router-dom';
import { PokemonContext } from '../../PokemonContext';
import { ModalBox } from '../../components/modal';
const PokeTab = lazy(() => import('../tab'));

const url = "https://pokeapi.co/api/v2/pokemon/";

const PokemonDetail = () => {
  const { id } = useParams()
  const [pokemonCapture, setPokemonCapture] = useState();
  const [pokemonName, setPokemonName] = useState();
  const { currentPokemon, capture, fetchCurrentPokemon, capturedPokemons } = useContext(PokemonContext);

  useEffect(() => {
    const fetchPokemon = async (id) => {
        const response = await fetch(url + id);
        const data = await response.json();
        fetchCurrentPokemon(data)
    };

    fetchPokemon(id);
  }, [fetchCurrentPokemon]);

  const capturePokemon = (pokemon) => {
    if (Math.random() < 0.5) {
      const found = capturedPokemons.some(p => p.id === pokemon.id)

      if (!found) {
        let data = {
          id: pokemon.id,
          name: pokemon.name,
          owned: []
        }

        setPokemonCapture(data)

        openModal()
      } else {
        let temp = JSON.parse(localStorage.getItem('pokedex'))
        let index = parseInt(temp.findIndex(x => x.id === pokemon.id));
        setPokemonCapture(temp[index])
        openModal()
      }
    } else {
      alert('failed')
    }
  }

  const openModal = () => {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    
    modal.style.display = "block";

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }
  
  const handleNameOnChange = (e) => {
    setPokemonName(e.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    var validation = document.getElementsByClassName("validation")[0];

    if(localStorage.getItem('pokedex') && JSON.parse(localStorage.getItem('pokedex')).length > 0) {

      let temp = JSON.parse(localStorage.getItem('pokedex'))
      let index = parseInt(temp.findIndex(x => x.id === pokemonCapture.id));

      if (index === -1) {
        updatePokemon()
      } else {
        if (searchKey(pokemonName, temp[index].owned)) {
          validation.style.display = 'block';
        } else {
          updatePokemon()
          validation.style.display = 'none';
        }
      }
    } else {
      updatePokemon()
    }
  }

  const updatePokemon = () => {
    var modal = document.getElementById("myModal");
    let data = pokemonCapture

    data.owned.push({
      name: pokemonName
    })

    setPokemonCapture(data)
    setPokemonName('')

    capture(data)

    localStorage.setItem('pokedex', JSON.stringify(capturedPokemons))
    modal.style.display = "none";
  }

  const searchKey = (object, arrayObj) => {
    for (var i=0; i < arrayObj.length; i++) {
      if (arrayObj[i].name === object) {
        return true
      }
    }

    return false
  }

  return (
    <div>
      <h2>Pokemon Detail</h2>
      <PokeTab />
      <img alt={currentPokemon && currentPokemon.name} src={currentPokemon && currentPokemon.sprites && currentPokemon.sprites.front_default}></img>
      <h3>{currentPokemon && currentPokemon.name}</h3>
      <p>Moves</p>
      <ul>
        {
          currentPokemon && currentPokemon.moves && currentPokemon.moves.map((move) => (
            <li key={move.move.name}>
              {move.move.name}
            </li>
          ))
        }
      </ul>
      <p>Types</p>
      <ul>
        {
          currentPokemon && currentPokemon.types && currentPokemon.types.map((type) => (
            <li key={type.type.name}>
              {type.type.name}
            </li>
          ))
        }
      </ul>
      <button onClick={() => capturePokemon(currentPokemon)}>Catch Pokemon</button>
      <ModalBox onChange={handleNameOnChange.bind(this)} onSubmit={submitForm.bind(this)} />
      {/* <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h2>Modal Header</h2>
          </div>
          <div className="modal-body">
            <form onSubmit={submitForm}>
              <label>
                Enter Nickname
                <input type="text" placeholder="Insert pokemon name" onChange={handleNameOnChange} />
              </label>
              <input type="submit" value="Submit" />
              <span style={{color:'red',display:'none'}} className="validation">Name is already taken</span>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default PokemonDetail;
