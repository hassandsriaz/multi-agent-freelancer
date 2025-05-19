import os
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database connection string from environment
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@db:5432/upwork")

# Create SQLAlchemy engine
engine = sqlalchemy.create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for declarative models
Base = declarative_base()

def get_db():
    """
    Get a database session.
    
    Yields:
        session: SQLAlchemy database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """
    Initialize the database (create tables).
    
    Use this function for creating tables programmatically.
    For more complex initialization, use SQL scripts.
    """
    Base.metadata.create_all(bind=engine) 