const query_db = require('../model/executeQueries/QueryExecuteAll');

//TODO: Consulta las sucursales en la base de datos
const obtenerSucursales = async (req, res) => {
   try {
    const querySucursales = "SELECT id, nombre FROM negocio";
    let sucursales = await query_db.executeQueryAll(querySucursales);

    if(sucursales === null){
      return res.status(404).json({message: "No se encontraron sucursales"});
    }

    res.status(200).json(
      {
        message: 'Success',
        data: sucursales,
      }
      );      
   } catch (err) {
    res.status(500).json({message: err});
   }
};

module.exports = obtenerSucursales;