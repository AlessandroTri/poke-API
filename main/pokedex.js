const pokedex$$ = document.querySelector("#pokedex");
console.log(pokedex$$);

//2º paso creo funcion donde me los voy a traer
const get = async (url) => {
  try {
    const respuesta = await fetch(url);
    const resjson = await respuesta.json();
    console.log(resjson);
    return resjson;
  } catch (error) {
    console.log(error);
  }
};

//3ºcrear variable map que reciba character.
const mapear = (characters) => {
  return characters.map(character => ({
    nombre: character.name,
    imagen: character.sprites.other.home.front_default,
    types: character.types,
    id: character.id,
  }));
};

//4º crear funcion pintar para meter todos los elementos en el html
const pintar = (characters) => {
  for (const character of characters) {
    const characterdiv$$ = document.createElement("div");
    let html = `
<div class="tarjeta">
<div class="barrtop">
    <p class="idpoke">${character.id}</p>
    <h3 class="namepoke">${character.nombre}</h3>
    <img class="imgpoke" src="" alt="">
</div>

<div class="imagepoke">
    <img src="${character.imagen}" alt="">
</div>
<div class="buttompoke">`;
    for (const iterator of character.types) {
      html += `<div class="cajapoke"><p class="typepoke">${iterator.type.name}</p>`;
      html += `<img class="imgtype" src="./img/${iterator.type.name}.png" alt=""></div>`;
    }
   


    characterdiv$$.innerHTML = `</div> </div>` + html;
    pokedex$$.appendChild(characterdiv$$);
  }
};

// console.log(character);

//1º paso traer informacion

const init = async () => {
  
  const pokeall = [];
  
  for (let i = 1; i <= 151; i++) {
    const characters = await get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    // console.log(characters);
    pokeall.push(characters);
    
    //console.log(characterMapeados);
  }
 const characterMapeados = mapear(pokeall);
 // console.log(characterMapeados);

  pintar(characterMapeados);
};

init();
