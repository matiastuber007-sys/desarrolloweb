var matriz = {
    A: [[3, 5, 2],
        [5, 4, 6],
        [7, 8, 9]],
    B: [[2, 3, 4],
        [5, 6, 7],
        [2, 3, 4]],
    resultado: [],

    resta_3A_2B: function(){
        this.resultado = new Array(3);
        for(let i=0; i<3; i++){
            this.resultado[i] = new Array(3);
            for(let j=0; j<3; j++){
                this.resultado[i][j] = (3 * this.A[i][j]) - (2 * this.B[i][j]);
            }
        }
    },
    suma_5A_3B: function(){
        this.resultado = new Array(3);
        for(let i=0; i<3; i++){
            this.resultado[i] = new Array(3);
            for(let j=0; j<3; j++){
                this.resultado[i][j] = (5 * this.A[i][j]) + (3 * this.B[i][j]);
            }
        }
    },
    imprimir: function(m, id){
        var cadena = '<table border="1">';
        for(let i=0; i<3; i++){
            cadena += '<tr>';
            for(let j=0; j<3; j++){
                cadena += '<td>' + m[i][j] + '</td>';
            }
            cadena += '</tr>';
        }
        cadena += '</table>';
        document.getElementById(id).innerHTML = cadena;
    }
};

matriz.imprimir(matriz.A, "impA");
matriz.imprimir(matriz.B, "impB");

function resta(){
    matriz.resta_3A_2B();
    matriz.imprimir(matriz.resultado, "impResultado");
}

function suma(){
    matriz.suma_5A_3B();
    matriz.imprimir(matriz.resultado, "impResultado");
}

var muertes = {
    dias: new Array(5),
    moda: 0,
    min: 0,
    max: 0,

    calcular: function(){
        this.min = this.dias[0];
        this.max = this.dias[0];
        for(let i=1; i<5; i++){
            if(this.dias[i] < this.min){
                this.min = this.dias[i];
            }
            if(this.dias[i] > this.max){
                this.max = this.dias[i];
            }
        }

        var mayor = 0;
        for(let i=0; i<5; i++){
            let veces = 0;
            for(let j=0; j<5; j++){
                if(this.dias[i] == this.dias[j]){
                    veces++;
                }
            }
            if(veces > mayor){
                mayor = veces;
                this.moda = this.dias[i];
            }
        }
        if(mayor == 1){
            this.moda = 'no hay moda';
        }
    }
};

function capturar(){
    for(let i=0; i<5; i++){
        muertes.dias[i] = parseInt(prompt("Captura las muertes del día " + (i+1) + ":"));
    }

    muertes.calcular();

    var cadena = '';
    for(let i=0; i<5; i++){
        cadena += '<div> Día ' + (i+1) + ': ' + muertes.dias[i] + '</div>';
    }
    cadena += '<div> Moda: ' + muertes.moda + '</div>';
    cadena += '<div> Mínimo: ' + muertes.min + '</div>';
    cadena += '<div> Máximo: ' + muertes.max + '</div>';
    document.getElementById("impMuertes").innerHTML = cadena;
}
