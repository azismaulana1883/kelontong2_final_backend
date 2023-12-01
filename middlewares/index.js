const JWT = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Unauthorized!',
            statusMessage: 'Unauthorized!',
            statusCode: 401
        });
    }

    const token = req.headers.authorization.split(' ');

    if (token[0].toLowerCase() !== 'bearer') {
        return res.status(401).json({
            message: 'Unauthorized!',
            statusMessage: 'Unauthorized!',
            statusCode: 401
        });
    }

    req.tokenVerify = token[1];
    next();
}

function verifyJWTToken(req, res, next) {
    const token = req.tokenVerify;

    try {
        const tokenVerify = JWT.verify(token, 'secret-key-access');

        if (!tokenVerify || tokenVerify.data.role !== 'owner') {
            return res.status(403).json({
                message: 'Insufficient permissions!',
                statusMessage: 'Forbidden!',
                statusCode: 403
            });
        }

        req.tokenUser = tokenVerify.data;
        next();
    } catch (error) {
        console.error('Error during JWT verification:', error);
        return res.status(401).json({
            message: 'Unauthorized!',
            statusMessage: 'Unauthorized!',
            statusCode: 401
        });
    }
}

module.exports = {
    verifyToken,
    verifyJWTToken,
};


