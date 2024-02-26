


export default function calcularTransaccionesMinimas(gastos) {
    // Crear un objeto para almacenar los saldos de cada integrante
    const saldos = [];

    // Iterar sobre cada gasto

    gastos.forEach((gasto) => {
            const integrantId = gasto.integrantId
            const gastoTotal = gasto.gastos
            const integrants = gasto.integrantsId
            const divGasto = gastoTotal / integrants.length
            // Initialize saldos[i] as an empty array if not defined
            // if (!saldos) {
            //     saldos = [];
            // }
            // Iterar sobre cada integrante del gasto
            integrants.forEach((integrant) => {
                if (integrant === integrantId) return
                saldos.push({deudor: integrant, acredor: integrantId, saldo: divGasto});
            })
        })

    function minimizarTransacciones(transacciones) {
            // Agrupar las transacciones por personas
            let saldosPorPersona = {};
        
            transacciones.forEach(transaccion => {
                if (!(transaccion.deudor in saldosPorPersona)) {
                    saldosPorPersona[transaccion.deudor] = 0;
                }
                if (!(transaccion.acredor in saldosPorPersona)) {
                    saldosPorPersona[transaccion.acredor] = 0;
                }
        
                saldosPorPersona[transaccion.deudor] -= transaccion.saldo;
                saldosPorPersona[transaccion.acredor] += transaccion.saldo;
            });
        
            // Generar la lista de transacciones mínimas
            let transaccionesMinimas = [];
        
            Object.keys(saldosPorPersona).forEach(deudor => {
                Object.keys(saldosPorPersona).forEach(acredor => {
                    while (saldosPorPersona[deudor] < 0 && saldosPorPersona[acredor] > 0) {
                        let monto = Math.min(-saldosPorPersona[deudor], saldosPorPersona[acredor]);
                        transaccionesMinimas.push({ deudor: deudor, acredor: acredor, saldo: monto });
                        saldosPorPersona[deudor] += monto;
                        saldosPorPersona[acredor] -= monto;
                    }
                });
            });
        
            return transaccionesMinimas;
        }

    const transaccionesMinimas = minimizarTransacciones(saldos);    
    return transaccionesMinimas;
}