let vector=[30,20,30,40,50];
var cadena='';
var cadena2='';

vector.forEach(function(numero){
    cadena+='<div style="background-color:#E5A93C;color:#F4F4F4; border:2px solid #1A1512; width:10%; text-align:center;">'+numero+'</div>';
    console.log(numero);
});

document.getElementById("imprimir").innerHTML=cadena;

function fechas(){
    let dias = new Array(7);
    dias[0]="Domingo";
    dias[1]="Lunes";
    dias[2]="Martes";
    dias[3]="Miercoles";
    dias[4]="Jueves";
    dias[5]="Viernes";
    dias[6]="Sabado";

    var d = document.getElementById("dia").value;
    document.getElementById("impdias").innerHTML=dias[d];

    let mes = new Array(12);
    dias[0]="Enero";
    dias[1]="Febrero";
    dias[2]="Marzo";
    dias[3]="Abril";
    dias[4]="Mayo";
    dias[5]="Junio";
    dias[6]="Julio";
    dias[7]="Agosto";
    dias[8]="Septiembre";
    dias[9]="Octubre";
    dias[10]="noviembre";
    dias[11]="Diciembre";

    var m=document.getElementById("m").value +1;
    document.getElementById("impmes").innerHTML=dias[m];
}
var sueldos=new Array(5);

function cargar(){
    
    for(let i=0;i<5;i++){
        let valor = prompt("captura un sueldo:");
        sueldos[i]=parseFloat(valor);
        

    }
}

function mostrar(){
    for (let j=0; j<sueldos.length; j++){
        cadena2+=sueldos[j]+'<br>';
    }
    document.getElementById("listaS").innerHTML = cadena2;
}

function recorridoForin (){
    let vector =[20,40,60,80,100];
    var mensaje = '';
    for (let indice in vector){
        mensaje+= '<div> indice: ' +indice + 'valor:' + vector[indice]+ '</div>';
    }
    document.getElementById("ImpForin").innerHTML=mensaje;
}
var cortar = function (){
    let numeros = [0,1,2,3,4,5,6,7,8,9];
    var mensaje2 = '';
    for (let indice in numeros){
        mensaje2+= '<div> indice: ' +indice + 'valor:' + numeros[indice]+ '</div>';
    }
    document.getElementById("ImpForin").innerHTML=mensaje2;
    numeros.splice(1,3);
    var cortado='';
     for (let indice in numeros){
        cortado+= '<div> indice: ' +indice + 'valor:' + numeros[indice]+ '</div>';
    }
    document.getElementById("ImpCortado").innerHTML=cortado;
}
var poner=function(){
    const verduras=['brocoli', 'chayote', 'zanahoria'];
    verduras.push('calabaza');
    console.log(verduras);
    verduras.push('papa', 'espinaca', 'repollo');
    verduras.pop();
    var verd='';
    for (let indice in verduras){
        verd += '<div> indice:' +indice+ 'valor:' + verduras [indice] + '</div>';
    }
    document.getElementById("impVerduras").innerHTML=verd;
} 


function bidimensional_definicion(){
    arregloB=new Array (4);
    for(let i=0; i<4; i++){
        arregloB [i] =new Array(4);
    }
    llenar_arregloBi();
}
function llenar_arregloBi(){
    for(let i=0; i<4; i++){
        for (let j=0; j<4; j++ ){
            arregloB [i][j] = 0;

        }
    }
    imprimir_arregloBi();
}

function imprimir_arregloBi(){
    var aBi = '';
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            aBi+= '<div style= "background-color:green; width:30%"> ' +arregloB[i][j] + '</div>';
        }
        aBi += '<br>'
    }
    document.getElementById("impBidimensional").innerHTML=cadena3;
}