//Primer paso: Calcular el Indice Metabolico Basal del usuario: 
function calculotasametabolicaB ( sexo, altura, peso, edad)  {
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
    sexo = prompt("A continuación ingrese su sexo: Mujer / Hombre").toLowerCase();
    if (sexo !== "hombre" && sexo !== "mujer") {
    alert("Opción inválida. Por favor ingrese 'hombre' o 'mujer'.");
    }
  }

  //Ingreso de datos del usuario: con variables de Control // 


let peso =Number (prompt ("A continuación ingrese su peso en kilogramos, ej: 73.400 kg, 60 kg"))

let altura =Number (prompt ("Ingrese su altura en centimetros, ej: 1 metro 72 cm sería  172 cm "))
let edad =Number (prompt ("Ingrese su edad"))


let resultadotmb = calculotasametabolicab (sexo, altura,peso, edad)


//ver alert , ver el prompt como variable cuantitativa - no string 

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
      alert ("Opcion incorrecta")
      return null
  }
  return factoractividad*tmb

}
if (resultadotmb !== null) {
  let actividad = Number (prompt ("Ingresa tu nivel de actividad física:  \n 1-Sedentario \n 2- Ligero \n3-Moderado (3 a 5 veces por semana) \n 4-Intenso (6 a 7 veces por semana) \n 5- Muy Intenso (2 veces por dia"))
  if (actividad >= 1 && actividad <= 5){
  let caloriasMantenimiento = CalculoActividad (resultadotmb, actividad)
  alert("Tu Tasa Metabólica Basal es: " + resultadotmb + "  Calorias por dia")
  console.log("Tu Tasa Metabolica Basal es: " + resultadotmb + " calorías por día")
  console.log("Calorias para mantenimiento es: "+ caloriasmantenimiento + " por dia, manteniendo tu actividad")
  }
}
//Array para objetivos de usuario //
const objetivos = ["bajar de peso", "mantener peso", "ganar masa muscular", "tonificar"]
let establecerobjetivo = Number (prompt ("A continuacion ingrese un objetivo :1- Bajar de peso, 2- Mantener, 3-Ganar Masa Muscular, 4-Tonificar "))
if (establecerobjetivo < 1 || establecerbbjetivo > 4 ) {
  alert("Opción inválida. Recargá la página e intentá de nuevo.");
} else { let objetivoelegido= objetivos[opcionobjetivo-1]}

//Calculo cuantas calorias tengo que gastar segun mi objetivo//
let caloriasobjetivo
if (objetivoelegido==="Bajar de peso") {caloriaobjetivo=caloriasmantenimiento -500}