from core.memory import VectorStore
from langchain.schema import Document
import random
from datetime import datetime, timedelta

# Sample fake job data
FAKE_JOBS = [
    {
        'id': '1',
        'title': 'Senior Python Developer for AI Project',
        'description': 'Looking for an experienced Python developer to work on an AI project. Must have experience with machine learning frameworks and API development.',
        'skills': ['Python', 'Machine Learning', 'FastAPI', 'Docker'],
        'budget': '$50-100/hr',
        'category2': 'Development & IT',
        'subcategory2': 'Python',
        'posted_on': (datetime.now() - timedelta(days=1)).isoformat()
    },
    {
        'id': '2',
        'title': 'Full Stack Developer - React & Node.js',
        'description': 'Need a full stack developer to build a modern web application. Experience with React, Node.js, and MongoDB required.',
        'skills': ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        'budget': '$30-50/hr',
        'category2': 'Development & IT',
        'subcategory2': 'Web Development',
        'posted_on': (datetime.now() - timedelta(days=2)).isoformat()
    },
    {
        'id': '3',
        'title': 'Data Scientist for E-commerce Analytics',
        'description': 'Seeking a data scientist to analyze customer behavior and optimize our e-commerce platform.',
        'skills': ['Python', 'Data Analysis', 'Machine Learning', 'SQL'],
        'budget': '$40-80/hr',
        'category2': 'Data Science & Analytics',
        'subcategory2': 'Data Science',
        'posted_on': (datetime.now() - timedelta(days=3)).isoformat()
    },
    {
        'id': '4',
        'title': 'DevOps Engineer - AWS & Kubernetes',
        'description': 'Looking for a DevOps engineer to manage our cloud infrastructure and implement CI/CD pipelines.',
        'skills': ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
        'budget': '$60-90/hr',
        'category2': 'Development & IT',
        'subcategory2': 'DevOps',
        'posted_on': (datetime.now() - timedelta(days=4)).isoformat()
    },
    {
        'id': '5',
        'title': 'UI/UX Designer for Mobile App',
        'description': 'Need a creative UI/UX designer to design a modern mobile application interface.',
        'skills': ['UI Design', 'UX Design', 'Figma', 'Mobile Design'],
        'budget': '$35-65/hr',
        'category2': 'Design & Creative',
        'subcategory2': 'UI/UX Design',
        'posted_on': (datetime.now() - timedelta(days=5)).isoformat()
    }
]

def search_jobs(criteria):
    """
    Search for jobs based on the provided criteria using fake data.
    
    Args:
        criteria (dict): A dictionary containing search criteria:
            - keywords (str): Keywords to search for
            - skills (list): List of skills
            - category (str): Job category
            - limit (int): Maximum number of results to return
            
    Returns:
        list: List of jobs matching the criteria
    """
    # Extract search criteria
    keywords = criteria.get('keywords', '').lower()
    skills = [skill.lower() for skill in criteria.get('skills', [])]
    category = criteria.get('category', '').lower()
    limit = criteria.get('limit', 10)
    
    # Filter jobs based on criteria
    matching_jobs = []
    for job in FAKE_JOBS:
        # Check if job matches keywords
        if keywords and keywords not in job['title'].lower() and keywords not in job['description'].lower():
            continue
            
        # Check if job matches skills
        if skills and not any(skill in [s.lower() for s in job['skills']] for skill in skills):
            continue
            
        # Check if job matches category
        if category and category not in job['category2'].lower() and category not in job['subcategory2'].lower():
            continue
            
        matching_jobs.append(job)
    
    # Limit results
    matching_jobs = matching_jobs[:limit]
    
    # Store jobs in vector database for future reference
    if matching_jobs:
        documents = []
        for job in matching_jobs:
            # Create document content from job data
            content = f"Title: {job['title']}\n"
            content += f"Description: {job['description']}\n"
            content += f"Skills: {', '.join(job['skills'])}\n"
            content += f"Budget: {job['budget']}\n"
            
            # Create document with metadata
            doc = Document(
                page_content=content,
                metadata={
                    "job_id": job['id'],
                    "title": job['title'],
                    "posted_on": job['posted_on'],
                    "category": job['category2'],
                    "subcategory": job['subcategory2'],
                    "source": "fake_data"
                }
            )
            documents.append(doc)
        
        # Store documents in vector store
        vector_store = VectorStore(collection_name="upwork_jobs")
        vector_store.store_documents(documents)
    
    return matching_jobs 