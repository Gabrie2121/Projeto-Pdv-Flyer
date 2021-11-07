let data = document.getElementById("data");
let vendedor = document.getElementById("vendedor");
let comanda = document.getElementById("comanda");
let desconto = document.getElementById("desconto");
let subtotal = document.getElementById("subtotal");
let valor_total = document.getElementById("valor-total")
let valor_recebido = document.getElementById("valor-recebido")
let valor_troco = document.getElementById("valor-troco")
const voltar = () => {
  window.location.href = "pdv.html";
};
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
function getValues() {
  vendedor.innerHTML += `  ${jsonsession["nome_funcionario"].split(" ")[0]}`;
  comanda.innerHTML += `  00000${parseInt(jsonsession.codcomanda)}`;
  desconto.innerHTML += ` R$ ${parseFloat(jsonsession.desconto).toFixed(2)}`;
  subtotal.innerHTML += ` R$ ${parseFloat(jsonsession.vTotal).toFixed(2)}`;
  valor_total.value = (parseFloat(jsonsession.vTotal).toFixed(2) - parseFloat(jsonsession.desconto).toFixed(2)).toFixed(2)
  return jsonsession;
}
getValues()

const calcValor = () => {
  valor_troco.value = (parseFloat((-valor_total.value)) + parseFloat(valor_recebido.value)).toFixed(2)
}
valor_recebido.addEventListener("keypress", e => {
  if (e.charCode == 13) {
    calcValor()
  }
})

const venda = (valor) => {
  body = {
    "codcomanda": parseInt(jsonsession.codcomanda),
    "desconto": parseFloat(jsonsession.desconto).toFixed(2),
    "vlvenda": parseFloat(jsonsession.vTotal).toFixed(2),
    "valor_total": (parseFloat(jsonsession.vTotal).toFixed(2) - parseFloat(jsonsession.desconto).toFixed(2)).toFixed(2),
    "id_vendedor": sessionStorage.getItem("id_terminal_vendedor"),
    "pagamento": valor,
    "status": 1
  }
  sessionStorage.setItem("formaPgto",valor)
  try {
    fetch(`http://31.220.21.132:5000/comanda/${parseInt(jsonsession.codcomanda)}`, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
    fetch(`http://31.220.21.132:5000/venda/${Math.floor(Math.random() * (1000000 * 1) + 1)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    window.location.href = "finalizada.html";
  } catch (e) {
    fetch(`http://31.220.21.132:5000/comanda/${parseInt(jsonsession.codcomanda)}`, {
      method: 'DELETE',
    })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
    fetch(`http://31.220.21.132:5000/venda/${Math.floor(Math.random() * (1000000 * 1) + 1)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    window.location.href = "finalizada.html";
  }
}
