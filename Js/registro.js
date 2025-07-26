//Perfil//
const inputNombre = document.getElementById("nombreUsuario")
const btnGuardar = document.getElementById("guardarPerfil")

document.getElementById("edadMostrada").textContent = (localStorage.getItem("edad") ) + " años"
document.getElementById("pesoMostrado").textContent = (localStorage.getItem("peso") ) + " kg"
document.getElementById("alturaMostrada").textContent = (localStorage.getItem("altura") ) + " cm"
document.getElementById("tmbMostrada").textContent = (localStorage.getItem("tmb") ) + " kcal"

const perfilGuardado = JSON.parse(localStorage.getItem("perfilUsuario"))
if (perfilGuardado && perfilGuardado.nombre) {
  inputNombre.value = perfilGuardado.nombre
}

btnGuardar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim()

  if (!nombre) {
    Swal.fire({
      icon: "warning",
      title: "Campo vacío",
      text: "Necesitamos tu nombre en el Perfil",
    })
    return
  }

  Swal.fire({
    title: "¿Querés guardar los cambios?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        const nuevoPerfil = {
          nombre,
          sexo: localStorage.getItem("sexo") || "",
          edad: Number(localStorage.getItem("edad")) || 0,
          peso: Number(localStorage.getItem("peso")) || 0,
          altura: Number(localStorage.getItem("altura")) || 0,
          tmb: Number(localStorage.getItem("tmb")) || 0
        }

        localStorage.setItem("perfilUsuario", JSON.stringify(nuevoPerfil))

        Swal.fire("¡Guardado!", "Tu perfil fue actualizado con éxito.", "success")
      } catch (error) {
        
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al guardar el perfil.",
        })
      }

    } else if (result.isDenied) {
      Swal.fire({
        icon: "error",
        title: "Cambios descartados",
        text: "Los cambios no fueron guardados.",
      })
    }
  })
})
  


// Registros // 

const selectDesayuno = document.getElementById("alimentoDesayuno")
const selectAlmuerzo = document.getElementById("alimentoAlmuerzo")
const selectPicoteo = document.getElementById("alimentoPicoteo")
const selectCena = document.getElementById("alimentoCena")
const URLlistado="../../db/data.json"
let calAlimento={}



function cargarLibreriaJson(){
  fetch(URLlistado)
  .then (response=> response.json ())
  .then (data => {
    data.forEach(alimento => {
      

      calAlimento[alimento.nombre] = alimento

      const option =document.createElement ("option")
      option.value=alimento.nombre
      option.textContent = alimento.nombre

      selectDesayuno.appendChild(option.cloneNode(true))
      selectAlmuerzo.appendChild(option.cloneNode(true))
      selectPicoteo.appendChild(option.cloneNode(true))
      selectCena.appendChild(option.cloneNode(true))

    })
  

  })
  .catch(error => {
     
})
}


cargarLibreriaJson()

//automatizacion calorias//

selectDesayuno.addEventListener("change", () => {
  const seleccionado = selectDesayuno.value
  const info = calAlimento[seleccionado]
  if (info) {
    document.getElementById("calorias").value = info.calorias
  }
})

selectAlmuerzo.addEventListener("change", () => {
  const seleccionado = selectAlmuerzo.value
  const info = calAlimento[seleccionado]
  if (info) {
    document.getElementById("caloria").value = info.calorias
  }
})

selectPicoteo.addEventListener("change", () => {
  const seleccionado = selectPicoteo.value
  const info = calAlimento[seleccionado]
  if (info) {
    document.getElementById("cal").value = info.calorias
  }
})

selectCena.addEventListener("change", () => {
  const seleccionado = selectCena.value
  const info = calAlimento[seleccionado]
  if (info) {
    document.getElementById("kcal").value = info.calorias
  }
})


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

//json 

const idActual = new Date().toISOString().split('T')[0]

function obtenerRegistros(id) {
  let registros = JSON.parse(localStorage.getItem("registrosComida")) || {}
  if (!registros[id]) {
    registros[id] = {
      desayuno: [],
      almuerzo: [],
      picoteo: [],
      cena: []
    }
  }
  return registros
}


function guardarRegistro(id, tipoComida, item) {
  const registros = obtenerRegistros(id)
  registros[id][tipoComida].push(item)
  localStorage.setItem("registrosComida", JSON.stringify(registros))
}



document.getElementById("guardarDesayuno").addEventListener("click", () => {
  const alimento = document.getElementById("alimentoDesayuno").value
  const cantidad = document.getElementById("cantidad").value
  const calorias = Number(document.getElementById("calorias").value)
  const actividad = document.getElementById("actividad").value
  
  if (alimento && cantidad && !isNaN(calorias )&& calorias >=0){
   const nuevoDesayuno = new Desayuno(alimento, cantidad, calorias, actividad)
   guardarRegistro (idActual, "desayuno", nuevoDesayuno)
   document.getElementById("desayunoregistrado").textContent = `Registrado: ${alimento} - ${cantidad} - ${calorias} cal - Actividad: ${actividad}`

  } else {
     document.getElementById("desayunoregistrado").textContent=`Revisar datos cargados`

  }
})
  
document.getElementById("guardarAlmuerzo").addEventListener("click", () => {
  const comida = document.getElementById("alimentoAlmuerzo").value
  const porcion = document.getElementById("porcion").value
  const caloria = Number(document.getElementById("caloria").value)
  const act = document.getElementById("act").value
    if (comida && porcion && !isNaN(caloria) && caloria >=0){
    const nuevoAlmuerzo = new Almuerzo(comida, porcion, caloria, act) 
    guardarRegistro(idActual, "almuerzo", nuevoAlmuerzo)
    document.getElementById("almuerzoregistrado").textContent = `Registrado: ${comida} - ${porcion} - ${caloria} cal - Actividad: ${act}`

  } else {
     document.getElementById("almuerzoregistrado").textContent=`Revisar datos cargados`

  }
})
  
document.getElementById("guardarPicoteo").addEventListener("click", () => {
  const detalle = document.getElementById("alimentoPicoteo").value
  const cant = document.getElementById("cant").value
  const cal= Number(document.getElementById("cal").value)
  const ejercicio = document.getElementById("ejercicio").value
  if (detalle && cant && !isNaN(cal )&& cal >=0){
    const nuevoPicoteo = new Merienda(detalle, cant, cal, ejercicio)
    guardarRegistro(idActual, "picoteo", nuevoPicoteo)
    document.getElementById("otroregistro").textContent = `Registrado: ${detalle} - ${cant} - ${cal} cal - Actividad: ${ejercicio}`

  } else {
     document.getElementById("otroregistro").textContent=`Revisar datos cargados`

  }
})

document.getElementById("cenaRegistrada").addEventListener("click", () => {
  const que = document.getElementById("alimentoCena").value
  const cuanto = document.getElementById("cuanto").value
  const kcal = Number(document.getElementById("kcal").value)
  const ejer = document.getElementById("ejer").value

  if (que && cuanto && !isNaN(kcal) && kcal >= 0) {
    const nuevaCena = new Cena(que, cuanto, kcal, ejer) 
    guardarRegistro(idActual, "cena", nuevaCena) 
    document.getElementById("cenaregistrada").textContent = `Registrado: ${que} - ${cuanto} - ${kcal} cal - Actividad: ${ejer}`
  } else {
    document.getElementById("cenaregistrada").textContent = `Revisar datos cargados`
  }
})


function consumidoeneldia () { 
  const registros = obtenerRegistros(idActual)
  let totalcons = 0;

  registros[idActual].desayuno.forEach(item => {
    if (item.calorias && item.cantidad) totalcons += item.calorias * Number(item.cantidad)
    
  });
  registros[idActual].almuerzo.forEach(item => {
   if (item.caloria && item.porcion) totalcons += item.caloria * Number(item.porcion)
  });
  registros[idActual].picoteo.forEach(item => {
    if (item.cal && item.cant) totalcons += item.cal * Number(item.cant)
  });
  registros[idActual].cena.forEach(item => {
    if (item.kcal && item.cuanto) totalcons += item.kcal * Number(item.cuanto)
  })

  document.getElementById("totalcalorias").textContent = `Total consumido hoy: ${totalcons} calorías.`
  return totalcons 
}





// Dinamica// 

function mostrarDiferencia() {
  const caloriasObjetivo = Number(localStorage.getItem("caloriasObjetivo"))
  const totalConsumido = consumidoeneldia()
  const diferencia = caloriasObjetivo - totalConsumido

  const balanza = document.getElementById("resultadoCalorias")

  if (diferencia > 0) {
    const mensaje = `Te quedan ${diferencia} calorías por consumir.`
    balanza.textContent = mensaje
    Swal.fire(`Te quedan ${diferencia} calorías por consumir.`)

  } else if (diferencia === 0) {
    const mensaje = "¡Has alcanzado tu objetivo calórico del día! ¡Felicidades!"
    balanza.textContent = mensaje

    Swal.fire({
      title: "¡Objetivo alcanzado!",
      text: mensaje,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url('https://i.pinimg.com/originals/e2/52/83/e2528392cb0e9e2b702e2485ecdd7673.jpg')",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.giphy.com/media/VQGvAbGi4IRaw9sE1U/giphy.gif")
        left top
        no-repeat
      `
    })
  } else { const exceso = Math.abs(diferencia)
    const mensaje = `¡Cuidado! Te pasaste por ${exceso} calorías.`
    balanza.textContent = mensaje
    Swal.fire({
    title: "Cuidado",
    text: `¡Cuidado! Te pasaste por ${exceso} calorías.`,
    icon: "warning"
})

    
  } 
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcularTotal").addEventListener("click", () => {
    consumidoeneldia()
    mostrarDiferencia()
  })
})
