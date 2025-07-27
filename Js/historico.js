document.addEventListener('DOMContentLoaded', () => {
  const hoy = new Date().toLocaleDateString('sv-SE')
  document.getElementById("fechaSeleccionada").textContent = hoy

  const { Calendar } = window.VanillaCalendarPro

  const calendar = new Calendar('#calendar', {
    settings: {
      lang: 'es',
      firstWeekday: 0,
      selectedWeekends: [0, 3, 6],
      dateMin: '2025-06-01',
      dateMax: '2038-12-31',
      visibility: {
        calendar: true
      }
    },
    actions: {
      clickDay: ({ date }) => {
        document.getElementById("fechaSeleccionada").textContent = date
        const hoy = new Date().toLocaleDateString('sv-SE')
        if (date < hoyISO) {
          mostrarDesdeHistorico(date)
        } else {
          mostrarDesdeLocal(date)
        }
      }
    }
  })

  calendar.init()


  mostrarDesdeLocal(hoy)
})


function mostrarDesdeHistorico(fecha) {
  const URL_JSON = "../../db/historico.json"
  fetch(URL_JSON)
    .then(res => res.json())
    .then(historico => {
      const data = historico[fecha]
      renderizarRegistros(fecha, data)
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "No se pudo cargar el historial",
        text: "Hubo un error al cargar los datos históricos.",
        confirmButtonColor: "#198754"
      })
    })
}


function mostrarDesdeLocal(fecha) {
  try {
    const registros = JSON.parse(localStorage.getItem("registrosComida")) || {}
    const data = registros[fecha]
    renderizarRegistros(fecha, data)
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al acceder a tus registros",
      text: "No pudimos cargar tus registros locales.",
      confirmButtonColor: "#198754"
    })
  }
}


function renderizarRegistros(fecha, datos) {
  const contenedor = document.getElementById("contenidoRegistros")

  if (!datos) {
    contenedor.innerHTML = `<p>No hay registros para esta fecha.</p>`
    return
  }

  const generarLista = (titulo, items) => {
    if (!items || items.length === 0) return `<p>Sin datos de ${titulo.toLowerCase()}.</p>`
    return `
      <h3>${titulo}</h3>
      <ul>
        ${items.map(item => `<li>${Object.values(item).join(" - ")}</li>`).join("")}
      </ul>
    `
  }

  contenedor.innerHTML = `
    ${generarLista("Desayuno", datos.desayuno)}
    ${generarLista("Almuerzo", datos.almuerzo)}
    ${generarLista("Merienda", datos.merienda || datos.picoteo)}
    ${generarLista("Cena", datos.cena)}
  `
}