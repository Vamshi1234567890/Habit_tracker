// /frontend/src/components/AddHabitForm.js
import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onAddHabit(name);
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-habit-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of your new habit..."
                required
            />
            <button type="submit">Add Habit</button>
        </form>
    );
};

export default AddHabitForm;