var secreto = Math.floor(Math.random() * 10) + 1;
var intentos = 0;

function mi_metodo(){
    var numero = document.getElementById('numero').value;
    var mensaje = document.getElementById('mensaje');

    while(intentos < 3){
        intentos++;

        if(numero == secreto){
            mensaje.innerHTML = "¡Adivinaste!";
            mensaje.style.color = "green";
            intentos = 3;
        } else if(intentos == 3){
            mensaje.innerHTML = "Perdiste, el número era " + secreto;
            mensaje.style.color = "red";
        } else {
            mensaje.innerHTML = "No es, te quedan " + (3 - intentos) + " oportunidades";
            mensaje.style.color = "black";
        }

        break;
    }

}
