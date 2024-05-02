# Import necessary modules
from podcast_style import PodcastStyler
from transcript_to_speech import generate_mp3

def process_podcast_to_speech(title, url, voice1='en-GB-Standard-F', voice2='en-IN-Standard-B'):
    # Initialize the PodcastStyler with the title and URL of the paper
    podcast = PodcastStyler(title, url)
    
    # Generate a transcript from the podcast conversation
    transcript = podcast.podcast_conv()
    
    # Generate an MP3 file using the specified voices
    generate_mp3(voice1=voice1, voice2=voice2, transcript=transcript)