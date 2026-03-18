
URL Shortener Application

Project Overview

This project is a full-stack URL shortener application that allows users to convert long URLs into short, manageable links. It also provides basic analytics such as tracking the number of clicks and visualizing usage trends over time. The system is designed with a simple and clean interface, making it easy to shorten URLs, view previously created links, and monitor their performance. The design of the website has been asked to be a picture perfect representation of a project done before.

Tech Stack

The application is built using a modern full-stack architecture. The backend is developed using FastAPI with SQLAlchemy for database management and SQLite as the database. The frontend is built using React, along with Chart.js for data visualization and Axios for API communication. The project uses a Python virtual environment for backend dependency management and Node.js for frontend package management.

Prerequisites

Before running the application, ensure that Python (version 3.8 or higher) and Node.js (with npm) are installed on your system. It is also recommended to use a code editor such as VS Code and have basic familiarity with terminal commands. A stable internet connection is required to install dependencies.

Instructions to Run Backend

This section explains how to set up and run the backend server, which handles API requests, database operations, and URL redirection.

1. Open a terminal and navigate to the backend folder

2. Create a virtual environment

   python -m venv venv

4. Activate the virtual environment

   venv\Scripts\activate

6. Install dependencies

   pip install -r requirements.txt

8. Start the backend server

   uvicorn main:app --reload

Instructions to Run Frontend

This section explains how to set up and run the frontend application, which provides the user interface and interacts with the backend API.

1. Open a new terminal
   
2. Navigate to the frontend folder

   cd frontend

4. Install dependencies

   npm install

6. Start the React application
How to Load Seed Data

This section explains how to populate the database with sample data for testing and demonstration purposes.

1. Ensure the backend virtual environment is activated
  
2. Run the seed script

   python seed.py

How to Run Tests

This section explains how to execute tests for the application. Currently, the project does not include a dedicated automated test suite. However, functionality can be tested manually by creating short URLs, accessing them, and verifying analytics data through the UI. Future improvements may include adding unit and integration tests for both backend and frontend.

Assumptions or Tradeoffs

This project makes a few simplifications to keep the implementation straightforward. The database uses SQLite, which is lightweight but not ideal for large-scale production systems. The application currently stores only aggregate click counts rather than detailed click event data, limiting advanced analytics capabilities. Additionally, the clicks and analytics section in the frontend is still a work in progress and is currently included as a placeholder for future enhancements. CORS is configured to allow all origins for development convenience, which should be restricted in a production environment. The short code generation does not currently check for collisions, which could be improved for robustness.

Screenshots included in /screenshots folder for verification.

## Submission Details

The total time spent on this assignment was approximately 8–10 hours. I started by going through the requirements and design mockup to plan things out before jumping into code. Most of the time went into building and fine-tuning the frontend to closely match the provided design, while also implementing the backend APIs and redirect logic.

I then connected both ends together, added seed data so the charts and table felt realistic, and wrapped up with testing and documentation.
