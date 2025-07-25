//JSON

let Caloriasconteiner=document.getElementById("calorias-container")
const URLlistado="../../db/data.json"

function vercalorias (){
  fetch(URLlistado)
  .then (response=> response.json ())
  .then (data => renderCalorias (data))
}

vercalorias()

function renderCalorias(listacalorias){
  listacalorias.forEach(comida => {
    const card = document.createElement ("div")
     card.innerHTML = `
      <h2>Alimento: ${comida.nombre}</h2>
      <h3>Calorias: ${comida.calorias} kcal</h3>
      <h4>Porción: ${comida.porcion}</h4>
      <p><strong>Tipo:</strong> ${comida.tipo} </p>
      <p><strong>Proteínas:</strong> ${comida.proteinas} gramos</p>
      <p><strong>Grasas:</strong> ${comida.grasas} gramos</p>
      <p><strong>Carbohidratos:</strong> ${comida.carbohidratos} gramos</p>
    `

    Caloriasconteiner.appendChild(card)
  })
}