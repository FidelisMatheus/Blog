from __future__ import annotations

from pydantic import BaseModel
from typing import Optional


class Post(BaseModel):
    id: Optional[int] = None
    author: str
    title: str
    subject: str
    content: str
    date: Optional[str] = None

    class Config:
        from_attributes = True
