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
const btncalcular = document.getElementById("calcular")


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
  pesajeInput.onkeyup = () => {
    const peso = Number(pesajeInput.value)
    if (peso <= 0 || peso > 700 ) {
       alertaP.textContent = " Peso inválido. Debe estar entre 1 y 700 kg."
    
      } else {
        alertaP.textContent = ""
   
    }
  }

//Estructura de control para altura :

  estaturaInput.onkeyup = () => {
    const altura = Number(pesajeInput.value)
    if (altura <= 0 || altura > 250 ) {
       alertaP.textContent = " Corregir altura debes colocar en centimetros: ej 1 metro 20 serian 120 cm."
    
      } else {
        alertaP.textContent = ""
   
    }
  }





 
  
  btncalcular.onclick = () => {
    const peso = Number(pesajeInput.value)
    const altura = Number(estaturaInput.value)
    const edad = Number(edadspam.textContent)

    const resultado=calculotasametabolicab(sexo, altura, peso, edad)
    resultadoaP.textContent = `TMB: ${resultado.toFixed(2)} kcal/día`
  }


  let resultadotmb = calculotasametabolicab (sexo, altura,peso, edad)


// Se agregaron alerts y estructuras de control para las variables numericas altura , edad y peso segun correccion //

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
      alert ("Opcion incorrecta, se tomará un factor de actividad sedentario por defecto")
      factoractividad = undefined
  }
  factoractividad = factoractividad ?? 1.2
  //si el usuario ingresa una opcion incorrecta se toma una actividad sedentaria por defecto //
  return factoractividad*tmb

}
let caloriasmantenimiento=0 //defini por fuera del if  porque sino tira error en la consola como variable no definida 
if (resultadotmb !== null) {
  let actividad = Number (prompt ("Ingresa tu nivel de actividad física:  \n 1-Sedentario \n 2- Ligero \n3-Moderado (3 a 5 veces por semana) \n 4-Intenso (6 a 7 veces por semana) \n 5- Muy Intenso (2 veces por dia)"))
  if (actividad >= 1 && actividad <= 5){
  caloriasmantenimiento = calculoactividad (resultadotmb, actividad)
  alert("Tu Tasa Metabólica Basal es: " + resultadotmb + "  Calorias por dia")
  console.log("Tu Tasa Metabolica Basal es: " + resultadotmb + " calorías por día")
  console.log("Calorias para mantenimiento es: "+ caloriasmantenimiento + " por dia, manteniendo tu actividad")
  }
}
//Array para objetivos de usuario //
const objetivos = ["bajar de peso", "mantener peso", "ganar masa muscular", "tonificar"]
let objetivoelegido = "" //defino objetivoelegido fuera del else para que pueda funcionar porque estaba declarada dentro del else{ let objetivo...} porque lo voy a usar mas adelante
let establecerobjetivo = Number (prompt ("A continuacion ingrese un objetivo :1- Bajar de peso, 2- Mantener, 3-Ganar Masa Muscular, 4-Tonificar "))
if (establecerobjetivo < 1 || establecerobjetivo > 4 ) {
  alert("Opción inválida. Recargá la página e intentá de nuevo.");
} else { 
  objetivoelegido= objetivos[establecerobjetivo-1]
}

//Calculo cuantas calorias tengo que gastar segun mi objetivo//
function calcularcaloriasobjetivo(caloriasMantenimiento, objetivo){
  let caloriasobjetivo=0
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
      console.log ("Objetivo no reconocido, se toma por defecto mantener peso")
      caloriasobjetivo=caloriasmantenimiento
  }
  return (caloriasobjetivo)
}

let caloriasobjetivo = calcularcaloriasobjetivo(caloriasmantenimiento, objetivoelegido)

document.getElementById("resultado").innerHTML = "Tu objetivo es:  " + objetivoelegido  + "<br>"+  "Calorias a consumir: " + caloriasobjetivo + "por dia, manteniendo la misma actividad fisica"
console.log ("Calorias objetivo para : " + objetivoelegido + "Total a consumir: " + caloriasobjetivo)
  
