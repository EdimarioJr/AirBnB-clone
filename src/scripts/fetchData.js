var cardApartamentos = document.getElementById("apartaments");
var apButtons = document.querySelectorAll(".ap-button");
var parteAp = [];


fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72")
  .then((response) => response.json())
  .then((jsondata) => {
    parteAp.push(jsondata.slice(0, 6));
    parteAp.push(jsondata.slice(6, 12));
    parteAp.push(jsondata.slice(12, 18));
    parteAp.push(jsondata.slice(18, 24));
    parteAp[0].forEach(function (apts) {
      cardApartamentos.innerHTML += `
        <div class="card">
        <img src=${apts.photo} style="width: 100%; height: 300px; border-radius: 10px 10px 0 0;"/>
        <div class="legenda-card">
            <h3>${apts.name}</h3>
            <h3>${apts.price} / mês</h3>
            <h4>${apts.property_type}</h4>
        </div>
        </div>
    `;
    });
    Data = jsondata
  })
  .catch(function (err) {
    console.log(err);
  });

function ClickApButton(event) {
    cardApartamentos.innerHTML = ""
    parteAp[parseInt(event.target.innerHTML, 10) - 1].forEach(function (apts) {
    cardApartamentos.innerHTML += `
          <div class="card">
          <img src=${apts.photo} style="width: 100%; height: 300px; border-radius: 10px 10px 0 0;"/>
          <div class="legenda-card">
              <h3>${apts.name}</h3>
              <h3>${apts.price} / mês</h3>
              <h4>${apts.property_type}</h4>
          </div>
          </div>
      `;
  });
}

apButtons.forEach((button) => {
  button.addEventListener("click", ClickApButton);
});



