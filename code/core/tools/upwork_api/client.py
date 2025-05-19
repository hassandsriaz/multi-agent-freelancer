import os
import json
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class UpworkClient:
    """Mock client that returns fake data for testing."""
    
    def __init__(self):
        """Initialize the mock client."""
        pass
    
    def search_jobs(self, keywords=None, category=None, skills=None, limit=10):
        """
        Return fake job search results.
        
        Args:
            keywords (str): Keywords to search for
            category (str): Job category
            skills (list): List of skills
            limit (int): Maximum number of results to return
            
        Returns:
            list: List of fake jobs
        """
        # Generate fake jobs
        fake_jobs = [
            {
                'id': f'job_{i}',
                'title': f'Fake Job {i}',
                'description': f'This is a fake job description for testing purposes. Keywords: {keywords}',
                'category': category or 'Development & IT',
                'skills': skills or ['Python', 'API Development'],
                'budget': {'amount': 1000, 'currency': 'USD'},
                'client': {
                    'name': f'Fake Client {i}',
                    'country': 'United States',
                    'feedback': 4.8
                },
                'created_on': datetime.now().isoformat()
            }
            for i in range(1, limit + 1)
        ]
        return fake_jobs
    
    def submit_proposal(self, job_id, cover_letter, rate, hours_per_week=None):
        """
        Simulate submitting a proposal.
        
        Args:
            job_id (str): The job ID
            cover_letter (str): The cover letter
            rate (float): The hourly rate
            hours_per_week (int): Hours per week
            
        Returns:
            dict: Fake response
        """
        return {
            'status': 'success',
            'message': 'Proposal submitted successfully',
            'proposal_id': f'prop_{job_id}',
            'submitted_at': datetime.now().isoformat()
        }
    
    def get_job_details(self, job_id):
        """
        Get fake details for a specific job.
        
        Args:
            job_id (str): The job ID
            
        Returns:
            dict: Fake job details
        """
        return {
            'id': job_id,
            'title': f'Fake Job {job_id}',
            'description': 'This is a detailed fake job description for testing purposes.',
            'category': 'Development & IT',
            'skills': ['Python', 'API Development', 'Testing'],
            'budget': {'amount': 1000, 'currency': 'USD'},
            'client': {
                'name': f'Fake Client {job_id}',
                'country': 'United States',
                'feedback': 4.8
            },
            'created_on': datetime.now().isoformat()
        }
    
    def save_job_data(self, job_data, directory="data/job_history"):
        """
        Save job data to a JSON file for historical reference.
        
        Args:
            job_data (dict): The job data to save
            directory (str): Directory to save the file in
            
        Returns:
            str: Path to the saved file
        """
        # Create directory if it doesn't exist
        os.makedirs(directory, exist_ok=True)
        
        # Create filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        job_id = job_data.get('id', 'unknown')
        filename = f"{directory}/{job_id}_{timestamp}.json"
        
        # Save to file
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(job_data, f, indent=2)
            
        return filename