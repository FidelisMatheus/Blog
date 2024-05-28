from sqlalchemy import select
from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.sqlalchemy.models import models


class PostRepository:

    def __init__(self, session: Session) -> None:
        self.session = session

    def getAllPosts(self):
        posts = self.session.query(models.Post).all()
        return posts

    def getPostById(self, id: int):
        query = select(models.Post).where(models.Post.id == id)
        post = self.session.execute(query).one()
        return post

    def createPost(self, post: schemas.Post):
        db_post = models.Post(
            author=post.author,
            title=post.title,
            subject=post.subject,
            content=post.content,
            date=post.date,
        )

        self.session.add(db_post)
        self.session.commit()
        self.session.refresh(db_post)

        return db_post
