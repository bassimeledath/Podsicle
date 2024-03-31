
from abc import ABC, abstractmethod
import google.generativeai as genai
import os


class model(ABC):
    @abstractmethod
    def authenticate(self):
        """
        Handles authentication for the LLM API.
        """
        pass

    @abstractmethod
    def generate_completion(self, prompt: str, **kwargs):
        """
        Generates a completion for a given prompt.

        :param prompt: The input text for the LLM.
        :return: The generated text by the model.
        """
        pass


class GeminiText(model):
    def __init__(self, model_name: str = 'gemini-pro'):
        self.model_name = model_name
        self.model = None
        self.authenticate()

    def authenticate(self):
        """
        Authenticate using Google's API key from the environment variables.
        """
        google_api_key = os.getenv('GOOGLE_API_KEY')
        genai.configure(api_key=google_api_key)
        self.model = genai.GenerativeModel(self.model_name)

    def generate_completion(self, prompt: str, **kwargs):
        """
        Generate a completion using Google's generative model with configurable options.

        :param prompt: The input text for the LLM.
        :param kwargs: Optional parameters for generation configuration.
        :return: The generated text by the model.
        """
        # Setting default values for generation parameters
        generation_config = kwargs.get('generation_config', genai.types.GenerationConfig(
            candidate_count=1,
            stop_sequences=['x'],
            max_output_tokens=1000,
            temperature=0))

        response = self.model.generate_content(
            prompt, generation_config=generation_config)
        return response.text
