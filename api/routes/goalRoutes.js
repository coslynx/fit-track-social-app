import express from 'express';
import goalController from '../controllers/goalController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * Route for creating a new goal.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
router.post('/goals', async (req, res) => {
    console.log('ROUTE - POST /goals Request received');
    if (req.headers['content-type'] !== 'application/json') {
        console.error('ROUTE - POST /goals Invalid Content-Type');
        return res.status(400).json({ success: false, message: 'Invalid Content-Type, expected application/json' });
    }
    try {
       await goalController.createGoal(req, res);
    } catch (error) {
         console.error('ROUTE - POST /goals Error processing request', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route for fetching all goals for a user.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
router.get('/goals', authMiddleware, async (req, res) => {
    console.log('ROUTE - GET /goals Request received');
    try {
         await goalController.getUserGoals(req, res);
    } catch (error) {
        console.error('ROUTE - GET /goals Error processing request', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


/**
 * Route for updating a goal.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
router.put('/goals/:id', async (req, res) => {
    console.log('ROUTE - PUT /goals/:id Request received');
    if (req.headers['content-type'] !== 'application/json') {
        console.error('ROUTE - PUT /goals/:id Invalid Content-Type');
        return res.status(400).json({ success: false, message: 'Invalid Content-Type, expected application/json' });
    }
    try {
        await goalController.updateGoal(req, res);
    } catch (error) {
        console.error('ROUTE - PUT /goals/:id Error processing request', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

/**
 * Route for deleting a goal.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>}
 */
router.delete('/goals/:id', async (req, res) => {
    console.log('ROUTE - DELETE /goals/:id Request received');
    if (req.headers['content-type'] !== 'application/json') {
       console.error('ROUTE - DELETE /goals/:id Invalid Content-Type');
       return res.status(400).json({ success: false, message: 'Invalid Content-Type, expected application/json' });
    }
    try {
        await goalController.deleteGoal(req, res);
    } catch (error) {
        console.error('ROUTE - DELETE /goals/:id Error processing request', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;