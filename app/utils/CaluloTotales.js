async function calcular_suma_totales(data) {
    let totalVentas = 0;
    let transacciones = 0;

    data.forEach(item => {
        totalVentas += parseFloat(item.total);
        transacciones += parseInt(item.total_folios);
    });

    const ticketPromedio = totalVentas / transacciones;

    const result = {
        total_ventas: totalVentas || 0,
        transacciones: transacciones || 0,
        ticket_promedio: ticketPromedio || 0
    };

    return result;
}

module.exports = {
    calcular_suma_totales
}