var sesion = null;
var escuderia = null;
var listaPilotos = [];
var listaCarreras = [];
var listaEscuderias = [];
var listaSeguimiento = [];

var meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

window.onload = function () {
  var datosSesion = localStorage.getItem("sesionUsuario");
  if (!datosSesion) {
    window.location.href = "index.html";
    return;
  }

  var datosEscuderia = localStorage.getItem("escuderiaFavorita");
  if (!datosEscuderia) {
    window.location.href = "escuderia.html";
    return;
  }

  sesion = JSON.parse(datosSesion);
  escuderia = JSON.parse(datosEscuderia);

  // Toda la página toma el color de la escudería elegida
  aplicarColorEquipo(escuderia.color);

  document.getElementById("bienvenidoUsuario").innerText = sesion.firstName + " " + sesion.lastName;

  var contenedor = document.getElementById("foto");
  var imagen = document.createElement("img");
  imagen.src = sesion.image;
  imagen.className = "rounded-circle";
  imagen.style.width = "38px";
  imagen.style.height = "38px";
  imagen.style.objectFit = "cover";
  imagen.style.border = "2px solid #" + escuderia.color;
  contenedor.appendChild(imagen);

  mostrarEscuderiaFavorita();

  // La lista se guarda en localStorage porque DummyJSON no guarda los cambios de verdad
  var datosLista = localStorage.getItem("listaSeguimiento");
  if (datosLista) {
    listaSeguimiento = JSON.parse(datosLista);
  }
  mostrarLista();

  obtenerPilotos();
  obtenerCarreras();
};

function cerrarSesion() {
  localStorage.removeItem("sesionUsuario");
}

function mostrarEscuderiaFavorita() {
  document.getElementById("nombreEquipo").innerText = escuderia.nombre;
  document.getElementById("logoEquipo").src = urlLogo(escuderia.nombre);
  document.getElementById("autoEquipo").src = urlAuto(escuderia.nombre);

  var texto = "";
  for (let i = 0; i < escuderia.pilotos.length; i++) {
    if (i > 0) {
      texto = texto + " · ";
    }
    texto = texto + escuderia.pilotos[i];
  }
  document.getElementById("pilotosEquipo").innerText = texto;
}

// =========================================================
// OpenF1 (solo lectura - GET)
// =========================================================

async function obtenerPilotos() {
  try {
    var respuesta = await fetch(URL_OPENF1 + "/drivers?session_key=latest");
    if (!respuesta.ok) {
      document.getElementById("cargandoPilotos").innerText = "OpenF1 está ocupado, recarga la página en unos segundos";
      return;
    }
    listaPilotos = await respuesta.json();
    listaEscuderias = obtenerEscuderias(listaPilotos);
    document.getElementById("totalPilotos").innerText = listaPilotos.length;
    mostrarPilotos();
    mostrarEscuderias();
  } catch (error) {
    document.getElementById("cargandoPilotos").innerText = "No se pudieron cargar los pilotos";
    console.error("Error al obtener pilotos:", error);
  }
}

async function obtenerCarreras() {
  try {
    var respuesta = await fetch(URL_OPENF1 + "/meetings?year=2026");
    if (!respuesta.ok) {
      document.getElementById("cargandoCarreras").innerText = "OpenF1 está ocupado, recarga la página en unos segundos";
      return;
    }
    var datos = await respuesta.json();

    // Quitamos las pruebas de pretemporada, solo dejamos los Grandes Premios
    listaCarreras = [];
    for (let i = 0; i < datos.length; i++) {
      if (datos[i].meeting_name.indexOf("Testing") == -1) {
        listaCarreras.push(datos[i]);
      }
    }
    document.getElementById("totalCarreras").innerText = listaCarreras.length;
    mostrarCarreras();
  } catch (error) {
    document.getElementById("cargandoCarreras").innerText = "No se pudo cargar el calendario";
    console.error("Error al obtener carreras:", error);
  }
}

function mostrarPilotos() {
  var contenedor = document.getElementById("listaPilotos");
  contenedor.innerHTML = "";
  document.getElementById("cargandoPilotos").innerText = "";

  for (let i = 0; i < listaPilotos.length; i++) {
    var pil = listaPilotos[i];
    var foto = pil.headshot_url;
    if (!foto) {
      foto = urlLogo(pil.team_name);
    }

    var columna = document.createElement("div");
    columna.className = "col-6 col-md-4 col-xl-3";
    columna.innerHTML =
      "<div class='tarjeta tarjeta-hover h-100 overflow-hidden position-relative' style='--equipo:#" + pil.team_colour + "'>" +
        "<div class='numero-piloto'>" + pil.driver_number + "</div>" +
        "<div class='text-center pt-4' style='background: linear-gradient(180deg, #" + pil.team_colour + "55, transparent)'>" +
          "<img class='foto-piloto' src='" + foto + "' alt='" + pil.full_name + "'>" +
        "</div>" +
        "<div class='p-3'>" +
          "<p class='etiqueta mb-1'>" + pil.team_name + "</p>" +
          "<h6 class='fw-bold mb-3'>" + pil.full_name + "</h6>" +
          botonSeguir("Piloto", pil.full_name, "seguirPiloto(" + i + ")") +
        "</div>" +
      "</div>";
    contenedor.appendChild(columna);
  }
}

function mostrarCarreras() {
  var contenedor = document.getElementById("listaCarreras");
  contenedor.innerHTML = "";
  document.getElementById("cargandoCarreras").innerText = "";

  var hoy = new Date();
  var proximaMarcada = false;

  for (let i = 0; i < listaCarreras.length; i++) {
    var car = listaCarreras[i];
    var fecha = new Date(car.date_start);
    var textoFecha = fecha.getDate() + " " + meses[fecha.getMonth()];

    var estado = "";
    var opacidad = "1";
    if (car.is_cancelled) {
      estado = "<span class='badge bg-secondary'>Cancelada</span>";
      opacidad = "0.45";
    } else if (fecha < hoy) {
      estado = "<span class='small texto-gris'>Terminada</span>";
      opacidad = "0.7";
    } else if (!proximaMarcada) {
      estado = "<span class='chip'>Próxima</span>";
      proximaMarcada = true;
    }

    var columna = document.createElement("div");
    columna.className = "col-md-6 col-xl-4";
    columna.innerHTML =
      "<div class='tarjeta tarjeta-hover p-3 h-100 d-flex align-items-center gap-3' style='opacity:" + opacidad + "'>" +
        "<div class='text-center' style='min-width: 54px;'>" +
          "<div class='small texto-gris'>R" + (i + 1) + "</div>" +
          "<div class='fw-bold'>" + textoFecha + "</div>" +
        "</div>" +
        "<img class='bandera' src='" + car.country_flag + "' alt='" + car.country_name + "'>" +
        "<div class='flex-grow-1'>" +
          "<div class='fw-bold lh-sm'>" + car.meeting_name + "</div>" +
          "<div class='small texto-gris'>" + car.circuit_short_name + " · " + car.country_name + "</div>" +
          "<div class='mt-1'>" + estado + "</div>" +
        "</div>" +
        botonSeguir("Carrera", car.meeting_name, "seguirCarrera(" + i + ")") +
      "</div>";
    contenedor.appendChild(columna);
  }
}

function mostrarEscuderias() {
  var contenedor = document.getElementById("listaEscuderias");
  contenedor.innerHTML = "";

  for (let i = 0; i < listaEscuderias.length; i++) {
    var esc = listaEscuderias[i];
    var columna = document.createElement("div");
    columna.className = "col-6 col-md-4 col-xl-3";
    columna.innerHTML =
      "<div class='tarjeta tarjeta-hover p-4 h-100 text-center' style='--equipo:#" + esc.color + "; border-top: 4px solid #" + esc.color + "'>" +
        "<img src='" + urlLogo(esc.nombre) + "' alt='' style='height: 40px;'>" +
        "<h6 class='fw-bold mt-3 mb-3'>" + esc.nombre + "</h6>" +
        botonSeguir("Escudería", esc.nombre, "seguirEscuderia(" + i + ")") +
      "</div>";
    contenedor.appendChild(columna);
  }
}

// Si ya está en la lista muestra "Siguiendo", si no, el botón "Seguir"
function botonSeguir(tipo, nombre, funcion) {
  if (estaEnLista(tipo, nombre)) {
    return "<button class='btn-siguiendo'>✓ Siguiendo</button>";
  }
  return "<button class='btn-contorno' onclick='" + funcion + "'>+ Seguir</button>";
}

function estaEnLista(tipo, nombre) {
  for (let i = 0; i < listaSeguimiento.length; i++) {
    if (listaSeguimiento[i].tipo == tipo && listaSeguimiento[i].nombre == nombre) {
      return true;
    }
  }
  return false;
}

function seguirPiloto(posicion) {
  agregarInteres("Piloto", listaPilotos[posicion].full_name, "", false);
}

function seguirCarrera(posicion) {
  agregarInteres("Carrera", listaCarreras[posicion].meeting_name, "", false);
}

function seguirEscuderia(posicion) {
  agregarInteres("Escudería", listaEscuderias[posicion].nombre, "", false);
}

// =========================================================
// CRUD de "Mi lista" con DummyJSON (/todos)
// =========================================================

async function guardarInteres() {
  var tipo = document.getElementById("tipoInteres").value;
  var nombre = document.getElementById("nombreInteres").value;
  var nota = document.getElementById("notaInteres").value;
  var visto = document.getElementById("vistoInteres").checked;
  var id = document.getElementById("idInteres").value;

  if (nombre.trim() === "") {
    alert("Escribe el nombre de lo que quieres seguir");
    return;
  }

  if (id == "") {
    agregarInteres(tipo, nombre, nota, visto);
  } else {
    editarInteres(id, tipo, nombre, nota, visto);
  }
}

// CREATE - POST
async function agregarInteres(tipo, nombre, nota, visto) {
  if (estaEnLista(tipo, nombre)) {
    alert("Eso ya está en tu lista");
    return;
  }

  var datosInteres = {
    todo: tipo + ": " + nombre,
    completed: visto,
    userId: sesion.id
  };

  try {
    var respuesta = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sesion.accessToken
      },
      body: JSON.stringify(datosInteres)
    });

    if (respuesta.ok) {
      var nuevo = {
        id: siguienteId(),
        tipo: tipo,
        nombre: nombre,
        nota: nota,
        visto: visto
      };
      listaSeguimiento.unshift(nuevo);
      guardarEnNavegador();
      mostrarTodo();
      limpiarFormulario();
      document.getElementById("mensajeLista").innerText = "Agregaste " + nombre + " a tu lista";
    }
  } catch (error) {
    console.error("Error al agregar interés:", error);
  }
}

// UPDATE - PUT
async function editarInteres(id, tipo, nombre, nota, visto) {
  var datosInteres = {
    todo: tipo + ": " + nombre,
    completed: visto
  };

  try {
    var respuesta = await fetch("https://dummyjson.com/todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sesion.accessToken
      },
      body: JSON.stringify(datosInteres)
    });

    // DummyJSON no guarda los registros nuevos, así que a veces responde 404.
    // En ese caso también lo actualizamos en nuestra lista.
    if (respuesta.ok || respuesta.status == 404) {
      for (let i = 0; i < listaSeguimiento.length; i++) {
        if (listaSeguimiento[i].id == id) {
          listaSeguimiento[i].tipo = tipo;
          listaSeguimiento[i].nombre = nombre;
          listaSeguimiento[i].nota = nota;
          listaSeguimiento[i].visto = visto;
          break;
        }
      }
      guardarEnNavegador();
      mostrarTodo();
      limpiarFormulario();
      document.getElementById("mensajeLista").innerText = "Interés actualizado";
    }
  } catch (error) {
    console.error("Error al actualizar interés:", error);
  }
}

// DELETE
async function eliminar(id) {
  var nombre = "";
  for (let i = 0; i < listaSeguimiento.length; i++) {
    if (listaSeguimiento[i].id == id) {
      nombre = listaSeguimiento[i].nombre;
    }
  }

  var confirmar = confirm("¿Quieres quitar " + nombre + " de tu lista?");
  if (!confirmar) {
    return;
  }

  try {
    var respuesta = await fetch("https://dummyjson.com/todos/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + sesion.accessToken
      }
    });

    if (respuesta.ok || respuesta.status == 404) {
      var nuevoArreglo = [];
      for (let i = 0; i < listaSeguimiento.length; i++) {
        if (listaSeguimiento[i].id != id) {
          nuevoArreglo.push(listaSeguimiento[i]);
        }
      }
      listaSeguimiento = nuevoArreglo;
      guardarEnNavegador();
      mostrarTodo();
      document.getElementById("mensajeLista").innerText = "Quitaste " + nombre + " de tu lista";
    }
  } catch (error) {
    console.error("Error al eliminar interés:", error);
  }
}

function cargaEditar(id) {
  for (let i = 0; i < listaSeguimiento.length; i++) {
    if (listaSeguimiento[i].id == id) {
      document.getElementById("idInteres").value = listaSeguimiento[i].id;
      document.getElementById("tipoInteres").value = listaSeguimiento[i].tipo;
      document.getElementById("nombreInteres").value = listaSeguimiento[i].nombre;
      document.getElementById("notaInteres").value = listaSeguimiento[i].nota;
      document.getElementById("vistoInteres").checked = listaSeguimiento[i].visto;
      document.getElementById("tituloFormulario").innerText = "Editar interés";
      document.getElementById("btnGuardar").innerText = "Actualizar";
      document.getElementById("btnCancelar").className = "btn btn-contorno";
      break;
    }
  }
  window.location.href = "#milista";
}

// READ - pinta la tabla
function mostrarLista() {
  var tbody = document.getElementById("tablaLista");
  tbody.innerHTML = "";

  document.getElementById("contadorLista").innerText = listaSeguimiento.length + " intereses";
  document.getElementById("totalLista").innerText = listaSeguimiento.length;

  if (listaSeguimiento.length == 0) {
    tbody.innerHTML =
      "<tr><td colspan='5' class='text-center texto-gris py-5'>" +
        "Tu lista está vacía. Dale <strong class='texto-equipo'>+ Seguir</strong> a un piloto, carrera o escudería." +
      "</td></tr>";
    return;
  }

  for (let i = 0; i < listaSeguimiento.length; i++) {
    var item = listaSeguimiento[i];

    var estado = "<span class='texto-gris small'>Pendiente</span>";
    if (item.visto) {
      estado = "<span class='chip'>✓ Visto</span>";
    }

    var nota = item.nota;
    if (nota == "") {
      nota = "<span class='texto-gris'>—</span>";
    }

    var fila = document.createElement("tr");
    fila.innerHTML =
      "<td class='ps-4'><span class='small fw-bold texto-equipo text-uppercase'>" + item.tipo + "</span></td>" +
      "<td class='fw-semibold'>" + item.nombre + "</td>" +
      "<td class='small'>" + nota + "</td>" +
      "<td>" + estado + "</td>" +
      "<td class='text-end pe-4 text-nowrap'>" +
        "<button class='btn btn-success btn-sm rounded-pill px-3 me-1' onclick='cargaEditar(" + item.id + ")'>Editar</button>" +
        "<button class='btn btn-danger btn-sm rounded-pill px-3' onclick='eliminar(" + item.id + ")'>Eliminar</button>" +
      "</td>";
    tbody.appendChild(fila);
  }
}

// Vuelve a pintar todo para que los botones "Seguir" se actualicen
function mostrarTodo() {
  mostrarLista();
  if (listaPilotos.length > 0) {
    mostrarPilotos();
    mostrarEscuderias();
  }
  if (listaCarreras.length > 0) {
    mostrarCarreras();
  }
}

function guardarEnNavegador() {
  localStorage.setItem("listaSeguimiento", JSON.stringify(listaSeguimiento));
}

// Busca el id más grande de la lista y le suma 1
function siguienteId() {
  var mayor = 0;
  for (let i = 0; i < listaSeguimiento.length; i++) {
    if (listaSeguimiento[i].id > mayor) {
      mayor = listaSeguimiento[i].id;
    }
  }
  return mayor + 1;
}

function limpiarFormulario() {
  document.getElementById("idInteres").value = "";
  document.getElementById("tipoInteres").value = "Piloto";
  document.getElementById("nombreInteres").value = "";
  document.getElementById("notaInteres").value = "";
  document.getElementById("vistoInteres").checked = false;
  document.getElementById("tituloFormulario").innerText = "Agregar interés";
  document.getElementById("btnGuardar").innerText = "Agregar a mi lista";
  document.getElementById("btnCancelar").className = "btn btn-contorno d-none";
}
