var calificaciones = new Array(10);

function cargar(){
    for(let i=0; i<10; i++){
        let valor = prompt("Captura la calificación " + (i+1) + ":");
        calificaciones[i] = parseFloat(valor);
    }
}

function mostrar(){
    var cadena = '';
    for(let indice in calificaciones){
        cadena += '<div> indice: ' + indice + ' valor: ' + calificaciones[indice] + '</div>';
    }
    document.getElementById("impCalificaciones").innerHTML = cadena;
}

function cortar(){
    let desde = parseInt(prompt("¿Desde qué índice quieres cortar?"));
    let cuantos = parseInt(prompt("¿Cuántos elementos quieres quitar?"));

    calificaciones.splice(desde, cuantos);

    var cortado = '';
    for(let indice in calificaciones){
        cortado += '<div> indice: ' + indice + ' valor: ' + calificaciones[indice] + '</div>';
    }
    document.getElementById("impCambio").innerHTML = cortado;
}

function vaciar(){
    let valor = parseFloat(prompt("¿Qué calificación quieres eliminar?"));

    for(let i=0; i<calificaciones.length; i++){
        if(calificaciones[i] == valor){
            calificaciones[i] = '';
        }
    }

    var vacio = '';
    for(let indice in calificaciones){
        vacio += '<div> indice: ' + indice + ' valor: ' + calificaciones[indice] + '</div>';
    }
    document.getElementById("impCambio").innerHTML = vacio;
}
