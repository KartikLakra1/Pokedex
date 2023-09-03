import axios from "axios";
import React, { useState } from "react";
import  { useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css';

function PokemonList() {
    const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon";

    const [pokemonList , setpokemonList] = useState([]); 

    async function downloadPokemon(){
        const res = await axios.get(POKEDEX_URL);
        
        const pokemonResults = res.data.results; //array of pokemon

        const pokemonPromise = pokemonResults.map((ele) => axios.get(ele.url));

        const pokemonListdata = await axios.all(pokemonPromise);

        const pokemonfinallist = pokemonListdata.map(pokemondata => {
           const pokemon = pokemondata.data;
            return {
                id : pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        });
        
        setpokemonList(pokemonfinallist);
    }

    useEffect(() =>{
        downloadPokemon();
    } , []);

  return (
    <div className="pokemon-list-wrapper">
        <h1>Pokemon List</h1>
        <div className="pokemon-list">
        {pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} />)};
        </div>
    </div>
  )
}

export default PokemonList;
