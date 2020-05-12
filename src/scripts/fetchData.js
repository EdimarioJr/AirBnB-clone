var divApartamentos = document.getElementById("ap-index");
var cardSearch = document.getElementById("ap-search");
var apButtons = document.querySelectorAll(".ap-button");
var searchInput = document.getElementsByClassName("search-input");
searchInput = searchInput[0];
var searchButton = document.getElementsByClassName("search-button");
searchButton = searchButton[0];
var apartamentos = [];

fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
  .then((response) => response.json())
  .then((jsondata) => {
    window.sessionStorage.setItem(
      "apartamentos-data",
      JSON.stringify(jsondata)
    );
    apartamentos.push(jsondata.slice(0, 6));
    apartamentos.push(jsondata.slice(6, 12));
    apartamentos.push(jsondata.slice(12, 18));
    apartamentos.push(jsondata.slice(18, 24));
    apartamentos[0].forEach(function (apts) {
      montaCard(divApartamentos, apts);
    });
  })
  .catch(function (err) {
    console.log(err);
  });

function ClickApButton(event) {
  divApartamentos.innerHTML = "";
  apartamentos[parseInt(event.target.innerHTML, 10) - 1].forEach(function (
    apts
  ) {
    montaCard(divApartamentos, apts);
  });
}

function montaCard(destino, apts) {
  destino.innerHTML += `
  <div class="card">
  <img src=${apts.photo} style="width: 100%; height: 300px; border-radius: 10px 10px 0 0;"/>
  <div class="legenda-card">
      <h3>${apts.name}</h3>
      <h3>R$ ${apts.price} / mês</h3>
      <h4>${apts.property_type}</h4>
  </div>
  </div>
  `;
}

apButtons.forEach((button) => {
  button.addEventListener("click", ClickApButton);
});

console.log(searchButton);
searchButton.addEventListener("click", ClicouSearch);

function ClicouSearch() {
  console.log(searchInput.value);
  window.location.href = `file:///C:/Users/Edimario/Desktop/AirBnb/src/search.html?=${searchInput.value}`;
}
