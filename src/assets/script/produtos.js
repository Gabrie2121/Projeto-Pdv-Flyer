const lista = document.getElementById('lista')
const inserir = async () => {
    const codigo = document.getElementById('codigo').value
    const nome = document.getElementById('nome').value
    const valor = document.getElementById('valor').value
    console.log(valor)

    await inserirProdutos(codigo, { "nome": nome, "valor": valor })
}
const inserirProdutos = (codigo, body) => {
    try {
        fetch(`http://127.0.0.1:5000/produto/${codigo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }catch(e){
        console.log(e)
    }
}
const puxar = async () => {
    const codigo = document.getElementById('codigo').value
    puxarProdutos(codigo != "" ? `produto/${codigo}` : "produtos")
}

const puxarProdutos = (codigo) => {
    fetch(`http://127.0.0.1:5000/${codigo}`)
        .then(res => res.json())
        .then(data => {
            try {
                lista.innerHTML = `<div class="list_cab">
                <div>CÓDIGO</div>
                <div>DESCRIÇÃO</div>
                <div>VALOR</div>
            </div>`
                prods = data.produtos
                console.log(prods)
                for (let i = 0; i < prods.length; i++) {
                    try {
                        lista.innerHTML += `<div class="list_prods">
                    <div>${prods[i].codigo}</div>
                    <div>${prods[i].nome.toUpperCase()}</div>
                    <div>R$ ${prods[i].valor.toFixed(2)}</div>
                </div>`
                    } catch (e) {
                        return `<div class="list_prods">
                        <div>${prods[i].codigo}</div>
                        <div>${prods[i].nome}</div>
                        <div>R$ ${prods[i].valor}</div>
                    </div>`
                    }
                }
            }
            catch (e) {
                lista.innerHTML = `<div class="list_cab">
                <div>CÓDIGO</div>
                <div>DESCRIÇÃO</div>
                <div>VALOR</div>
            </div><div class="list_prods">
                    <div>${data.codigo}</div>
                    <div>${data.nome.toUpperCase()}</div>
                    <div>R$ ${data.valor.toFixed(2)}</div>
                </div>`
            }
        })
}
const sair = () => {
    window.location.href = "menu.html";
}