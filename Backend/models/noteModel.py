from pydantic import BaseModel
from datetime import datetime

class NoteModel(BaseModel):
    title: str
    description: str
    image: str
    video: str | None = ""
    created_at: datetime | None = None
    updated_at: datetime | None = None

    