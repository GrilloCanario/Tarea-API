const episodios = document.querySelector(".episodios");
const episodio = document.querySelector(".episodio");
const personaje = document.querySelector(".personaje");

episodios.addEventListener("change", () => {
    episodio.classList.remove("oculto");
});

episodio.addEventListener("change", () => {
    personaje.classList.remove("oculto");
});

// Listado de Capitulos
        const episodesList = document.getElementById('episode-list');
        const episodeInfo = document.getElementById('episode-info');
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

        episodesList.addEventListener('change', async() => {
            const id = episodesList.value;

        });