function mi_metodo(){
    var modelo = document.getElementById('modelo').value
    var color = document.getElementById('color').value
    var foto = document.getElementById('foto').value

    var activo = "Sin seleccionar"
    if(document.getElementById('activo_si').checked){
        activo = "Sí"
    }
    if(document.getElementById('activo_no').checked){
        activo = "No"
    }

    alert("Modelo: " + modelo + " Color: " + color + " Foto: " + foto + " Activo: " + activo)

}