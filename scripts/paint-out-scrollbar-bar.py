"""Paints the opaque part of the dark scrollbar bar out of a homepage background export, since StarsScrollbar draws it.

Usage: python scripts/paint-out-scrollbar-bar.py <export-with-bar.png> <output.png>   (needs Pillow)

The see-through part over the hero is left in the image (it's blended into the artwork). If a new export moves the
bar, re-measure START and the gradient stops in StarsScrollbar.astro (image row / image width * 100 = cqw).
"""
import sys
from collections import Counter
from PIL import Image

# First row painted out. The image's bar is plain solid #636478 from row 1868 (no halftone dots over it), and the drawn
# bar fades in over rows 1868..2100 so its edge takes over from the image's gradually instead of in one visible step.
START = 2100
BAR = 73  # columns 0..72 cover the bar (4.2% of 1708px, its edge anti-aliased across column 71) and that edge
CHEVRONS = range(4100, 4220)  # rows where the mirror would copy the Latest Publications chevrons into the bar

src, out = sys.argv[1:3]
im = Image.open(src)
px = im.load()
W, H = im.size
assert (W, H) == (1708, 4989), 'new export size: re-measure START, BAR and the gradient stops'
assert px[35, START] == (99, 100, 120), f'bar not solid at row {START}: {px[35, START]}'
for y in range(START, H):
    # Rows of plain cream page get filled with it. Anything else (the faint pink glow along the bar's edge below the
    # hero, the Latest Publications band's halftone) carries on under the bar, so it's mirrored across the bar's edge.
    fill = Counter(px[x, y] for x in range(BAR, BAR + 40)).most_common(1)[0][0]
    plain = sum(fill) >= 740 and sum(px[BAR, y]) >= 740
    for x in range(BAR):
        px[x, y] = fill if plain or y in CHEVRONS else px[2 * BAR - 1 - x, y]
assert all(px[x, 3000] == (255, 252, 243) for x in range(BAR)), 'bar should be gone'
im.save(out, optimize=True)
