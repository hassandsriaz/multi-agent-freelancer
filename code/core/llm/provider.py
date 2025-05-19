import os
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_openai_llm(model_name="gpt-4-1106-preview", temperature=0.7):
    """
    Get an instance of OpenAI's LLM with specified parameters.
    
    Args:
        model_name (str): The name of the OpenAI model to use
        temperature (float): The temperature for generation (0.0 to 1.0)
        
    Returns:
        ChatOpenAI: An instance of OpenAI's LLM
    """
    return ChatOpenAI(
        model_name=model_name,
        temperature=temperature,
        openai_api_key=os.getenv("OPENAI_API_KEY")
    )

def create_chain(prompt_template, llm=None):
    """
    Create an LLMChain with the given prompt template and LLM.
    
    Args:
        prompt_template (str): The prompt template string
        llm: The language model to use, defaults to gpt-4-1106-preview
        
    Returns:
        LLMChain: A chain that can be executed with input variables
    """
    if llm is None:
        llm = get_openai_llm()
        
    prompt = PromptTemplate.from_template(prompt_template)
    return LLMChain(llm=llm, prompt=prompt) 