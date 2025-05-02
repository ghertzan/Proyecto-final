function iconoCarrito() {
    const cantidadCarrito = document.getElementById("cantidadArticulos");
    const carritoStorage = sessionStorage.getItem("carrito");
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
    }else{
        btnCarrito.disable = true;
    }
}

function toCurrency(num){
    return new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS"}).format(num);
}

function deleteItem(carrito, item){
    return carrito.filter(e => e !== item);
}

function btnDeleteFromCart(carrito){
    const botones = document.querySelectorAll(".btn-delete-from-cart");

    botones.forEach(boton => {
        boton.onclick = (e) =>{
            const id = e.currentTarget.id;
            carrito = deleteItem(carrito, carrito.find(e => e.item.id == id));
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
        };
    });
}

function getCarritoHtml(carrito){
    let div = document.createElement("div");
    let tabla = document.createElement("table");
    tabla.className = "table gh-table";
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
            <td>
                <button class="btn btn-light btn-sm restar" id="restar-${e.item.id}"> <span> < </span></button>
                <span class="cantidad" id="cantidad-${e.item.id}"> 1 </span>
                <button class="btn btn-light btn-sm sumar" id="sumar-${e.item.id}"> <span> > </span></button>
            </td>
            <td>${toCurrency(e.item.precio)}</td>
            <td>${toCurrency(e.item.precio * e.cantidad)}</td>
            <td><a class="btn btn-delete-from-cart" id=${e.item.id}> X </a></td>
        `;

        tbody.appendChild(tr);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    div.append(tabla);

    return div.innerHTML;
}

