/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useEffect, lazy } from 'react';
import { css, jsx } from '@emotion/react'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../../PokemonContext';
import { PokeCard } from '../../components/card';
const PokeTab = lazy(() => import('../tab'));

const url = "https://pokeapi.co/api/v2/pokemon?limit=151";

const PokemonsList = () => {
    const { pokemons, addPokemons, capturedPokemons } = useContext(PokemonContext);

    useEffect(() => {
        const fetchPokemons = async () => {
            const response = await fetch(url);
            const data = await response.json();

            const result = data.results.map(p => ({ ...p, ...capturedPokemons.find(cp => cp.name === p.name) }));
            addPokemons(result);
        };

        fetchPokemons();
    }, [addPokemons]);

    return (
        <div>
            <h2>Pokemons List</h2>
            <PokeTab />
            <Row>
                {
                    pokemons && pokemons.map((pokemon) => (
                        <Col xs={6} md={3} key={pokemon.name}>
                            <PokeCard pokemon={pokemon} />
                            {/* <Link to={'/detail/' + pokemon.name}><span>{pokemon.name}</span> ({(pokemon.owned && pokemon.owned.length) || '0'})</Link> */}
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default PokemonsList;
