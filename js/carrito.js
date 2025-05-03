
function createCartView(){
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
                <h5>${e.item.descripcion}</h5>
                <h5>${e.cantidad}</h5>
                <h5>${e.item.precio}</h5>
                
            `;
            cartContainerDiv.appendChild(cartItemDiv);
        });
    }
}

createCartView();