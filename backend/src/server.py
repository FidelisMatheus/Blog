from fastapi import FastAPI

from src.routers import post_router

app = FastAPI()

# CORS

origins = [
    "http://localhost:3000",
]

app.include_router(post_router.router)
