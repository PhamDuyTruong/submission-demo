from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_PUBLIC_KEY: str
    JWT_PRIVATE_KEY: str
    JWT_ALGORITHM: str
    CLIENT_ORIGIN: str

    class Config:
        env_file = './.env'

settings = Settings()