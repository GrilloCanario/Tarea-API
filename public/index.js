const episodios = document.querySelector(".episodios");
const episodio = document.querySelector(".episodio");
const personaje = document.querySelector(".personaje");

//* -------------- OCULTAR EPISODIO Y PERSONAJE --------------
episodios.addEventListener("change", () => {
    episodio.classList.remove("oculto");
});

episodio.addEventListener("change", () => {
    personaje.classList.remove("oculto");
});

//* Listado de Capitulos
const episodesList = document.getElementById('episode-list');
const episodeInfo = document.getElementById('episode-info');
const characterList = document.getElementById('character-list');
const characterInfo = document.getElementById('character-info');
const clearStorage = document.getElementById('clear-storage');

const epsTotal = [];
loadEpisodes();
async function loadEpisodes() {
    try {
        let url = 'https://rickandmortyapi.com/api/episode';
        while (url) {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            let episodes = await response.json();
            epsTotal.push(...episodes.results);
            episodes.results.forEach(episode => insertEpisodes(episode));
            url = episodes.info.next;
        }
    } catch (error) {
        console.log('Error en loadEpisodes: ', error);
    }
}
function insertEpisodes(episode) {
    const option = document.createElement('option');
    option.textContent = `${episode.episode} - ${episode.name}`;
    option.value = episode.id
    episodesList.append(option);
}

//* Info del capitulo escogido
episodesList.addEventListener("change", async () => {
    const id = episodesList.value;
    const episodio = epsTotal.find(ep => ep.id == id);

    if (!episodio) {
        return;
    }
    episodeInfo.innerHTML = `
        <p><strong>Título:</strong> ${episodio.name}</p>
        <p><strong>Episodio:</strong> ${episodio.episode}</p>
        <p><strong>Fecha de emisión:</strong> ${episodio.air_date}</p>
        <p><strong>Personajes en el episodio:</strong> ${episodio.characters.length}</p>
    
    `;
    const idcharslist = episodio.characters.map(pito => pito.slice(42));
    let response = await fetch('https://rickandmortyapi.com/api/character/' + idcharslist.join(","));
    if (!response.ok) {
        throw new Error('Error en la red');
    }
    let characters = await response.json();
    
    characterList.textContent="";
    characters.forEach(character => {
        insertCharacters(character);
    });
    
});

function insertCharacters(character) {
    const option = document.createElement('option');
    option.value = character.id;
    option.textContent = character.name;
    characterList.append(option);
   
}
characterList.addEventListener("change", async () => {
    const id = characterList.value; 

    // petición a la API
    const response = await fetch('https://rickandmortyapi.com/api/character/' + id);
    const character = await response.json();

    // mostramos en el div de personaje
    characterInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${character.name}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Especie:</strong> ${character.species}</p>
        <p><img src="${character.image}" width="200"/></p>
    `;
    characterList.addEventListener("change", async () => {
    const id = characterList.value;

   
});

});
