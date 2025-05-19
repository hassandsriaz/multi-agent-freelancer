import os
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class VectorStore:
    """Handles storage and retrieval of embeddings using ChromaDB."""
    
    def __init__(self, collection_name="upwork_embeddings"):
        """
        Initialize the vector store with OpenAI embeddings.
        
        Args:
            collection_name (str): Name of the vector collection
        """
        self.embeddings = OpenAIEmbeddings()
        self.collection_name = collection_name
    
    def store_documents(self, documents):
        """
        Store documents in the vector store.
        
        Args:
            documents (list): List of Document objects
            
        Returns:
            Chroma: The vector store instance
        """
        vector_store = Chroma.from_documents(
            documents=documents,
            embedding=self.embeddings,
            collection_name=self.collection_name,
            persist_directory="./data/chroma"
        )
        return vector_store
    
    def get_store(self):
        """
        Get the vector store instance.
        
        Returns:
            Chroma: The vector store instance
        """
        vector_store = Chroma(
            embedding=self.embeddings,
            collection_name=self.collection_name,
            persist_directory="./data/chroma"
        )
        return vector_store
    
    def similarity_search(self, query, k=5):
        """
        Search for similar documents in the vector store.
        
        Args:
            query (str): The query string
            k (int): Number of results to return
            
        Returns:
            list: List of similar documents
        """
        vector_store = self.get_store()
        return vector_store.similarity_search(query, k=k) 