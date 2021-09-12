entrar = document.getElementById('entrar')
const join = async () => {
    const pass = await fetch('http://127.0.0.1:5000/login')
        .then(res => res.json())
        .then(data => data)
        .catch(e=>console.error(e))
    await console.log(pass)
    var miss = document.getElementById('miss')
    var user = document.getElementById('user');
    var password = document.getElementById('password')
    console.log(pass)
    if (user.value.toLowerCase() == pass.login && password.value.toLowerCase() == pass.senha) {
        window.location.href = "menu.html";
        miss.innerHTML = ""
    } else if (user.value == pass.login && password.value == pass.senha) {
        miss.innerHTML = "Digite um Usuario e Senha"
    }
    else {
        user.value = ""
        password.value = ""
        miss.innerHTML = "Usuario ou senha incorretos"
    }
}

entrar.addEventListener('click', join)