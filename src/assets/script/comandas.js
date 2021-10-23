const lista = document.getElementById('lista')
const sair = () => {
    window.location.href = "menu.html";
}
const puxar = () => {
    const codigo = document.getElementById('codigo').value
    const nome = document.getElementById('nome').value
    if (codigo != "") {
        puxarCodigo(`pushComanda/${codigo}`)
    } else if (nome != "") {
        puxarNome(nome, `comandas`)
    }
    else {
        puxarTudo(`comandas`)
    }
}
const puxarCodigo = (url) => {
    fetch(`http://31.220.21.132:5000/${url}`)
        .then(res => res.json())
        .then(data => {
            try {
                let dataTest = []
                lista.innerHTML = `<div class="list_cab">
                <div>CÓDIGO COMANDA</div>
                <div>VENDEDOR</div>
                <div>STATUS</div>
                </div>`
                for (let i = 0; i < data.length; i++) {
                    if (dataTest.includes(data[i].codComanda)) {
                        lista.innerHTML += `<div class="list_prods">
                    <div>${data[i].codComanda}</div>
                    <div>${data[i].id_vendedor}</div>
                    <div>${data[i].status == 0 ? 'aberta' : 'fechada'}</div>
                </div>`
                    } else {
                    }
                    dataTest.push(data[i].codComanda)

                }
                console.log(dataTest)
            } catch (e) {
                console.log(e)
            }
        })
}
const puxarNome = (nome, url) => {
    fetch(`http://31.220.21.132:5000/${url}`)
        .then(res => res.json())
        .then(data => {
            data = data.comandas
            try {
                let dataTest = []
                lista.innerHTML = `<div class="list_cab">
            <div>CÓDIGO COMANDA</div>
            <div>VENDEDOR</div>
            <div>STATUS</div>
            </div>`
                for (let i = 0; i < data.length; i++) {
                    if (nome == data[i].id_vendedor) {
                        if (dataTest.includes(data[i].codComanda)) {
                        } else {
                            lista.innerHTML += `<div class="list_prods">
                    <div>${data[i].codComanda}</div>
                    <div>${data[i].id_vendedor}</div>
                    <div>${data[i].status == 0 ? 'aberta' : 'fechada'}</div>
                    </div>`
                    dataTest.push(data[i].codComanda)}
                    }
                    
                    console.log(dataTest)
                }
            } catch (e) {
                console.log(e)
            }
        })
}
const puxarTudo = (url) => {
    fetch(`http://31.220.21.132:5000/${url}`)
        .then(res => res.json())
        .then(data => {
            data = data.comandas
            try {
                let dataTest = []
                lista.innerHTML = `<div class="list_cab">
                <div>CÓDIGO COMANDA</div>
                <div>VENDEDOR</div>
                <div>STATUS</div>
                </div>`
                for (let i = 0; i < data.length; i++) {
                    if (dataTest.includes(data[i].codComanda)) {
                    } else {
                        lista.innerHTML += `<div class="list_prods">
                    <div>${data[i].codComanda}</div>
                    <div>${data[i].id_vendedor}</div>
                    <div>${data[i].status == 0 ? 'aberta' : 'fechada'}</div>
                </div>`
                        
                    }
                    dataTest.push(data[i].codComanda)

                }
            } catch (e) {
                console.log(e)
            }
        })
}