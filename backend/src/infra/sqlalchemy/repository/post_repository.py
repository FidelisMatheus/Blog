from sqlalchemy.orm import Session
from src.schemas import schemas


class PostRepository:
    posts = []

    def __init__(self, session: Session) -> None:
        self.session = session

    def getAllPosts(self):
        return self.posts

    def createPost(self, post: schemas.Post):
        self.posts.append(post)
