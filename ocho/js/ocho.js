var arregloB;

function bidimensional_definicion(){
    arregloB = new Array(5);
    for(let i=0; i<5; i++){
        arregloB[i] = new Array(5);
    }
    llenar_arregloBi();
}

function llenar_arregloBi(){
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            if(i==0 || i==2 || i==4 || j==0 || j==4){
                arregloB[i][j] = '$';
            }else{
                arregloB[i][j] = '';
            }
        }
    }
    imprimir_arregloBi();
}

function imprimir_arregloBi(){
    var aBi = '';
    for(let i=0; i<5; i++){
        for(let j=0; j<5; j++){
            if(arregloB[i][j] == '$'){
                aBi += '<div style="display:inline-block; background-color:green; color:white; width:40px; height:40px; line-height:40px;">' + arregloB[i][j] + '</div>';
            }else{
                aBi += '<div style="display:inline-block; background-color:white; width:40px; height:40px;"></div>';
            }
        }
        aBi += '<br>';
    }
    document.getElementById("impOcho").innerHTML = aBi;
}
