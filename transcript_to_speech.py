from pydub import AudioSegment
from models import *

def generate_mp3(voice1, voice2, transcript): 
    host_dialogue = transcript['host']
    guest_dialogue = transcript['guest']
    
    # Instatiate with a 1second empty clip
    speech = AudioSegment.silent(duration=1000) # duration is in milliseconds
    
    # Initialize speakers
    host_speaker = GoogleTTS(voice_name = voice1)
    guest_speaker = GoogleTTS(voice_name = voice2)

    # Dialogue for show intro
    host_speaker.generate_completion(host_dialogue[0])
    speech += AudioSegment.from_mp3('output.mp3')

    for i in range(len(transcript['guest'])):
        guest_speaker.generate_completion(prompt=guest_dialogue[i])
        speech += AudioSegment.from_mp3('output.mp3')
        host_speaker.generate_completion(prompt=host_dialogue[i+1])
        speech += AudioSegment.from_mp3('output.mp3')
    
    # EXPORT_PATH = 
    speech.export('podcast.mp3', format='mp3')    