from typing import Sequence
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.schemas.schemas import Post
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.post_repository import PostRepository

router = APIRouter()


@router.get("/posts")
def listPosts(session: Session = Depends(get_db)):
    posts = PostRepository(session).getAllPosts()
    return posts
