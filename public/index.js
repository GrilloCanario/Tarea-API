const episodios = document.querySelector(".episodios");
const episodio = document.querySelector(".episodio");
const personaje = document.querySelector(".personaje");

//- EL CÓDIGO COMENTADO ES UN INTENTO FALLIDO DE UTILIZAR LOCAL.STORAGE
// const LS_EPISODE = "selectedEpisode";
// const LS_CHARACTER = "selectedCharacter";

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

// (async () => {
//     await loadEpisodes();
//     restoreSelection();
// })()

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
    // localStorage.setItem(LS_EPISODE, id);

    episodeInfo.innerHTML = `
        <p><strong>Título:</strong> ${episodio.name}</p>
        <p><strong>Episodio:</strong> ${episodio.episode}</p>
        <p><strong>Fecha de emisión:</strong> ${episodio.air_date}</p>
        <p><strong>Personajes en el episodio:</strong> ${episodio.characters.length}</p>
    
    `;
    const idcharslist = episodio.characters.map(char => char.slice(42));
    let response = await fetch('https://rickandmortyapi.com/api/character/' + idcharslist.join(","));
    if (!response.ok) {
        throw new Error('Error en la red');
    }
    let characters = await response.json();

    //characterList.textContent = "";
    characterList.innerHTML = '<option disabled selected>Elige un personaje...</option>';
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

    // localStorage.setItem(LS_CHARACTER, id);

    // petición a la API
    const response = await fetch('https://rickandmortyapi.com/api/character/' + id);
    const character = await response.json();

    // mostramos en el div de personaje
    characterInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${character.name}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Especie:</strong> ${character.species}</p>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Origen:</strong> ${character.origin.name}</p>
        <p><strong>Ubicación Actual:</strong> ${character.location.name}</p>
        <p><img src="${character.image}"/></p>
    `;

});

// function restoreSelection() {
//     const savedEpisode = localStorage.getItem(LS_EPISODE);
//     const savedCharacter = localStorage.getItem(LS_CHARACTER);

//     if (savedEpisode) {
//         episodesList.value = savedEpisode;
//         episodesList.dispatchEvent(new Event("change"));
//     }

//     if (savedCharacter) {
//         setTimeout(() => {
//             characterList.value = savedCharacter;
//             characterList.dispatchEvent(new Event("change"));
//         }, 500);
//     }
// }


// clearStorage.addEventListener("click", () => {
//     localStorage.removeItem("selectedEpisode");
//     localStorage.removeItem("selectedCharacter");
//     location.reload();
// });
clearStorage.addEventListener("click", () => {
    const p = document.createElement("p");
    p.textContent = `No funciona el guardado de selección.`;

    episodios.append(p);
});