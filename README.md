 MERN Stack Daily Habit Tracker

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built to help users visually track their daily habits, calculate streaks, and monitor progress using a clean, responsive interface and a heatmap progress view.

✨ Key Features

Habit Creation & Tracking: Add new habits and mark today's completion status with a single click.

Habit Management: Edit habit details (name and start date) and Delete habits entirely.

Real-time Stats: View current streak, longest streak, and overall progress percentage.

Heatmap Visualization: See a monthly grid view of completed (green) and missed (grey) days for each habit.

Sorting: Organize habits by Current Streak, Longest Streak, or Name (A-Z).

🚀 Deployment Status

Frontend (React)

Netlify

Backend (Express API)

Render



🛠️ Tech Stack

Frontend: React, JavaScript, HTML, CSS (Custom Styling)

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose ODM)

API Communication: Axios

⚙️ Setup and Installation (Local Development)

Follow these steps to get the application running on your local machine.

Prerequisites

Node.js (v18+) and npm

MongoDB Atlas or a local MongoDB instance

1. Backend Setup

The backend handles API requests, database interactions, and streak calculations.

Navigate to the backend directory:

cd backend


Install dependencies:

npm install

Create a .env file in the backend directory based on the provided .env.example and add your MongoDB connection string (MONGO_URI).

Start the backend server (runs on http://localhost:5000):

npm run dev


2. Frontend Setup

The frontend provides the user interface and connects to the running backend API.

Navigate to the frontend directory (in a new terminal window):

cd frontend

Install dependencies:

npm install

npm start

DEMO 

https://amazing-creponne-443a12.netlify.app/

