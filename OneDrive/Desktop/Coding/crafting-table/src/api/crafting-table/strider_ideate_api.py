# strider_ideate_api.py
# FastAPI service for Strider ideation with shareable helper functions.

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import os
import logging
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables (expects .env in project root)
load_dotenv()

# Configure logging
logger = logging.getLogger("crafting_table.strider")
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)

# Ensure API key is set
API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    logger.error("Missing OPENAI_API_KEY in environment.")
    raise RuntimeError("OpenAI API key not configured.")

# Initialize OpenAI client
openai_client = OpenAI(api_key=API_KEY)

# FastAPI app
app = FastAPI(
    title="Strider Ideation API",
    version="1.0.0",
    description="Endpoint for Strider (content strategist) ideation."
)

# System prompt for Strider
STRIDER_SYSTEM_PROMPT = (
    "You are Strider, a marketing-focused content strategist. "
    "Generate creative, brand-aligned ideation topics based on provided context."
)

class IdeateRequest(BaseModel):
    """
    context: Core brand or campaign context to inspire ideas.
    count: Number of ideas to generate (default 5).
    """
    context: str
    count: int = 5

class IdeateResponse(BaseModel):
    """List of generated content ideas."""
    ideas: List[str]


def call_openai(
    system_prompt: str,
    user_prompt: str,
    max_tokens: int = 300,
    temperature: float = 0.8
) -> str:
    """
    Shared helper to call OpenAI chat completion and return raw assistant text.
    """
    try:
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": user_prompt}
            ],
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        logger.error("OpenAI API error: %s", e)
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {e}")


def parse_ideas(raw_text: str, count: int) -> List[str]:
    """
    Parse a numbered list from the raw AI output into a Python list.
    """
    ideas = []
    for line in raw_text.splitlines():
        line = line.strip()
        if not line:
            continue
        # Expect lines like "1. Idea text"
        if ". " in line:
            _, text = line.split(". ", 1)
            ideas.append(text)
        else:
            ideas.append(line)
        if len(ideas) >= count:
            break
    return ideas

@app.post("/strider/ideate", response_model=IdeateResponse)
async def strider_ideate(request: IdeateRequest):
    """
    Generate creative content ideas using the Strider agent.
    """
    # Build user prompt
    prompt = (
        f"Given the following context, generate {request.count} unique, "
        f"creative, and actionable content ideas. Context: {request.context}\n\n"
        "List the ideas as a numbered list."
    )

    # Call shared helper
    raw = call_openai(STRIDER_SYSTEM_PROMPT, prompt)
    ideas = parse_ideas(raw, request.count)

    return IdeateResponse(ideas=ideas)

# To add a 'steve' endpoint, duplicate the helper usage:
# STEVE_SYSTEM_PROMPT = "..."
# @app.post("/steve/ideate")
# async def steve_ideate(request: IdeateRequest):
#     prompt = f"..."
#     raw = call_openai(STEVE_SYSTEM_PROMPT, prompt)
#     ideas = parse_ideas(raw, request.count)
#     return IdeateResponse(ideas=ideas)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("strider_ideate_api:app", host="0.0.0.0", port=8000, reload=True)