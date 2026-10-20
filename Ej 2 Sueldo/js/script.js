function mi_metodo(){
    var sueldo = Number(document.getElementById('sueldo').value);
    var categoria = document.getElementById('categoria').value;

    var porcentaje = 0;

    if(categoria == 1){
        porcentaje = 0.20;
    }
    if(categoria == 2){
        porcentaje = 0.40;
    }
    if(categoria == 3){
        porcentaje = 0.25;
    }
    if(categoria == 4){
        porcentaje = 0.35;
    }

    var total = sueldo + (sueldo * porcentaje);

    document.getElementById('total').innerHTML = "$" + total;

}
