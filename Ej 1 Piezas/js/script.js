function mi_metodo(){
    var pzs = document.getElementById('nopzs').value;
    var precio = document.getElementById('precio').value;

    var total = pzs * precio;

    if(pzs >= 10){
        total = total - (total * 0.35);
    }

    document.getElementById('total').innerHTML = "$" + total;

}
