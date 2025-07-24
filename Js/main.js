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

    if (sexo !== "hombre" && sexo !== "mujer") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, seleccioná tu sexo antes de calcular.",
      })
      return
    }

    if (isNaN(peso) || peso <= 0 || peso > 700) {
      Swal.fire({
        icon: "error",
        title: "Peso inválido",
        text: "Ingresá un peso válido entre 1 y 700 kg.",
      })
      return
    }
      

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
  
  return factoractividad*tmb

}


const selectActividad = document.getElementById("actividad")
let caloriasmantenimiento=0 
selectActividad.onchange=()=>{
  const actividad =Number(selectActividad.value)

    if (resultadotmb === null) {
      Swal.fire({
        icon: "warning",
        title: "TMB no calculada",
        text: "Primero completá correctamente tu sexo, edad, peso y altura para calcular la Tasa Metabólica Basal.",
      })
      return
    }

    if (actividad >= 1 && actividad <= 5) {
      caloriasmantenimiento = calculoactividad(resultadotmb, actividad)
      alertain.textContent = `Tu Tasa Metabólica Basal es: ${resultadotmb} kcal por día. Calorías para mantenimiento: ${caloriasmantenimiento} kcal por día`
    }
  }
  

const objetivos = ["bajar de peso", "mantener peso", "ganar masa muscular", "tonificar"]
let objetivoinput=document.getElementById("meta")
let objetivoelegido=""
let caloriasobjetivo=0


 
objetivoinput.onchange=()=>{
 
  const objetivousuario= Number(objetivoinput.value)

  if (resultadotmb === null || caloriasmantenimiento === 0) {
    Swal.fire({
      icon: "warning",
      title: "Faltan datos previos",
      text: "Para calcular las calorías objetivo, primero debés obtener tu TMB y seleccionar el nivel de actividad.",
    })
    return
  }

  
  if (objetivousuario>0 && objetivousuario<5){
    objetivoelegido= objetivos [objetivousuario -1 ]
    alertaP.textContent= `Tu objetivo elegido es: ${objetivoelegido}`
    caloriasobjetivo = calcularcaloriasobjetivo(caloriasmantenimiento, objetivoelegido)


    caloriasobjetivo = calcularcaloriasobjetivo(caloriasmantenimiento, objetivoelegido)
    Swal.fire({
      title: `¡Objetivo establecido!`,
      html: `
        <p style="font-size: 1.2em;">
          <strong>Tu objetivo:</strong> ${objetivoelegido}<br>
          <strong>Calorías a consumir:</strong> ${caloriasobjetivo} kcal/día
        </p>
      `,
      width: 600,
      padding: "2em",
      color: "#2b2b2b",
      background: "#fff url('https://sweetalert2.github.io/images/trees.png')",
  backdrop: `
    rgba(0,0,123,0.3)
    url("https://media.giphy.com/media/VQGvAbGi4IRaw9sE1U/giphy.gif")
    center top
    no-repeat
      `
    })

    document.getElementById("resultadofinal").innerHTML=  `Tu objetivo es: ${objetivoelegido}  Calorías a consumir: ${caloriasobjetivo} por día manteniendo la misma actividad fisica `
    localStorage.setItem("caloriasObjetivo", caloriasobjetivo)
    

  }else{ 
     Swal.fire({
      icon: "warning",
      title: "Ingresaste un objetivo Incorrecto",
      text: "Para continuar debes colocar un valor entre 1 y 4, segun tu objetivo",
    })
    return

  }
}

//Calorias objetivo//

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

