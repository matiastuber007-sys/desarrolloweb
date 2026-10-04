function mi_metodo(){
    var nombre = document.getElementById('nombre').value
    var apellidop = document.getElementById('apellidop').value
    var apellidom = document.getElementById('apellidom').value
    var edad = document.getElementById('edad').value
    var foto = document.getElementById('foto').value

    var genero = "Sin seleccionar"
    if(document.getElementById('genero_f').checked){
        genero = "Femenino"
    }
    if(document.getElementById('genero_m').checked){
        genero = "Masculino"
    }

    alert("Nombre: " + nombre + " Apellido Paterno: " + apellidop + " Apellido Materno: " + apellidom + " Edad: " + edad + " Género: " + genero + " Foto: " + foto)

}