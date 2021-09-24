entrar = document.getElementById('entrar')
const join = () => {
    var miss = document.getElementById('miss')
    var user = document.getElementById('user').value
    var password = document.getElementById('password').value
    fetch(`http://127.0.0.1:5000/usuario/${user}`)
        .then(res => res.json())
        .then(data =>{
            if (user == data.login && password == data.senha) {
                window.location.href = "menu.html";
                miss.innerHTML = ""
                console.log(data)
            } else if (user == "" && password == "") {
                miss.innerHTML = "Digite um Usuario e Senha"
            }
            else {
                user.value = ""
                password.value = ""
                miss.innerHTML = "Usuario ou senha incorretos"
            }
        })
        .catch(e => console.error(e))
        
}
entrar.addEventListener('click', join)