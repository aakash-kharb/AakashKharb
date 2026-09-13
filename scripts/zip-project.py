#!/usr/bin/env python3
"""Create a portable source backup without dependencies, caches, or secrets."""
from datetime import datetime
from pathlib import Path
import os
import zipfile

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {"node_modules", ".next", "out", "build", "dist", ".git", ".vercel",
            ".cache", ".turbo", "coverage", "__pycache__", ".vscode", ".idea", "backups"}

def include(path):
    name = path.name
    return not (name in {".DS_Store", "Thumbs.db"}
                or (name.startswith(".env") and name != ".env.example")
                or name.endswith((".log", ".tsbuildinfo", ".pyc", ".zip", ".pem", ".key", ".swp")))

def main():
    destination = ROOT / "backups"
    destination.mkdir(exist_ok=True)
    output = destination / f"modern-portfolio-{datetime.now():%Y%m%d-%H%M%S-%f}.zip"
    count = 0
    with zipfile.ZipFile(output, "x", zipfile.ZIP_DEFLATED) as archive:
        for current, directories, files in os.walk(ROOT):
            directories[:] = sorted(d for d in directories if d not in EXCLUDED
                                    and not (Path(current) / d).is_symlink())
            for filename in sorted(files):
                path = Path(current) / filename
                if path.is_symlink() or not include(path):
                    continue
                archive.write(path, Path("modern-portfolio") / path.relative_to(ROOT))
                count += 1
    print(f"Saved {count} files ({output.stat().st_size / 1024 / 1024:.1f} MB): {output}")

if __name__ == "__main__":
    main()
