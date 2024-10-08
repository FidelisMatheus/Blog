from sqlalchemy import delete, select, update
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
        post = self.session.execute(query).scalars().one()
        return post

    def createPost(self, post: schemas.Post):
        db_post = models.Post(
            author=post.author,
            title=post.title,
            subject=post.subject,
            content=post.content,
            css=post.css,
            summary=post.summary,
            date=post.date,
        )

        self.session.add(db_post)
        self.session.commit()
        self.session.refresh(db_post)

        return db_post

    def editPost(self, id: int, post: schemas.Post):
        update_stmt = (
            update(models.Post)
            .where(models.Post.id == id)
            .values(
                author=post.author,
                title=post.title,
                content=post.content,
                css=post.css,
                subject=post.subject,
                summary=post.summary,
                date=post.date,
            )
        )

        self.session.execute(update_stmt)
        self.session.commit()

    def deletePost(self, id: int):
        try:
            query = select(models.Post).where(models.Post.id == id)
            post = self.session.execute(query).scalars().one()
            print(post)
        except:
            return "Error"

        delete_stmt = delete(models.Post).where(models.Post.id == id)
        self.session.execute(delete_stmt)
        self.session.commit()

        return "Success"
