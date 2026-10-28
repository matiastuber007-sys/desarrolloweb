let dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];

let agenda = new Array(7);
for(let i=0; i<7; i++){
    agenda[i] = new Array(3);
    for(let j=0; j<3; j++){
        agenda[i][j] = '';
    }
}

function imprimir_agenda(){
    var cadena = '<table class="table table-bordered">';
    cadena += '<tr><th>Día</th><th>Hora</th><th>Evento</th><th>Descripción</th></tr>';
    for(let i=0; i<7; i++){
        cadena += '<tr><th>' + dias[i] + '</th>';
        for(let j=0; j<3; j++){
            cadena += '<td>' + agenda[i][j] + '</td>';
        }
        cadena += '</tr>';
    }
    cadena += '</table>';
    document.getElementById("impAgenda").innerHTML = cadena;
}

imprimir_agenda();

function guardar(){
    var d = document.getElementById("dia").value;

    agenda[d][0] = document.getElementById("hora").value;
    agenda[d][1] = document.getElementById("evento").value;
    agenda[d][2] = document.getElementById("descripcion").value;

    imprimir_agenda();
}
