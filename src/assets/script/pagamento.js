let data = document.getElementById("data");

let vendedor = document.getElementById("vendedor");
let comanda = document.getElementById("comanda");
let desconto = document.getElementById("desconto");
let subtotal = document.getElementById("subtotal");

const voltar = () => {
  window.location.href = "pdv.html";
};

function getValues() {
  const jsonsession = {};

  jsonsession["id_funcionario"] = sessionStorage.getItem("id_funcionario")
    ? sessionStorage.getItem("id_funcionario")
    : null;
  jsonsession["nome_funcionario"] = sessionStorage.getItem("nome_funcionario")
    ? sessionStorage.getItem("nome_funcionario")
    : 0;
  jsonsession["vTotal"] = sessionStorage.getItem("vTotal")
    ? sessionStorage.getItem("vTotal")
    : 0;
  jsonsession["codcomanda"] = sessionStorage.getItem("codcomanda")
    ? sessionStorage.getItem("codcomanda")
    : null;
  jsonsession["desconto"] = sessionStorage.getItem("desconto")
    ? sessionStorage.getItem("desconto")
    : 0;

  vendedor.innerHTML += `  ${jsonsession["nome_funcionario"].split(" ")[0]}`;
  comanda.innerHTML += `  ${parseInt(jsonsession.codcomanda)}`;
  desconto.innerHTML += `  ${parseFloat(jsonsession.desconto).toFixed(2)}`;
  subtotal.innerHTML += `  ${parseFloat(jsonsession.vTotal).toFixed(2)}`;

  return jsonsession;
}

getValues();

function clickOn_dinheiro() {
  data.innerHTML = `
  <div class="pagamentoCss">  
    <h1>Pagamento em Dinheiro</h1>
    <br />
    Valor Pago: <input></input>
  </div>
    `;
}
