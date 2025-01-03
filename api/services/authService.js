import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isValidEmail } from '../../utils/helpers.js';

/**
 * Service for handling user authentication logic.
 */
class AuthService {
    /**
     * Registers a new user.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @param {string} name - The user's name.
     * @returns {Promise<{id: string, name: string, email: string, token: string}>} - The registered user object.
     * @throws {Error} If registration fails, or input validation fails, email is already registered.
     */
    async registerUser(email, password, name) {
        console.log('AUTH_SERVICE - registerUser', 'Entry');
        if (typeof email !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
            console.error('AUTH_SERVICE - registerUser', 'Invalid input parameters');
            throw new Error('Invalid input parameters');
        }
         if (!isValidEmail(email)) {
             console.error('AUTH_SERVICE - registerUser', 'Invalid email format');
            throw new Error('Invalid email format');
        }
          const existingUser = await User.findByEmail(email);
        if (existingUser) {
             console.error('AUTH_SERVICE - registerUser', 'Email already registered');
            throw new Error('Email already registered');
        }
         try {
            const user = new User({
                email,
                password,
                name,
            });
             await user.save();

             const jwtSecret = process.env.VITE_JWT_SECRET;
             if(!jwtSecret) {
                  console.error('AUTH_SERVICE - registerUser', 'JWT secret not found');
                 throw new Error('JWT secret not found');
             }
             const token = jwt.sign({ id: user.id }, jwtSecret, {
                 expiresIn: '2h',
             });

             console.log('AUTH_SERVICE - registerUser', 'User registration successful');

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            };
        } catch (error) {
            console.error('AUTH_SERVICE - registerUser', 'Registration failed', error.message);
             throw new Error('Registration failed');
        }
    }

    /**
     * Logs in an existing user.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<{id: string, name: string, email: string, token: string}>} - The logged in user object.
     * @throws {Error} If login fails, invalid credentials, or database interaction fails.
     */
    async loginUser(email, password) {
         console.log('AUTH_SERVICE - loginUser', 'Entry');
        if (typeof email !== 'string' || typeof password !== 'string') {
             console.error('AUTH_SERVICE - loginUser', 'Invalid input parameters');
            throw new Error('Invalid input parameters');
        }
        try {
            const user = await User.findByEmail(email);
            if (!user) {
                console.error('AUTH_SERVICE - loginUser', 'Invalid credentials, user not found');
                throw new Error('Invalid credentials');
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                console.error('AUTH_SERVICE - loginUser', 'Invalid credentials, passwords do not match');
                throw new Error('Invalid credentials');
            }

            const jwtSecret = process.env.VITE_JWT_SECRET;
             if(!jwtSecret) {
                 console.error('AUTH_SERVICE - loginUser', 'JWT secret not found');
                 throw new Error('JWT secret not found');
             }
            const token = jwt.sign({ id: user.id }, jwtSecret, {
                expiresIn: '2h',
            });

            console.log('AUTH_SERVICE - loginUser', 'Login successful');

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token,
            };
        } catch (error) {
            console.error('AUTH_SERVICE - loginUser', 'Login failed', error.message);
             if (error.message === 'Invalid credentials') {
                 throw error
             }
            throw new Error('Login failed');
        }
    }
}

export default new AuthService();