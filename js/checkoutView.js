function createCheckoutView(cart){
    clearCartView();
    const cartContainerDiv = document.getElementById("containerCarrito");
    const divCheckout = document.createElement("div");
    
    divCheckout.className= "row g-5 "

    const paymentMethodDiv = document.createElement("div");
    const cartResumeDiv = document.createElement("div");

    paymentMethodDiv.className="col-md-7 col-lg-8";
    cartResumeDiv.className="col-md-5 col-lg-4 order-md-last";

    
    paymentMethodDiv.innerHTML=`
        <form class="needs-validation text-light">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="firstName" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Se requiere un nombre válido.
              </div>
            </div>

            <div class="col-sm-6">
              <label for="lastName" class="form-label">Apellido</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
              <div class="invalid-feedback">
                Se requiere apellido válido.
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email <span class="text-muted">(Opcional)</span></label>
              <input type="email" class="form-control" id="email" placeholder="tu@example.com">
              <div class="invalid-feedback">
                Ingresa una dirección de correo electrónico válida para actualizaciones de envío.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="address" placeholder="" required="">
              <div class="invalid-feedback">
                Por favor introduce tu direccion de envio.
                Please enter your shipping address.
              </div>
            </div>

            <div class="col-12">
              <label for="address2" class="form-label">Dirección 2 (opcional)</label>
              <input type="text" class="form-control" id="address2" placeholder="Piso/Depto">
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Código postal</label>
              <input type="text" class="form-control" id="zip" placeholder="" required="">
              <div class="invalid-feedback">
                Código postal requerido.
              </div>
            </div>
          </div>

          <hr class="my-4">

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address">
            <label class="form-check-label" for="same-address">La dirección de envío es la misma que mi dirección de facturación</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info">
            <label class="form-check-label" for="save-info">Guardar esta información para la próxima vez</label>
          </div>

          <hr class="my-4">

          <h4 class="mb-3">Pago</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required="">
              <label class="form-check-label" for="credit">Tarjeta de crédito</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required="">
              <label class="form-check-label" for="debit">Tarjeta de débito</label>
            </div>
            <div class="form-check">
              <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required="">
              <label class="form-check-label" for="paypal">PayPal</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Nombre en la tarjeta</label>
              <input type="text" class="form-control" id="cc-name" placeholder="Tal como figura en la tarjeta" required="">
              <div class="invalid-feedback">
                Se requiere el nombre en la tarjeta
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Número de tarjeta de crédito</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required="">
              <div class="invalid-feedback">
                Se requiere número de tarjeta de crédito
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Vencimiento</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required="">
              <div class="invalid-feedback">
                Fecha de vencimiento requerida
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required="">
              <div class="invalid-feedback">
                Código de seguridad requerido
              </div>
            </div>
          </div>

          <hr class="my-4">

          <button class="w-100 btn btn-primary btn-lg" type="submit">Continuar con el pago</button>
        </form>
    `;

    const h4 =document.createElement("h4");
    h4.className ="d-flex justify-content-between align-items-center mb-3";
    h4.innerHTML = `
        <span class="text-light">Tu Carro</span>
        <span class="badge bg-primary rounded-pill"> ${cart.length}</span>
    `;

    const ul = document.createElement("ul");
    ul.className="list-group mb-3";
    
    cart.forEach(e => {
        const li = document.createElement("li");
        li.className="list-group-item d-flex justify-content-between lh-sm";
        li.innerHTML=`
            <div>
                <h6 class="my-0"> ${e.item.descripcion}</h6>
                <small class="text-muted"> ${e.cantidad} ${e.item.ump} x ${toCurrency(e.item.precio)}</small>
            </div>
            <span class="text-muted">${toCurrency(e.cantidad * e.item.precio)}</span>
        `;
        ul.appendChild(li);
    });
    
    const li = document.createElement("li");
    li.className="list-group-item d-flex justify-content-between";
    li.innerHTML=`
        <span>Total </span>
        <strong> ${toCurrency(cart.reduce((acc, curr) => (acc += curr.cantidad * curr.item.precio),0))}</strong>
        `;
    ul.appendChild(li);

    cartResumeDiv.append(h4,ul);
    divCheckout.append(paymentMethodDiv, cartResumeDiv);
    cartContainerDiv.appendChild(divCheckout);

}