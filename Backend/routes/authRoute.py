from datetime import datetime, timedelta
from bson.objectid import ObjectId
from fastapi import APIRouter, Response, status, Depends, HTTPException

from configs.database import Users
from schemas.userSchema import userEntity, userResponseEntity
from helpers.utils import hash_password, verify_password
from models.userModel import CreateUser
from models.oauth import AuthJWT
from configs.config import settings
from models.userModel import LoginUser 

authRouter = APIRouter()


@authRouter.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(payload: CreateUser):
    user = Users.find_one({'email': payload.email.lower()})
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail='Account already exist')
    
    payload.password = hash_password(payload.password)
    payload.role='user'
    payload.verified = True
    payload.email = payload.email.lower()
    payload.phone = payload.phone
    payload.created_at = datetime.utcnow()
    payload.updated_at = payload.created_at
    result = Users.insert_one(payload.dict())
    new_user = userResponseEntity(Users.find_one({'_id': result.inserted_id}))
    return {"status": "Success", "data": new_user}


@authRouter.post("/login")
async def login_user(payload: LoginUser, response: Response, Authorize: AuthJWT = Depends()):
    db_user = Users.find_one({'email': payload.email.lower()})
    if not db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Incorrect Email or Password')
    user = userEntity(db_user)
    if not verify_password(payload.password, user['password']):
         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Incorrect Email or Password')
    
    new_user = userResponseEntity(Users.find_one({'email': user['email']}))
    
    return {"status": "Login successfully", "data": new_user}

