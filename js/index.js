
function iconoCarrito(){
    const cantidadCarrito = document.getElementById("cantidadArticulos");
    const cantidadCarritoStorage = sessionStorage.getItem("cantidadCarrito");

    if(cantidadCarritoStorage){
        cantidadCarrito.innerHTML =  cantidadCarritoStorage;
    }
}

iconoCarrito();