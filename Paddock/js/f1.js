// =========================================================
// Funciones compartidas por escuderia.html y panel.html
// =========================================================

var URL_OPENF1 = "https://api.openf1.org/v1";
var URL_IMAGENES = "https://media.formula1.com/image/upload/c_fit,h_400/q_auto/v1740000001/common/f1/2026/";

// "Red Bull Racing" -> "redbullracing" (así nombra F1 sus imágenes)
function crearSlug(nombre) {
  var texto = nombre.toLowerCase();
  var slug = "";
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] != " ") {
      slug = slug + texto[i];
    }
  }
  return slug;
}

function urlLogo(nombreEquipo) {
  var slug = crearSlug(nombreEquipo);
  return URL_IMAGENES + slug + "/2026" + slug + "logowhite.webp";
}

function urlAuto(nombreEquipo) {
  var slug = crearSlug(nombreEquipo);
  return URL_IMAGENES + slug + "/2026" + slug + "carright.webp";
}

// Cambia el color de toda la página al de la escudería
function aplicarColorEquipo(color) {
  document.body.style.setProperty("--equipo", "#" + color);
}

// A partir de la lista de pilotos arma la lista de escuderías (sin repetir)
function obtenerEscuderias(pilotos) {
  var escuderias = [];
  for (let i = 0; i < pilotos.length; i++) {
    var existe = false;
    for (let j = 0; j < escuderias.length; j++) {
      if (escuderias[j].nombre == pilotos[i].team_name) {
        escuderias[j].pilotos.push(pilotos[i].full_name);
        existe = true;
        break;
      }
    }
    if (!existe) {
      escuderias.push({
        nombre: pilotos[i].team_name,
        color: pilotos[i].team_colour,
        pilotos: [pilotos[i].full_name]
      });
    }
  }
  return escuderias;
}
