let carrito = [];


function iconoCarrito(){
    const cantidadCarrito = document.getElementById("cantidadArticulos");
    const cantidadCarritoStorage = sessionStorage.getItem("cantidadCarrito");

    if(cantidadCarritoStorage){
        cantidadCarrito.innerHTML =  cantidadCarritoStorage;
    }
}

function htmlClear(){
    const containerCarrito = document.getElementById("containerCarrito");
    containerCarrito.innerHTML=``;
}

function eliminarItem(id){
    carrito = carrito.filter(e => e.articulo.id != id);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    verCarritoHtml();
}

function cambiarCantidad(id, cant){
    
    carrito.forEach( e =>{
        if(e.articulo.id == id){
            e.cantidad = cant;
        }
    })
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    verCarritoHtml();
}


function verCarritoHtml() {

    htmlClear();
    iconoCarrito();

    const containerCarrito = document.getElementById("containerCarrito");
    const carritoStorage = sessionStorage.getItem("carrito");
    carrito = JSON.parse(carritoStorage);

    

}
verCarritoHtml();