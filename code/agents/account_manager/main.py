from agents.base_agent import BaseAgent
from core.llm import get_openai_llm, create_chain
import json
import os

class AccountManager(BaseAgent):
    def __init__(self):
        super().__init__("AccountManager")
        self.profile_path = "data/profile.json"
    
    def execute(self, action, data=None):
        """
        Execute account management actions.
        
        Args:
            action (str): The action to perform (get_profile, update_profile, optimize_profile)
            data (dict, optional): Data for the action
            
        Returns:
            dict: Result of the action
        """
        self.log_action(f"Executing {action}")
        
        if action == "get_profile":
            return self.get_profile()
        elif action == "update_profile":
            return self.update_profile(data)
        elif action == "optimize_profile":
            return self.optimize_profile()
        else:
            return {"error": f"Unknown action: {action}"}
    
    def get_profile(self):
        """
        Get the freelancer's profile data.
        
        Returns:
            dict: The profile data
        """
        if not os.path.exists(self.profile_path):
            # Create a default profile if none exists
            default_profile = {
                "name": "Your Name",
                "title": "Freelance Developer",
                "summary": "Experienced developer specializing in web and mobile applications.",
                "skills": ["Python", "JavaScript", "React", "Node.js"],
                "experience": [
                    {
                        "title": "Senior Developer",
                        "company": "Previous Company",
                        "duration": "2018-2022",
                        "description": "Led development of multiple web applications."
                    }
                ],
                "hourly_rate": 50,
                "availability": "Full-time",
                "languages": ["English"]
            }
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(self.profile_path), exist_ok=True)
            
            # Save default profile
            with open(self.profile_path, 'w', encoding='utf-8') as f:
                json.dump(default_profile, f, indent=2)
            
            return default_profile
        
        # Load existing profile
        with open(self.profile_path, 'r', encoding='utf-8') as f:
            profile = json.load(f)
        
        return profile
    
    def update_profile(self, data):
        """
        Update the freelancer's profile with new data.
        
        Args:
            data (dict): The profile data to update
            
        Returns:
            dict: The updated profile
        """
        current_profile = self.get_profile()
        
        # Update profile fields
        for key, value in data.items():
            current_profile[key] = value
        
        # Save updated profile
        with open(self.profile_path, 'w', encoding='utf-8') as f:
            json.dump(current_profile, f, indent=2)
        
        return current_profile
    
    def optimize_profile(self):
        """
        Use LLM to optimize the freelancer's profile for better job matching.
        
        Returns:
            dict: Suggestions for profile optimization
        """
        current_profile = self.get_profile()
        
        # Create prompt template for profile optimization
        prompt_template = """
        You are an expert Upwork profile optimizer. You're reviewing a freelancer's profile to suggest improvements
        that will help them attract more clients and higher quality jobs.
        
        ## Current Profile
        Name: {name}
        Title: {title}
        Summary: {summary}
        Skills: {skills}
        Experience: {experience}
        Hourly Rate: ${hourly_rate}
        
        ## Your Task
        Provide specific suggestions to improve the profile in the following areas:
        1. Professional title (make it more attention-grabbing)
        2. Summary (make it more compelling and outcomes-focused)
        3. Skills (suggest any missing relevant skills)
        4. Experience descriptions (make them more achievement-oriented)
        5. Hourly rate (is it appropriate given the skills and experience?)
        
        ## Output Format
        Provide your suggestions in a structured way, with specific examples of improved text.
        """
        
        # Create LLM chain
        llm = get_openai_llm(temperature=0.7)
        chain = create_chain(prompt_template, llm)
        
        # Generate optimization suggestions
        experience_str = json.dumps(current_profile.get('experience', []), indent=2)
        
        result = chain.run(
            name=current_profile.get('name', ''),
            title=current_profile.get('title', ''),
            summary=current_profile.get('summary', ''),
            skills=current_profile.get('skills', []),
            experience=experience_str,
            hourly_rate=current_profile.get('hourly_rate', 0)
        )
        
        return {
            "current_profile": current_profile,
            "optimization_suggestions": result.strip()
        }