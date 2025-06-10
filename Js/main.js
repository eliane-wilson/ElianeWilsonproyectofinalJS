//Primer paso: Calcular el Indice Metabolico Basal del usuario: 
function CalculoTasaMetabolicaB (sexo, altura,peso, edad)  
{
    let tmetbasal= 0
    if (sexo=="mujer"){
    tmetbasal = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad)
    } else if (sexo=="hombre"){
    tmetbasal = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad)
  } else {
    console.log("Seleccionaste una opcion incorrecta, Usa 'hombre' o 'mujer'.")
    return null
  }
  }

  //Ingreso de datos del usuario: 

let sexo = prompt ("A continuación ingrese su sexo: Mujer / Hombre").toLowerCase()
let peso = prompt ("A continuación ingrese su peso en kilogramos, ej: 73.400 kg, 60 kg")
let altura = prompt ("Ingrese su altura en centimetros, ej: 1 metro 72 cm sería  172 cm ")
let edad = prompt ("Ingrese su edad")


let ResultadoTMB = CalculoTasaMetabolicaB (sexo, altura,peso, edad)

if (ResultadoTMB !== null) {
console.log("Tu TMB es: " + ResultadoTMB + " calorías por día")
}
//ver alert , ver el prompt como variable cuantitativa - no string 