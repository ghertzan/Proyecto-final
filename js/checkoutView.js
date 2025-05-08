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
        <form class="needs-validation text-light" id="checkout-form">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="firstName" name="firstName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Se requiere un nombre válido.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="lastName" name="lastName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Se requiere apellido válido.
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="tu@example.com" required>
              <div class="invalid-feedback">
                Ingresa una dirección de correo electrónico válida para actualizaciones de envío.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="address" name="address" placeholder="" required="">
              <div class="invalid-feedback">
                Por favor introduce tu direccion de envio.
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-12">
              <label for="address2" class="form-label">Dirección 2 (opcional)</label>
              <input type="text" class="form-control" id="address2" name="address2" placeholder="Piso/Depto">
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Código postal</label>
              <input type="text" class="form-control" id="zip" name="zip" placeholder="" required="">
              <div class="invalid-feedback">
                Código postal requerido.
              </div>
            </div>
          </div>

          <hr class="my-4">

          
          <h4 class="mb-3">Pago</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethodCC" type="radio" class="form-check-input" checked="" required="">
              <label class="form-check-label" for="credit">Tarjeta de crédito</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethodDC" type="radio" class="form-check-input" required="">
              <label class="form-check-label" for="debit">Tarjeta de débito</label>
            </div>
            <div class="form-check">
              <input id="transfer" name="paymentMethodTransfer" type="radio" class="form-check-input" required="">
              <label class="form-check-label" for="transfer">Transferencia</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Nombre en la tarjeta</label>
              <input type="text" class="form-control" id="cc-name" name="cc-name" placeholder="Tal como figura en la tarjeta" required="">
              <div class="invalid-feedback">
                Se requiere el nombre en la tarjeta
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Número de tarjeta de crédito</label>
              <input type="text" class="form-control" id="cc-number" name="cc-number" placeholder="" required="">
              <div class="invalid-feedback">
                Se requiere número de tarjeta de crédito
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Vencimiento</label>
              <input type="text" class="form-control" id="cc-expiration" name="cc-expiration" placeholder="" required="">
              <div class="invalid-feedback">
                Fecha de vencimiento requerida
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" name="cc-cvv" placeholder="" required="">
              <div class="invalid-feedback">
                Código de seguridad requerido
              </div>
            </div>
          </div>

          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" id="checkout-btn">Continuar con el pago</button>
        </form>
    `;

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

  document.getElementById("checkout-btn").onclick = () => {
    getFormData(cart);
  };
}

function getFormData(cart) {
  const form = document.getElementById("checkout-form");
  const paymentForm = new FormData(form);

  const paymentRecord = {
    nombre: paymentForm.get("firstName"),
    apellido: paymentForm.get("lastName"),
    email: paymentForm.get("email"),
    direccion: paymentForm.get("address"),
    direccion2: paymentForm.get("address2"),
    codigoPostal: paymentForm.get("zip"),
    payMethod1: paymentForm.get("paymentMethodCC"),
    payMethod2: paymentForm.get("paymentMethodDC"),
    payMethod3: paymentForm.get("paymentMethodTransfer"),
    ccNombre: paymentForm.get("cc-name"),
    ccNumero: paymentForm.get("cc-number"),
    ccVencimiento: paymentForm.get("cc-expiration"),
    ccCvv: paymentForm.get("cc-cvv"),
    cart: cart,
  };
  paymentForm.keys().forEach((e) => {
    console.log(e);
  });
  // console.log(paymentRecord);
}
