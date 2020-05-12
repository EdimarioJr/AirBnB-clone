var divResults = document.getElementById("ap-search");
var searchInput = document.getElementsByClassName("search-input");
searchInput = searchInput[0];
var searchButton = document.getElementsByClassName("search-button");
searchButton = searchButton[0];
var data = JSON.parse(window.sessionStorage.getItem("apartamentos-data"));

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

function fetchSearch(params) {
  let termoPesquisa = params
    ? searchInput.value
    : window.location.href.split("=")[1];
  console.log(termoPesquisa);

  let pesquisa = new RegExp(termoPesquisa, "i");

  let resultados = data.filter((current) => {
    if (
      current.name.search(pesquisa) != -1 ||
      current.property_type.search(pesquisa) != -1
    )
      return current;
  });
  console.log(resultados);

  resultados.forEach((current) => montaCard(divResults, current));
}

fetchSearch(false);

searchButton.addEventListener("click", function () {
  divResults.innerHTML = "";
  fetchSearch(true);
});
