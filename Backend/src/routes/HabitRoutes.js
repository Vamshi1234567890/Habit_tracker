import express from 'express';
import { createHabit, getHabits, toggleCompletion, deleteHabit } from '../controllers/HabitControllers.js';

const router = express.Router();

router.post('/', createHabit);           // Add new habits
router.get('/', getHabits);             // Get all habits (with sorting)
router.post('/:id/toggle', toggleCompletion); // Mark today’s habit as completed or not
router.delete('/:id', deleteHabit);      // Delete a habit

export default router;