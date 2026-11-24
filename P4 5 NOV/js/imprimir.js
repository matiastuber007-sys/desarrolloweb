window.onload=function(){
    var registroGuardado = localStorage.getItem("datosAlumno");
    if(registroGuardado){
        var alummnoRecuperado=JSON.parse(registroGuardado);
        console.log(alummnoRecuperado);
        document.getElementById("resNombre").innerText=alummnoRecuperado.nombre;
        document.getElementById("resMatricula").innerText=alummnoRecuperado.matricula;
        document.getElementById("resCarrera").innerText=alummnoRecuperado.carrera;
    }
    else{
        alert("No se encontro alumno");
    }
}