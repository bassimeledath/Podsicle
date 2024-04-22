import os
import subprocess
from models import GeminiText, GeminiChat, OpenaiTTS


def play_mp3(file_path):
    if os.name == 'posix':  # Linux or macOS
        player_command = 'afplay' if os.uname().sysname == 'Darwin' else 'mpg321'
    else:  # Assuming Windows
        player_command = 'start'
    subprocess.run([player_command, file_path], check=True)


def have_conversation_and_play(exchanges=5):
    # Creating instances for Bonnie and Clyde with specific voices
    bonnie_voice = OpenaiTTS(voice="alloy")
    clyde_voice = OpenaiTTS(voice="onyx")

    # Text models for Bonnie and Clyde
    bonnie_model = GeminiText()
    clyde_model = GeminiText()

    current_speaker_model = bonnie_model
    current_speaker_voice = bonnie_voice
    current_speaker_name = "Bonnie"
    current_text = "Hello, how are you?"

    for i in range(exchanges):
        # Convert the current part of the conversation to speech and save it
        mp3_path = current_speaker_voice.generate_completion(
            current_text, output_file_path=f"mp3s/exchange_{i}.mp3")

        # Print who is speaking and the text
        print(f"{current_speaker_name}: {current_text}")

        # Play the MP3 file
        play_mp3(mp3_path)

        # Generate the next part of the conversation
        current_text = current_speaker_model.generate_completion(current_text)

        # Swap the speaker for the next exchange
        if current_speaker_name == "Bonnie":
            current_speaker_model = clyde_model
            current_speaker_voice = clyde_voice
            current_speaker_name = "Clyde"
        else:
            current_speaker_model = bonnie_model
            current_speaker_voice = bonnie_voice
            current_speaker_name = "Bonnie"



def transcript_podcast(exchanges=10, topic='dog breeds'):
    questions = int(exchanges - 3)
    bonnie_model = GeminiText()

    current_speaker_model = bonnie_model
    current_speaker_name = "Host"
    current_text = f"""*System Pompt: You are a podcast host. Your task is to ask questions to your guest. \
        Today's topic is '{topic}'. keep the questions short and keep the conversation going.*\
        The next message should be a short welcome to the show, followed by a very brief introduction to the topic, and\
        an intro to the guest, a professional in the topic."""
    history_chat_interviewer = [
        {
            "role": "user",
            "parts": [f"""*System prompt: You are a friendly, funny, and intelligent podcast host. Your task is to ask questions to your user and\
                keep the conversation going. Today's topic is '{topic}'. keep the questions short. You must create a reply that engages in discussion of the\
                topic through comments and questions. \
                After {str(questions)} interactions, give a closing statement and thank the user.\
                After the user replies to this closing statement give your final closing to the show.\
                All replies should be in paragraph format, don't use bullet points.* Reply\
                'Understood' if you got it"""]
        },
        {
            "role": "model",
            "parts": ["Understood"]
        }
        ]
    history_chat_guest = [
        {
            "role": "user",
            "parts": [f"""*System prompt: You are an expert in the topic of '{topic}', you are being interviewed for a podcast.\
                    Answer the user questions in a short and friendly manner. Return answers in paragraph format.\
                    Do not use bullet points. Keep answers high level and stay on topic. Your job is to only answer the questions in\
                    a conscise manner.\
                    When the user starts closing the podcast give your closing statement and goodbye to the show,\
                    reply 'Understood' if you got it"""]
        },
        {
            "role": "model",
            "parts": ["Understood"]
        }
        ]
    host_chat = GeminiChat(history_chat_interviewer)
    guest_chat = GeminiChat(history_chat_guest)
    host_chat.start_c()
    guest_chat.start_c()
    current_text = current_speaker_model.generate_completion(current_text)
    current_chat = guest_chat

    # Create list for keeping track of podcast
    podcast = []
  
    for i in range(exchanges):

        if exchanges-(i) == 3:
            print(podcast)
            current_text = current_speaker_model.generate_completion(f"""As the podcast host, create a short summary of the following podcast show: {podcast}.\
                                                                    Assume the role of host to tell the summary of what was talked on the show and follow-up with\
                                                                    a thank you to the user for participating in the show.\
                                                                    Keep it short and just return your\
                                                                    part as the podcast host. Do not include your role in the response.""")
        elif exchanges-(i) == 1:
            current_text = current_speaker_model.generate_completion(f"""As the podcast host, give your final closing statement and goodbye to your listeners until next time""")


        # Print who is speaking and the text
        dialogue = f"{current_speaker_name}: {current_text}"
        podcast.append({'role': current_speaker_name, 'parts':[current_text]})
        print('Exchanges left: ', exchanges-i)
        print(dialogue)

        # Generate the next part of the conversation
        current_text = current_chat.generate_completion(current_text)

        # Swap the speaker for the next exchange
        if current_speaker_name == "Host":
            current_chat = host_chat
            current_speaker_name = "Guest"
        else:
            current_chat = guest_chat
            current_speaker_name = "Host"




if __name__ == "__main__":
    conversation_length = 15
    transcript_podcast(exchanges=conversation_length)
    # have_conversation_and_play(exchanges=5)
    