#!/usr/bin/env python3
import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def init_db():
    """Initialize the database with required tables."""
    # Connect to PostgreSQL
    conn = psycopg2.connect(os.getenv("DATABASE_URL", "postgresql://postgres:password@db:5432/upwork"))
    conn.autocommit = True
    cursor = conn.cursor()
    
    # Read SQL file
    with open('scripts/init_db.sql', 'r') as f:
        sql = f.read()
    
    # Execute SQL
    cursor.execute(sql)
    
    # Close connection
    cursor.close()
    conn.close()
    
    print("Database initialized successfully!")

if __name__ == "__main__":
    init_db() 