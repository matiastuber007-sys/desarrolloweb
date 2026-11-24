function mi_metodo(){
    var tabla1 = document.getElementById('tabla1').value;
    var tabla2 = document.getElementById('tabla2').value;

    var texto1 = "";
    var texto2 = "";

    let i = 1;
    while(i <= 10){
        texto1 = texto1 + tabla1 + " x " + i + " = " + (tabla1 * i) + "<br>";
        texto2 = texto2 + tabla2 + " x " + i + " = " + (tabla2 * i) + "<br>";
        i++;
    }

    document.getElementById('resultado1').innerHTML = texto1;
    document.getElementById('resultado2').innerHTML = texto2;

}
