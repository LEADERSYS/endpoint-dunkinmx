const moment = require('moment');

const get_tg = require('../model/queries/F_TotalesGenerales');
const t_cal = require('./Tablas_Graficas/T_AgruparDatos');
const g_cal = require('./Tablas_Graficas/G_AgruparDatos');
const st_cal = require('./CaluloTotales');

async function obtenerCalculos(filtroPeriodo, comparacionPeriodo, fechaDesde, fechaHasta, sucursales) {

    let message = [];

    //TODO: Variables para el calculo general
    let sumaTotalVTP;
    let tabla_CalculoVentasNetas; let tabla_CalculoTransacciones; let tabla_CalculoTicketPromedio;
    let grafica_CalculoTotalVentasNetas; let grafica_CalculoTotalTransacciones; let grafica_CalculoTotalTicketPromedio;


    //TODO: Variables si la opcion comparacionPeriodo es vs1año o vs2años
    let c_totalesGenerales; let c_tabla_CalculoVentasNetas;
    let c_tabla_CalculoTransacciones; let c_tabla_CalculoTicketPromedio;

    //TODO: Verificar si el primer filtro devuelve datos
    let totalesGenerales = await get_tg.totales_generales(fechaDesde, fechaHasta, sucursales);
    if (totalesGenerales) {
        //VTP - Ventas Transacciones Promedio
        sumaTotalVTP = await st_cal.calcular_suma_totales(totalesGenerales);

        tabla_CalculoVentasNetas = await t_cal.calcular_ventas_netas(totalesGenerales);
        tabla_CalculoTransacciones = await t_cal.calcular_transacciones(totalesGenerales);
        tabla_CalculoTicketPromedio = await t_cal.calcular_ticket_promedio(totalesGenerales);

        grafica_CalculoTotalVentasNetas = await g_cal.calcular_total_ventasNetas(tabla_CalculoVentasNetas);
        grafica_CalculoTotalTransacciones = await g_cal.calcular_total_transacciones(tabla_CalculoTransacciones);
        grafica_CalculoTotalTicketPromedio = await g_cal.calcular_total_ticketPromedio(tabla_CalculoTicketPromedio);
    } else {
        message.push('Para el filtro seleccionado no hay datos que mostrar (' + fechaDesde + ' / ' + fechaHasta + ')');
    }

    //TODO: Verificar si el segunod filtro de comparacion devuelve datos
    if (parseInt(comparacionPeriodo) !== 0) {
        const opcYear = parseInt(comparacionPeriodo) == 1 ? 1 : 2;
        const fDesde = moment(fechaDesde);
        const fHasta = moment(fechaHasta);
        const fechaRestadaDesde = fDesde.subtract(opcYear, 'years');
        const fechaRestadaHasta = fHasta.subtract(opcYear, 'years');
        const fechaFormateadaDesde = fechaRestadaDesde.format('YYYY-MM-DD');
        const fechaFormateadaHasta = fechaRestadaHasta.format('YYYY-MM-DD');

        c_totalesGenerales = await get_tg.totales_generales(fechaFormateadaDesde, fechaFormateadaHasta, sucursales);

        if (c_totalesGenerales) {
            c_tabla_CalculoVentasNetas = await t_cal.calcular_ventas_netas(c_totalesGenerales);
            c_tabla_CalculoTransacciones = await t_cal.calcular_transacciones(c_totalesGenerales);
            c_tabla_CalculoTicketPromedio = await t_cal.calcular_ticket_promedio(c_totalesGenerales);

            const combinedHeader_vn = tabla_CalculoVentasNetas.Header.concat(c_tabla_CalculoVentasNetas.Header);
            const combinedCell_vn = tabla_CalculoVentasNetas.Cell.concat(c_tabla_CalculoVentasNetas.Cell);

            const combinedHeader_t = tabla_CalculoTransacciones.Header.concat(c_tabla_CalculoTransacciones.Header);
            const combinedCell_t = tabla_CalculoTransacciones.Cell.concat(c_tabla_CalculoTransacciones.Cell);

            const combinedHeader_tp = tabla_CalculoTicketPromedio.concat(c_tabla_CalculoTicketPromedio.Header);
            const combinedCell_tp = tabla_CalculoTicketPromedio.concat(c_tabla_CalculoTicketPromedio.Cell);

            const combinedJSONVentas = {
                Header: combinedHeader_vn,
                Cell: combinedCell_vn
            };
            const combinedJSONTransanciones = {
                Header: combinedHeader_t,
                Cell: combinedCell_t
            };
            const combinedJSONPromedio = {
                Header: combinedHeader_tp,
                Cell: combinedCell_tp
            }

            return {
                datosTotales: [sumaTotalVTP],
                datosTabla: [
                    {
                        ventasNetasTabla: [combinedJSONVentas],
                        transaccionesTabla: [combinedJSONTransanciones],
                        ticketPromedioTabla: [combinedJSONPromedio]
                    }
                ],
                datosGraficas: [
                    {
                        ventasNetasGrafica: [grafica_CalculoTotalVentasNetas],
                        transaccionesGrafica: [grafica_CalculoTotalTransacciones],
                        ticketPromedioGrafica: [grafica_CalculoTotalTicketPromedio]
                    }
                ],
                mensajes: [message]
            };
        } else {
            message.push('Para el periodo de comparacion no hay datos que mostrar');
        }
    }

    return {
        datosTotales: [sumaTotalVTP],
        datosTabla: [
            {
                ventasNetasTabla: [tabla_CalculoVentasNetas],
                transaccionesTabla: [tabla_CalculoTransacciones],
                ticketPromedioTabla: [tabla_CalculoTicketPromedio]
            }
        ],
        datosGraficas: [
            {
                ventasNetasGrafica: [grafica_CalculoTotalVentasNetas],
                transaccionesGrafica: [grafica_CalculoTotalTransacciones],
                ticketPromedioGrafica: [grafica_CalculoTotalTicketPromedio]
            }
        ],
        mensajes: message
    };
}

module.exports = {
    obtenerCalculos
}