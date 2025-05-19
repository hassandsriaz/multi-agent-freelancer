from fastapi import APIRouter, HTTPException, Depends, Body
from typing import List, Optional
from pydantic import BaseModel
from core.tools.upwork_api import UpworkClient
from agents.job_scout import JobScout
from agents.proposal_specialist import ProposalSpecialist
from agents.account_manager import AccountManager
import os

router = APIRouter()
upwork_client = UpworkClient()
job_scout = JobScout()
proposal_specialist = ProposalSpecialist()
account_manager = AccountManager()


# ===== Models =====
class JobSearchCriteria(BaseModel):
    keywords: Optional[str] = None
    skills: Optional[List[str]] = None
    category: Optional[str] = None
    limit: Optional[int] = 10


class ProposalRequest(BaseModel):
    job_id: str
    custom_notes: Optional[str] = None


class SubmitProposalRequest(BaseModel):
    job_id: str
    cover_letter: str
    rate: float
    hours_per_week: Optional[int] = None


# ===== Routes =====
@router.post("/jobs/search")
def search_jobs(criteria: JobSearchCriteria):
    """Search for jobs based on criteria"""
    try:
        jobs = job_scout.execute(criteria.dict())
        return {"success": True, "jobs": jobs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/jobs/{job_id}")
def get_job_details(job_id: str):
    """Get details for a specific job"""
    try:
        job_details = upwork_client.get_job_details(job_id)
        return {"success": True, "job": job_details}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/jobs/{job_id}/generate-proposal")
def generate_proposal(job_id: str, request: ProposalRequest = Body(...)):
    """Generate a proposal for a job"""
    try:
        # Get job details
        job_data = upwork_client.get_job_details(job_id)
        
        # Get freelancer profile
        profile_data = account_manager.execute("get_profile")
        
        # Generate proposal
        proposal = proposal_specialist.execute(job_data, profile_data)
        
        return {"success": True, "proposal": proposal}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/jobs/{job_id}/submit-proposal")
def submit_proposal(job_id: str, request: SubmitProposalRequest):
    """Submit a proposal for a job"""
    try:
        response = upwork_client.submit_proposal(
            job_id=job_id,
            cover_letter=request.cover_letter,
            rate=request.rate,
            hours_per_week=request.hours_per_week
        )
        
        # Save job to history
        job_data = upwork_client.get_job_details(job_id)
        upwork_client.save_job_data(job_data)
        
        return {"success": True, "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/profile")
def get_profile():
    """Get the freelancer's profile"""
    try:
        profile = account_manager.execute("get_profile")
        return {"success": True, "profile": profile}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/profile/update")
def update_profile(profile_data: dict = Body(...)):
    """Update the freelancer's profile"""
    try:
        updated_profile = account_manager.execute("update_profile", profile_data)
        return {"success": True, "profile": updated_profile}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/profile/optimize")
def optimize_profile():
    """Get suggestions to optimize the freelancer's profile"""
    try:
        optimization = account_manager.execute("optimize_profile")
        return {"success": True, "optimization": optimization}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))