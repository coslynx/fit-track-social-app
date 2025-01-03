import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware function to authenticate users based on a JWT token.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
const authMiddleware = async (req, res, next) => {
    console.log(`${new Date().toISOString()} - AUTH - ${req.method} ${req.originalUrl} - Request received`);

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
             console.error(`${new Date().toISOString()} - AUTH - ${req.method} ${req.originalUrl} - Unauthorized: Missing or malformed Authorization header`);
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.error(`${new Date().toISOString()} - AUTH - ${req.method} ${req.originalUrl} - Unauthorized: Token not found in Authorization header`);
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const jwtSecret = process.env.VITE_JWT_SECRET;
          if (!jwtSecret) {
              console.error(`${new Date().toISOString()} - AUTH - ${req.method} ${req.originalUrl} - Unauthorized: JWT secret not found`);
              return res.status(401).json({ success: false, message: 'Unauthorized' });
          }

        const decoded = jwt.verify(token, jwtSecret);

        if (!decoded || !decoded.id) {
            console.error(`${new Date().toISOString()} - AUTH - ${req.method} ${req.originalUrl} - Unauthorized: Invalid token`);
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        req.user = { id: decoded.id };
        console.log(`${new Date().toISOString()} - AUTH - ${req.method} ${req.originalUrl} - Token verification successful, user ID: ${decoded.id}`);
        next();
    } catch (error) {
        console.error(`${new Date().toISOString()} - AUTH - ${req.method} ${req.originalUrl} - Unauthorized: Token verification failed`, error.message);
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

export { authMiddleware };