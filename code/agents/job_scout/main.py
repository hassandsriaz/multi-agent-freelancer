from .fake_search_strategies import search_jobs
from agents.base_agent import BaseAgent

class JobScout(BaseAgent):
    def __init__(self):
        super().__init__("JobScout")

    def execute(self, criteria):
        self.log_action("Executing job scouting with fake data")
        return self.scout_jobs(criteria)

    def scout_jobs(self, criteria):
        return search_jobs(criteria)