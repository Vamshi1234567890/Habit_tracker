const formatDate = (date) => date.toISOString().split('T')[0];

export const calculateHabitStats = (habit) => {
    const completedDays = new Set(habit.completionDates.map(d => formatDate(d)));
    const today = formatDate(new Date());

    let currentStreak = 0;
    let longestStreak = 0;
    let currentConsecutive = 0;

    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDaysTracked = Math.floor((new Date().getTime() - habit.startDate.getTime()) / msPerDay) + 1;
    const totalCompleted = completedDays.size;
    
    // --- Current Streak Calculation ---
    // Start by checking today
    let iterationDate = new Date();
    currentConsecutive = 0;
    
    // Iterate backwards from today
    while (formatDate(iterationDate) >= formatDate(habit.startDate)) {
        const dateString = formatDate(iterationDate);
        if (completedDays.has(dateString)) {
            currentConsecutive++;
            currentStreak = currentConsecutive;
        } else if (dateString < today) {
            // Streak broken, and it's not a future date
            break; 
        }
        iterationDate.setDate(iterationDate.getDate() - 1);
    }
    
    // --- Longest Streak Calculation ---
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
        ...habit.toObject(),
        currentStreak,
        longestStreak,
        progressPercentage,
        completionDates: Array.from(completedDays).sort(), 
    };
};