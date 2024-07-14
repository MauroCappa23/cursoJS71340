/*let option;
let total = 0;
function calcularTax(precio, tax){
    let impuesto = precio * (tax / 100); 
    return precio + impuesto;
}
let elementos = [];
alert("Bienvenido a GameAddict");
let nombre = prompt("Cual es tu nombre");
alert("Hola, " + nombre);
while (option != 0){
    option = prompt("1. Quieres agregar un nuevo juego al carrito \n 2. Eliminar un juego del carrito \n 0. Salir");
    if (option == 1){
        const juego = prompt("Nombre del juego que quisieras agregar");
        const precio = Number(prompt("Agregue el precio del juego"));
        total += precio;
        console.log("Juego agregado: " + juego + " $" + precio);
        elementos.push({juego: juego, precio: precio})
    }
    else if (option == 2){
        let juegoEliminado = prompt("Nombre del juego que quisieras eliminar");
        let precioEliminado = Number(prompt("Agregue el precio del juego a eliminar"));
        total -= precioEliminado;
        console.log("Juego removido: " + juegoEliminado + " $" + precioEliminado);
        elementos = elementos.filter((elemento) => elemento.juego !== juegoEliminado)
    }
    else if (option == 0){
        let finalSale = calcularTax(total, 7);
        let elementosTotales = elementos.map(elemento => elemento.juego + " $" + elemento.precio);
        alert((elementosTotales.join("\n")) + "\nSu compra total con Taxes: $" + finalSale.toFixed(2));
        alert("Vuelva Pronto!")
    }
    else{
        alert("Ingrese una opcion valida")
    }
}*/

//const games_form = document.querySelector('#add-game');
const games_in = document.querySelector("#games");
const total_container = document.querySelector("#total");
const btn = document.querySelector(".btn-add");

/*let games = JSON.parse(localStorage.getItem('games')) == null
? localStorage.setItem('games', JSON.stringify([]))
: JSON.parse(localStorage.getItem('games'));
games = JSON.parse(localStorage.getItem('games')) || [];

/*const createNewGame = (game) => {
    const old_games = JSON.parse(localStorage.getItem('games')) || [];
    old_games.push(game);
    localStorage.setItem('games', JSON.stringify(old_games));;
}*/

const createNewGame = (game) => {
  const oldGames = JSON.parse(localStorage.getItem("games")) || [];
  oldGames.push(game);
  localStorage.setItem("games", JSON.stringify(oldGames));
};

const appendGames = () => {
  games_in.innerHTML = "";
  const storedGames = JSON.parse(localStorage.getItem("games")) || [];
  let total = 0;
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
/*const appendGames = () => {
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];
    let total = 0;
    storedGames.forEach((game) => {
        total += parseFloat(game.price);
    });
    total_container.textContent = `Total: $${total.toFixed(2)}`;
}

       /* games.forEach((game) => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
              <h3>${game.description}</h3>
              <p>$${parseFloat(game.price).toFixed(2)}</p>
              <button class="btn-add" data-id="${game.id}" data-description="${game.description}" data-price="${game.price}">Agregar al carrito</button>
          `;
          gamesContainer.appendChild(card);
      })*/
const loadGameInfo = (id) => {
  return fetch("./items.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((games) => {
      return games.find((game) => game.id == id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
document.querySelectorAll(".btn-add").forEach((button) => {
  button.addEventListener("click", (e) => {
    //const card = e.target.closest(".card");
    const gameId = e.target.getAttribute("#data-id");
    loadGameInfo(gameId).then((game) => {
      if (game) {
        createNewGame(game);
        appendGames();
        /* games.forEach((item) => {
                createNewGame(item);
                appendGames()
              })
            });
           
            appendGames();*/
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

/*fetch("Users/abaro/Desktop/CursoProgramacion/JS_Coder/PrimeraPreEntrega/items.json")
  .then((res) => res.json)
  .then((games) => console.log(games));*/

appendGames();

/*games_form.addEventListener('submit', (e) => {
  e.preventDefault();
  const game = {
    description: e.target[0].value,
    price: e.target[1].value,
  };

  createNewGame(game);
  appendGames();
  games_form.reset();
});

appendGames();*/
