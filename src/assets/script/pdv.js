let codigoComanda = document.getElementById('codigo')
let spaceComanda = document.getElementById('spaceComanda')

const puxarComanda = (codigo) => {
    fetch(`http://127.0.0.1:5000/comanda/${codigo}`)
    .then(res=>res.json())
    .then(data=>{
        spaceComand(data.codComanda)
    })

}
const spaceComand = (data)=>{
    spaceComanda.innerHTML = data
}






codigoComanda.addEventListener('keypress', e => {
    if (e.charCode == 13) {
        puxarComanda(codigoComanda.value)
    }
})

