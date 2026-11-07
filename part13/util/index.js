const jwt = require('jsonwebtoken');

const extractToken = async (req , res, next) => {
    // Middleware to extract token from Authorization header
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log('auth', authorization)
            const token = authorization.split(' ')[1];
            console.log('Token:', token);
            const decodedToken = jwt.verify(token, 'mysecretkey');
            if (!decodedToken.id) {
                return res.status(401).json({ error: 'Token invalid' });
            }
            req.decodedToken = decodedToken;
            next();
        } catch (error) {
            console.log('JWT verification error:', error.message);
            return res.status(401).json({ error: 'Token invalid', details: error.message });
        }
    } else {
        return res.status(401).json({ error: 'Token missing or invalid' });
    }
};

module.exports = { extractToken };