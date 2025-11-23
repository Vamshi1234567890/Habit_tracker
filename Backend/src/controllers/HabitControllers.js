import Habit from '../models/Habit.js'; // Must include .js
import { calculateHabitStats } from '../services/HabitService.js'; // Must include .js

// 1. Create Habit
export const createHabit = async (req, res) => {
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json(calculateHabitStats(habit));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. Get All Habits (with Sorting)
export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({});
        const habitsWithStats = habits.map(calculateHabitStats);

        const { sort } = req.query; 
        if (sort === 'name') {
            habitsWithStats.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'longestStreak') {
            habitsWithStats.sort((a, b) => b.longestStreak - a.longestStreak);
        } else {
            habitsWithStats.sort((a, b) => b.currentStreak - a.currentStreak);
        }

        res.status(200).json(habitsWithStats);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch habits' });
    }
};

// 3. Toggle Completion
export const toggleCompletion = async (req, res) => {
    try {
        const { id } = req.params;
        const inputDate = new Date(req.body.date);
        
        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        const dateToToggle = inputDate.toISOString().split('T')[0];
        const dateIndex = habit.completionDates.findIndex(d => 
            d.toISOString().split('T')[0] === dateToToggle
        );

        if (dateIndex > -1) {
            // UNMARK
            habit.completionDates.splice(dateIndex, 1);
        } else {
            // MARK
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