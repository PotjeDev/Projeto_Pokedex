import { typeListColor, typeListIcon, typeListColorBack } from "./types.js";

const BASE_URL = "https://pokeapi.co/api/v2/";
let idPrincipal = 1;

async function featchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return response.json();
}

async function getPokemon() {
  try {
    const endpoints = await featchJson(BASE_URL);
    const id = idPrincipal == 0 ? 1 : idPrincipal;
    const pokemon = await featchJson(endpoints.pokemon + "/" + id);
    console.table(pokemon);
    return pokemon;
  } catch (error) {
    console.error(error.message);
    alert("O Pokemon escolido nao existe!");
  }
}

function tipos(pokemon) {
  const tipo = document.getElementById("tipo_container");
  const idH = document.getElementById("id_main");
  const body = document.body;
  tipo.innerHTML = "";

  idH.textContent = "#" + String(pokemon.id).padStart(3, "0");

  body.style.backgroundColor = typeListColorBack[pokemon.types[0].type.name];

  pokemon.types.forEach((t) => {
    const main = document.createElement("section");
    const filho = document.createElement("p");
    const icon = document.createElement("img");

    main.classList = "mainTipo";
    main.style.backgroundColor = typeListColor[t.type.name];

    filho.textContent = t.type.name;
    filho.className = "tipo";

    icon.src = typeListIcon[t.type.name];
    icon.className = "tipoIcon";

    main.appendChild(icon);
    main.appendChild(filho);
    tipo.appendChild(main);
  });
}

async function pokemonInfo() {
  const sprite = document.getElementById("sprite");
  const nome = document.getElementById("nome");
  const id = document.getElementById("id");

  const pokemon = await getPokemon();

  if (!pokemon) return;

  tipos(pokemon); // reutiliza el mismo objeto, sin nueva llamada async
  sprite.src = pokemon.sprites.other["official-artwork"].front_default;
  nome.textContent = pokemon.name;
  id.textContent = "ID: #" + String(pokemon.id).padStart(3, "0");
}

function getIdPokemon() {
  const input = document.getElementById("inputId").value;
  idPrincipal = input;
}

function avancar() {
  if (idPrincipal != 1025) {
    idPrincipal++;
  }
}

function voltar() {
  if (idPrincipal != 1) {
    idPrincipal--;
  }
}

document.addEventListener("DOMContentLoaded", pokemonInfo);
document.getElementById("btnAvancar").addEventListener("click", () => {
  avancar();
  pokemonInfo();
});
document.getElementById("btnVoltar").addEventListener("click", () => {
  voltar();
  pokemonInfo();
});
document.getElementById("btnEntre").addEventListener("click", () => {
  getIdPokemon();
  pokemonInfo();
});
