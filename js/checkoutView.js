function createCheckoutView(cart) {
  clearCartView();
  const cartContainerDiv = document.getElementById("containerCarrito");
  const divCheckout = document.createElement("div");

  divCheckout.className = "row g-5 ";

  const paymentMethodDiv = document.createElement("div");
  const cartResumeDiv = document.createElement("div");

  paymentMethodDiv.className = "col-md-7 col-lg-8";
  cartResumeDiv.className = "col-md-5 col-lg-4 order-md-last";

  paymentMethodDiv.innerHTML = `
        <form class="needs-validation text-light" id="checkout-form" type="submit">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="firstName" name="firstName" placeholder="" value="" required>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="lastName" name="lastName" placeholder="" value="" required>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="tu@example.com" required>             
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="address" name="address" placeholder="" required>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Código postal</label>
              <input type="text" class="form-control" id="zip" name="zip" placeholder="" required>
            </div>
          </div>
          <hr class="my-4">

          
          <h4 class="mb-3">Pago</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethodCC" type="radio" class="form-check-input" value="CC" checked="" required>
              <label class="form-check-label" for="credit">Tarjeta de crédito</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethodCC" type="radio" class="form-check-input" value="DC" required>
              <label class="form-check-label" for="debit">Tarjeta de débito</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Nombre en la tarjeta</label>
              <input type="text" class="form-control" id="cc-name" name="ccName" placeholder="Tal como figura en la tarjeta" required>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Número de tarjeta de crédito</label>
              <input type="text" class="form-control" id="cc-number" name="ccNumber" placeholder="" required>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Vencimiento</label>
              <input type="text" class="form-control" id="cc-expiration" name="ccExpiration" placeholder="" required>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="password" class="form-control" id="cc-cvv" name="ccCvv" placeholder="" required>
            </div>
          </div>

          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" id="checkout-btn" type="submit">Continuar con el pago</button>
        </form>
    `;

  /**
   * A partir de aquí se crea el resumen del carrito para la confirmación de la compra
   */
  const h4 = document.createElement("h4");
  h4.className = "d-flex justify-content-between align-items-center mb-3";
  h4.innerHTML = `
        <span class="text-light">Tu Carro</span>
        <span class="badge bg-primary rounded-pill"> ${cart.length}</span>
    `;

  const ul = document.createElement("ul");
  ul.className = "list-group mb-3";

  cart.forEach((e) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between lh-sm";
    li.innerHTML = `
            <div>
                <h6 class="my-0"> ${e.item.descripcion}</h6>
                <small class="text-muted"> ${e.cantidad} ${
      e.item.ump
    } x ${toCurrency(e.item.precio)}</small>
            </div>
            <span class="text-muted">${toCurrency(
              e.cantidad * e.item.precio
            )}</span>
        `;
    ul.appendChild(li);
  });

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.innerHTML = `
        <span>Total </span>
        <strong> ${toCurrency(
          cart.reduce(
            (acc, curr) => (acc += curr.cantidad * curr.item.precio),
            0
          )
        )}</strong>
        `;
  ul.appendChild(li);

  cartResumeDiv.append(h4, ul);
  divCheckout.append(paymentMethodDiv, cartResumeDiv);
  cartContainerDiv.appendChild(divCheckout);

  /**
   * Acciones luego de enviar el formulario
   */
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.cart = cart;
    console.log(data);
    Swal.fire({
      title: "Resumen de la compra...",
      text: "Si presionas OK la compra se procesará.",
      html: `
        <p>Total de la compra: ${toCurrency(
          cart.reduce(
            (acc, curr) => (acc += curr.cantidad * curr.item.precio),
            0
          )
        )}</p>
        <p>Pagado con ${
          data.paymentMethodCC == "CC"
            ? "Tarjeta de Crédito"
            : "Tarjeta de Dédito"
        } número ${data.ccNumber}</p>  
      `,
      showCancelButton: true,
      confirmButtonText: "Si, Lo quiero",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Confirmado!",
          html: `<p>Tu pedido es el #${Math.floor(
            Math.random() * 100000 - 1
          )}, te enviaremos un correo a: ${
            data.email
          }, con toda la información.</p>
          <p>Muchas Gracias por tu compra.</p>`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          emptyCart();
          window.location.assign("./productos.html");
        });
      }
    });
  });
}
