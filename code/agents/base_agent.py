from abc import ABC, abstractmethod

class BaseAgent(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def execute(self, *args, **kwargs):
        pass

    def log_action(self, action):
        print(f"[{self.name}] {action}")