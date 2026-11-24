function mi_metodo(){
    var num1 = Number(document.getElementById('num1').value);
    var num2 = Number(document.getElementById('num2').value);
    var operacion = document.getElementById('operacion').value;

    var total = 0;

    while(operacion == "suma"){
        total = num1 + num2;
        break;
    }
    while(operacion == "resta"){
        total = num1 - num2;
        break;
    }
    while(operacion == "multiplicacion"){
        total = num1 * num2;
        break;
    }
    while(operacion == "division"){
        total = num1 / num2;
        break;
    }
     while(operacion == "modulo"){
        total = num1 % num2;
        break;
    }



    document.getElementById('total').innerHTML = total;

}
