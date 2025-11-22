import React from 'react';

// Generates an array of dates for the last 30 days
const generateDateRange = (days) => {
    const dates = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date);
    }
    return dates;
};

const HeatmapView = ({ dates }) => {
    const daysToShow = 30; // View a monthly heatmap
    const dateRange = generateDateRange(daysToShow); 
    
    const completedDaysSet = new Set(
        dates.map(date => new Date(date).toISOString().split('T')[0])
    );

    const getDayStatus = (date) => {
        const dateString = date.toISOString().split('T')[0];
        const todayString = new Date().toISOString().split('T')[0];

        if (dateString > todayString) {
            return 'future'; 
        } else if (completedDaysSet.has(dateString)) {
            return 'completed'; // Green
        } else {
            return 'missed'; // Grey
        }
    };

    return (
        <div className="heatmap-container">
            <h4>Monthly Progress (Last {daysToShow} Days)</h4>
            <div className="heatmap-grid">
                {dateRange.map((date, index) => (
                    <div 
                        key={index}
                        className={`day-box ${getDayStatus(date)}`}
                        title={date.toDateString()}
                    >
                    </div>
                ))}
            </div>
            <div className="legend">
                <span className="legend-item"><div className="color-box completed"></div>Completed</span>
                <span className="legend-item"><div className="color-box missed"></div>Missed</span>
                <span className="legend-item"><div className="color-box future"></div>Future</span>
            </div>
        </div>
    );
};

export default HeatmapView;