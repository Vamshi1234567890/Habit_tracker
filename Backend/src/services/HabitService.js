// Helper to format Date to YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0];

export const calculateHabitStats = (habit) => {
    const completedDays = new Set(habit.completionDates.map(d => formatDate(d)));
    const today = formatDate(new Date());

    let currentStreak = 0;
    let longestStreak = 0;
    let currentConsecutive = 0;

    // Calculate total days tracked
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDaysTracked = Math.floor((new Date().getTime() - habit.startDate.getTime()) / msPerDay) + 1;
    const totalCompleted = completedDays.size;

    // Current Streak Calculation (Iterate backwards from today)
    let iterationDate = new Date();
    currentConsecutive = 0; // Reset for iteration
    
    // Check if today is completed
    if (completedDays.has(today)) {
        currentConsecutive = 1;
    }
    
    // Iterate backwards from yesterday
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    iterationDate = yesterday;

    while (formatDate(iterationDate) >= formatDate(habit.startDate)) {
        const dateString = formatDate(iterationDate);
        if (completedDays.has(dateString)) {
            currentConsecutive++;
            currentStreak = currentConsecutive;
        } else {
            // Streak broken
            break; 
        }
        iterationDate.setDate(iterationDate.getDate() - 1);
    }
    
    // Longest Streak Calculation (Iterate from start date to today)
    let longestConsecutive = 0;
    let tempCurrent = 0;
    let iterDate = new Date(habit.startDate);
    
    while (formatDate(iterDate) <= today) {
        if (completedDays.has(formatDate(iterDate))) {
            tempCurrent++;
        } else {
            longestConsecutive = Math.max(longestConsecutive, tempCurrent);
            tempCurrent = 0;
        }
        iterDate.setDate(iterDate.getDate() + 1);
    }
    longestStreak = Math.max(longestConsecutive, tempCurrent);


    const progressPercentage = totalDaysTracked > 0 
        ? Math.round((totalCompleted / totalDaysTracked) * 100) 
        : 0;

    return {
        ...habit.toObject(), // Include all original habit properties
        currentStreak,
        longestStreak,
        progressPercentage, 
        completionDates: Array.from(completedDays).sort(), // Pass completion dates for heatmap
    };
};