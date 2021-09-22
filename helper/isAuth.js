const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys')

module.exports = (req, res, next) => {

    let authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        error.message='Not Authorized';
        error.statusCode = 401;
        throw error;
    }


    req.user = decoded;
    next();
}