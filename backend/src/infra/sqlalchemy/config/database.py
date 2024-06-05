from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy.exc
from sqlalchemy.sql import text

# SQLALCHEMY_DATABASE_URL = ""
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_blog_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def create_db():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def check_and_create_db():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except sqlalchemy.exc.OperationalError:
        create_db()
