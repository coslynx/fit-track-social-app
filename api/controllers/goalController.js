import goalService from '../services/goalService.js';
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

/**
 * Controller for handling user goal requests.
 */
class GoalController {
    /**
     * Handles the creation of a new goal.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @returns {Promise<void>}
     */
    async createGoal(req, res) {
        console.log('GOAL - POST /goals', 'Request received');

        try {
            authMiddleware(req, res, async () => {
               const userId = req.user.id;
                const { name, description, targetDate, targetValue } = req.body;

                if (!name || typeof name !== 'string' ||
                    !description || typeof description !== 'string' ||
                    !targetDate || typeof targetDate !== 'string' ||
                    !targetValue || typeof targetValue !== 'number'
                ) {
                    console.error('GOAL - POST /goals', 'Invalid input parameters');
                    return res.status(400).json({ success: false, message: 'Invalid input parameters' });
                }
                 const trimmedName = name.trim();
                const trimmedDescription = description.trim();
                const trimmedTargetDate = targetDate.trim();


                const goal = await goalService.createGoal(userId, trimmedName, trimmedDescription, trimmedTargetDate, targetValue);

                console.log('GOAL - POST /goals', 'Goal creation successful');
                return res.status(201).json({
                    success: true,
                    message: 'Goal created successfully',
                    data: goal,
                });
            });
        } catch (error) {
            if (error.message === 'Unauthorized') {
                console.error('GOAL - POST /goals', 'Unauthorized access', error.message);
                return res.status(401).json({ success: false, message: 'Unauthorized' });
              }
             console.error('GOAL - POST /goals', 'Goal creation failed', error.message);
            return res.status(500).json({ success: false, message: 'Goal creation failed' });
        }
    }

    /**
     * Handles fetching of all goals for a user.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @returns {Promise<void>}
     */
    async getUserGoals(req, res) {
        console.log('GOAL - GET /goals', 'Request received');
        try {
            authMiddleware(req, res, async () => {
                const userId = req.user.id;
                const goals = await goalService.getUserGoals(userId);
                console.log('GOAL - GET /goals', 'Fetched user goals successfully');
                return res.status(200).json(goals);
            });
        } catch (error) {
            if (error.message === 'Unauthorized') {
                console.error('GOAL - GET /goals', 'Unauthorized access', error.message);
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            console.error('GOAL - GET /goals', 'Fetching user goals failed', error.message);
            return res.status(500).json({ success: false, message: 'Fetching user goals failed' });
        }
    }

    /**
     * Handles updating of a goal.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @returns {Promise<void>}
     */
    async updateGoal(req, res) {
       console.log('GOAL - PUT /goals/:id', 'Request received');
        try {
             authMiddleware(req, res, async () => {
                 const { id: goalId } = req.params;
                const { name, description, targetDate, targetValue, completed } = req.body;

                if (!goalId || typeof goalId !== 'string' ||
                    (!name && !description && !targetDate && targetValue === undefined && completed === undefined) ||
                    (name && typeof name !== 'string') ||
                    (description && typeof description !== 'string') ||
                    (targetDate && typeof targetDate !== 'string') ||
                    (targetValue !== undefined && typeof targetValue !== 'number') ||
                    (completed !== undefined && typeof completed !== 'boolean')
                   ) {
                    console.error('GOAL - PUT /goals/:id', 'Invalid input parameters');
                    return res.status(400).json({ success: false, message: 'Invalid input parameters' });
                }

                const updateData = {};

                if (name) {
                    updateData.name = name.trim();
                }
                if (description) {
                     updateData.description = description.trim();
                }
                if (targetDate) {
                    updateData.targetDate = targetDate.trim();
                 }
                if (targetValue !== undefined) {
                    updateData.targetValue = targetValue;
                }
                if (completed !== undefined) {
                    updateData.completed = completed;
                }

                const updatedGoal = await goalService.updateGoal(goalId, updateData);
                  console.log('GOAL - PUT /goals/:id', 'Goal update successful');
                return res.status(200).json({
                    success: true,
                    message: 'Goal updated successfully',
                    data: updatedGoal,
                });
            });
        } catch (error) {
             if (error.message === 'Unauthorized') {
                  console.error('GOAL - PUT /goals/:id', 'Unauthorized access', error.message);
                  return res.status(401).json({ success: false, message: 'Unauthorized' });
             }
            console.error('GOAL - PUT /goals/:id', 'Goal update failed', error.message);
            return res.status(500).json({ success: false, message: 'Goal update failed' });
        }
    }

    /**
     * Handles the deletion of a goal.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @returns {Promise<void>}
     */
    async deleteGoal(req, res) {
        console.log('GOAL - DELETE /goals/:id', 'Request received');
        try {
            authMiddleware(req, res, async () => {
                 const { id: goalId } = req.params;

                if (!goalId || typeof goalId !== 'string') {
                    console.error('GOAL - DELETE /goals/:id', 'Invalid input parameters');
                    return res.status(400).json({ success: false, message: 'Invalid input parameters' });
                }
                 await goalService.deleteGoal(goalId);
                console.log('GOAL - DELETE /goals/:id', 'Goal deletion successful');
                return res.status(200).json({
                    success: true,
                    message: 'Goal deleted successfully',
                });
            });
        } catch (error) {
            if (error.message === 'Unauthorized') {
                 console.error('GOAL - DELETE /goals/:id', 'Unauthorized access', error.message);
                 return res.status(401).json({ success: false, message: 'Unauthorized' });
              }
             console.error('GOAL - DELETE /goals/:id', 'Goal deletion failed', error.message);
            return res.status(500).json({ success: false, message: 'Goal deletion failed' });
        }
    }
}

export default new GoalController();