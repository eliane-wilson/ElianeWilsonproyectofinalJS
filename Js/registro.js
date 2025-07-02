// Parte II - Iniciamos con los registros de calorias - armo elementos de clases  // 

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


document.getElementById("guardarDesayuno").addEventListener("click", () => {
  const alimento = document.getElementById("alimento").value
  const cantidad = document.getElementById("cantidad").value
  const calorias = Number(document.getElementById("calorias").value)
  const actividad = document.getElementById("actividad").value
  if (alimento && cantidad && !isNaN(calorias )){
    const desayunoDia1 = new Desayuno(alimento, cantidad, calorias, actividad)
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
  if (comida && porcion && !isNaN(caloria )){
    const almuerzoDia1 = new Almuerzo(comida, porcion, caloria, act)
    document.getElementById("almuerzoregistrado").textContent = `Registrado: ${almuerzoDia1.alimento} - ${almuerzoDia1.cantidad} - ${almuerzoDia1.calorias} cal - Actividad: ${almuerzoDia1.actividad}`

  } else {
     document.getElementById("almuerzoregistrado").textContent=`Revisar datos cargados`

  }
})
  

// Local Storage: Como queremos hacer un seguimiento vamos a guardar la info principal. 
//Info de perfil  
