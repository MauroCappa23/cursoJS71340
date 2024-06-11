let option;
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
}