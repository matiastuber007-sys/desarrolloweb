var hora= new Date ().getHours();
var saludo;

if (hora >= 6 && hora < 12){
    saludo = "Buenos días"
}
else if (hora >= 12 && hora < 19){
    saludo = "Buenas tardes"
}
else {
    saludo = "Buenas noches"
}
document.getElementById("saludo").innerHTML=saludo;

var soltero = true;
var status;
if(soltero==false){
    status = "Con pareja"
}
else{
    status = "Sin pareja"
}
document.getElementById("estatus")