from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from sqlalchemy.sql import func
from src.infra.sqlalchemy.config.database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String)
    title = Column(String)
    content = Column(Text)
    css = Column(Text)
    subject = Column(String)
    summary = Column(String)
    date = Column(DateTime)
