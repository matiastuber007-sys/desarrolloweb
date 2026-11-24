var frutas = ["Banana", "Orange", "Apple", "Mango"]; 

function cargar(){
   
    for(let i = 0; i < 3; i++){
        let nuevaFruta = prompt("Captura el nombre de la fruta " + (i + 1) + ":");
        frutas.push(nuevaFruta); 
    }
}

function mostrar(){
    let cadena = ""; 
    for(let i = 0; i < frutas.length; i++){
        cadena += "<div>Índice: " + i + " - Fruta: " + frutas[i] + "</div>";
    }
    document.getElementById("impCalificaciones").innerHTML = cadena;
}



