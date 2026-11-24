async function iniciarSesion() {
    var usuarioInput = document.getElementById("usuario").value;
    var contrasenaInput = document.getElementById("contrasena").value;
    var etiquetaError = document.getElementById("errorLogin");

    var credencial ={
        username: usuarioInput,
        password: contrasenaInput,
    };

    try{

        var respuesta = await fetch("https://dummyjson.com/auth/login",{

            method:"POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credencial)

        });

        var datos= await respuesta.json();
        if (respuesta.ok) {

            localStorage.setItem("sesionUsuario",JSON.stringify(datos));
            window.open("IndexAdmin.html");
            
        }else{
                etiquetaError.innerText="Error"+datos.message;
        }
            


}
    catch(error){
        etiquetaError.innerText="Error de conexion con el servidor";

    }
}