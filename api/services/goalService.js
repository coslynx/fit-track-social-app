import Goal from '../models/goalModel.js';
import { formatDate } from '../../utils/helpers.js';
import mongoose from 'mongoose';


/**
 * Service for handling goal-related logic.
 */
class GoalService {
    /**
     * Creates a new goal for a user.
     * @param {string} userId - The ID of the user creating the goal.
     * @param {string} name - The name of the goal.
     * @param {string} description - The description of the goal.
     * @param {string} targetDate - The target date for the goal.
     * @param {number} targetValue - The target value for the goal.
     * @returns {Promise<Object>} - The newly created goal object.
     * @throws {Error} - If input validation fails, or goal creation fails.
     */
    async createGoal(userId, name, description, targetDate, targetValue) {
        console.log('GOAL_SERVICE - createGoal', 'Entry');
        if (!userId || typeof userId !== 'string' ||
            !name || typeof name !== 'string' ||
            !description || typeof description !== 'string' ||
            !targetDate || typeof targetDate !== 'string' ||
            typeof targetValue !== 'number'
        ) {
            console.error('GOAL_SERVICE - createGoal', 'Invalid input parameters');
            throw new Error('Invalid input parameters');
        }

        try {
             const formattedDate = formatDate(targetDate);
             if (!formattedDate) {
                  console.error('GOAL_SERVICE - createGoal', 'Invalid target date format');
                  throw new Error('Invalid target date format');
             }
            const goal = new Goal({
                userId: new mongoose.Types.ObjectId(userId),
                name: name.trim(),
                description: description.trim(),
                targetDate: formattedDate,
                targetValue: targetValue,
            });

            const savedGoal = await goal.save();

            console.log('GOAL_SERVICE - createGoal', 'Goal creation successful');
            return savedGoal;
        } catch (error) {
           console.error('GOAL_SERVICE - createGoal', 'Goal creation failed', error.message);
            throw new Error('Goal creation failed');
        }
    }

    /**
     * Retrieves all goals for a given user ID.
     * @param {string} userId - The ID of the user whose goals are to be retrieved.
     * @returns {Promise<Array>} - An array of goal objects.
     * @throws {Error} - If fetching user goals fails.
     */
    async getUserGoals(userId) {
        console.log('GOAL_SERVICE - getUserGoals', 'Entry');
        if (!userId || typeof userId !== 'string') {
            console.error('GOAL_SERVICE - getUserGoals', 'Invalid input parameters');
            throw new Error('Invalid input parameters');
        }
        try {
             const goals = await Goal.findByUserId(userId);
             console.log('GOAL_SERVICE - getUserGoals', 'Fetching user goals successful');
            return goals;
         } catch (error) {
            console.error('GOAL_SERVICE - getUserGoals', 'Fetching user goals failed', error.message);
            throw new Error('Fetching user goals failed');
        }
    }

    /**
     * Updates an existing goal.
     * @param {string} goalId - The ID of the goal to be updated.
     * @param {Object} updateData - An object containing the fields to be updated.
     * @returns {Promise<Object | null>} - The updated goal object, or null if not found.
     * @throws {Error} - If input validation fails or goal update fails.
     */
    async updateGoal(goalId, updateData) {
        console.log('GOAL_SERVICE - updateGoal', 'Entry');

        if (!goalId || typeof goalId !== 'string') {
            console.error('GOAL_SERVICE - updateGoal', 'Invalid goal ID');
            throw new Error('Invalid goal ID');
        }
        
         if (updateData && updateData.targetDate) {
                const formattedDate = formatDate(updateData.targetDate);
                 if (!formattedDate) {
                     console.error('GOAL_SERVICE - updateGoal', 'Invalid target date format');
                     throw new Error('Invalid target date format');
                 }
              updateData.targetDate = formattedDate;
         }


        try {
            const updatedGoal = await Goal.findByIdAndUpdate(goalId, updateData, { new: true });
            console.log('GOAL_SERVICE - updateGoal', 'Goal update successful');
            return updatedGoal;
        } catch (error) {
            console.error('GOAL_SERVICE - updateGoal', 'Goal update failed', error.message);
            throw new Error('Goal update failed');
        }
    }

    /**
     * Deletes an existing goal.
     * @param {string} goalId - The ID of the goal to be deleted.
     * @returns {Promise<void>}
     * @throws {Error} - If goal deletion fails.
     */
    async deleteGoal(goalId) {
        console.log('GOAL_SERVICE - deleteGoal', 'Entry');
        if (!goalId || typeof goalId !== 'string') {
            console.error('GOAL_SERVICE - deleteGoal', 'Invalid goal ID');
            throw new Error('Invalid goal ID');
        }
        try {
            await Goal.findByIdAndDelete(goalId);
            console.log('GOAL_SERVICE - deleteGoal', 'Goal deletion successful');
        } catch (error) {
           console.error('GOAL_SERVICE - deleteGoal', 'Goal deletion failed', error.message);
             throw new Error('Goal deletion failed');
        }
    }
}

export default new GoalService();