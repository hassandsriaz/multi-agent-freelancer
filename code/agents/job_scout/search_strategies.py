from core.tools.upwork_api import UpworkClient
from core.memory import VectorStore
from langchain.schema import Document

def search_jobs(criteria):
    """
    Search for jobs based on the provided criteria.
    
    Args:
        criteria (dict): A dictionary containing search criteria:
            - keywords (str): Keywords to search for
            - skills (list): List of skills
            - category (str): Job category
            - limit (int): Maximum number of results to return
            
    Returns:
        list: List of jobs matching the criteria
    """
    client = UpworkClient()
    
    # Extract search criteria
    keywords = criteria.get('keywords', '')
    skills = criteria.get('skills', [])
    category = criteria.get('category', None)
    limit = criteria.get('limit', 10)
    
    # Search for jobs
    jobs = client.search_jobs(keywords=keywords, skills=skills, category=category, limit=limit)
    
    # Store jobs in vector database for future reference
    if jobs:
        documents = []
        for job in jobs:
            # Create document content from job data
            content = f"Title: {job.get('title', '')}\n"
            content += f"Description: {job.get('description', '')}\n"
            content += f"Skills: {', '.join(job.get('skills', []))}\n"
            content += f"Budget: {job.get('budget', 'Not specified')}\n"
            
            # Create document with metadata
            doc = Document(
                page_content=content,
                metadata={
                    "job_id": job.get('id'),
                    "title": job.get('title', ''),
                    "posted_on": job.get('posted_on'),
                    "category": job.get('category2', ''),
                    "subcategory": job.get('subcategory2', ''),
                    "source": "upwork"
                }
            )
            documents.append(doc)
        
        # Store documents in vector store
        vector_store = VectorStore(collection_name="upwork_jobs")
        vector_store.store_documents(documents)
    
    return jobs