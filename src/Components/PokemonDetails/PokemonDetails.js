import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails(){

  const {id} = useParams();
  const POKEMON_DETIAL_URL = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemon , setpokemon] = useState(null);

  async function downloadPokemon(){
    const response = await axios.get(POKEMON_DETIAL_URL + id);
    const pokemon = response.data;
    setpokemon({
      name : pokemon.name,
      height : pokemon.height,
      weight: pokemon.weight,
      types:pokemon.types,
      image:pokemon.sprites.other.dream_world.front_default
    });
  }

  useEffect(()=>{
    downloadPokemon();
  }, []);
  return (
    pokemon && <div className="pokemon-details-wrapper">
    <div className="return">
    <Link id="pokedex-linking" to={"/"}>
    POKEDEX
    </Link>
    </div>

    <div className="Primary-card">
    
    <div className="card-left">
    
    <div className="pokemon-name">
        {pokemon.name}
    </div>
      
      <div className="pokemon-attri">
        <p> height : <span>{pokemon.height}</span></p>
        <p> weight :  <span>{pokemon.weight}</span></p>
      </div>

      <div className="type-pokemon">
        Type : {pokemon.types.map(t => <span keys={t.type.name}>{t.type.name} </span> )}
      </div>
    </div>


    <div className="card-right">
    <img src={pokemon.image} />
    </div>

    </div>
    </div>
  )
};

export default PokemonDetails;
