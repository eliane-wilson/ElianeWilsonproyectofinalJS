document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM listo");

  const { Calendar } = window.VanillaCalendarPro;

  const calendar = new Calendar('#calendar', {
    settings: {
      lang: 'es',
      visibility: {
        calendar: true,
      },
    },
    actions: {
      clickDay: ({ date }) => {
        console.log("clickDay activado");
        const fecha = date;
        console.log("Fecha seleccionada:", fecha);
        document.getElementById("fechaSeleccionada").textContent = fecha;
        mostrarRegistros(fecha);
      }
    }
  });

  calendar.init();

  // Mostrar registros de hoy por defecto
  const hoy = new Date().toISOString().split("T")[0];
  document.getElementById("fechaSeleccionada").textContent = hoy;
  mostrarRegistros(hoy);
});


function mostrarRegistros(fecha) {
  const registros = JSON.parse(localStorage.getItem("registrosComida")) || {};
  const datos = registros[fecha];
  const contenedor = document.getElementById("contenidoRegistros");

  console.log("Registros encontrados para", fecha, datos);

  if (!datos) {
    contenedor.innerHTML = `<p>No hay registros para esta fecha.</p>`;
    return;
  }

  const generarLista = (titulo, items) => {
    if (!items || items.length === 0) return `<p>Sin datos de ${titulo.toLowerCase()}.</p>`;
    return `
      <h3>${titulo}</h3>
      <ul>
        ${items.map(item => `<li>${Object.values(item).join(" - ")}</li>`).join("")}
      </ul>
    `;
  };

  contenedor.innerHTML = `
    ${generarLista("Desayuno", datos.desayuno)}
    ${generarLista("Almuerzo", datos.almuerzo)}
    ${generarLista("Picoteo", datos.picoteo)}
    ${generarLista("Cena", datos.cena)}
  `;
}
