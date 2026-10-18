"""Paints the opaque part of the dark scrollbar bar out of a homepage background export, since StarsScrollbar draws it.

Usage: python scripts/paint-out-scrollbar-bar.py <export-with-bar.png> <output.png>   (needs Pillow)

The see-through part over the hero is left in the image (it's blended into the artwork). If a new export moves the
bar, re-measure START and the gradient stops in StarsScrollbar.astro (image row / image width * 100 = cqw).
"""
import sys
from collections import Counter
from PIL import Image

START = 1880  # first row painted out: the bar is solid #636478 with no halftone dots over it from row 1868
BAR = 73  # columns 0..72 cover the bar (4.13% of 1708px) and its anti-aliased edge
CHEVRONS = range(4100, 4220)  # rows where the mirror would copy the Latest Publications chevrons into the bar

src, out = sys.argv[1:3]
im = Image.open(src)
px = im.load()
W, H = im.size
assert (W, H) == (1708, 4989), 'new export size: re-measure START, BAR and the gradient stops'
assert px[35, START] == (99, 100, 120), f'bar not solid at row {START}: {px[35, START]}'
for y in range(START, H):
    # The row's most common colour just right of the bar is the cream page...
    fill = Counter(px[x, y] for x in range(BAR, BAR + 40)).most_common(1)[0][0]
    for x in range(BAR):
        # ...except in the Latest Publications band, whose halftone continues under the bar: mirror it across the edge.
        px[x, y] = fill if sum(fill) >= 740 or y in CHEVRONS else px[2 * BAR - 1 - x, y]
assert all(px[x, 3000] == (255, 252, 243) for x in range(BAR)), 'bar should be gone'
im.save(out, optimize=True)
