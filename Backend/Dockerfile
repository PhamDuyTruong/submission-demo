FROM python:3.11.1
WORKDIR /app
RUN pip install fastapi uvicorn pydantic pymongo pymongo[srv] fastapi_jwt_auth python-dotenv passlib pydantic[email] cryptography python-multipart

COPY . .
EXPOSE 8000