from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.infra.sqlalchemy.config.database import check_and_create_db
from src.routers import post_router

app = FastAPI()

check_and_create_db()

# CORS

origins = [
    "http://localhost:3000",
    "http://localhost:4200",
    "http://localhost:3307",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(post_router.router)
