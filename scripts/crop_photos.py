#!/usr/bin/env python3
"""
Crop screenshot photos to remove text captions, headers, badges, and borders.

We find the largest contiguous vertical band of "image-like" rows AND columns
(high color variance or non-uniform brightness), then trim solid borders.
"""

import sys
from pathlib import Path
import numpy as np
from PIL import Image

SRC_DIR = Path('/home/ubuntu/maama-salma/src/assets/photos-original')
DST_DIR = Path('/home/ubuntu/maama-salma/src/assets/photos')

DST_DIR.mkdir(parents=True, exist_ok=True)

# Map source -> destination filename. If multiple sources map to the same
# destination, the later one wins (lets us repurpose photos for missing slots).
PHOTO_REASSIGNMENT = {
    # Replace text-only images with images that have actual photo content
    'binding-spells.jpg': 'spell-book-2.jpg',      # text-only -> spell book + candles (cropped)
    'love-spells-list.jpg': 'ritual-bowls.jpg',    # text-only -> wiccan bowls + pentagram
    'spell-book.jpg': 'candle-smoke.jpg',          # text-only -> candle/smoke ritual
    'reconciliation.jpg': 'couple-hearts.jpg',     # mostly-text -> couple with heart candle
}


def _band(mask: np.ndarray) -> tuple[int, int]:
    """Largest contiguous True run in a 1-D boolean array."""
    n = len(mask)
    best_start, best_end, best_len = 0, n, 0
    cur_start = None
    for i, v in enumerate(mask):
        if v and cur_start is None:
            cur_start = i
        elif not v and cur_start is not None:
            cur_len = i - cur_start
            if cur_len > best_len:
                best_len = cur_len
                best_start, best_end = cur_start, i
            cur_start = None
    if cur_start is not None:
        cur_len = n - cur_start
        if cur_len > best_len:
            best_len = cur_len
            best_start, best_end = cur_start, n
    return best_start, best_end


def find_image_band_rows(arr: np.ndarray) -> tuple[int, int]:
    row_mean = arr.mean(axis=(1, 2))
    row_std = arr.std(axis=(1, 2))
    is_image = ((row_mean > 25) & (row_mean < 230)) | (row_std > 28)
    s, e = _band(is_image)
    return s, e


def find_image_band_cols(arr: np.ndarray) -> tuple[int, int]:
    col_mean = arr.mean(axis=(0, 2))
    col_std = arr.std(axis=(0, 2))
    is_image = ((col_mean > 25) & (col_mean < 230)) | (col_std > 28)
    s, e = _band(is_image)
    return s, e


def crop_image(src: Path) -> Image.Image:
    img = Image.open(src).convert('RGB')
    arr = np.array(img)
    h, w, _ = arr.shape

    top, bottom = find_image_band_rows(arr)
    sub = arr[top:bottom]
    left, right = find_image_band_cols(sub)

    cropped = img.crop((left, top, right, bottom))
    if cropped.width * cropped.height < img.width * img.height * 0.2:
        # Safety net: don't over-crop
        cropped = img
    return cropped


def main() -> int:
    # First, crop each original to a clean photo (in-place naming).
    cleaned = {}
    for src in sorted(SRC_DIR.glob('*.jpg')):
        cleaned[src.name] = crop_image(src)
        print(f"crop  {src.name}: {Image.open(src).size} -> {cleaned[src.name].size}")

    # Special handling: spell-book-2 has a 25+ Years badge in the bottom-right.
    # The actual photo occupies the upper-left ~80% of the cleaned image, so
    # crop to a square portion focused on the book/candles.
    sb2 = cleaned.get('spell-book-2.jpg')
    if sb2 is not None:
        w, h = sb2.size
        # Keep top portion (removes the "25+ Years" badge in the bottom-right)
        new_h = int(h * 0.58)
        cleaned['spell-book-2.jpg'] = sb2.crop((0, 0, w, new_h))
        print(f"  spell-book-2.jpg refined to {cleaned['spell-book-2.jpg'].size}")

    # couple-hearts has black borders around the actual photo — re-tighten.
    ch = cleaned.get('couple-hearts.jpg')
    if ch is not None:
        arr = np.array(ch)
        row_mean = arr.mean(axis=(1, 2))
        col_mean = arr.mean(axis=(0, 2))
        nonblack_rows = np.where(row_mean > 20)[0]
        nonblack_cols = np.where(col_mean > 20)[0]
        if len(nonblack_rows) and len(nonblack_cols):
            top, bottom = nonblack_rows[0], nonblack_rows[-1] + 1
            left, right = nonblack_cols[0], nonblack_cols[-1] + 1
            cleaned['couple-hearts.jpg'] = ch.crop((left, top, right, bottom))
            print(f"  couple-hearts.jpg refined to {cleaned['couple-hearts.jpg'].size}")

    # Apply photo reassignment: text-only images get replaced with photos that have content.
    for original_name, replacement_name in PHOTO_REASSIGNMENT.items():
        if replacement_name in cleaned:
            cleaned[original_name] = cleaned[replacement_name].copy()
            print(f"reassign {original_name} <- {replacement_name}")

    # Save all
    for name, img in cleaned.items():
        dst = DST_DIR / name
        img.save(dst, 'JPEG', quality=88, optimize=True)

    return 0


if __name__ == '__main__':
    sys.exit(main())
