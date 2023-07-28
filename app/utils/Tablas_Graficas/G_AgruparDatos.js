async function calcular_total_ventasNetas(data) {
    const years = data.Header.slice(1);
    const sumArray = new Array(years.length).fill(0);

    data.Cell.forEach(item => {
        for (let i = 0; i < years.length; i++) {
            const fieldName = `total_Sucursal${i}`;
            sumArray[i] += item[fieldName] || 0;
        }
    });

    const finalObject = {
        labels: [0, ...years],
        dataset: [
            {
                data: [0, ...sumArray],
                label: 'Sucursales Seleccionadas'
            }
        ]
    };

    return finalObject;
}

async function calcular_total_transacciones(data) {
    const years = data.Header.slice(1);
    const sumArray = new Array(years.length).fill(0);

    data.Cell.forEach(item => {
        for (let i = 0; i < years.length; i++) {
            const fieldName = `transacciones_Sucursal${i}`;
            sumArray[i] += item[fieldName] || 0;
        }
    });

    const finalObject = {
        labels: [0, ...years],
        dataset: [
            {
                data: [0, ...sumArray],
                label: 'Sucursales Seleccionadas'
            }
        ]
    };

    return finalObject;
}

async function calcular_total_ticketPromedio(data) {
    const years = data.Header.slice(1);
    const sumArray = new Array(years.length).fill(0);

    data.Cell.forEach(item => {
        for (let i = 0; i < years.length; i++) {
            const fieldName = `ticketPromedio_Sucursal${i}`;
            sumArray[i] += item[fieldName] || 0;
        }
    });

    const finalObject = {
        labels: [0, ...years],
        dataset: [
            {
                data: [0, ...sumArray],
                label: 'Sucursales Seleccionadas'
            }
        ]
    };

    return finalObject;
}

module.exports = {
    calcular_total_ventasNetas,
    calcular_total_transacciones,
    calcular_total_ticketPromedio
}



