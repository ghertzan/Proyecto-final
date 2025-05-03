function iconoCarrito() {
    const cantidadCarrito = document.getElementById("cantidadArticulos");
    const cartStorage = sessionStorage.getItem("cart");
    if (cartStorage) {
        let cart = JSON.parse(cartStorage);
        cantidadCarrito.innerHTML = cart.length;
    }
}

function addToCart(articulo, cant){
    const cartStorage = sessionStorage.getItem("cart");
    let cart = [];
    if(!cartStorage){
        cart = [getNewCartItem(articulo,cant)];
    }else{
        cart = JSON.parse(cartStorage);
        const exist = cart.some(e => e.item.id == articulo.id);
        if(exist){
            cart.forEach(e => {
                if(e.item.id == articulo.id){
                    e.cantidad++;
                }
            })
        }else{
            cart.push(getNewCartItem(articulo,cant));
        }
    }
    try{
        sessionStorage.setItem("cart", JSON.stringify(cart));
        Toastify({
            text: "Añadido al carrito",
            className: "exito",
            style: {
              background: "linear-gradient(to right,#a16d38,#f3cd85)",
            }
          }).showToast();
        iconoCarrito();
    }catch (err){
        Toastify({
            text: err,
            className: "error",
            style: {
              background: "linear-gradient(to right,rgb(241, 21, 14),rgb(25, 26, 23))",
            }
          }).showToast();
    }
}

/*Crea un nuevo item para el carrito*/
function getNewCartItem(articulo, cant){
    const newCartItem = {item: articulo, cantidad: cant};
    return newCartItem;
}

/*Devuelve formato númerico un texto*/
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

iconoCarrito();