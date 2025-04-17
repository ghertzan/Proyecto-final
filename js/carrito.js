let carrito = [];

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

    const containerCarrito = document.getElementById("containerCarrito");
    const carritoStorage = sessionStorage.getItem("carrito");
    carrito = JSON.parse(carritoStorage);

    if (carrito) {
        const table = document.createElement("table");
        table.className = "table table-striped table-hover gh-table";

        table.innerHTML = `
        <caption class="text-light">Total Carrito: $ ${carrito.reduce((acc, e) =>{
            acc += acc + (parseInt(e.articulo.precio) * parseInt(e.cantidad));
            return acc;
        },0)}</caption>
        <thead>
            <tr>
                <th scope="col">POS</th>
                <th scope="col">Descripción</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
            </tr>
        </thead>`;

        const tBody = document.createElement("tbody");
        carrito.forEach(element => {
            const {id, descripcion, precio, ump, stock} = element.articulo;
            
            const tr = document.createElement("tr");
            const th = document.createElement("th")
            th.scope="row";
            th.textContent = carrito.indexOf(element) + 1;

            const tdDescripcion = document.createElement("td");
            tdDescripcion.textContent = descripcion;

            const inputCantidad = document.createElement("input");
            inputCantidad.type="number";
            inputCantidad.className="gh-input";
            inputCantidad.value = element.cantidad;
            inputCantidad.min = "1";
            inputCantidad.max = stock;
            inputCantidad.onchange = () => cambiarCantidad(id, parseInt(inputCantidad.value));

            const tdPrecio = document.createElement("td");
            tdPrecio.textContent = precio;

            const tdTotal = document.createElement("td");
            tdTotal.textContent = parseFloat(precio) * parseFloat(element.cantidad);

            const tdEliminar = document.createElement("button");
            tdEliminar.className ="btn-close";
            tdEliminar.onclick = () => eliminarItem(id);

            tr.append(th, tdDescripcion, inputCantidad, tdPrecio, tdTotal, tdEliminar);
            tBody.appendChild(tr);
            table.appendChild(tBody);
        });


        containerCarrito.appendChild(table);

    } else {
        const pDisplay = document.createElement("p");
        pDisplay.className = "display-3 text-light";
        pDisplay.textContent = "Tu carrito está vacío..."
        containerCarrito.appendChild(pDisplay);
    }

}

verCarritoHtml();