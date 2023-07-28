const calculos = require('../utils/CalculoGeneral');

const obtenerFiltros = async (req, res) => {
    try {
        const { filtrarpor, compararvs, datedesde, datehasta, sucursales } = req.body;

        let result_calculos = await calculos.obtenerCalculos(filtrarpor, compararvs, datedesde, datehasta, sucursales); 

        res.status(200).json(result_calculos);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos de los filtros seleccionados.' });
    }
};

module.exports = obtenerFiltros;

