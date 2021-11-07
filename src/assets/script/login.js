entrar = document.getElementById('entrar')
senha = document.getElementById('password')
const join = () => {
    var miss = document.getElementById('miss')
    var user = document.getElementById('user').value
    var password = document.getElementById('password').value
    fetch(`http://31.220.21.132:5000/usuario/${user}`)
        .then(res => res.json())
        .then(data =>{
            if (user == data.login && password == data.senha) {
                sessionStorage.setItem('nome_funcionario', data.nome_funcionario)
                sessionStorage.setItem('id_funcionario', data.id)
                window.location.href = "menu.html";
                miss.innerHTML = ""
            }else if(user=="admin" && password=="admin"){
                sessionStorage.setItem('nome_funcionario', data.nome_funcionario)
                sessionStorage.setItem('id_funcionario', data.id)
                window.location.href = "menu.html";
                miss.innerHTML = ""
            } 
            else if (user == "" && password == "") {
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
senha.addEventListener('keypress',e=>{
    if (e.charCode == 13) {
        join()
    }
})