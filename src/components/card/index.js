/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react'
import { Link } from 'react-router-dom';

const PokeCard = ({pokemon, isPokedex, owned}) => {

  return (
    <Link to={'/detail/' + pokemon.name} css={css`
        color: black;
        &:hover {
            color: black;
            text-decoration: none;
        }
    `}>
        <div className="pokecard" css={css`
            height: 150px;
            background: #D2FFC4;
            border-radius: 20px;
            margin-bottom: 25px;
            padding: 15px 20px;
            position: relative;
            overflow: hidden;
        `}>
            <h3 css={css`
                font-size: 18px;
                text-transform: capitalize;
                @media (min-width: 720px) {
                    font-size: 24px;
                }
            `}>
                {pokemon.name}
            </h3>
            <p css={css`
                font-size: 14px;
            `}>
                {(!isPokedex && pokemon.owned && pokemon.owned.length > 0) ? 'Owned: ' + pokemon.owned.length : ''}
                {
                    isPokedex && owned ? '"' + owned.name + '"' : ''
                }
            </p>
            <img
                src={'https://img.pokemondb.net/sprites/bank/normal/' + pokemon.name + '.png'}
                css={css`
                    position: absolute;
                    right: -15px;
                    bottom: -15px;
                `}
            />
            
            
        </div>
    </Link>
  )
}

export { PokeCard };
