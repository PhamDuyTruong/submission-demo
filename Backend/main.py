from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes.authRoute import authRouter
from routes.noteRoute import noteRouter
import uuid


app = FastAPI()

IMAGEDIR = "static/images/"
IMAGEDIR1 = "static/videos/"

app.mount("/static", StaticFiles(directory="static"), name='static')


app.add_middleware(
     CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 

@app.get("/")
def root():
    return {"message": "Welcome to NoteAPI with FastAPI"}

app.include_router(authRouter, tags=['Auth'], prefix="/api/auth")
app.include_router(noteRouter, tags=["Note"], prefix="/api/note")

#Upload images
@app.post("/api/upload-images")
async def create_upload_image(file: UploadFile = File(default="")):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
 
    #save the file
    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)
 
    return {"filename": file.filename}


@app.post("/api/upload-videos")
async def create_upload_video(file: UploadFile):
    file.filename = f"{uuid.uuid4()}.mp4"
    contents = await file.read()
 
    #save the file
    with open(f"{IMAGEDIR1}{file.filename}", "wb") as f:
        f.write(contents)
    
    return {"filename": file.filename}