from models import *
from expert import *


class PodcastMaker:
    def __init__(self, url):
        # Initialize the Expert class with the provided URL
        self.expert = Expert(arxiv_link=url)

    def generate_questions(self):
        # Define a prompt that asks the expert to generate interview questions
        prompt = "Based on the abstract of the paper, generate a list of insightful interview questions. Format each question on a new line."

        # Use the generate_completion method of the Expert class to generate questions
        questions = self.expert.generate_completion(prompt)

        return questions
