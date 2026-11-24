var factorial = {
    numero: 0,
    resultado: 1,
    operacion: '',

    calcularFactorial: function(){
        this.resultado = 1;
        this.operacion = '';

        if(this.numero < 0){
            this.operacion = 'No existe';
        }else if(this.numero == 0){
            this.operacion = '0! = 1';
        }else{
            let i = this.numero;
            do{
                this.resultado = this.resultado * i;
                this.operacion += i;
                if(i > 1){
                    this.operacion += ' x ';
                }
                i--;
            }while(i >= 1);
            this.operacion += ' = ' + this.resultado;
        }
    }
};

function calcular(){
    factorial.numero = parseInt(document.getElementById("numero").value);

    factorial.calcularFactorial();

    document.getElementById("impResultado").innerHTML = '<div>' + factorial.operacion + '</div>';
}
