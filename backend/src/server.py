from fastapi import FastAPI

from src.infra.sqlalchemy.config.database import check_and_create_db
from src.routers import post_router

app = FastAPI()

check_and_create_db()

# CORS

origins = [
    "http://localhost:3000",
]

app.include_router(post_router.router)
