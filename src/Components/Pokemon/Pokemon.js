import React from "react";
import './Pokemon.css';

function Pokemon({name , url}) {
  return (
    <div id="pokemon-card">
        <h1>{name}</h1>
        <img src={url} alt="image" />
    </div>
  )
}

export default Pokemon;
