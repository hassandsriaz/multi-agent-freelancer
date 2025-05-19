from crewai import Crew, Agent, Task
from core.llm import get_openai_llm
from agents.job_scout.main import JobScout
from agents.proposal_specialist.main import ProposalSpecialist
from agents.interview_negotiator.main import InterviewNegotiator
from agents.account_manager.main import AccountManager
import os

class UpworkCrew:
    """Handles multi-agent collaboration for Upwork tasks."""
    
    def __init__(self):
        """Initialize the crew with agents."""
        self.llm = get_openai_llm()
        
        # Initialize base agents
        self.job_scout_base = JobScout()
        self.proposal_specialist_base = ProposalSpecialist()
        self.interview_negotiator_base = InterviewNegotiator()
        self.account_manager_base = AccountManager()
        
        # Set up CrewAI agents
        self.job_scout = Agent(
            role="Job Scout",
            goal="Find the best matching jobs for the freelancer's skills",
            backstory="You are an expert at finding high-quality job opportunities that match the freelancer's profile.",
            verbose=True,
            llm=self.llm
        )
        
        self.proposal_specialist = Agent(
            role="Proposal Specialist",
            goal="Create compelling proposals that win clients",
            backstory="You are a master at crafting personalized proposals that highlight the freelancer's relevant skills.",
            verbose=True,
            llm=self.llm
        )
        
        self.interview_negotiator = Agent(
            role="Interview Negotiator",
            goal="Successfully negotiate with clients to secure contracts with good terms",
            backstory="You know how to handle client interviews and negotiations to get favorable rates and terms.",
            verbose=True,
            llm=self.llm
        )
        
        self.account_manager = Agent(
            role="Account Manager",
            goal="Maintain an optimized freelancer profile and track performance",
            backstory="You ensure the freelancer's profile is always up-to-date and optimized for job success.",
            verbose=True,
            llm=self.llm
        )
    
    def automate_job_application(self, job_search_criteria, profile_data):
        """
        Automate the entire job application process using multiple agents.
        
        Args:
            job_search_criteria (dict): Criteria for job search
            profile_data (dict): The freelancer's profile data
            
        Returns:
            dict: The results of the job application process
        """
        # Define tasks
        find_jobs_task = Task(
            description="Find the best matching jobs based on the freelancer's profile and search criteria",
            expected_output="A list of the top 3 most suitable jobs with their details",
            agent=self.job_scout
        )
        
        create_proposals_task = Task(
            description="Create personalized proposals for each selected job",
            expected_output="Compelling proposals for each job that highlight relevant experience",
            agent=self.proposal_specialist,
            depends_on=[find_jobs_task]
        )
        
        prepare_interview_responses_task = Task(
            description="Prepare potential interview responses for common questions",
            expected_output="A set of response templates for common interview questions",
            agent=self.interview_negotiator
        )
        
        optimize_profile_task = Task(
            description="Analyze and suggest optimizations to the freelancer's profile",
            expected_output="Specific suggestions to improve the profile for better job matching",
            agent=self.account_manager
        )
        
        # Create the crew
        crew = Crew(
            agents=[
                self.job_scout, 
                self.proposal_specialist, 
                self.interview_negotiator, 
                self.account_manager
            ],
            tasks=[
                find_jobs_task, 
                create_proposals_task, 
                prepare_interview_responses_task, 
                optimize_profile_task
            ],
            verbose=True
        )
        
        # Execute the crew
        result = crew.kickoff()
        
        # Process and structure the results
        jobs = self.job_scout_base.execute(job_search_criteria)
        proposals = {}
        
        if jobs and len(jobs) > 0:
            for job in jobs[:3]:  # Process top 3 jobs
                job_id = job.get('id')
                proposal = self.proposal_specialist_base.execute(job, profile_data)
                proposals[job_id] = proposal
        
        profile_optimization = self.account_manager_base.execute("optimize_profile")
        
        return {
            "crew_result": result,
            "jobs_found": jobs,
            "proposals": proposals,
            "profile_optimization": profile_optimization
        } 