const lista = document.getElementById('lista')

const inserir = async () => {
    const usuario = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value
    const nome = document.getElementById('nome').value

    await inserirUsers(usuario, { "login": usuario, "senha": senha, "nome_funcionario": nome, "id": null })
}
const inserirUsers = (codigo, body) => {
    try {
        fetch(`http://192.168.15.10:5000/usuario/${codigo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    } catch (e) {
        console.log(e)
    }
}
const puxar = () => {
    fetch('http://192.168.15.10:5000/usuarios')
        .then(res => res.json())
        .then(data => {
            try {
                lista.innerHTML = `
                <div class="list_cab">
                <div>ID</div>
                <div>Usuario</div>
                <div>Nome</div>
                </div>`
                const users = data.usuario
                for (let i = 0; i < users.length; i++) {
                    lista.innerHTML +=
                        `<div class="list_us">
                    <div>${users[i].id}</div>
                    <div>${users[i].login}</div>
                    <div>${users[i].nome_funcionario}</div>
                    </div>`
                }

            }
            catch (e) {
                console.log(e)
            }
        })
}
const sair = () => {
    window.location.href = "menu.html";
}