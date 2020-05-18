var divApartamentos = document.getElementById("ap-index");
var containerButtons = document.getElementById("container-buttons");
var searchInput = document.getElementsByClassName("search-input");
searchInput = searchInput[0];
var searchButton = document.getElementsByClassName("search-button");
searchButton = searchButton[0];
var apartamentos = [];

const ITEMS_PER_PAGE = 6;

fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
  .then((response) => response.json())
  .then((jsondata) => {
   
    // Guardo os dados da API para poder usar na pagina search
    window.sessionStorage.setItem(
      "apartamentos-data",
      JSON.stringify(jsondata)
    );

    // uso o reduce nos dados para limitar quantos cards irao aparecer em cada pagina.
    jsondata.reduce((total, current, index) => {
      let posicao = Math.ceil(index / ITEMS_PER_PAGE) - 1;
      apartamentos[posicao]
        ? apartamentos[posicao].push(current)
        : (apartamentos[posicao] = [current]);
    });

    // monto os cards da pagina inicial automaticamente
    apartamentos[0].forEach(function (apts) {
      montaCard(divApartamentos, apts);
    });

    //monta os botoes de paginação, que dependem de quantas paginas irao existir
    apartamentos.forEach((current,index) => {
      containerButtons.innerHTML += `
        <button class="ap-button" onclick="ClickApButton(event)">
          ${index + 1}
        </button>
      `;
    });
  })
  .catch(function (err) {
    console.log(err);
  });


// funcao que troca paginas e mostra novos cards
function ClickApButton(event) {
  divApartamentos.innerHTML = "";
  apartamentos[parseInt(event.target.innerHTML, 10) - 1].forEach(function (
    apts
  ) {
    montaCard(divApartamentos, apts);
  });
}

searchButton.addEventListener("click", ClicouSearch);

// funcao que manda a pesquisa feita pelo usuario pela URL para a pagina search
function ClicouSearch() {
  console.log(searchInput.value);
  window.location.href = `file:///C:/Users/Edimario/Desktop/AirBnb/src/search.html?=${searchInput.value}`;
}


// funcao que monta os cards no seu destino.
function montaCard(destino, apts) {
  const { photo, name, price, property_type } = apts;
  destino.innerHTML += `
  <div class="card">
  <img src=${photo} style="width: 100%; height: 300px; border-radius: 10px 10px 0 0;"/>
  <div class="legenda-card">
      <h3>${name}</h3>
      <h3>R$ ${price} / mês</h3>
      <h4>${property_type}</h4>
  </div>
  </div>
  `;
}
