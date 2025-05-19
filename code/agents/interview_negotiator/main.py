from agents.base_agent import BaseAgent
from core.llm import get_openai_llm, create_chain

class InterviewNegotiator(BaseAgent):
    def __init__(self):
        super().__init__("InterviewNegotiator")
    
    def execute(self, messages, profile_data, job_data=None):
        """
        Generate a response for a client message in an interview or negotiation.
        
        Args:
            messages (list): List of previous messages in the conversation
            profile_data (dict): The freelancer's profile data
            job_data (dict, optional): The job details if available
            
        Returns:
            str: Generated response
        """
        self.log_action("Generating interview/negotiation response")
        return self.generate_response(messages, profile_data, job_data)
    
    def generate_response(self, messages, profile_data, job_data=None):
        """
        Use LLM to generate a response based on conversation context.
        
        Args:
            messages (list): List of previous messages in the conversation
            profile_data (dict): The freelancer's profile data
            job_data (dict, optional): The job details if available
            
        Returns:
            str: Generated response
        """
        # Extract profile details
        name = profile_data.get('name', '')
        skills = profile_data.get('skills', [])
        experience = profile_data.get('experience', [])
        hourly_rate = profile_data.get('hourly_rate', 0)
        
        # Format the messages for the prompt
        conversation_history = ""
        for msg in messages:
            sender = "Client" if msg.get('is_client', False) else "You"
            conversation_history += f"{sender}: {msg.get('content', '')}\n"
        
        # Create context about the job if available
        job_context = ""
        if job_data:
            job_title = job_data.get('title', '')
            job_description = job_data.get('description', '')
            job_context = f"""
            ## Job Details
            Title: {job_title}
            Description: {job_description}
            """
        
        # Create prompt template for response generation
        prompt_template = """
        You are a professional freelancer named {name} in a conversation with a potential client.
        
        ## Your Profile
        Name: {name}
        Skills: {skills}
        Experience: {experience}
        Target Hourly Rate: ${hourly_rate}
        
        {job_context}
        
        ## Conversation History
        {conversation_history}
        
        ## Guidelines
        - Be professional and courteous
        - Highlight your relevant experience when appropriate
        - For technical questions, demonstrate your expertise
        - For budget/rate discussions, be firm but flexible
        - For timeline questions, be realistic but accommodating
        - End with a question when appropriate to keep the conversation going
        
        ## Your Response
        Based on the conversation history, generate your next response:
        """
        
        # Create LLM chain
        llm = get_openai_llm(temperature=0.7)
        chain = create_chain(prompt_template, llm)
        
        # Generate response
        result = chain.run(
            name=name,
            skills=skills,
            experience=experience,
            hourly_rate=hourly_rate,
            job_context=job_context,
            conversation_history=conversation_history
        )
        
        return result.strip()
        
    def negotiate_rate(self, client_offer, profile_data):
        """
        Negotiate a rate based on the client's offer.
        
        Args:
            client_offer (float): The client's offered rate
            profile_data (dict): The freelancer's profile data
            
        Returns:
            dict: Negotiation response with suggested rate
        """
        target_rate = profile_data.get('hourly_rate', 0)
        min_acceptable = target_rate * 0.85  # 15% below target is minimum acceptable
        
        if client_offer >= target_rate:
            # Accept the offer if it meets or exceeds target
            return {
                "accept": True,
                "counter_offer": None,
                "message": f"I'm pleased to accept your offer of ${client_offer}/hour."
            }
        elif client_offer >= min_acceptable:
            # Counter if within acceptable range
            counter_offer = (client_offer + target_rate) / 2  # Meet in the middle
            return {
                "accept": False,
                "counter_offer": counter_offer,
                "message": f"Thank you for your offer. Given my experience and the requirements of this project, I can offer a rate of ${counter_offer}/hour."
            }
        else:
            # Reject if below minimum
            return {
                "accept": False,
                "counter_offer": target_rate,
                "message": f"I appreciate your interest, but I typically work at a rate of ${target_rate}/hour for projects like this, considering the skills and experience required."
            }