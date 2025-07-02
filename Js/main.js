//Primer paso: Calcular el Indice Metabolico Basal del usuario: 

//Definir varaibles para eventos - se reemplazan los prompt, alert y consolelog. //

let sexo = "" 
const btnhombre = document.getElementById("btnhombre")
const btnmujer = document.getElementById("btnmujer")
const estaturaInput = document.getElementById("estatura")
const pesajeInput = document.getElementById("pesaje")
const edadInput = document.getElementById("edad")
const resultadoaP = document.getElementById("resultado")
const alertaP = document.getElementById("alerta") //Reemplazo el alert con un texto en html//
const alertain= document.getElementById("alertain") 
const btncalcular = document.getElementById("calcular")
let resultadotmb = null


//Primera interaccion: evento con Botones para definir sexo // 

btnhombre.onclick= () =>{
  sexo = "hombre"
  resultadoaP.textContent = "Sexo seleccionado: Hombre"
}

btnmujer.onclick =() =>{
  sexo = "mujer"
  resultadoaP.textContent = "Sexo seleccionado: Mujer"
}

//Definicion de funcion de calculo // 

function calculotasametabolicab ( sexo, altura, peso, edad)  {
    let tmetbasal= 0
    if (sexo=="mujer"){
    tmetbasal = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad)
    } else if (sexo=="hombre"){
    tmetbasal = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad)
    } else {
    
    return null
    }
  return tmetbasal
}

  //Armado del boton Edad con estructura de control: se desactiva cuando llega a cero y a 150 años //


  let edadspam=document.getElementById("counteredad")
  let contadoredad = 18 
  let sumar=document.getElementById("btnedadsuma")
  let restar= document.getElementById("btnedadresta")

  sumar.onclick=()=>{
    if (contadoredad< 151){
      contadoredad ++
      counteredad.innerHTML=contadoredad
      restar.disabled=false 
      
    }else{
      sumar.disabled=true
      

    }
   
  }

  restar.onclick=()=>{
    
    if (contadoredad>1){
      contadoredad --
      counteredad.innerHTML=contadoredad
      sumar.disabled =false
      
    } else {
      restar.disabled=true 
    }
  }

  //Estructura de control para peso : 
  //pesajeInput.onkeyup = () => {
    //const peso = Number(pesajeInput.value)
    //if (peso <= 0 || peso > 700 ) {
       //alertaP.textContent = " Peso inválido. Debe estar entre 1 y 700 kg."
    
      //} else {
        //alertaP.textContent = ""
   
    //}
  //}

//Estructura de control para altura :

  //estaturaInput.onkeyup = () => {
    //const altura = Number(pesajeInput.value)
    //if (altura <= 0 || altura > 250 ) {
      // alertaP.textContent = " Corregir altura debes colocar en centimetros: ej 1 metro 20 serian 120 cm."
    
      //} else {
       // alertaP.textContent = ""
   
    //}
   //}

   



  btncalcular.onclick = () => {
    
    const peso = Number(pesajeInput.value)
    const altura = Number(estaturaInput.value)
    const edad = Number(edadspam.textContent)
    if (peso <= 0 || peso > 700 ){
      alertaP.textContent = " Peso inválido. Debe estar entre 1 y 700 kg."
      return
    } else{ 
      alertaP.textContent =""
    }
    if (altura <= 0 || altura > 250) {
      alertaP.textContent = " Corregir altura. Debe ser menor a 250 cm y debes colocar en centimetros como en el ejemplo."
      return
    }else {
      alertaP.textContent= "" 
    }

    const resultado=calculotasametabolicab(sexo, altura, peso, edad)
    resultadoaP.textContent = `TMB: ${resultado.toFixed(2)} kcal/día`
    resultadotmb = calculotasametabolicab(sexo, altura, peso, edad)
  }


  

// Se agregaron alerts y estructuras de control para las variables numericas altura , edad y peso segun correccion //
 // ETAPA 2 // 

//Para poder calcular las calorias segun objetivo, la formula requiere definir actividad

function calculoactividad (tmb, nivelactividad){
  let factoractividad
  switch (nivelactividad){
    case 1: 
      factoractividad=1.2
      break
    case 2:
      factoractividad=1.375
      break
    case 3:
      factoractividad=1.55
      break
    case 4:
      factoractividad=1.725
      break
    case 5:
      factoractividad=1.9
      break
    default: 
      alertaP.textContent = "Opcion incorrecta, se tomará un factor de actividad sedentario por defecto"
      factoractividad = undefined
  }
  factoractividad = factoractividad ?? 1.2
  //si el usuario ingresa una opcion incorrecta se toma una actividad sedentaria por defecto //
  return factoractividad*tmb

}
//Vinculo la opcion de html con mi funcion switch 
const selectActividad = document.getElementById("actividad")
let caloriasmantenimiento=0 
selectActividad.onchange=()=>{
  const actividad =Number(selectActividad.value)

  if (resultadotmb !== null && actividad >= 1 && actividad <= 5){
  caloriasmantenimiento = calculoactividad (resultadotmb, actividad)
  alertain.textContent=`Tu Tasa Metabólica Basal es: ${resultadotmb} kcal por día. /n Calorías para mantenimiento: ${caloriasmantenimiento} kcal por día`
  //console.log("Tu Tasa Metabolica Basal es: " + resultadotmb + " calorías por día")
  //console.log("Calorias para mantenimiento es: "+ caloriasmantenimiento + " por dia, manteniendo tu actividad")
  }
  }
//Array para objetivos de usuario //
const objetivos = ["bajar de peso", "mantener peso", "ganar masa muscular", "tonificar"]
let objetivoinput=document.getElementById("meta")
let objetivoelegido=""
let caloriasobjetivo=0

objetivoinput.onchange=()=>{
 
  const objetivousuario= Number(objetivoinput.value)
  if (objetivousuario>0 && objetivousuario<5){
    objetivoelegido= objetivos [objetivousuario -1 ]
    alertaP.textContent= `Tu objetivo elegido es: ${objetivoelegido}`
    caloriasobjetivo = calcularcaloriasobjetivo(caloriasmantenimiento, objetivoelegido)


    caloriasobjetivo = calcularcaloriasobjetivo(caloriasmantenimiento, objetivoelegido)

    document.getElementById("resultadofinal").innerHTML=  `Tu objetivo es: ${objetivoelegido}  Calorías a consumir: ${caloriasobjetivo} por día manteniendo la misma actividad fisica `
   
    
    //console.log("Calorías objetivo para: " + objetivoelegido + " Total: " + caloriasobjetivo) - para control interno, no se ejecuta

  }else{ 
    alertain.textContent="Ingresaste un objetivo incorrecto, coloca solo valores del 1 al 4  "
  }
}


//Calculo cuantas calorias tengo que gastar segun mi objetivo//
function calcularcaloriasobjetivo(caloriasMantenimiento, objetivo){
  
  switch (objetivo.toLowerCase()){
    case "bajar de peso":
      caloriasobjetivo=caloriasmantenimiento -500
      break
    case "mantener peso":
      caloriasobjetivo=caloriasmantenimiento 
      break
    case "ganar masa muscular":
      caloriasobjetivo=caloriasmantenimiento + 400
      break
    case "tonificar":
      caloriasobjetivo=caloriasmantenimiento - 200
      break
    default:
      alertaP.textContent= "Objetivo no reconocido, se toma por defecto mantener peso"
      caloriasobjetivo=caloriasmantenimiento
  }
  return (caloriasobjetivo)
}

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
