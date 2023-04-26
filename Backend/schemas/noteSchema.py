def note_serializer(note) -> dict:
      return {
        "id": str(note["_id"]),
        "title": note["title"],
        "description": note["description"],
        "image": note["image"],
        "video": note["video"],
        "created_at": note["created_at"],
        "updated_at": note["updated_at"]
    }

def notes_serializer(notes) -> list:
    return [note_serializer(note) for note in notes]