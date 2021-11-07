let finalizado = document.getElementById('finalizado')
let pgto = sessionStorage.getItem('formaPgto')
finalizado.innerHTML += `Venda Finalizada em ${pgto}!`