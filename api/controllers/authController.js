import authService from '../services/authService.js';

/**
 * Controller for handling user authentication requests.
 */
class AuthController {
    /**
     * Handles user registration.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @returns {Promise<void>}
     */
    async register(req, res) {
        try {
            console.log('AUTH - POST /auth/register', 'Request received');
            const { email, password, name } = req.body;

             if (!email || typeof email !== 'string' || !password || typeof password !== 'string' || !name || typeof name !== 'string') {
                 console.error('AUTH - POST /auth/register', 'Invalid input parameters');
                 return res.status(400).json({ success: false, message: 'Invalid input parameters' });
             }
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            const trimmedName = name.trim();

            const user = await authService.registerUser(trimmedEmail, trimmedPassword, trimmedName);

            console.log('AUTH - POST /auth/register', 'User registration successful');

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: { id: user.id, name: user.name, email: user.email },
                token: user.token,
            });
        } catch (error) {
            console.error('AUTH - POST /auth/register', 'Registration failed', error.message);

            if (error.message === 'Email already registered') {
                return res.status(400).json({ success: false, message: 'Email already registered' });
            }
            return res.status(500).json({ success: false, message: 'Registration failed' });
        }
    }

    /**
     * Handles user login.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @returns {Promise<void>}
     */
    async login(req, res) {
        try {
            console.log('AUTH - POST /auth/login', 'Request received');
            const { email, password } = req.body;

             if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
                console.error('AUTH - POST /auth/login', 'Invalid input parameters');
                 return res.status(400).json({ success: false, message: 'Invalid input parameters' });
             }

            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();

            const user = await authService.loginUser(trimmedEmail, trimmedPassword);
            console.log('AUTH - POST /auth/login', 'Login successful');

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: { id: user.id, name: user.name, email: user.email },
                token: user.token,
            });
        } catch (error) {
             console.error('AUTH - POST /auth/login', 'Login failed', error.message);
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            return res.status(500).json({ success: false, message: 'Login failed' });
        }
    }

    /**
     * Handles user logout.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @returns {Promise<void>}
     */
    async logout(req, res) {
        try {
            console.log('AUTH - POST /auth/logout', 'Request received');
            //In this MVP no server side logout is needed as the token is managed client side
            console.log('AUTH - POST /auth/logout', 'Logout successful');
            return res.status(200).json({ success: true, message: 'Logout successful' });
        } catch (error) {
            console.error('AUTH - POST /auth/logout', 'Logout failed', error.message);
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
    }
}

export default new AuthController();