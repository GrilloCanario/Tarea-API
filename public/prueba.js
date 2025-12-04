const episodios = document.querySelector(".episodios");
const episodio = document.querySelector(".episodio");
const personaje = document.querySelector(".personaje");

episodios.addEventListener("click", () => {
    episodio.classList.remove("oculto");
});

episodio.addEventListener("click", () => {
    personaje.classList.remove("oculto");
});
