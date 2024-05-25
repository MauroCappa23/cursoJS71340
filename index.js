let option;
let total = 0;
function calcularTax(precio, tax){
    let impuesto = precio * (tax / 100); 
    return precio + impuesto;
}
alert("Bienvenido a GameAddict");
while (option != 0){
    option = prompt("1. Quieres agregar un nuevo juego al carrito \n 0. Salir");
   
    if (option == 1){
        const juego = prompt("Nombre del juego que quisieras agregar");
        const precio = Number(prompt("Agregue el precio del juego"));
        total += precio;
        console.log("Su total es: " + juego + " $" + precio);
    }
    else if (option == 0){
        let finalSale = calcularTax(total, 7);
        alert("Su compra total con Taxes: $" + finalSale);
        alert("Vuelva Pronto!")
    }
    else{
        alert("Ingrese una opcion valida")
    }
}