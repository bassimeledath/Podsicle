import os
import subprocess
from models import GeminiText, OpenaiTTS


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


if __name__ == "__main__":
    conversation_length = 5
    have_conversation_and_play(exchanges=conversation_length)
