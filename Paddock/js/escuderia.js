var listaEscuderias = [];

window.onload = function () {
  var datosSesion = localStorage.getItem("sesionUsuario");
  if (!datosSesion) {
    window.location.href = "index.html";
    return;
  }

  var sesion = JSON.parse(datosSesion);
  document.getElementById("nombreUsuario").innerText = sesion.firstName;

  obtenerEscuderiasApi();
};

async function obtenerEscuderiasApi() {
  try {
    var respuesta = await fetch(URL_OPENF1 + "/drivers?session_key=latest");
    var pilotos = await respuesta.json();
    listaEscuderias = obtenerEscuderias(pilotos);
    mostrarEscuderias();
  } catch (error) {
    document.getElementById("cargando").innerText = "No se pudieron cargar las escuderías";
    console.error("Error al obtener escuderías:", error);
  }
}

function mostrarEscuderias() {
  var contenedor = document.getElementById("listaEscuderias");
  contenedor.innerHTML = "";
  document.getElementById("cargando").innerText = "";

  for (let i = 0; i < listaEscuderias.length; i++) {
    var esc = listaEscuderias[i];
    var nombresPilotos = "";
    for (let j = 0; j < esc.pilotos.length; j++) {
      if (j > 0) {
        nombresPilotos = nombresPilotos + " · ";
      }
      nombresPilotos = nombresPilotos + esc.pilotos[j];
    }

    var columna = document.createElement("div");
    columna.className = "col-sm-6 col-lg-4";

    // Cada tarjeta usa el color de su propio equipo
    columna.innerHTML =
      "<div class='tarjeta tarjeta-hover tarjeta-escuderia p-4' style='--equipo:#" + esc.color + "' onclick='elegirEscuderia(" + i + ")'>" +
        "<img class='logo' src='" + urlLogo(esc.nombre) + "' alt='" + esc.nombre + "'>" +
        "<h4 class='titulo mt-3 mb-1'>" + esc.nombre + "</h4>" +
        "<p class='small texto-gris mb-0'>" + nombresPilotos + "</p>" +
        "<span class='franja mt-3'></span>" +
        "<img class='auto' src='" + urlAuto(esc.nombre) + "' alt=''>" +
      "</div>";

    contenedor.appendChild(columna);
  }
}

function elegirEscuderia(posicion) {
  var esc = listaEscuderias[posicion];
  localStorage.setItem("escuderiaFavorita", JSON.stringify(esc));
  window.location.href = "panel.html";
}
