
from abc import ABC, abstractmethod
import google.generativeai as genai
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()


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

    def generate_completion(self, prompt: str, **kwargs) -> str:
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


class OpenaiTTS(model):
    def __init__(self, model_name: str = "tts-1", voice: str = "alloy"):
        self.model_name = model_name
        self.voice = voice
        self.client = None
        self.authenticate()

    def authenticate(self):
        """
        Initialize the OpenAI client. Authentication details are assumed to be managed by the OpenAI library, 
        typically via environment variables.
        """
        self.client = OpenAI()

    def generate_completion(self, prompt: str, output_file_path: str = "output.mp3", **kwargs):
        """
        Generates speech from text and saves it as an MP3 file.

        :param prompt: The text to convert to speech.
        :param output_file_path: The file path to save the MP3 file.
        :param kwargs: Optional parameters for voice generation.
        :return: The path to the generated MP3 file.
        """
        response = self.client.audio.speech.create(
            model=self.model_name,
            voice=self.voice,
            input=prompt,
            **kwargs
        )

        response.stream_to_file(output_file_path)
        return output_file_path
