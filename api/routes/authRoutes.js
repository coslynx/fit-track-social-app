import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

/**
 * Route for user registration.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
router.post('/register', async (req, res) => {
    console.log('ROUTE - POST /auth/register', 'Request received');
    if (req.headers['content-type'] !== 'application/json') {
        console.error('ROUTE - POST /auth/register', 'Invalid Content-Type');
        return res.status(400).json({ success: false, message: 'Invalid Content-Type, expected application/json' });
    }
    try {
        await authController.register(req, res);
    } catch (error) {
        console.error('ROUTE - POST /auth/register', 'Error processing request', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route for user login.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
router.post('/login', async (req, res) => {
    console.log('ROUTE - POST /auth/login', 'Request received');
      if (req.headers['content-type'] !== 'application/json') {
        console.error('ROUTE - POST /auth/login', 'Invalid Content-Type');
        return res.status(400).json({ success: false, message: 'Invalid Content-Type, expected application/json' });
    }
    try {
        await authController.login(req, res);
    } catch (error) {
         console.error('ROUTE - POST /auth/login', 'Error processing request', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route for user logout.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
router.post('/logout', async (req, res) => {
    console.log('ROUTE - POST /auth/logout', 'Request received');
      if (req.headers['content-type'] !== 'application/json') {
        console.error('ROUTE - POST /auth/logout', 'Invalid Content-Type');
         return res.status(400).json({ success: false, message: 'Invalid Content-Type, expected application/json' });
    }
    try {
        await authController.logout(req, res);
    } catch (error) {
        console.error('ROUTE - POST /auth/logout', 'Error processing request', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;