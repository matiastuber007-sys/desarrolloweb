let dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
var temperaturas = new Array(7);

function cargar(){
    for(let i=0; i<7; i++){
        let valor = prompt("Captura la temperatura promedio del " + dias[i] + ":");
        temperaturas[i] = parseFloat(valor);
    }
}

function mostrar(){
    var cadena = '';
    for(let i=0; i<temperaturas.length; i++){
        cadena += '<div style="background-color:#E5A93C;color:#F4F4F4; border:2px solid #1A1512; width:50%; text-align:center;">' + dias[i] + ': ' + temperaturas[i] + ' °C</div>';
    }
    document.getElementById("listaT").innerHTML = cadena;
}

function calcular(){
    var suma = 0;
    for(let i=0; i<temperaturas.length; i++){
        suma += temperaturas[i];
    }
    var promedio = suma / temperaturas.length;

    var maximo = Math.max(...temperaturas);
    var minimo = Math.min(...temperaturas);

    document.getElementById("impPromedio").innerHTML = "Temperatura promedio de la semana: " + promedio.toFixed(2) + " °C";
    document.getElementById("impMaxima").innerHTML = "Temperatura máxima: " + maximo + " °C (" + dias[temperaturas.indexOf(maximo)] + ")";
    document.getElementById("impMinima").innerHTML = "Temperatura mínima: " + minimo + " °C (" + dias[temperaturas.indexOf(minimo)] + ")";
}
