"""Convert strings to SVG path data using the site's own font files (Michroma, Barlow)."""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONTS = {
  'michroma': '/home/claude/vantrex-coatings/site/app/fonts/michroma-latin-400-normal.woff2',
  'barlow600': '/home/claude/vantrex-coatings/site/app/fonts/barlow-latin-600-normal.woff2',
  'barlow500': '/home/claude/vantrex-coatings/site/app/fonts/barlow-latin-500-normal.woff2',
}
_cache = {}
def font(name):
    if name not in _cache:
        _cache[name] = TTFont(FONTS[name])
    return _cache[name]

def kern(f, a, b):
    try:
        gpos = f['GPOS'].table
    except KeyError:
        return 0
    for lookup in gpos.LookupList.Lookup:
        for st in lookup.SubTable:
            if lookup.LookupType != 2: continue
            if st.Format == 1 and a in st.Coverage.glyphs:
                i = st.Coverage.glyphs.index(a)
                for pr in st.PairSet[i].PairValueRecord:
                    if pr.SecondGlyph == b and pr.Value1 and pr.Value1.XAdvance:
                        return pr.Value1.XAdvance
            elif st.Format == 2 and a in st.Coverage.glyphs:
                c1 = st.ClassDef1.classDefs.get(a, 0); c2 = st.ClassDef2.classDefs.get(b, 0)
                v = st.Class1Record[c1].Class2Record[c2].Value1
                if v and v.XAdvance: return v.XAdvance
    return 0

def text_path(s, fontname, size, x=0, y=0, tracking=0):
    """Returns (path_d, width) with baseline at y, size in px (units per em scaled)."""
    f = font(fontname); gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm
    scale = size / upm
    pen = SVGPathPen(gs)
    cx = 0; prev = None
    for ch in s:
        g = cmap.get(ord(ch))
        if g is None: continue
        if prev: cx += kern(f, prev, g)
        tp = TransformPen(pen, (scale, 0, 0, -scale, x + cx*scale, y))
        gs[g].draw(tp)
        cx += gs[g].width + tracking
        prev = g
    return pen.getCommands(), cx*scale

if __name__ == '__main__':
    d, w = text_path('Aster', 'michroma', 100)
    print(len(d), w)
