const jwt = require('jsonwebtoken');
const query_db = require('../model/executeQueries/QueryExecuteAll');

const login = async (req, res) => {
    try {
        // TODO: Se obtienen los datos de sesion y si existe el usuario se genera el token JWT
        const usernameOrEmail = req.body.usernameOrEmail;
        const password = req.body.password;

        const queryUsuario = "SELECT id, nombre, alias, password FROM usuario WHERE (alias COLLATE Latin1_General_CI_AI = '" + usernameOrEmail + "' OR alias IS NULL) OR (correo_electronico = '" + usernameOrEmail + "' OR correo_electronico IS NULL)";

        let usuario = await query_db.executeQuery(queryUsuario);

        if (usuario === null) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (password !== usuario.password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const userData = {
            id: usuario.id,
            username: usuario.alias,
            nombre: usuario.nombre
        };
        // 1h
        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al autenticarse' });
    }
};

module.exports = login;