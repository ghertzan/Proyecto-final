function iconoCarrito() {
    const cantidadCarrito = document.getElementById("cantidadArticulos");
    const carritoStorage = sessionStorage.getItem("carrito");
    const cantidadCarritoStorage = sessionStorage.getItem("cantidadCarrito");
    const btnCarrito = document.getElementById("btnCarrito");

    if (carritoStorage) {
        let carrito = JSON.parse(carritoStorage);
        cantidadCarrito.innerHTML = carrito.length; 
        btnCarrito.onclick = () => {  
            Swal.fire({
                title: "<h6 class='display-6'> Tu Compra...</h6>",
                html: getCarritoHtml(carrito),
                theme: 'dark',
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        };
    }
}

function getCarritoHtml(carrito){
    let div = document.createElement("div");
    let tabla = document.createElement("table");
    tabla.className = "table";
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    thead.innerHTML = `
        <tr>
            <th scope="col">Pos</th>
            <th scope="col">Art.</th>
            <th scope="col">Cant.</th>
            <th scope="col"> $ </th>
            <th scope="col">Total</th>
            <th scope="col">  </th>
        </tr>
    `;

    carrito.forEach(e => {
        const tr = document.createElement("tr");
        tr.innerHTML= `
            <th scope="row">${carrito.indexOf(e) + 1}</th>
            <td>${e.item.descripcion}</td>
            <td>${e.cantidad}</td>
            <td>${e.item.precio}</td>
            <td>${e.item.precio * e.cantidad}</td>
            <td><a id="eliminarDelCarrito" class="btn"> X </a></td>
        `;

        tbody.appendChild(tr);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    div.append(tabla);

    return div.innerHTML;
}