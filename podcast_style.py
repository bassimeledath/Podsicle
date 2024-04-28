from models import *
from podcast_maker import *

class PodcastStyler:
    def __init__(self, title, url):
        self.title = title
        self.begin_prompt = f"""You are a podcast host, the show's name is 'Podsicle'. Today's show is about {self.title}. Begin by generating a short introduction to\
            the show and our guest. Refer to the guest as 'an expert on the topic'. Return only the text, use only paragraph text format, do not use newline characters.\
            Do not put placeholders for your name."""
        self.host = GeminiText()
        self.guest = GeminiText()
        self.podcast = PodcastMaker(url)
    
    def start_pod(self):
        self.intro = self.host.generate_completion(self.begin_prompt)
        self.guest_intro = self.guest.generate_completion(f"""You are the guest to a podcast show. The previous message was {self.intro}, reply to the previous in a short\
                                                        introduction. Do not put placeholders for your name. Just thank for the opportunity and share your excitement to\
                                                        talk about the topic today.""")
        return self.guest_intro
    
    def end_pod(self, previous_message):
        self.closing_h = self.host.generate_completion(f""""You are the host of a podcast show. Give a short comment about their last answer: {previous_message}, then give a message to conclude the\
                                                    interview with your guest about today's topic: {self.title}. Thank them for being on the show. Start the message with 'That concludes our show,\
                                                    thank you so much for joining us today'. Return only your message as the host in a paragraph text format. Do not give a final goodbye to the show. Just to the guest""")
        self.transcript['host'].append(self.closing_h)
        self.closing_g = self.guest.generate_completion(f"""You are the guest of a podcast show. The previous message to the conversation was: {self.closing_h}. Give a short goodbye message to the host\
                                                        and listeners of the show. Just return your reply as the guest in paragraph text format.""")
        self.transcript['guest'].append(self.closing_g)
        self.final = self.host.generate_completion(f"""You are the host of the podcast show: 'Podsicle'. Give a short final message to your audience for listening and a goodbye until next time.\
                                                Just return your part as the host in a paragraph text format.""")
        self.transcript['host'].append(self.final)

    
    def podcast_conv(self):
        self.quest_ans = self.podcast.generate_podcast_text()
        self.quest = self.quest_ans[0]
        self.ans = self.quest_ans[1]
        self.start = self.host.generate_completion(f"""As a podcast host, you are about to start the question in the show. Give a small comment about how\
                               the conversation will start now. Then start with the following question: {self.quest[0]}.\
                                Return only the text in paragraph format.""")
        # Start dictionary to store transcript
        self.transcript = {'host': [self.start_pod()]}
        self.transcript['guest'] = [self.start]

        # Add first question interaction to transcript
        previous_mess = self.start
        previous_mess = self.guest.generate_completion(f"""You are the guest at a podcast show. The previous message was: {previous_mess}. This is the answer you must give to the host: {self.ans[0]},\
                                You must mention every part of the answer. You must preface this interaction in a conversational way. You must never start with 'absolutely' or 'certainly'.\
                                Give this answer in a clear way. Just return your part as the guest in a paragraph text format.""")
        self.transcript['guest'].append(previous_mess)

        # Start loop for interactions
        for i in range(1, len(self.ans)):
            previous_mess = self.host.generate_completion(f"""You are the host of a podcast show. The previous message was: {previous_mess}. You must start by giving a short comment on this previous message.\
                                            After this you must ask the following question: {self.quest[i]}. Introduce the question as a follow-up to the\
                                            ongoing topic. Just return your part as the host in a paragraph text format.""")
            self.transcript['host'].append(previous_mess)
            previous_mess = self.guest.generate_completion(f"""You are the guest at a podcast show. You must avoid starting with the words: 'absolutely', 'certainly'. The previous message was: {previous_mess}.\
                            This is the answer you must give to the host: {self.ans[i]}.\
                            You must mention every part of the answer. You must preface this interaction in a conversational way.\
                            Give this answer in a clear way. Just return your part as the guest in a paragraph text format.""")
            self.transcript['guest'].append(previous_mess)                

        # Add closing statements
        self.end_pod(previous_mess)

        return self.transcript


