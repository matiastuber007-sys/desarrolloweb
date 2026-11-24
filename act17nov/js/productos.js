var listaProductos = [];
var sesion = null;

window.onload = function () {
  var datosSesion = localStorage.getItem("sesionUsuario");
  if (!datosSesion) {
    window.location.href = "index.html";
    return;
  }

  sesion = JSON.parse(datosSesion);
  document.getElementById("bienvenidoUsuario").innerText =
    sesion.firstName + " " + sesion.lastName;

  var contenedor = document.getElementById("foto");
  var imagen = document.createElement("img");
  imagen.src = sesion.image;
  imagen.className = "rounded-circle border border-light";
  imagen.style.width = "40px";
  imagen.style.height = "40px";
  imagen.style.objectFit = "cover";
  contenedor.appendChild(imagen);

  obtenerProductos();
};

async function obtenerProductos() {
  try {
    var respuesta = await fetch("https://dummyjson.com/products");
    var datos = await respuesta.json();
    listaProductos = datos.products;
    mostrarProductos();
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}

async function guardarProducto() {
  var nombre = document.getElementById("nombreProducto").value;
  var precio = document.getElementById("precioProducto").value;
  var id = document.getElementById("idProducto").value;

  if (nombre.trim() === "" || precio.trim() === "" || isNaN(precio)) {
    alert("Captura valores correctos y no vacios");
    return;
  }

  var datosProductos = {
    title: nombre,
    price: Number(precio)
  };

  if (id == "") {
  
    try {
      var respuesta = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sesion.accessToken
        },
        body: JSON.stringify(datosProductos)
      });

      var datosNuevop = await respuesta.json();
      listaProductos.unshift(datosNuevop);
      mostrarProductos();
      limpiarFormulario();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  } else {
    
    try {
      var respuesta = await fetch("https://dummyjson.com/products/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sesion.accessToken
        },
        body: JSON.stringify(datosProductos)
      });

      if (respuesta.ok) {
        for (let i = 0; i < listaProductos.length; i++) {
          if (listaProductos[i].id == id) {
            listaProductos[i].title = nombre;
            listaProductos[i].price = Number(precio);
            break;
          }
        }
        mostrarProductos();
        limpiarFormulario();
        alert("Producto actualizado");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  }
}

async function eliminar(id) {
  var confirmar = confirm("¿Desea eliminar el producto: " + id + "?");
  if (!confirmar) {
    return;
  }

  try {
    var respuesta = await fetch("https://dummyjson.com/products/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + sesion.accessToken
      }
    });

    if (respuesta.ok) {
      var nuevoArreglo = [];
      for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].id != id) {
          nuevoArreglo.push(listaProductos[i]);
        }
      }
      listaProductos = nuevoArreglo;
      mostrarProductos();
      alert("El producto se eliminó");
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

function cargaEditar(id) {
  for (let i = 0; i < listaProductos.length; i++) {
    if (listaProductos[i].id == id) {
      document.getElementById("idProducto").value = listaProductos[i].id;
      document.getElementById("nombreProducto").value = listaProductos[i].title;
      document.getElementById("precioProducto").value = listaProductos[i].price;
      document.getElementById("btnGuardar").innerText = "Actualizar";
      break;
    }
  }
}

function mostrarProductos() {
  var tbody = document.getElementById("tablaProductos");
  tbody.innerHTML = "";

  document.getElementById("contadorProductos").innerText =
    listaProductos.length + " productos";

  for (let i = 0; i < listaProductos.length; i++) {
    var prd = listaProductos[i];
    var fila = document.createElement("tr");

    fila.innerHTML =
      "<td class='ps-4'>" + prd.id + "</td>" +
      "<td>" + prd.title + "</td>" +
      "<td>$" + prd.price + "</td>" +
      "<td class='text-end pe-4'>" +
        "<button class='btn btn-success btn-sm me-1' onclick='cargaEditar(" + prd.id + ")'>Editar</button>" +
        "<button class='btn btn-danger btn-sm' onclick='eliminar(" + prd.id + ")'>Eliminar</button>" +
      "</td>";

    tbody.appendChild(fila);
  }
}

function limpiarFormulario() {
  document.getElementById("idProducto").value = "";
  document.getElementById("nombreProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("btnGuardar").innerText = "Guardar Producto";
}
