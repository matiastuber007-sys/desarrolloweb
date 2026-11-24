async function iniciarSesion() {
    var usuarioInput = document.getElementById("usuario").value;
    var contrasenaInput = document.getElementById("contrasena").value;
    var etiquetaError = document.getElementById("errorLogin");

    if (usuarioInput.trim() === "" || contrasenaInput.trim() === "") {
        etiquetaError.innerText = "Escribe tu usuario y contraseña";
        return;
    }

    var credencial = {
        username: usuarioInput,
        password: contrasenaInput
    };

    try {
        var respuesta = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credencial)
        });

        var datos = await respuesta.json();

        if (respuesta.ok) {
            localStorage.setItem("sesionUsuario", JSON.stringify(datos));

            // Si ya eligió escudería antes, pasa directo al panel
            if (localStorage.getItem("escuderiaFavorita")) {
                window.location.href = "panel.html";
            } else {
                window.location.href = "escuderia.html";
            }
        } else {
            etiquetaError.innerText = "Error: " + datos.message;
        }
    } catch (error) {
        etiquetaError.innerText = "Error de conexión con el servidor";
    }
}
