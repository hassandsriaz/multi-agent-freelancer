from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
from pydantic import BaseModel
from agents.crew import UpworkCrew
from agents.account_manager import AccountManager

router = APIRouter()
upwork_crew = UpworkCrew()
account_manager = AccountManager()

class JobApplicationRequest(BaseModel):
    job_search_criteria: Dict[str, Any]
    custom_profile_data: Dict[str, Any] = None


@router.post("/automate-job-application")
def automate_job_application(request: JobApplicationRequest = Body(...)):
    """
    Automate the entire job application process from finding jobs to 
    creating proposals using multi-agent collaboration.
    """
    try:
        # Get profile data
        profile_data = account_manager.execute("get_profile")
        
        # If custom profile data is provided, merge it with the existing profile
        if request.custom_profile_data:
            for key, value in request.custom_profile_data.items():
                profile_data[key] = value
        
        # Execute the crew
        result = upwork_crew.automate_job_application(
            request.job_search_criteria,
            profile_data
        )
        
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/optimize-profile")
def get_profile_optimization():
    """
    Get suggestions to optimize the freelancer's profile using multi-agent analysis.
    """
    try:
        profile_data = account_manager.execute("get_profile")
        optimization = account_manager.execute("optimize_profile")
        return {"success": True, "optimization": optimization}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 