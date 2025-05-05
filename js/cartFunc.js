function iconoCarrito() {
    const cantidadCarrito = document.getElementById("cantidadArticulos");
    const cart = getCart();
    if (cart != null) {
        cantidadCarrito.innerHTML = cart.length;
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

/*Devuelve el carrito de la memoria como un Array de Objetos*/
function getCart(){
    const cart = sessionStorage.getItem("cart");
    if(!cart){
        return null;
    }
    return JSON.parse(cart);
}

/*Graba el carrito en la memoria*/
function setCart(cart){
    try{
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }catch(err){
        console.log(err);
    }
}

function emptyCart(){
    setCart([]);
}

function removeFromCart(articulo, cant){
    let cart = getCart();
    cart.forEach(e => {
        if(e.item.id == articulo.id){
            e.cantidad = e.cantidad - cant;
            if(e.cantidad == 0){
                cart = cart.filter( (e) => e.item.id !== articulo.id);
            }
        }
    });
    setCart(cart);
}

function addToCart(articulo, cant){
    let cart = getCart();
    if(!cart || cart.length == 0){
        cart = [getNewCartItem(articulo,cant)];
    }else{
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
    setCart(cart);
    Toastify({
        text: "Añadido al carrito",
        className: "exito",
        style: {
          background: "linear-gradient(to right,#a16d38,#f3cd85)",
        }
      }).showToast();
    iconoCarrito();
}