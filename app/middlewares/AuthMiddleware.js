const jwt = require('jsonwebtoken');
const isUser = require('../model/queries/VerificarUsuario');

// Middleware de autenticación
const authenticateToken = async (req, res, next) =>{
  try {
    const authorizationHeader = req.headers.authorization;
    
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
    
    if(!accessToken){
      return res.status(401).json({
        message: 'Token de autenticación no proporcionado'
      });
    }
    
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    const usuarioValido = isUser.existeUsuario(decodedToken.id);

    if(!usuarioValido){
      return res.status(403).json({
        message: 'Autenticación inválida'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: 'Error al autenticarse con el servicio'
    });
  }  
};

module.exports = authenticateToken;