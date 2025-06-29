//Primer paso: Calcular el Indice Metabolico Basal del usuario: 
function calculotasametabolicab ( sexo, altura, peso, edad)  {
    let tmetbasal= 0
    if (sexo=="mujer"){
    tmetbasal = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad)
    } else if (sexo=="hombre"){
    tmetbasal = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad)
    } else {
    console.log("Seleccionaste una opcion incorrecta, Usa 'hombre' o 'mujer'.")
    return null
    }
  return tmetbasal
}

//Restriccion por sexo. 
  let sexo = "";
  while (sexo !== "hombre" && sexo !== "mujer") {
    sexo = prompt("A continuación ingrese su sexo: Mujer / Hombre").toLowerCase()
    if (sexo !== "hombre" && sexo !== "mujer") {
    alert("Opción inválida. Por favor ingrese 'hombre' o 'mujer'.")
    }
  }

  //Ingreso de datos del usuario: con estructuras de Control // 


  let peso =Number (prompt ("A continuación ingrese su peso en kilogramos, ej: 73.400 kg, 60 kg"))
  while (peso <= 0 || peso >=700) {
    alert ("Debes ingresar un valor real, superior a 0 kg o menor a 700 para continuar")
    peso = Number(prompt("Ingrese su peso en kilogramos"))
  }

  let altura =Number (prompt ("Ingrese su altura en centimetros, ej: 1 metro 72 cm sería  172 cm "))
  while (altura<=0 || altura >=250) {
    alert ("Debes ingresar una estatura mayor a cero para continuar y menor a 250 cm-2metros y medio - .")
    altura= Number (prompt("Ingrese su altura en centímetros"))
  }
  let edad =Number (prompt ("Ingrese su edad"))
  while ( edad <=1 || edad >=150){
    alert ("Debes ingresar una edad mayor a cero, o menor a 150 años para continuar")
    edad= Number (prompt("Ingrese su edad"))
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
  
