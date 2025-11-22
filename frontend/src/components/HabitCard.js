import React from 'react';
import HeatmapView from './HeatmapView';

const HabitCard = ({ habit, onToggleCompletion, onDeleteHabit }) => {
    // Determine if today is completed
    const today = new Date().toISOString().split('T')[0];
    const isCompletedToday = habit.completionDates.some(date => 
        new Date(date).toISOString().split('T')[0] === today
    );

    return (
        <div className="habit-card">
            <div className="habit-header">
                <h2>{habit.name}</h2>
                <button 
                    onClick={() => onToggleCompletion(habit._id)}
                    className={`track-button ${isCompletedToday ? 'completed-btn' : 'not-completed-btn'}`}
                >
                    {isCompletedToday ? '✅ Completed Today' : '⬜ Mark Completed'}
                </button>
            </div>

            <div className="stats">
                <p>Progress: <strong>{habit.progressPercentage}%</strong></p> {/* Simple progress percentage */}
                <p>Current Streak: <strong>{habit.currentStreak} days</strong></p>
                <p>Longest Streak: <strong>{habit.longestStreak} days</strong></p>
            </div>

            <HeatmapView dates={habit.completionDates} />

            <button 
                onClick={() => { if(window.confirm('Confirm delete?')) onDeleteHabit(habit._id) }} 
                className="delete-button"
            >
                🗑️ Delete Habit
            </button> {/* Delete a habit */}
        </div>
    );
};

export default HabitCard;