from __future__ import annotations

from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime


class Post(BaseModel):
    id: Optional[int] = None
    author: str
    title: str
    content: str
    subject: str
    summary: Optional[str] = None
    date: Optional[datetime] = None

    @validator("date", pre=True)
    def parse_datetime(cls, value):
        if value is None:
            return value
        if isinstance(value, datetime):
            return value
        if isinstance(value, str):
            return datetime.strptime(value, "%d-%m-%Y %H:%M:%S")
        raise ValueError("Invalid date format")

    class Config:
        from_attributes = True
