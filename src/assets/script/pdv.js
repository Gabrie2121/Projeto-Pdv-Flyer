let codigoComanda = document.getElementById("codigo");
let spaceComanda = document.getElementById("spaceComanda");
let cupom = document.getElementById("cupom");
let mensagem = document.getElementById("mensagem");
let valorCompleto = document.getElementById("valorCompleto");
let desconto = document.getElementById("desconto");
let vender = document.getElementById("vender");
let esq = document.getElementById("esq");
const v = [];
let total = 0;

const puxarComanda = (codigo) => {
  try {
    fetch(`http://31.220.21.132:5000/pushComanda/${codigo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        pushComanda(data, codigo);
      });
    vender.removeAttribute("disabled");
  } catch (e) {
    alert("Impossivel Conectar ao Backend");
  }
};
const pushComanda = (data, comanda) => {
  if (data.length == 0) {
    spaceComanda.innerHTML = "COMANDA NÃO ENCONTRADA";
  } else {
    spaceComanda.innerHTML = `00000${comanda}`;
    mensagem.value = "Venda em Andamento";
    eventSessionStorage("id_terminal_vendedor",data[0].id_vendedor)
    for (let i = 0; i < data.length; i++) {
      try {
        fetch(`http://31.220.21.132:5000/produto/${data[i].codprod}`)
          .then((res) => res.json())
          .then((value) => {
            cupom.innerHTML += `
                    <div class="itens list">
                        <div>${data[i].codprod}</div>
                        <div>${value.nome}</div>
                        <div>${data[i].qtde}</div>
                        <div>R$ ${value.valor.toFixed(2)}</div>
                    </div>`;
            valorTotal(value.valor, data[i].qtde);
          });
      } catch (e) {
        continue;
      }
    }
  }
};
const valorTotal = (valor, qtd) => {
  let requi = valor * qtd;
  total = total + requi;
  valorCompleto.value = `R$ ${total.toFixed(2)}`;
};
document.addEventListener("keypress", (e) => {
  if (e.charCode == 100) {
    spaceComanda.innerHTML = "CAIXA LIVRE";
    mensagem.value = "CAIXA LIVRE";
    total = 0;
    valorTotal(0, 0);
    cupom.innerHTML = `<div id="cupom" class="cab">** Cupom Fiscal **</div>
        --------------------------------------------------------------------------
        <div class="list cab">
            <div>CÓDIGO</div>
            <div>DESCRIÇÃO</div>
            <div>QTD</div>
            <div>VALOR</div>
        </div>
        --------------------------------------------------------------------------`;
  }
});
codigoComanda.addEventListener("keypress", (e) => {
  if (e.charCode == 13) {
    puxarComanda(codigoComanda.value);
    eventSessionStorage("codcomanda", codigoComanda.value);
    codigoComanda.value = "";
  }
});


desconto.addEventListener("keypress", (e) => {
  if (e.charCode == 13) {
    let desconto = document.getElementById('desconto')
    totalDesc = total;
    if (total <= totalDesc) {
      sessionStorage.setItem("desconto", desconto.value);
      console.log(desconto.value)
      let valorDescontado = total - desconto.value;
      valorCompleto.value = `R$${valorDescontado.toFixed(2)}`;
      desconto.value = "";
    }
  }
});

const eventSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

vender.addEventListener("click", (e) => {
  eventSessionStorage("vTotal", total.toFixed(2));
  window.location.href = "pagamento.html";
});

document.addEventListener("keypress", (e) => {
  eventSessionStorage("vTotal", total.toFixed(2));
  if (e.charCode == 86 || e.charCode == 118) {
    window.location.href = "pagamento.html";
  }
  if (e.charCode == 112 || e.charCode == 80) {
    const qtdeUnit = document.getElementById("qtdeUnit");
    const valorUnit = document.getElementById("valorUnit");
    if (qtdeUnit.value == "") {
      liberarUnitario(qtdeUnit);
    } else {
      adicionarUnitario();
    }
  }
});
const liberarUnitario = (qtdeUnit) => {
  qtdeUnit.removeAttribute("disabled");
};
const adicionarUnitario = () => {
  const qtdeUnit = document.getElementById("qtdeUnit");
  const valorUnit = document.getElementById("valorUnit");
  const codigo = document.getElementById("codigo");
  const codComanda = sessionStorage.getItem("codcomanda");
  const vendedor = sessionStorage.getItem("id_funcionario");
  const body = {
    codComanda: codComanda,
    id: null,
    codprod: codigo.value,
    qtde: qtdeUnit.value,
    id_vendedor: vendedor,
    status: 0,
  };
  try {
    fetch(`http://31.220.21.132:5000/comanda/${codComanda}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.log(e);
  }
  codigo.value = ""
  qtdeUnit.value = ""
  qtdeUnit.setAttribute('disabled', 'disabled')
  total = 0;
  valorTotal(0, 0);
  cupom.innerHTML = `<div id="cupom" class="cab">** Cupom Fiscal **</div>
        --------------------------------------------------------------------------
        <div class="list cab">
            <div>CÓDIGO</div>
            <div>DESCRIÇÃO</div>
            <div>QTD</div>
            <div>VALOR</div>
        </div>
        --------------------------------------------------------------------------`;
  puxarComanda(codComanda)
};
