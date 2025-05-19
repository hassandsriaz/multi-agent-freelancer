from agents.base_agent import BaseAgent
from core.llm import get_openai_llm, create_chain
from core.tools.upwork_api import UpworkClient

class ProposalSpecialist(BaseAgent):
    def __init__(self):
        super().__init__("ProposalSpecialist")
        
    def execute(self, job_data, profile_data):
        """
        Generate a proposal for a job based on the job details and profile data.
        
        Args:
            job_data (dict): The job details
            profile_data (dict): The freelancer's profile data
            
        Returns:
            dict: Generated proposal with cover letter and rate
        """
        self.log_action(f"Generating proposal for job: {job_data.get('title', 'Unknown job')}")
        
        # Get job details if only ID was provided
        if isinstance(job_data, str) or (isinstance(job_data, dict) and len(job_data.keys()) == 1 and 'id' in job_data):
            job_id = job_data if isinstance(job_data, str) else job_data['id']
            client = UpworkClient()
            job_data = client.get_job_details(job_id)
        
        proposal = self.generate_proposal(job_data, profile_data)
        return proposal
    
    def generate_proposal(self, job_data, profile_data):
        """
        Use LLM to generate a proposal for the job.
        
        Args:
            job_data (dict): The job details
            profile_data (dict): The freelancer's profile data
            
        Returns:
            dict: Generated proposal data
        """
        # Extract job details
        job_title = job_data.get('title', '')
        job_description = job_data.get('description', '')
        required_skills = job_data.get('skills', [])
        
        # Extract profile details
        name = profile_data.get('name', '')
        skills = profile_data.get('skills', [])
        experience = profile_data.get('experience', [])
        hourly_rate = profile_data.get('hourly_rate', 0)
        
        # Create prompt template for proposal generation
        prompt_template = """
        You are an expert proposal writer for Upwork. Your task is to craft a compelling proposal for a job.
        
        ## Job Details
        Title: {job_title}
        Description: {job_description}
        Required Skills: {required_skills}
        
        ## Your Profile
        Name: {name}
        Skills: {skills}
        Experience: {experience}
        
        ## Guidelines
        - Be personable but professional
        - Show understanding of the job requirements
        - Highlight relevant skills and experience
        - Demonstrate value you can provide
        - Keep it concise (max 250 words)
        - End with a call to action
        
        ## Output Format
        Please generate a cover letter and suggest an appropriate hourly rate based on the job requirements and your profile.
        
        Cover Letter:
        """
        
        # Create LLM chain
        llm = get_openai_llm(temperature=0.7)
        chain = create_chain(prompt_template, llm)
        
        # Generate proposal
        result = chain.run(
            job_title=job_title,
            job_description=job_description,
            required_skills=required_skills,
            name=name,
            skills=skills,
            experience=experience
        )
        
        # Calculate appropriate rate (could be more sophisticated)
        suggested_rate = min(hourly_rate * 1.2, hourly_rate + 10)  # Increase rate slightly
        
        return {
            "cover_letter": result.strip(),
            "rate": suggested_rate,
            "job_id": job_data.get('id')
        }