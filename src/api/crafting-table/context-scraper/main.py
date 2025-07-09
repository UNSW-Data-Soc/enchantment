from fastapi import FastAPI
from scraper import (
    fetch_techcrunch_articles,
    fetch_producthunt_articles,
    fetch_theverge_articles,
    fetch_avclub_articles
)

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Scraper is ready"}

@app.get("/scrape")
def scrape():
    articles = (
        fetch_techcrunch_articles() + 
        fetch_producthunt_articles() + 
        fetch_theverge_articles() + 
        fetch_avclub_articles()
    )
    return { "articles": articles }