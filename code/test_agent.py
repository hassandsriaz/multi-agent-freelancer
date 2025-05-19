from agents.crew import UpworkCrew
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    # Initialize the crew
    crew = UpworkCrew()
    
    # Define test profile data
    profile_data = {
        "name": "Test Freelancer",
        "skills": ["Python", "Machine Learning", "FastAPI", "Docker"],
        "experience": "5+ years of experience in software development",
        "hourly_rate": "$50-75",
        "bio": "Experienced software developer specializing in Python and AI development."
    }
    
    # Define job search criteria
    job_search_criteria = {
        "keywords": "Python",
        "skills": ["Python", "Machine Learning"],
        "category": "Development & IT",
        "limit": 3
    }
    
    # Run the automation
    print("Starting job application automation with fake data...")
    result = crew.automate_job_application(job_search_criteria, profile_data)
    
    # Print results
    print("\n=== Results ===")
    print("\nJobs Found:")
    for job in result["jobs_found"]:
        print(f"\nTitle: {job['title']}")
        print(f"Description: {job['description']}")
        print(f"Skills: {', '.join(job['skills'])}")
        print(f"Budget: {job['budget']}")
    
    print("\nProposals Generated:")
    for job_id, proposal in result["proposals"].items():
        print(f"\nJob ID: {job_id}")
        print(f"Proposal: {proposal}")
    
    print("\nProfile Optimization Suggestions:")
    print(result["profile_optimization"])

if __name__ == "__main__":
    main() 