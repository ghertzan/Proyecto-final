function htmlClear() {
  const container = document.getElementById("container");
  container.innerHTML = ``;
}

function htmlArticulos() {
  htmlClear();
  getArticulos()
    .then((articulos) => {
      const container = document.getElementById("container");

      const section = document.createElement("section");
      section.id = "seccionParaMoler";

      const h2ParaMoler = document.createElement("h2");
      h2ParaMoler.className = "text-center text-light my-5";
      h2ParaMoler.textContent = "Para que lo muelas...";

      const divRow = document.createElement("div");
      divRow.className = "row g-3";

      articulos.forEach((articulo) => {
        const divGhCard = document.createElement("div");
        divGhCard.className = "col-12 col-md-4 col-lg-3 gh-card";

        divGhCard.innerHTML = `
            <div class="card">
                <img src="${
                  articulo.img
                }" class="card-img-top" alt="imagen café molido">
                <div class="card-body">
                    <h5 class="card-title">${articulo.descripcion}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary"> $ ${parseInt(
                      articulo.precio
                    ).toFixed(2)}</h6> <span>Por ${articulo.ump}</span>
                    <p class="card-text">${articulo.caract}</p>
                    <button class="btn alCarrito" id=${
                      articulo.id
                    }>Al carrito</button>
                </div>
            </div>`;
        divRow.appendChild(divGhCard);
        const btnAlCarrito = divGhCard.querySelector(".alCarrito");
        btnAlCarrito.onclick = () => addToCart(articulo, 1);
      });
      section.append(h2ParaMoler, divRow);
      container.appendChild(section);
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al acceder. ERROR: ${err}`,
      });
    });
}

function selectoresCantidad() {
  const botonesRestar = document.querySelectorAll(".restar");
  const botonesSumar = document.querySelectorAll(".sumar");

  botonesRestar.forEach((botonRestar) => {
    botonRestar.onclick = (e) => {
      const id = e.currentTarget.id.slice(7);
      let contador = parseInt(
        document.getElementById("cantidad-" + id).textContent
      );
      if (contador > 0) {
        contador--;
        document.getElementById("cantidad-" + id).innerHTML = contador;
      }
    };
  });

  botonesSumar.forEach((botonSumar) => {
    botonSumar.onclick = (e) => {
      const id = e.currentTarget.id.slice(6);
      let contador = parseInt(
        document.getElementById("cantidad-" + id).textContent
      );
      contador++;
      document.getElementById("cantidad-" + id).innerHTML = contador;
    };
  });
}

htmlArticulos();
iconoCarrito();
