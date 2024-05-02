from pydub import AudioSegment
from models import *

def generate_mp3(voice1, voice2, transcript): 
    
    # Instatiate with a 1second empty clip
    speech = AudioSegment.silent(duration=1000) # duration is in milliseconds
    
    # Initialize speakers
    host_speaker = GoogleTTS(voice_name = voice1)
    guest_speaker = GoogleTTS(voice_name = voice2)

    # First intro
    host_speaker.generate_completion('Welcome to Podsicle')
    speech += AudioSegment.from_mp3('output.mp3')
    speech += AudioSegment.from_mp3('Intro_Pod.mp3')


    for elem in transcript:
        if elem['left'] :
            host_speaker.generate_completion(prompt=elem['text'])
            speech += AudioSegment.from_mp3('output.mp3')
        else:
            guest_speaker.generate_completion(prompt=elem['text'])
            speech += AudioSegment.from_mp3('output.mp3')

    
    # EXPORT_PATH = 
    speech.export('podcast.mp3', format='mp3')    