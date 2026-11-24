function mi_metodo() {
    
   
    var conversor = {
      
        cantidad: Number(document.getElementById('num1').value),
        operacion: document.getElementById('operacion').value,
        total: 0,

        
        kg_a_g: function() {
            return this.cantidad * 1000;
        },
        g_a_mg: function() {
            return this.cantidad * 1000;
        },
        kg_a_mg: function() {
            return this.cantidad * 1000000; 
        },
        mg_a_g: function() {
            return this.cantidad / 1000;
        },
        g_a_kg: function() {
            return this.cantidad / 1000;
        },
        mg_a_kg: function() {
            return this.cantidad / 1000000;
        }
    };

    
    if (conversor.operacion == "1") {
        conversor.total = conversor.kg_a_g();
    } 
    else if (conversor.operacion == "2") {
        conversor.total = conversor.g_a_mg();
    } 
    else if (conversor.operacion == "3") {
        conversor.total = conversor.kg_a_mg();
    } 
    else if (conversor.operacion == "4") {
        conversor.total = conversor.mg_a_g();
    } 
    else if (conversor.operacion == "5") {
        conversor.total = conversor.g_a_kg();
    } 
    else if (conversor.operacion == "6") {
        conversor.total = conversor.mg_a_kg();
    }

    
    document.getElementById('total').innerHTML = conversor.total;
}

