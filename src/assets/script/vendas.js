const puxarVendas = () => {
  fetch(`http://31.220.21.132:5000/vendas`)
    .then((res) => res.json())
    .then((data) => {
      try {
        lista.innerHTML = `<div class="list_cab">
                <div>Cod Comanda</div>
                <div>Desconto</div>
                <div>Valor Total</div>
                <div>ID Vendedor</div>
                <div>Pagamentos</div>
                <div>Status</div>
            </div>`;
        prods = data.vendas;
        console.log(data);
        for (let i = 0; i < prods.length; i++) {
          try {
            lista.innerHTML += `<div class="list_us">
                        <div>${prods[i].codcomanda}</div>
                        <div>${prods[i].desconto}</div>
                        <div>R$ ${prods[i].valor_total.toFixed(2)}</div>
                        <div>${prods[i].id_vendedor}</div>
                        <div>${prods[i].pagamento}</div>
                        <div>${prods[i].status}</div>
                    </div>`;
          } catch (e) { 
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
};
const sair = () => {
  window.location.href = "menu.html";
};
