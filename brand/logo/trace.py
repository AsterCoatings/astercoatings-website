"""Trace the owner-approved logo raster into layered SVG (ink layer + accent layer)."""
import numpy as np, potrace
from PIL import Image, ImageFilter

SRC = '/root/.claude/uploads/96ecf537-1faf-5f5e-9dfd-e39562dfe96e/8093a9ae-image.jpg'
INK = '#14181f'; ACC = '#c84a18'

im = Image.open(SRC).convert('RGB')
# Upscale 4x with Lanczos for smoother curves, then light blur to kill JPEG noise.
S = 4
im = im.resize((im.width*S, im.height*S), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
a = np.asarray(im).astype(int)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
lum = (r*299 + g*587 + b*114)//1000
dark = lum < 128                      # charcoal letters + vertical bar
orange = (r - b > 60) & (r > 120) & (lum < 200)  # accent bars

def trace(mask, turd=40):
    bmp = potrace.Bitmap(~mask)  # potracer treats 0 as foreground
    path = bmp.trace(turdsize=turd, alphamax=1.0, opticurve=1, opttolerance=0.2)
    d = []
    for curve in path:
        sp = curve.start_point
        d.append(f'M{sp.x/S:.2f},{sp.y/S:.2f}')
        for seg in curve:
            if seg.is_corner:
                d.append(f'L{seg.c.x/S:.2f},{seg.c.y/S:.2f}L{seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}')
            else:
                d.append(f'C{seg.c1.x/S:.2f},{seg.c1.y/S:.2f} {seg.c2.x/S:.2f},{seg.c2.y/S:.2f} {seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}')
        d.append('Z')
    return ''.join(d)

ink_d = trace(dark)
acc_d = trace(orange)

# Bounding box of all content, in original pixels
ys, xs = np.where(dark | orange)
x0, x1, y0, y1 = xs.min()/S, xs.max()/S, ys.min()/S, ys.max()/S
pad = 6
vb = (x0-pad, y0-pad, (x1-x0)+2*pad, (y1-y0)+2*pad)
print('bbox', x0, y0, x1, y1)

def svg(ink, acc, extra='', label='Aster Industrial Coatings'):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]:.1f} {vb[1]:.1f} {vb[2]:.1f} {vb[3]:.1f}" role="img" aria-label="{label}">'
            f'{extra}<path fill="{ink}" fill-rule="evenodd" d="{ink_d}"/><path fill="{acc}" fill-rule="evenodd" d="{acc_d}"/></svg>')

out = '/home/claude/logo/final/'
import os; os.makedirs(out, exist_ok=True)
open(out+'aster-logo-horizontal.svg', 'w').write(svg(INK, ACC))
open(out+'aster-logo-horizontal-on-dark.svg', 'w').write(svg('#ffffff', ACC))

# Mark only: everything right of the wordmark. Find the gap between "Aster" and the star.
cols = (dark | orange).any(axis=0)
# columns in original px
col_idx = np.where(cols)[0]/S
# find the widest gap in the right half
gaps = []
prev = None
for c in np.where(cols)[0]:
    if prev is not None and c - prev > 20*S: gaps.append((prev/S, c/S))
    prev = c
split = max(gaps, key=lambda g: g[0])  # the last big gap
mx0 = split[1]
mark_mask_d = dark.copy(); mark_mask_d[:, :int(mx0*S)] = False
mark_mask_o = orange.copy(); mark_mask_o[:, :int(mx0*S)] = False
mi_d = trace(mark_mask_d); mo_d = trace(mark_mask_o)
mys, mxs = np.where(mark_mask_d | mark_mask_o)
bx0, bx1, by0, by1 = mxs.min()/S, mxs.max()/S, mys.min()/S, mys.max()/S
side = max(bx1-bx0, by1-by0) + 2*pad
cx, cy = (bx0+bx1)/2, (by0+by1)/2
mvb = (cx-side/2, cy-side/2, side, side)
def mark(ink, acc, bg=None):
    bgr = f'<rect x="{mvb[0]:.1f}" y="{mvb[1]:.1f}" width="{side:.1f}" height="{side:.1f}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{mvb[0]:.1f} {mvb[1]:.1f} {side:.1f} {side:.1f}" role="img" aria-label="Aster mark">'
            f'{bgr}<path fill="{ink}" fill-rule="evenodd" d="{mi_d}"/><path fill="{acc}" fill-rule="evenodd" d="{mo_d}"/></svg>')
open(out+'aster-mark.svg', 'w').write(mark(INK, ACC))
open(out+'aster-mark-on-dark.svg', 'w').write(mark('#ffffff', ACC))
# Favicon: mark on an ink tile with rounded corners so it reads on any tab background
tile = f'<rect x="{mvb[0]:.1f}" y="{mvb[1]:.1f}" width="{side:.1f}" height="{side:.1f}" rx="{side*0.18:.1f}" fill="{INK}"/>'
# scale mark to ~70% inside the tile
inner = (f'<g transform="translate({cx:.1f},{cy:.1f}) scale(0.72) translate({-cx:.1f},{-cy:.1f})">'
         f'<path fill="#ffffff" fill-rule="evenodd" d="{mi_d}"/><path fill="{ACC}" fill-rule="evenodd" d="{mo_d}"/></g>')
open(out+'icon.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{mvb[0]:.1f} {mvb[1]:.1f} {side:.1f} {side:.1f}">{tile}{inner}</svg>')
print('mark box', mvb, 'split at', mx0)
print('sizes', {k: len(open(out+k).read()) for k in os.listdir(out)})

# ---- compact lockup: wordmark + mark without the descriptor (for the site header) ----
rows = dark[:, :int(mx0*S)].any(axis=1)
# find the gap between wordmark bottom and descriptor top
gap_rows = []
prev=None
for r_ in np.where(rows)[0]:
    if prev is not None and r_-prev > 8*S: gap_rows.append((prev/S, r_/S))
    prev=r_
ysplit = gap_rows[-1][0] + 2 if gap_rows else y1
cd = dark.copy(); cd[int(ysplit*S):, :int(mx0*S)] = False   # drop descriptor rows, left of the mark
ci_d = trace(cd)
cys, cxs = np.where(cd | orange)
cx0, cx1, cy0, cy1 = cxs.min()/S, cxs.max()/S, cys.min()/S, cys.max()/S
cvb = (cx0-pad, cy0-pad, (cx1-cx0)+2*pad, (cy1-cy0)+2*pad)
def compact(ink, acc):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{cvb[0]:.1f} {cvb[1]:.1f} {cvb[2]:.1f} {cvb[3]:.1f}" role="img" aria-label="Aster Industrial Coatings">'
            f'<path fill="{ink}" fill-rule="evenodd" d="{ci_d}"/><path fill="{acc}" fill-rule="evenodd" d="{acc_d}"/></svg>')
open(out+'aster-logo-compact.svg','w').write(compact(INK, ACC))
open(out+'aster-logo-compact-on-dark.svg','w').write(compact('#ffffff', ACC))
print('compact split y', ysplit, 'viewBox', cvb)
