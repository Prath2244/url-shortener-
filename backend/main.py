from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import random
import string

# -----------------------
# DATABASE SETUP
# -----------------------
DATABASE_URL = "sqlite:///./urls.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


# -----------------------
# MODEL
# -----------------------
class URL(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(String, nullable=False)
    short_code = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    click_count = Column(Integer, default=0)


Base.metadata.create_all(bind=engine)


# -----------------------
# APP INIT
# -----------------------
app = FastAPI()

# ✅ CORS FIX (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------
# HELPER FUNCTION
# -----------------------
def generate_short_code(length=6):
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))


# -----------------------
# CREATE SHORT URL
# -----------------------
@app.post("/api/urls")
def create_url(data: dict):
    db = SessionLocal()

    original_url = data.get("original_url")
    if not original_url:
        raise HTTPException(status_code=400, detail="URL is required")

    short_code = generate_short_code()

    new_url = URL(
        original_url=original_url,
        short_code=short_code
    )

    db.add(new_url)
    db.commit()
    db.refresh(new_url)

    return new_url


# -----------------------
# GET ALL URLS
# -----------------------
@app.get("/api/urls")
def get_urls():
    db = SessionLocal()
    urls = db.query(URL).order_by(URL.created_at.desc()).all()
    return urls


# -----------------------
# ANALYTICS
# -----------------------
@app.get("/api/urls/{id}/analytics")
def get_analytics(id: int):
    db = SessionLocal()
    url = db.query(URL).filter(URL.id == id).first()

    if not url:
        raise HTTPException(status_code=404, detail="URL not found")

    return {
        "original_url": url.original_url,
        "short_code": url.short_code,
        "created_at": url.created_at,
        "click_count": url.click_count,
    }


# -----------------------
# REDIRECT
# -----------------------
@app.get("/{short_code}")
def redirect_url(short_code: str):
    db = SessionLocal()
    url = db.query(URL).filter(URL.short_code == short_code).first()

    if not url:
        raise HTTPException(status_code=404, detail="Not found")

    url.click_count += 1
    db.commit()

    return RedirectResponse(url.original_url)