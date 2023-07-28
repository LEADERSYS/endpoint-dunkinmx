const query_db = require('../executeQueries/QueryExecuteAll');

async function totales_generales(fechaDesde, fechaHasta, sucursales) {

  const query = "WITH fechas_sucursales AS ( "+
      "SELECT DISTINCT fecha, n.id AS sucursal_id "+
      "FROM acumulado_venta av "+
      "CROSS JOIN negocio n "+
      "WHERE fecha >= '"+fechaDesde+"' AND fecha <= '"+fechaHasta+"' "+
        "AND n.id IN ("+sucursales+") "+
    ") "+
    "SELECT CONCAT(YEAR(fs.fecha), '-', MONTH(fs.fecha)) AS fecha, "+
           "n.nombre AS sucursal, " +
           "CASE WHEN SUM(av.total) IS NULL THEN 0 ELSE SUM(av.total) END AS total, "+
           "CASE WHEN SUM(av.total_folios) IS NULL THEN 0 ELSE SUM(av.total_folios) END AS total_folios "+
    "FROM fechas_sucursales fs "+
    "LEFT JOIN acumulado_venta av ON av.fecha = fs.fecha AND av.negocio = fs.sucursal_id "+
    "JOIN negocio n ON n.id = fs.sucursal_id "+
    "GROUP BY YEAR(fs.fecha), MONTH(fs.fecha), n.nombre "+
    "ORDER BY YEAR(fs.fecha), MONTH(fs.fecha), n.nombre;";

  let data = await query_db.executeQueryAll(query);

  return data;
}

module.exports = {
    totales_generales
}