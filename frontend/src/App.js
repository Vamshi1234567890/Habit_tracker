import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import './App.css'; 

const API_URL = 'http://localhost:5000/api/habits'; 

function App() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHabits = async (sortBy = 'currentStreak') => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}?sort=${sortBy}`);
            setHabits(response.data);
        } catch (error) {
            console.error('Error fetching habits:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const handleAddHabit = async (name) => {
        try {
            await axios.post(API_URL, { name });
            fetchHabits(); 
        } catch (error) {
            console.error('Error adding habit:', error);
        }
    };

    const handleToggleCompletion = async (habitId) => {
        try {
            await axios.post(`${API_URL}/${habitId}/toggle`, { date: new Date().toISOString() });
            fetchHabits(); 
        } catch (error) {
            console.error('Error toggling completion:', error);
        }
    };
    
    const handleDeleteHabit = async (habitId) => {
        try {
            await axios.delete(`${API_URL}/${habitId}`);
            fetchHabits(); 
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>📈 Daily Habit Tracker</h1>
            </header>
            
            <AddHabitForm onAddHabit={handleAddHabit} />
            
            <hr />

            {loading ? (
                <p className="loading">Loading habits...</p>
            ) : (
                <HabitList 
                    habits={habits} 
                    onSortChange={fetchHabits} 
                    onToggleCompletion={handleToggleCompletion}
                    onDeleteHabit={handleDeleteHabit} 
                />
            )}
        </div>
    );
}

export default App;