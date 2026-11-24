let puestos = ["Diseñador","Programador","Lider"];
let niveles = ["Newbe","Jr","Sr"];

let sueldos = new Array(3);
for(let i=0; i<3; i++){
    sueldos[i] = new Array(3);
}

sueldos[0][0]=120; sueldos[0][1]=240; sueldos[0][2]=210;
sueldos[1][0]=240; sueldos[1][1]=280; sueldos[1][2]=300;
sueldos[2][0]=400; sueldos[2][1]=600; sueldos[2][2]=3000;

function calcular(){
    var p = document.getElementById("puesto").value;
    var n = document.getElementById("nivel").value;
    var h = parseFloat(document.getElementById("horas").value);

    var total = sueldos[p][n] * h;

    document.getElementById("impTotal").innerHTML = puestos[p] + " " + niveles[n] + " - " + h + " hrs x $" + sueldos[p][n] + " = <b>Total: $" + total + "</b>";
}
