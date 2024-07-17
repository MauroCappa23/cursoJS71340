const games_in = document.querySelector("#games");
const total_container = document.querySelector("#total");

const createNewGame = (game) => {
  const oldGames = JSON.parse(localStorage.getItem("games")) || [];
  oldGames.push(game);
  localStorage.setItem("games", JSON.stringify(oldGames));
};

const appendGames = () => {
  const storedGames = JSON.parse(localStorage.getItem("games")) || [];
  let total = 0;
  games_in.innerHTML = "";
  storedGames.forEach((game, index) => {
    const game_container = document.createElement("article");
    game_container.className = "game";
    game_container.id = `game-${index}`;
    game_container.innerHTML = `
      <div>
        <h3>${game.name}</h3>
        <p>$${game.price}</p>
      </div>
      <button id="btn-${index}" class="btn-delete" type="button">Eliminar</button>
    `;

    games_in.appendChild(game_container);
    total += parseFloat(game.price);
    total_container.textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById(`btn-${index}`).addEventListener("click", () => {
      deleteGame(index);
      Toastify({
        text: "Juego eliminado con exito",
        className: "info",
        style: {
          background: "red",
          textAlign: "center",
        },
        gravity: "bottom",
        duration: 1000,
      }).showToast();
    });
  });
  total_container.textContent = `Total: $${total.toFixed(2)}`;
};
const loadGameInfo = (id) => {
  return fetch("./items.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((games) => {
      return games.find((game) => game.Id == id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
document.querySelectorAll(".btn-add").forEach((button) => {
  button.addEventListener("click", (e) => {
    const gameId = e.target.getAttribute("data-id");
    console.log(gameId);
    loadGameInfo(gameId).then((game) => {
      if (game) {
        createNewGame(game);
        appendGames();
      }
      Toastify({
        text: "Juego agregado al carrito",
        className: "info",
        style: {
          background: "green",
          textAlign: "center",
        },
        gravity: "bottom",
        duration: 1000,
      }).showToast();
    });
  });
});

const deleteGame = (index) => {
  let storedGames = JSON.parse(localStorage.getItem("games")) || [];
  storedGames.splice(index, 1);
  localStorage.setItem("games", JSON.stringify(storedGames));
  appendGames();
};

appendGames();

