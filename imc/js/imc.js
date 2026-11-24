var indice = {
    peso: 0,
    altura: 0,
    imc: 0,

    calcularIMC: function(){
        this.imc = (this.peso / (this.altura * this.altura)).toFixed(2);

        if(indice.imc < 18.5){
            document.getElementById("total").innerHTML = "Tu imc es: " + indice.imc + " y estas bajo de peso";
        }else if(indice.imc >= 18.5 && indice.imc <= 24.9){
            document.getElementById("total").innerHTML = "Tu imc es: " + indice.imc + " y estas en peso normal";
        }else{
            document.getElementById("total").innerHTML = "Tu imc es: " + indice.imc + " y estas en sobrepeso";
        }
    }
};

function mi_metodo(){
    indice.peso = parseFloat(document.getElementById("kg").value);
    indice.altura = parseFloat(document.getElementById("alt").value);

    indice.calcularIMC();
}
