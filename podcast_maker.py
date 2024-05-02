import concurrent.futures
from expert import Expert


class PodcastMaker:
    def __init__(self, url):
        # Initialize the Expert class with the provided URL
        self.expert = Expert(arxiv_link=url)

    def generate_questions(self):
        # Define a prompt that asks the expert to generate interview questions
        prompt = "Based only on the abstract of the paper, generate a list of insightful interview questions. Format each question on a new line."

        # Use the generate_completion method of the Expert class to generate questions
        questions = self.expert.generate_completion(prompt)
        # Assuming response contains the formatted text
        self.questions_list = questions.response.split("\n")

    def generate_answers(self):
        # Ensure there is a list of questions available
        if not hasattr(self, 'questions_list'):
            raise ValueError(
                "Question list is not generated yet. Please run generate_questions() first.")

        # Define a function to be executed in parallel
        def get_answer(question):
            if question.strip():
                return self.expert.generate_completion(question.strip())

        # Use ThreadPoolExecutor to handle parallel execution
        with concurrent.futures.ThreadPoolExecutor() as executor:
            # Map the function over the questions_list
            results = executor.map(get_answer, self.questions_list)

        # Collect non-None results
        self.answers_list = [result.response for result in results if result]

    def generate_podcast_text(self):
        self.generate_questions()
        self.generate_answers()
        return self.questions_list, self.answers_list


        