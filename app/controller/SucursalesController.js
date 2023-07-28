const executeQueryAll = require('../model/executeQueries/QueryExecuteAll.js');

//TODO: Consulta las sucursales en la base de datos
const obtenerSucursales = async (req, res) => {
   try {
    const querySucursales = "SELECT id, nombre FROM negocio";
    let sucursales = await executeQueryAll(querySucursales);

    if(sucursales === null){
      return res.status(404).json({message: "No se encontraron sucursales"});
    }

    res.status(200).json(
      {
        message: 'Success',
        data: sucursales,
      }
      );
   } catch (error) {
    res.status(500).json({message: 'Ha ocurrido un error al obtener las sucursales'});
   }
};

module.exports = {
    obtenerSucursales
}