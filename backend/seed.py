from datetime import datetime, timedelta
from database import SessionLocal
from main import URL

db = SessionLocal()

# Clear existing URLs
db.query(URL).delete()
db.commit()

urls = [
    "https://google.com",
    "https://github.com",
    "https://stackoverflow.com",
    "https://linkedin.com",
    "https://twitter.com",
    "https://youtube.com",
    "https://openai.com",
    "https://medium.com",
    "https://amazon.com",
    "https://netflix.com"
]

base_time = datetime.utcnow()

for i, u in enumerate(urls):
    created_time = base_time - timedelta(days=i)

    url = URL(
        original_url=u,
        short_code=f"test{i}",
        created_at=created_time,
        click_count=i * 5
    )

    db.add(url)

db.commit()

print("✅ Database seeded successfully!")