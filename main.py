from fastapi import FastAPI, HTTPException
from podcast_maker import PodcastMaker
from pydantic import BaseModel

app = FastAPI()


class PodcastRequest(BaseModel):
    url: str


@app.post("/generate-podcast/")
async def generate_podcast(request: PodcastRequest):
    url = request.url
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")

    podcast_maker = PodcastMaker(url)
    try:
        questions, answers = podcast_maker.generate_podcast_text()
        return {"questions": questions, "answers": answers}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
