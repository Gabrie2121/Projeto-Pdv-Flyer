let codigoComanda = document.getElementById('codigo')
let spaceComanda = document.getElementById('spaceComanda')
let cupom = document.getElementById('cupom')
let mensagem = document.getElementById('mensagem')
let valorCompleto = document.getElementById('valorCompleto')
let desconto = document.getElementById('desconto')
const v = []
let total = 0
const puxarComanda = (codigo) => {
    fetch(`http://127.0.0.1:5000/pushComanda/${codigo}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            pushComanda(data, codigo)
        })

}
const pushComanda = (data, comanda) => {
    if (data.length == 0) {
        spaceComanda.innerHTML = "COMANDA NÃO ENCONTRADA"
    }
    else {
        spaceComanda.innerHTML = comanda
        mensagem.value = "Venda em Andamento"
        for (let i = 0; i < data.length; i++) {
            fetch(`http://127.0.0.1:5000/produto/${data[i].codprod}`)
                .then(res => res.json())
                .then(value => {
                    cupom.innerHTML += `
                    <div class="itens list">
                        <div>${data[i].codprod}</div>
                        <div>${value.nome}</div>
                        <div>${data[i].qtde}</div>
                        <div>R$ ${value.valor}</div>
                    </div>`
                    valorTotal(value.valor, data[i].qtde)
                })
        }
    }
}
const valorTotal = (valor, qtd) => {
    let requi = valor * qtd
    total = total + requi
    valorCompleto.value = `R$${total.toFixed(2)}`
}
document.addEventListener('keypress', e => {
    if (e.charCode == 100) {
        spaceComanda.innerHTML = 'CAIXA LIVRE'
        mensagem.value = "CAIXA LIVRE"
        total = 0
        cupom.innerHTML = `<div id="cupom" class="cab">** Cupom Fiscal **</div>
        --------------------------------------------------------------------------
        <div class="list cab">
            <div>CÓDIGO</div>
            <div>DESCRIÇÃO</div>
            <div>QTD</div>
            <div>VALOR</div>
        </div>
        --------------------------------------------------------------------------`
    }
})
codigoComanda.addEventListener('keypress', e => {
    if (e.charCode == 13) {
        puxarComanda(codigoComanda.value)
        codigoComanda.value = ''
    }
})
desconto.addEventListener('keypress', e => {
    if (e.charCode == 13) {
        totalDesc = total
        if (total <= totalDesc) {
            let valorDescontado = total - desconto.value
            valorCompleto.value = `R$${valorDescontado.toFixed(2)}`
            desconto.value = ''
        }
    }
})