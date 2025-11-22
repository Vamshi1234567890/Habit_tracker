import Habit from '../models/Habit.js';
import { calculateHabitStats } from '../services/HabitService.js';

// 1. Create Habit
export const createHabit = async (req, res) => {
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json(habit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. Get All Habits (with Sorting)
export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({});
        
        // Calculate stats for each habit
        const habitsWithStats = habits.map(calculateHabitStats);

        // Apply sorting based on query parameter
        const { sort } = req.query; 
        if (sort === 'name') {
            habitsWithStats.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'longestStreak') {
            habitsWithStats.sort((a, b) => b.longestStreak - a.longestStreak);
        } else {
            // Default sort: currentStreak
            habitsWithStats.sort((a, b) => b.currentStreak - a.currentStreak);
        }

        res.status(200).json(habitsWithStats);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
};

// 3. Toggle Completion (Mark today’s habit as completed or not)
export const toggleCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        const inputDate = new Date(req.body.date);
        
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        const dateToToggle = inputDate.toISOString().split('T')[0];

        // Find index of the date if it exists
        const dateIndex = habit.completionDates.findIndex(d => 
            d.toISOString().split('T')[0] === dateToToggle
        );

        if (dateIndex > -1) {
            // Date found: Remove it (UNMARK)
            habit.completionDates.splice(dateIndex, 1);
        } else {
            // Date not found: Add it (MARK)
            habit.completionDates.push(inputDate);
        }

        await habit.save();
        res.status(200).json(calculateHabitStats(habit));
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle completion' });
    }
};

// 4. Delete Habit
export const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Habit.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Habit not found' });
        }
        res.status(200).json({ message: 'Habit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete habit' });
    }
};