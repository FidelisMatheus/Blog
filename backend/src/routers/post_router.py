from typing import Sequence
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.schemas.schemas import Post
from src.infra.sqlalchemy.config.database import get_db
from src.infra.sqlalchemy.repository.post_repository import PostRepository

router = APIRouter()


@router.get("/posts", response_model=list[Post])
def getPosts(session: Session = Depends(get_db)) -> Sequence[Post]:
    posts = PostRepository(session).getAllPosts()
    return posts


@router.get("/posts/{id}", response_model=Post)
def getPostById(id: int, session: Session = Depends(get_db)):
    try:
        post = PostRepository(session).getPostById(id)
        return post
    except:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Não há um post com id = {id}",
        )


@router.post("/posts", status_code=status.HTTP_201_CREATED, response_model=Post)
def createPost(post: Post, session: Session = Depends(get_db)):
    created_post = PostRepository(session).createPost(post)
    return created_post


@router.put("/posts/{id}", response_model=Post)
def editPost(id: int, post: Post, session: Session = Depends(get_db)):
    PostRepository(session).editPost(id, post)
    post.id = id
    return post


@router.delete("/posts/{id}")
def deletePost(id: int, session: Session = Depends(get_db)):
    response = PostRepository(session).deletePost(id)
    if response == "Success":
        return "Deletado com Sucesso"
    else:
        return "O post não existe"
