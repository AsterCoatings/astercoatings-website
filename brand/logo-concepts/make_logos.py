"""Generates the Aster logo concepts as standalone SVG files (text converted to outlines) and an HTML review sheet."""
import math, os
from textpaths import text_path

INK = '#14181f'; ACC = '#c84a18'; WHITE = '#ffffff'
OUT = '/home/claude/logo/out'; os.makedirs(OUT, exist_ok=True)

def bars(cx, cy, length, width, angles, fills, r=0):
    """Asterisk made of rotated bars. fills: list same length as angles."""
    out = []
    for a, fcol in zip(angles, fills):
        out.append(f'<rect x="{cx-length/2:.2f}" y="{cy-width/2:.2f}" width="{length:.2f}" height="{width:.2f}" rx="{r}" fill="{fcol}" transform="rotate({a} {cx} {cy})"/>')
    return ''.join(out)

def squircle(x, y, s, r, fill, chamfer=None):
    if chamfer:
        c = chamfer
        return f'<path d="M{x+r},{y} H{x+s-c} L{x+s},{y+c} V{y+s-r} Q{x+s},{y+s} {x+s-r},{y+s} H{x+r} Q{x},{y+s} {x},{y+s-r} V{y+r} Q{x},{y} {x+r},{y} Z" fill="{fill}"/>'
    return f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="{r}" fill="{fill}"/>'

def hexagon(cx, cy, R, fill, stroke=None, sw=0):
    pts = ' '.join(f'{cx+R*math.cos(math.radians(60*i)):.2f},{cy+R*math.sin(math.radians(60*i)):.2f}' for i in range(6))
    st = f' stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="miter"' if stroke else ''
    return f'<polygon points="{pts}" fill="{fill}"{st}/>'

# ---------- marks (each drawn in a 100x100 box) ----------
def mark_star(fg, acc):
    """A. Eight-point asterisk; one pass in accent, laid over the others like a coat."""
    return bars(50, 50, 96, 17, [0, 90, 135], [fg, fg, fg]) + bars(50, 50, 96, 17, [45], [acc])

def mark_tile(fg, acc, tile):
    """B. Machined tile with a chamfered corner, carrying the asterisk."""
    return squircle(0, 0, 100, 12, tile, chamfer=24) + bars(50, 50, 64, 11.5, [0, 45, 90, 135], [fg]*4)

def mark_hex(fg, acc):
    """D. Hex-nut ring with the asterisk inside."""
    return hexagon(50, 50, 48, 'none', stroke=fg, sw=9) + bars(50, 50, 48, 9, [0, 90, 135], [fg]*3) + bars(50, 50, 48, 9, [45], [acc])

# ---------- wordmark ----------
def wordmark(x, baseline, size, fill, tracking=0):
    d, w = text_path('Aster', 'michroma', size, x, baseline, tracking)
    # Michroma ships one light weight; a hairline stroke gives the wordmark the weight Mirano's bold will have.
    return f'<path d="{d}" fill="{fill}" stroke="{fill}" stroke-width="{size*0.022:.2f}" stroke-linejoin="round"/>', w

def descriptor(x, baseline, size, fill):
    d, w = text_path('INDUSTRIAL COATINGS', 'barlow600', size, x, baseline, tracking=int(0.16*1000))
    return f'<path d="{d}" fill="{fill}"/>', w

CAP = 1536/2048  # Michroma cap height ratio

def lockup_horizontal(markfn, fg, acc, bg=None, tile=None):
    """Mark 100 tall; wordmark cap-height aligned to the mark's visual centre band."""
    size = 92  # wordmark em size; cap height ≈ 69
    cap = size*CAP
    gap = 22; dsize = 15.5
    text_h = cap + gap + dsize
    H = max(100, text_h)
    top = (H - text_h)/2
    base = top + cap
    mark_y = (H - 100)/2
    parts = []
    parts.append(f'<g transform="translate(0,{mark_y:.1f})">{markfn(fg, acc) if tile is None else markfn(fg, acc, tile)}</g>')
    wm, w = wordmark(124, base, size, fg)
    parts.append(wm)
    dsc, dw = descriptor(126, base + gap + dsize*0.7, dsize, fg)
    parts.append(f'<g opacity="0.85">{dsc}</g>')
    W = 124 + max(w, dw) + 4
    bgrect = f'<rect width="{W:.0f}" height="{H:.0f}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" role="img" aria-label="Aster Industrial Coatings">{bgrect}{"".join(parts)}</svg>'

def lockup_stacked(markfn, fg, acc, tile=None):
    size = 72; cap = size*CAP
    wm, w = wordmark(0, 0, size, fg)
    dsc, dw = descriptor(0, 0, 12.5, fg)
    W = max(w, dw)
    mark = markfn(fg, acc) if tile is None else markfn(fg, acc, tile)
    H = 100 + 22 + cap + 10 + 12.5
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" role="img" aria-label="Aster Industrial Coatings">'
            f'<g transform="translate({(W-100)/2:.1f},0)">{mark}</g>'
            f'<g transform="translate({(W-w)/2:.1f},{100+22+cap:.1f})">{wm}</g>'
            f'<g transform="translate({(W-dw)/2:.1f},{100+22+cap+10+12.5:.1f})" opacity="0.85">{dsc}</g></svg>')

def mark_only(markfn, fg, acc, tile=None, bg=None):
    mark = markfn(fg, acc) if tile is None else markfn(fg, acc, tile)
    bgrect = f'<rect width="100" height="100" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" role="img" aria-label="Aster mark">{bgrect}{mark}</svg>'

def wordmark_only(fg, acc):
    """C. Wordmark with a coat line: the accent bar runs from under the A like a film build."""
    size = 92; cap = size*CAP
    wm, w = wordmark(0, cap, size, fg)
    dsc, dw = descriptor(2, cap + 36, 15.5, fg)
    W = max(w, dw) + 2
    bar = f'<rect x="0" y="{cap+10:.1f}" width="{w:.1f}" height="7" fill="{acc}"/>'
    H = cap + 36 + 4
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" role="img" aria-label="Aster Industrial Coatings">{wm}{bar}<g opacity="0.85">{dsc}</g></svg>'

def mark_letter(fg, acc, tile):
    """C mark: the Michroma A on a tile, with the coat line under it."""
    d, w = text_path('A', 'michroma', 62, 0, 0)
    cap = 62*CAP
    return (squircle(0, 0, 100, 12, tile) +
            f'<g transform="translate({(100-w)/2:.1f},{(100-cap)/2 + cap - 6:.1f})"><path d="{d}" fill="{fg}"/></g>' +
            f'<rect x="{(100-w)/2:.1f}" y="{(100-cap)/2 + cap + 2:.1f}" width="{w:.1f}" height="5" fill="{acc}"/>')

concepts = {
  'A-star':  dict(name='Star', mark=mark_star, tile=False, note='Eight-point asterisk — aster is the Greek word for star. Three passes in the brand ink and one in the accent, laid over the rest like a single coat.'),
  'B-tile':  dict(name='Plate', mark=mark_tile, tile=True,  note='The same asterisk cut into a machined plate with one chamfered corner. Reads as a badge; strongest at small sizes and as a favicon.'),
  'C-letter':dict(name='Coat line', mark=mark_letter, tile=True, note='Wordmark-led. The accent bar under "Aster" is the film build — the one thing a coating company makes. The mark is the Michroma A on a plate.'),
  'D-hex':   dict(name='Nut', mark=mark_hex, tile=False, note='Hex-nut ring around the star — fabrication and fasteners. The busiest of the four; needs the most room.'),
}

files = {}
for key, c in concepts.items():
    m = c['mark']
    for theme, fg, bg, tile in [('on-light', INK, WHITE, INK), ('on-dark', WHITE, INK, WHITE)]:
        acc = ACC
        if c['tile']:
            # tile colour: ink plate with white glyph on light; white plate with ink glyph on dark
            tfg = WHITE if theme == 'on-light' else INK
            files[f'{key}-horizontal-{theme}.svg'] = lockup_horizontal(lambda f, a, t=tile, mf=m, tf=tfg: mf(tf, a, t), fg, acc) if key != 'C-letter' else None
            files[f'{key}-stacked-{theme}.svg'] = lockup_stacked(lambda f, a, t=tile, mf=m, tf=tfg: mf(tf, a, t), fg, acc)
            files[f'{key}-mark-{theme}.svg'] = mark_only(lambda f, a, t=tile, mf=m, tf=tfg: mf(tf, a, t), fg, acc)
        else:
            files[f'{key}-horizontal-{theme}.svg'] = lockup_horizontal(m, fg, acc)
            files[f'{key}-stacked-{theme}.svg'] = lockup_stacked(m, fg, acc)
            files[f'{key}-mark-{theme}.svg'] = mark_only(m, fg, acc)
    if key == 'C-letter':
        files['C-letter-horizontal-on-light.svg'] = wordmark_only(INK, ACC)
        files['C-letter-horizontal-on-dark.svg'] = wordmark_only(WHITE, ACC)

files = {k: v for k, v in files.items() if v}
for k, v in files.items():
    open(os.path.join(OUT, k), 'w').write(v)
print(len(files), 'svg files')

# ---------- review sheet ----------
def card(key, c):
    h = lambda t: files[f'{key}-horizontal-{t}.svg']
    s = lambda t: files[f'{key}-stacked-{t}.svg']
    mk = lambda t: files[f'{key}-mark-{t}.svg']
    return f'''
<section class="concept">
  <div class="head"><span class="tag">{key[0]}</span><h2>{c['name']}</h2><p>{c['note']}</p></div>
  <div class="row">
    <div class="panel light"><div class="lock">{h('on-light')}</div></div>
    <div class="panel dark"><div class="lock">{h('on-dark')}</div></div>
  </div>
  <div class="row three">
    <div class="panel light stack">{s('on-light')}</div>
    <div class="panel dark stack">{s('on-dark')}</div>
    <div class="panel steel sizes">
      <div class="sz" style="width:100px;height:100px">{mk('on-light')}</div>
      <div class="sz" style="width:48px;height:48px">{mk('on-light')}</div>
      <div class="sz" style="width:32px;height:32px">{mk('on-light')}</div>
      <div class="sz" style="width:16px;height:16px">{mk('on-light')}</div>
      <span class="cap">mark at 100 / 48 / 32 / 16 px</span>
    </div>
  </div>
</section>'''

html = f'''<title>Aster Logo Concepts</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
  :root {{ --bg:#f5f4f1; --fg:#1c1f26; --muted:#5d6474; --rule:#d6d3cc; --card:#fff; --accent:#c84a18; --ink:#14181f; --steel:#e6ecf2; }}
  @media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --bg:#16181d; --fg:#ecebe7; --muted:#a2a7b3; --rule:#2d3139; --card:#1f2229; color-scheme: dark; }} }}
  :root[data-theme="dark"] {{ --bg:#16181d; --fg:#ecebe7; --muted:#a2a7b3; --rule:#2d3139; --card:#1f2229; color-scheme: dark; }}
  body {{ background:var(--bg); color:var(--fg); font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; line-height:1.5; padding-left:max(16px, env(safe-area-inset-left,0px)); padding-right:max(16px, env(safe-area-inset-right,0px)); padding-block:32px 64px; }}
  .wrap {{ max-width:1080px; margin:0 auto; display:grid; gap:36px; }}
  h1 {{ margin:0; font-size:1.7rem; letter-spacing:-0.01em; }}
  .intro {{ color:var(--muted); max-width:64ch; margin:6px 0 0; }}
  .concept {{ background:var(--card); border:1px solid var(--rule); border-radius:6px; overflow:hidden; }}
  .head {{ padding:16px 20px 12px; display:grid; grid-template-columns:auto 1fr; gap:4px 12px; align-items:baseline; }}
  .head h2 {{ margin:0; font-size:1.1rem; }}
  .head p {{ grid-column:2; margin:0; color:var(--muted); font-size:0.92rem; max-width:70ch; }}
  .tag {{ display:inline-grid; place-items:center; width:28px; height:28px; border-radius:3px; background:var(--accent); color:#fff; font-weight:700; font-size:0.9rem; }}
  .row {{ display:grid; grid-template-columns:1fr 1fr; }}
  .row.three {{ grid-template-columns:1fr 1fr 1fr; border-top:1px solid var(--rule); }}
  @media (max-width:720px) {{ .row, .row.three {{ grid-template-columns:1fr; }} }}
  .panel {{ padding:28px 24px; display:flex; align-items:center; justify-content:center; min-width:0; min-height:150px; }}
  .panel.light {{ background:#fff; }} .panel.dark {{ background:var(--ink); }} .panel.steel {{ background:var(--steel); }}
  .lock svg {{ width:100%; max-width:380px; height:auto; display:block; }}
  .stack svg {{ height:150px; width:auto; max-width:100%; }}
  .sizes {{ gap:16px; flex-wrap:wrap; }}
  .sz svg {{ width:100%; height:100%; display:block; }}
  .cap {{ width:100%; text-align:center; font-size:0.75rem; color:#5c6577; letter-spacing:0.04em; }}
  .note {{ color:var(--muted); font-size:0.9rem; max-width:70ch; }}
</style>
<div class="wrap">
  <header><h1>Logo concepts for Aster Industrial Coatings</h1>
  <p class="intro">Four directions, each shown as the horizontal lockup on white and on the site's dark ink, the stacked version, and the mark alone down to favicon size. Type is the site's display face (Michroma, standing in for Mirano) converted to outlines, so the files are self-contained vectors.</p></header>
  {''.join(card(k, c) for k, c in concepts.items())}
  <p class="note">All marks use the two brand colours only (ink #14181F, accent #C84A18) plus white, so they reproduce in one colour, in reverse, and in print. When Mirano is licensed, the wordmark letters can be regenerated from it; the marks do not change.</p>
</div>'''
open('/home/claude/logo/aster-logo-concepts.html', 'w').write(html)
print('sheet written')
