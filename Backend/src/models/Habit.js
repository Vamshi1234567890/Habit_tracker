import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A habit name is required'],
        trim: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    // Array of dates when the habit was completed
    completionDates: [{ type: Date }],
}, {
    timestamps: true 
});

const Habit = mongoose.model('Habit', HabitSchema);

export default Habit;