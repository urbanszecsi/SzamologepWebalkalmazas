import http.server
import urllib.parse
import json
from pathlib import Path

# backend/server.py
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler

# <projektgyökér>/frontend lesz a dokumentumgyökér
FRONTEND_DIR = (Path(__file__).resolve().parent.parent / "frontend/dist").as_posix()

class StaticHandler(SimpleHTTPRequestHandler):
    # csak továbbítjuk a directory paramétert a szülőnek
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

if __name__ == "__main__":
    HTTPServer(("localhost", 8081), StaticHandler).serve_forever()