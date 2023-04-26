from datetime import datetime
from pydantic import BaseModel, constr, EmailStr

class UserModel(BaseModel):
    username: str
    email: str
    phone: str
    role: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        orm_mode = True

class CreateUser(UserModel):
      password: constr(min_length=6)
      verified: bool = False

class LoginUser(BaseModel):
    email: EmailStr
    password: constr(min_length=6)


class UserResponseSchema(UserModel):
    id: str
    pass


class UserResponse(BaseModel):
    status: str
    user: UserResponseSchema