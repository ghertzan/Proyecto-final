function clearCartView(){
    const cartContainerDiv = document.getElementById("containerCarrito");
    cartContainerDiv.innerHTML = "";
}

function createCartView(){
    clearCartView();
    iconoCarrito();
    const cartContainerDiv = document.getElementById("containerCarrito");
    const cart = getCart();
    if(!cart || cart.length == 0){
        Swal.fire({
            title: "Tu compra...",
            text: "El carrito está vacío...",
            icon: "question"
          });
    }else{
        cart.forEach(e => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.className = "cart-item";
            cartItemDiv.innerHTML = `
                <img src=${e.item.img}>
                <h5 class="texto-carrito">${e.item.descripcion}</h5>
                <div>
                    <button class="btn btn-sm resta"> < </button>
                    <span class="cantidad-item-carrito texto-carrito"> ${e.cantidad} </span>
                    <button class="btn btn-sm suma"> > </button>
                </div>
                <h5 class="texto-carrito">Precio: ${toCurrency(e.item.precio)}</h5>
                <h5 class="texto-carrito">Total: ${toCurrency(e.cantidad * e.item.precio)}</h5>
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
            <button class="btn comprar"> Comprar</button>
            <button class="btn vaciar-carrito"> Vaciar carrito</button>
            `;
        cartContainerDiv.appendChild(footerDiv); 
        const bntVaciar = footerDiv.querySelector(".vaciar-carrito");
        const btnComprar = footerDiv.querySelector(".comprar");
        bntVaciar.onclick = () =>{
            emptyCart();
            createCartView();
        };
        btnComprar.onclick = () => {
            createCheckoutView(cart);
        };
    }
}



createCartView();