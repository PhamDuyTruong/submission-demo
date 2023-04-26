from fastapi import APIRouter, HTTPException, status
from configs.database import Notes
from models.noteModel import NoteModel
from datetime import datetime
from schemas.noteSchema import notes_serializer, note_serializer
from bson import ObjectId
from helpers.utils import decrypt_list, encrypt_list

noteRouter = APIRouter()

@noteRouter.get("/")
async def get_notes():
    response = notes_serializer(Notes.find())
    new_note = decrypt_list(response)
    return {"status": "OK", "data": new_note}

@noteRouter.get("/{id}")
async def get_note_by_id(id: str):

    note =  note_serializer(Notes.find_one({"_id": ObjectId(id)}))
    return {"status": "OK", "data": note}


@noteRouter.post("/")
async def create_note(note: NoteModel):
    note.created_at = datetime.utcnow()
    note.updated_at = note.created_at
    result = Notes.insert_one(note.dict())
    note = note_serializer(Notes.find_one({'_id': result.inserted_id}))
    new_note = encrypt_list(note)
    return {"status": "Ok", "data": new_note}

@noteRouter.put("/update/{id}")
async def update_note(id: str, todo: NoteModel):
    note = Notes.find_one({"_id": ObjectId(id)})
    if not note:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Update Note failed !!!')
    Notes.find_one_and_update({"_id": ObjectId(id)}, {
        "$set": dict(todo)
    })
    note =  notes_serializer(Notes.find({"_id": ObjectId(id)}))
    return {"status": "OK", "data": note}

# delete
@noteRouter.delete("/delete/{id}")
async def delete_note(id: str):
    note = Notes.find_one({"_id": ObjectId(id)})
    if not note:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Deleted Note failed !!!')
    Notes.find_one_and_delete({"_id": ObjectId(id)})
    return {"status": "Deleted Note successfully"}