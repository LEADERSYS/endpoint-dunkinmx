const moment = require('moment');
const { body, validationResult } = require('express-validator');

const validar_campos_filtros = [

    body('filtrarpor').isInt(),
    body('compararvs').isInt(),
    body('datedesde').custom(value => {
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
            return false;
        }
        return true;
    }).withMessage('Fecha DESDE no valido'),
    body('datehasta').custom(value => {
        if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
            return false;
        }
        return true;
    }).withMessage('Fecha HASTA no valido'),
    body('sucursales').isArray().withMessage('Sucursales no validos'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Favor de completar los campos requeridos',
                errors: errors.array() 
            });
        }
        next();
    },
];

module.exports = {
    validar_campos_filtros
};