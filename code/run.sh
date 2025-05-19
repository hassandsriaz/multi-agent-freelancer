#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp env.example .env
    echo "Please update the .env file with your credentials."
fi

# Initialize the database
echo "Initializing the database..."
python scripts/init_db.py

# Start the backend API
echo "Starting backend API server..."
cd api && uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Start the frontend
echo "Starting frontend server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Function to handle exit signal
function handle_exit {
    echo "Shutting down servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

# Register the function to handle exit signal
trap handle_exit SIGINT

echo ""
echo "=================================================="
echo "Upwork Multi-Agent System is running!"
echo "--------------------------------------------------"
echo "Backend API: http://localhost:8000"
echo "Frontend:    http://localhost:3001"
echo "API Docs:    http://localhost:8000/docs"
echo "--------------------------------------------------"
echo "Press Ctrl+C to stop all servers"
echo "=================================================="
echo ""

# Keep the script running
wait 