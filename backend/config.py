import os
from pathlib import Path

from databases import Database
from dotenv import load_dotenv

load_dotenv()

database_path = Path(".").parent / "db.sqlite"

database = Database(f"sqlite:///{database_path}")

github_token = os.getenv("GITHUB_TOKEN")

notion_token = os.getenv("NOTION_TOKEN")
notion_db = os.getenv("NOTION_DB")
