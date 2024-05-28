from typing import Sequence
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from src.schemas.schemas import Post
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.post_repository import PostRepository

router = APIRouter()


@router.get("/posts")
def listPosts(session: Session = Depends(get_db)):
    posts = PostRepository(session).getAllPosts()
    return posts


@router.post("/posts", status_code=status.HTTP_201_CREATED)
def createPost(post: Post, session: Session = Depends(get_db)):
    created_post = PostRepository(session).createPost(post)
    return created_post
