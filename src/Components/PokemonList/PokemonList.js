import axios from "axios";
import React, { useState } from "react";
import  { useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css';

function PokemonList() {

    const DEFAULT = "https://pokeapi.co/api/v2/pokemon";


    const [pokedexUrl , setpokedexUrl] = useState(DEFAULT);
    const [pokemonList , setpokemonList] = useState([]); 
    const [nextUrl , setnextUrl] = useState(DEFAULT);
    const [prevUrl , setprevUrl] = useState(DEFAULT);

    async function downloadPokemon(){
        const res = await axios.get(pokedexUrl ? pokedexUrl : DEFAULT);
        
        const pokemonResults = res.data.results; //array of pokemon

        setnextUrl(res.data.next);
        setprevUrl(res.data.previous);

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
    } , [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
        <h1 id="pokemon-list">Pokemon List</h1>
        <div className="page-controls">
            <button onClick={() => setpokedexUrl(prevUrl)}>Prev</button>
            <button onClick={() => setpokedexUrl(nextUrl)}>Next</button>
        </div>
        <div className="pokemon-list">
        {pokemonList.map(pokemon => <Pokemon name={pokemon.name} key={pokemon.id} url={pokemon.image} />)};
        </div>
    </div>
  )
}

export default PokemonList;
