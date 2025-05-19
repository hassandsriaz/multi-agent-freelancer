#!/bin/bash

echo "Setting up Upwork Multi-Agent System..."
echo "---------------------------------------"

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "Python is not installed. Please install Python 3.11 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp env.example .env
    echo "Please update the .env file with your credentials."
fi

# Install backend dependencies
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Initialize frontend
echo "Initializing frontend..."
cd frontend || mkdir -p frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend && npm install
cd ..

# Initialize the database
echo "Initializing the database..."
python scripts/init_db.py

echo ""
echo "Setup complete! You can now run the application:"
echo "./run.sh"
echo ""
echo "Frontend will be available at: http://localhost:3001"
echo "Backend API will be available at: http://localhost:8000"
echo ""

# Make run script executable
chmod +x run.sh

echo "Would you like to start the application now? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    # Remove the existing venv
    rm -rf venv

    # Create a new venv
    python -m venv venv

    # Activate venv
    source venv/Scripts/activate

    # Install requirements
    pip install -r requirements.txt
    
    # Start the application
    ./run.sh
else
    echo "You can start the application later by running ./run.sh"
fi 