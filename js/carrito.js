function clearCartView(){
    const cartContainerDiv = document.getElementById("containerCarrito");
    cartContainerDiv.innerHTML = ""; // Limpiar el contenedor del carrito
}


function createCartView(){
    clearCartView();
    iconoCarrito();
    const cartContainerDiv = document.getElementById("containerCarrito");
    const cartStorage = sessionStorage.getItem("cart");
    if(!cartStorage){
        Swal.fire({
            title: "Tu compra...",
            text: "El carrito está vacío...",
            icon: "question"
          });
    }else{
        let cart = JSON.parse(cartStorage);
        cart.forEach(e => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.className = "cart-item";
            cartItemDiv.innerHTML = `
                <img src=${e.item.img}>
                <h5 class="texto-carrito">${e.item.descripcion}</h5>
                <h5 class="texto-carrito">${toCurrency(e.item.precio)}</h5>
                <h5 class="texto-carrito">${toCurrency(e.cantidad * e.item.precio)}</h5>
                <div>
                    <button class="btn resta"> < </button>
                    <span class="cantidad-item-carrito texto-carrito"> ${e.cantidad} </span>
                    <button class="btn suma"> > </button>
                </div>
            `;
            cartContainerDiv.appendChild(cartItemDiv);
            const btnRestar = cartItemDiv.querySelector(".resta");
            const btnSumar = cartItemDiv.querySelector(".suma");
            btnSumar.onclick = () => {
                addToCart(e.item, 1);
                createCartView();     
            };
            btnRestar.onclick = () => {
                removeFromCart(e.item, 1);
                createCartView();
            }
            
        });
        const footerDiv = document.createElement("div");
        footerDiv.className = "cart-footer";
        footerDiv.innerHTML = `
            <h5 class="texto-carrito">Total del carrito: ${toCurrency(cart.reduce((acc, curr) => acc + (curr.item.precio * curr.cantidad), 0))} </h5>
            <button class="btn"> Comprar</button>
            <button class="btn"> Vaciar carrito</button>
            `;
        cartContainerDiv.appendChild(footerDiv); 
        
    }
}

createCartView();