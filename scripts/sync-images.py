#!/usr/bin/env python3
"""Refresh responsive project images from the sibling images directory. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]

for source in sorted((ROOT.parent / "images").glob("demo*.png")):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        for width in (640, 1080, 1800):
            variant = image.copy()
            variant.thumbnail((width, 10000), Image.Resampling.LANCZOS)
            suffix = f"-{width}" if width < 1800 else ""
            destination = ROOT / "public" / "images" / f"{source.stem}{suffix}.webp"
            variant.save(destination, "WEBP", quality=92, method=6)
    print(f"Updated {source.name}: 640 / 1080 / 1800")
