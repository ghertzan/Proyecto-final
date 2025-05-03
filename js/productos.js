//Base de Datos
const articulos = [
    { "id": 1, "descripcion": "Robusta", "precio": 15571, "ump": "PAQ", "caract": "light roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 2, "descripcion": "Liberica", "precio": 18841, "ump": "UN", "caract": "medium roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 3, "descripcion": "Robusta", "precio": 24734, "ump": "PAQ", "caract": "cappuccino", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 4, "descripcion": "Excelsa", "precio": 19968, "ump": "PAQ", "caract": "dark roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 5, "descripcion": "Robusta", "precio": 8638, "ump": "PAQ", "caract": "medium roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 6, "descripcion": "Catimor", "precio": 5450, "ump": "UN", "caract": "dark roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 7, "descripcion": "Excelsa", "precio": 6417, "ump": "KG", "caract": "dark roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 8, "descripcion": "Liberica", "precio": 22577, "ump": "CAP", "caract": "cappuccino", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 9, "descripcion": "Arabica", "precio": 11720, "ump": "KG", "caract": "light roast", "img": "../img/cafe-para-moler.webp", "stock": 10 },
    { "id": 10, "descripcion": "Catimor", "precio": 12764, "ump": "KG", "caract": "light roast", "img": "../img/cafe-para-moler.webp", "stock": 10 }]


function htmlClear() {
    const container = document.getElementById("container");
    container.innerHTML = ``;
}

function htmlArticulos() {

    htmlClear();
    const container = document.getElementById("container");

    const section = document.createElement("section");
    section.id = "seccionParaMoler";

    const h2ParaMoler = document.createElement("h2");
    h2ParaMoler.className = "text-center text-light my-5";
    h2ParaMoler.textContent = "Para que lo muelas...";

    const divRow = document.createElement("div");
    divRow.className = "row g-3"

    articulos.forEach((articulo) => {

        const divGhCard = document.createElement("div")
        divGhCard.className = "col-12 col-md-4 col-lg-3 gh-card";

        divGhCard.innerHTML = `
            <div class="card">
                <img src="${articulo.img}" class="card-img-top" alt="imagen café molido">
                <div class="card-body">
                    <h5 class="card-title">${articulo.descripcion}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary"> $ ${parseInt(articulo.precio).toFixed(2)}</h6> <span>Por ${articulo.ump}</span>
                    <p class="card-text">${articulo.caract}</p>
                    <button class="btn alCarrito" id=${articulo.id}>Al carrito</button>
                </div>
            </div>`;
        divRow.appendChild(divGhCard);
        divGhCard.getElementsByTagName("button")[0].addEventListener("click", () => addToCart(articulo, 1));
    });
    section.append(h2ParaMoler, divRow);
    container.appendChild(section);
}

function selectoresCantidad() {
    const botonesRestar = document.querySelectorAll(".restar");
    const botonesSumar = document.querySelectorAll(".sumar");

    botonesRestar.forEach(botonRestar => {
        botonRestar.onclick = (e) => {
            const id = e.currentTarget.id.slice(7);
            let contador = parseInt(document.getElementById("cantidad-" + id).textContent);
            if (contador > 0) {
                contador--;
                document.getElementById("cantidad-" + id).innerHTML = contador;
            }
        };
    });

    botonesSumar.forEach(botonSumar => {
        botonSumar.onclick = (e) => {
            const id = e.currentTarget.id.slice(6);
            let contador = parseInt(document.getElementById("cantidad-" + id).textContent);
            contador++;
            document.getElementById("cantidad-" + id).innerHTML = contador;
        };
    });
}

htmlArticulos();
iconoCarrito();