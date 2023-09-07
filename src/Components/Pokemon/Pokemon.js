import React from "react";
import './Pokemon.css';
import {Link} from 'react-router-dom';

function Pokemon({name , url , id}) {
  return (
    <div id="pokemon-card">
      <Link id="Link-pokemon" to={`/pokemon/${id}`}>
      <h1 id="pokemon-name">{name}</h1>
      <img src={url} alt="image" />
      </Link>
    </div>
  )
}

export default Pokemon;
