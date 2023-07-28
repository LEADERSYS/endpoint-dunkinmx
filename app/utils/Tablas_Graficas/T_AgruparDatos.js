async function calcular_ventas_netas(data) {
    // Obtener los años únicos
    const years = [...new Set(data.map(item => item.fecha.split('-')[0]))];

    // Inicializar el objeto totalsBySucursal con '-' para cada combinación de sucursal y año
    const totalsBySucursal = {};
    data.forEach(item => {
        const sucursal = item.sucursal;
        const year = item.fecha.split('-')[0];
        totalsBySucursal[sucursal] = totalsBySucursal[sucursal] || {};
        totalsBySucursal[sucursal][year] = '-';
    });

    // Sumar el campo total por sucursal y año
    data.forEach(item => {
        const sucursal = item.sucursal;
        const total = item.total;
        const year = item.fecha.split('-')[0];
        if (totalsBySucursal[sucursal] && totalsBySucursal[sucursal][year] === '-') {
            totalsBySucursal[sucursal][year] = parseFloat(total);
        } else {
            totalsBySucursal[sucursal][year] += parseFloat(total);
        }
        
    });

    // Construir el arreglo de resultados con el nombre de las sucursales y los totales por año
    const result = [];
    for (let sucursal in totalsBySucursal) {
        const totals = {};
        years.forEach( (year,index) => {
            totals[`total_Sucursal${index}`] = totalsBySucursal[sucursal][year] || 0;
        });
        result.push({
            nameSucursal: sucursal,
            ...totals
        });
    }

    // Construir el objeto final
    const finalObject = {
        Header: ['Sucursal', ...years],
        Cell: result
    };

    return finalObject;
}

async function calcular_transacciones(data) {
    // Obtener los años únicos
    const years = [...new Set(data.map(item => item.fecha.split('-')[0]))];

    // Inicializar el objeto totalsBySucursal con 0 para cada combinación de sucursal y año
    const totalsBySucursal = {};
    data.forEach(item => {
        const sucursal = item.sucursal;
        const year = item.fecha.split('-')[0];
        totalsBySucursal[sucursal] = totalsBySucursal[sucursal] || {};
        totalsBySucursal[sucursal][year] = 0;
    });

    // Sumar el campo total_folios por sucursal y año
    data.forEach(item => {
        const sucursal = item.sucursal;
        const totalFolios = item.total_folios;
        const year = item.fecha.split('-')[0];
        totalsBySucursal[sucursal][year] += parseInt(totalFolios);
        
    });

    // Construir el arreglo de resultados con el nombre de las sucursales y los totales por año
    const result = [];
    for (let sucursal in totalsBySucursal) {
        const transacciones = {};
        years.forEach( (year,index) => {
            transacciones[`transacciones_Sucursal${index}`] = totalsBySucursal[sucursal][year] || 0;
        });
        result.push({
            nameSucursal: sucursal,
            ...transacciones
        });
    }

    // Construir el objeto final
    const finalObject = {
        Header: ['Sucursal', ...years],
        Cell: result
    };

    return finalObject;
}

async function calcular_ticket_promedio(data) {
    // Calcular la división total/total_folios por sucursal y año
    const divisionBySucursal = {};
    data.forEach(item => {
        const sucursal = item.sucursal;
        const total = item.total;
        const totalFolios = item.total_folios;
        const year = item.fecha.split('-')[0];
        const division = parseFloat(total) / parseInt(totalFolios);
        divisionBySucursal[sucursal] = divisionBySucursal[sucursal] || {};
        divisionBySucursal[sucursal][year] = division;
    });

    // Obtener los años únicos
    const years = [...new Set(data.map(item => item.fecha.split('-')[0]))];

    // Construir el arreglo de resultados con el nombre de las sucursales y los resultados de la división por año
    const result = [];
    for (let sucursal in divisionBySucursal) {
        const ticketPromedio = {};
        years.forEach( (year,index) => {
            ticketPromedio[`ticketPromedio_Sucursal${index}`] = divisionBySucursal[sucursal][year] || 0;
        });
        result.push({
            nameSucursal: sucursal,
            ...ticketPromedio
        });
    }

    // Construir el objeto final
    const finalObject = {
        Header: ['Sucursal', ...years],
        Cell: result
    };

    return finalObject;
}    

module.exports = {
    calcular_ventas_netas,
    calcular_transacciones,
    calcular_ticket_promedio
}