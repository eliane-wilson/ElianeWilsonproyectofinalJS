// Registros // 

const objetivoGuardado = localStorage.getItem("caloriasObjetivo")  
if (objetivoGuardado) {
  document.getElementById("objetivoResumen").textContent =
    `Tu objetivo diario es de ${objetivoGuardado} kcal.`
}

class Desayuno {
  constructor( alimento, cantidad, calorias, actividad){
    this.alimento=alimento,
    this.cantidad=cantidad,
    this.calorias=calorias,
    this.actividad=actividad
  }

}

class Almuerzo {
  constructor( comida, porcion, caloria, act){
    this.comida=comida,
    this.porcion=porcion,
    this.caloria=caloria,
    this.act=act
  }

}

class Merienda {
  constructor( detalle, cant, cal, ejercicio){
    this.detalle=detalle
    this.cant=cant,
    this.cal=cal,
    this.ejercicio=ejercicio
  }


}

class Cena {
  constructor( que, cuanto, kcal, ejer){
    this.que=que
    this.cuanto=cuanto,
    this.kcal=kcal,
    this.ejer=ejer
  }


}

let desayunoDia1 = null
let almuerzoDia1 = null
let picoteoDia1 = null
let cenaDia1 = null



document.getElementById("guardarDesayuno").addEventListener("click", () => {
  const alimento = document.getElementById("alimento").value
  const cantidad = document.getElementById("cantidad").value
  const calorias = Number(document.getElementById("calorias").value)
  const actividad = document.getElementById("actividad").value
  if (alimento && cantidad && !isNaN(calorias )&& calorias >=0){
    desayunoDia1 = new Desayuno(alimento, cantidad, calorias, actividad)
    document.getElementById("desayunoregistrado").textContent = `Registrado: ${desayunoDia1.alimento} - ${desayunoDia1.cantidad} - ${desayunoDia1.calorias} cal - Actividad: ${desayunoDia1.actividad}`

  } else {
     document.getElementById("desayunoregistrado").textContent=`Revisar datos cargados`

  }
})
  
document.getElementById("guardarAlmuerzo").addEventListener("click", () => {
  const comida = document.getElementById("comida").value
  const porcion = document.getElementById("porcion").value
  const caloria = Number(document.getElementById("caloria").value)
  const act = document.getElementById("act").value
    if (comida && porcion && !isNaN(caloria) && caloria >=0){
    almuerzoDia1 = new Almuerzo(comida, porcion, caloria, act)
    document.getElementById("almuerzoregistrado").textContent = `Registrado: ${almuerzoDia1.comida} - ${almuerzoDia1.porcion} - ${almuerzoDia1.caloria} cal - Actividad: ${almuerzoDia1.act}`

  } else {
     document.getElementById("almuerzoregistrado").textContent=`Revisar datos cargados`

  }
})
  
document.getElementById("guardarPicoteo").addEventListener("click", () => {
  const detalle = document.getElementById("detalle").value
  const cant = document.getElementById("cant").value
  const cal= Number(document.getElementById("cal").value)
  const ejercicio = document.getElementById("ejercicio").value
  if (detalle && cant && !isNaN(cal )&& cal >=0){
    picoteoDia1 = new Merienda(detalle, cant, cal, ejercicio)
    document.getElementById("otroregistro").textContent = `Registrado: ${picoteoDia1.detalle} - ${picoteoDia1.cant} - ${picoteoDia1.cal} cal - Actividad: ${picoteoDia1.ejercicio}`

  } else {
     document.getElementById("otroregistro").textContent=`Revisar datos cargados`

  }
})

document.getElementById("cenaRegistrada").addEventListener("click", () => {
  const que = document.getElementById("que").value
  const cuanto = document.getElementById("cuanto").value
  const kcal = Number(document.getElementById("kcal").value)
  const ejer = document.getElementById("ejer").value
  if (que && cuanto  && !isNaN(kcal ) && kcal >=0){
    cenaDia1 = new Cena(que, cuanto, kcal, ejer )
    document.getElementById("cenaregistrada").textContent = `Registrado: ${cenaDia1.que} - ${cenaDia1.cuanto} - ${cenaDia1.kcal} cal - Actividad: ${cenaDia1.ejer}`

  } else {
     document.getElementById("cenaregistrada").textContent=`Revisar datos cargados`

  }
})


function consumidoeneldia () { 
    let totalcons=0

    if (desayunoDia1) totalcons += desayunoDia1.calorias*Number (desayunoDia1.cantidad)
    if (almuerzoDia1) totalcons += almuerzoDia1.caloria*Number(almuerzoDia1.porcion)
    if (picoteoDia1) totalcons += picoteoDia1.cal*Number(picoteoDia1.cant)
    if (cenaDia1) totalcons += cenaDia1.kcal*Number (cenaDia1.cuanto)

  document.getElementById("totalcalorias").textContent = `Total consumido hoy: ${totalcons} calorías.`
  return totalcons 
}

document.getElementById("calcularTotal").addEventListener("click", consumidoeneldia)



// Dinamica// 

function mostrarDiferencia() {
  
  const caloriasObjetivo = Number(localStorage.getItem("caloriasObjetivo"))
  const totalConsumido =consumidoeneldia()
  const diferencia = caloriasObjetivo - totalConsumido

  const balanza = document.getElementById("resultadoCalorias")
  
  if (diferencia > 0) {
    balanza.textContent = `Te quedan ${diferencia} calorías por consumir.`
  } else if (diferencia === 0) {
    balanza.textContent = "¡Has alcanzado tu objetivo calórico del día! ¡Felicidades! "
  } else {
    balanza.textContent = `¡Cuidado! Te pasaste por ${diferencia} calorías.`
  }
  
}