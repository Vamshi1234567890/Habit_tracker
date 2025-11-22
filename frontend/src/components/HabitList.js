// /frontend/src/components/HabitList.js
import React, { useState } from 'react';
import HabitCard from './HabitCard';

const HabitList = ({ habits, onSortChange, onToggleCompletion, onDeleteHabit }) => {
    const [sortKey, setSortKey] = useState('currentStreak');

    const handleSortChange = (e) => {
        const newSortKey = e.target.value;
        setSortKey(newSortKey);
        onSortChange(newSortKey); // Trigger API call with new sort key
    };

    return (
        <div className="habit-list-container">
            <div className="sort-controls">
                <label htmlFor="sort-select">Sort Habits By:</label>
                <select id="sort-select" value={sortKey} onChange={handleSortChange}>
                    <option value="currentStreak">Current Streak</option>
                    <option value="longestStreak">Longest Streak</option>
                    <option value="name">Name</option>
                </select>
            </div>
            
            <div className="habit-cards-wrapper">
                {habits.length === 0 ? (
                    <p>No habits tracked yet. Start by adding one above!</p>
                ) : (
                    habits.map(habit => (
                        <HabitCard 
                            key={habit._id}
                            habit={habit}
                            onToggleCompletion={onToggleCompletion}
                            onDeleteHabit={onDeleteHabit}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default HabitList;