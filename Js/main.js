// Indice Metabolico Basal  


let sexo = "" 
const btnhombre = document.getElementById("btnhombre")
const btnmujer = document.getElementById("btnmujer")
const estaturaInput = document.getElementById("estatura")
const pesajeInput = document.getElementById("pesaje")
const edadInput = document.getElementById("edad")
const resultadoaP = document.getElementById("resultado")
const alertaP = document.getElementById("alerta") 
const alertain= document.getElementById("alertain") 
const btncalcular = document.getElementById("calcular")
let resultadotmb = null


//Sexo // 

btnhombre.onclick= () =>{
  sexo = "hombre"
  resultadoaP.textContent = "Sexo seleccionado: Hombre"
}

btnmujer.onclick =() =>{
  sexo = "mujer"
  resultadoaP.textContent = "Sexo seleccionado: Mujer"
}


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

  //Edad 


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

  //Altura 
  let alturaSpan = document.getElementById("counteraltura")
  let contadorAltura = 160
  let btnAlturaSumar = document.getElementById("btnalturasuma")
  let btnAlturaRestar = document.getElementById("btnalturaresta")

  btnAlturaSumar.onclick = () => {
    if (contadorAltura < 250) {
        contadorAltura++
        alturaSpan.textContent = contadorAltura
        btnAlturaRestar.disabled = false
    } else {
        btnAlturaSumar.disabled = true
    }
  }

  btnAlturaRestar.onclick = () => {
    if (contadorAltura > 30) {
        contadorAltura--
        alturaSpan.textContent = contadorAltura
        btnAlturaSumar.disabled = false
    } else {
        btnAlturaRestar.disabled = true
    }
  }
   



  btncalcular.onclick = () => {
    
    const peso = Number(pesajeInput.value)
    const altura = Number(alturaSpan.textContent)
    const edad = Number(edadspam.textContent)
    

    const resultado= calculotasametabolicab(sexo, altura, peso, edad)
    resultadoaP.textContent = `TMB: ${resultado.toFixed(2)} kcal/día`
    resultadotmb = resultado

    localStorage.setItem("sexo", sexo)
    localStorage.setItem("edad", edad)
    localStorage.setItem("peso", peso)
    localStorage.setItem("altura", altura)
    localStorage.setItem("tmb", resultado.toFixed(2))

  }



  //Actividad //

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
    localStorage.setItem("caloriasObjetivo", caloriasobjetivo)
    
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

