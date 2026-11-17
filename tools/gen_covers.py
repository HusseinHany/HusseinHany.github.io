"""Animated SVG covers for every project card on the portfolio.

Each cover is 900x600: title block on the left, an animated illustration on
the right drawn from the project's real numbers. Animation is CSS inside the
SVG (works in <img> on Chrome, Firefox and Safari) and stops for visitors who
ask for reduced motion, leaving the finished picture.
"""
import math
import os
import sys

OUT = sys.argv[1]
F = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
M = "ui-monospace, Menlo, Consolas, monospace"
INK, MUTED, EM, EM2, BLUE, ORANGE, GOLD, LINE = '#e2eeff', '#96afc8', '#00c896', '#2fffc0', '#3987e5', '#d95926', '#f5c842', '#2c4a6e'

BASE_CSS = """
.up{transform-box:fill-box;transform-origin:50% 100%;animation:up 7s cubic-bezier(.2,.8,.2,1) infinite both}
.grow{transform-box:fill-box;transform-origin:0 50%;animation:grow 7s cubic-bezier(.2,.8,.2,1) infinite both}
.in{animation:in 7s ease infinite both}
.pop{transform-box:fill-box;transform-origin:50% 50%;animation:pop 7s cubic-bezier(.3,1.4,.5,1) infinite both}
.ring{transform-box:fill-box;transform-origin:50% 50%;animation:ring 2.4s ease-out infinite}
.bob{animation:bob 3.2s ease-in-out infinite alternate}
.flow{stroke-dasharray:8 9;animation:flow 1s linear infinite}
.caret{animation:blink 1.1s steps(1) infinite}
.breathe{transform-box:fill-box;transform-origin:50% 50%;animation:breathe 6s ease-in-out infinite alternate}
.sheen{animation:sheen 7s ease-in-out infinite}
@keyframes up{0%{transform:scaleY(0)}20%,90%{transform:scaleY(1)}100%{transform:scaleY(0)}}
@keyframes grow{0%{transform:scaleX(0)}20%,90%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes in{0%{opacity:0;transform:translateY(10px)}12%,90%{opacity:1;transform:none}100%{opacity:0}}
@keyframes pop{0%{opacity:0;transform:scale(0)}10%,90%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.6)}}
@keyframes ring{0%{opacity:.8;transform:scale(1)}100%{opacity:0;transform:scale(2.6)}}
@keyframes bob{from{transform:translateY(-7px)}to{transform:translateY(7px)}}
@keyframes flow{to{stroke-dashoffset:-34}}
@keyframes blink{0%{opacity:1}50%{opacity:0}}
@keyframes breathe{from{transform:scale(.9);opacity:.75}to{transform:scale(1.08);opacity:1}}
@keyframes sheen{0%{transform:translateX(0)}30%,100%{transform:translateX(1500px)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
"""


class Cover:
    def __init__(self):
        self.css = set()
        self.n = 0

    def d(self, delay):
        return f' style="animation-delay:{delay:.2f}s"' if delay else ''

    def draw(self, pts, delay=0.0, **attrs):
        """A polyline that draws itself, then erases forward."""
        length = sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
        L = math.ceil(length) + 2
        name = f'dr{L}'
        self.css.add(f'.{name}{{stroke-dasharray:{L};animation:{name} 7s ease-in-out infinite both}}'
                     f'@keyframes {name}{{0%{{stroke-dashoffset:{L}}}30%,88%{{stroke-dashoffset:0}}100%{{stroke-dashoffset:-{L}}}}}')
        d = 'M' + ' L'.join(f'{x:g} {y:g}' for x, y in pts)
        a = ' '.join(f'{k.replace("_", "-")}="{v}"' for k, v in attrs.items())
        return f'<path class="{name}" d="{d}" fill="none" {a}{self.d(delay)}/>'


def chips(items, y):
    out, x = [], 70
    for t in items:
        w = round(len(t) * 8.6 + 30)
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="34" rx="17" fill="#0a1e30" stroke="{EM}" stroke-opacity=".6"/>'
                   f'<text x="{x + w / 2:g}" y="{y + 22}" text-anchor="middle" fill="{INK}">{t}</text>')
        x += w + 12
    return f'<g font-family="{F}" font-size="16" font-weight="700">' + ''.join(out) + '</g>'


def page(name, label, kicker, title, sub, chip_list, art, c, defs='', glow=EM, size=56):
    y = 150
    head = [f'<text x="70" y="{y}" font-family="{M}" font-size="17" font-weight="700" fill="{EM2}" letter-spacing="4">{kicker}</text>',
            f'<rect class="caret" x="{70 + len(kicker) * 14.2 + 4:.0f}" y="{y - 15}" width="10" height="18" fill="{EM2}"/>']
    y += size + 16
    for line in title:
        head.append(f'<text x="68" y="{y}" font-family="{F}" font-size="{size}" font-weight="800" fill="{INK}" letter-spacing="-1.5">{line}</text>')
        y += size + 8
    y += -size - 8 + 44
    for line in sub:
        head.append(f'<text x="70" y="{y}" font-family="{F}" font-size="20" fill="{MUTED}">{line}</text>')
        y += 28
    head.append(chips(chip_list, y + 14))
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600" role="img" aria-labelledby="t">
<title id="t">{label}</title>
<style>{BASE_CSS}{''.join(sorted(c.css))}</style>
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#010810"/><stop offset=".6" stop-color="#061522"/><stop offset="1" stop-color="#0a1e30"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="{glow}" stop-opacity=".3"/><stop offset="1" stop-color="{glow}" stop-opacity="0"/></radialGradient>
<linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="{MUTED}" opacity=".14"/></pattern>
{defs}
</defs>
<rect width="900" height="600" fill="url(#bg)"/>
<rect width="900" height="600" fill="url(#dots)"/>
<circle class="breathe" cx="670" cy="300" r="290" fill="url(#glow)"/>
{art}
<g transform="translate(0 46)">
{chr(10).join(head)}
</g>
<g transform="skewX(-18)"><rect class="sheen" x="-420" y="0" width="220" height="600" fill="url(#sh)"/></g>
</svg>
'''
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as fh:
        fh.write(svg)
    print(f'{name}: {len(svg.encode()):,} bytes')


def panel(x, y, w, h):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="#0f1826" stroke="{LINE}" stroke-width="2"/>'


# ── Enterprise Data 360 ──────────────────────────────────────────────
c = Cover()
line = [(20, 250), (60, 228), (100, 238), (140, 220), (180, 200), (220, 214), (260, 190), (300, 172), (340, 150), (360, 140)]
kpis = ''.join(
    f'<g class="in"{c.d(0.15 + i * 0.15)}><rect x="{20 + i * 118}" y="22" width="104" height="62" rx="10" fill="#172232"/>'
    f'<text x="{32 + i * 118}" y="46" font-size="12" fill="{MUTED}">{k}</text>'
    f'<text x="{32 + i * 118}" y="72" font-size="21" font-weight="800" fill="#eef3f9">{v}</text></g>'
    for i, (k, v) in enumerate([('Revenue', '$15.2M'), ('Customers', '24,563'), ('NPS', '48')]))
art = f'''<g transform="translate(470 110)" font-family="{F}">
{panel(0, 0, 380, 380)}
{kpis}
<path class="in" d="M20 250 L60 228 L100 238 L140 220 L180 200 L220 214 L260 190 L300 172 L340 150 L360 140 V280 H20 Z" fill="url(#area)"{c.d(1.1)}/>
{c.draw(line, 0.5, stroke=BLUE, stroke_width=3, stroke_linejoin="round", stroke_linecap="round")}
<circle class="ring" cx="360" cy="140" r="7" fill="none" stroke="{BLUE}" stroke-width="2"/>
<circle class="pop" cx="360" cy="140" r="6" fill="{BLUE}" stroke="#0f1826" stroke-width="3"{c.d(2.4)}/>
<line x1="20" y1="280" x2="360" y2="280" stroke="#2f3d50" stroke-width="1.5"/>
<rect class="grow" x="20" y="302" width="200" height="14" rx="4" fill="{BLUE}"{c.d(1.0)}/>
<rect class="grow" x="20" y="324" width="150" height="14" rx="4" fill="{BLUE}"{c.d(1.15)}/>
<rect class="grow" x="20" y="346" width="104" height="14" rx="4" fill="{BLUE}"{c.d(1.3)}/>
<rect class="up" x="244" y="310" width="64" height="26" rx="4" fill="{BLUE}"{c.d(1.2)}/>
<rect class="up" x="310" y="310" width="32" height="26" rx="4" fill="{ORANGE}"{c.d(1.35)}/>
<rect class="up" x="344" y="310" width="16" height="26" rx="4" fill="#199e70"{c.d(1.5)}/>
</g>'''
page('project-data360.svg', 'Enterprise Data 360 dashboard', 'LIVE DASHBOARD', ['Enterprise', 'Data 360'],
     ['7 sections · search · filters · CSV export'], ['JavaScript', 'Chart.js', 'pandas'], art, c,
     defs=f'<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{BLUE}" stop-opacity=".45"/><stop offset="1" stop-color="{BLUE}" stop-opacity="0"/></linearGradient>')

# ── EDUFLOW ──────────────────────────────────────────────────────────
c = Cover()
edges = [((560, 170), (650, 250)), ((560, 170), (520, 290)), ((650, 250), (760, 210)), ((650, 250), (700, 360)),
         ((520, 290), (600, 400)), ((700, 360), (800, 330)), ((700, 360), (640, 470)), ((600, 400), (640, 470))]
nodes = [(560, 170, 'Intro', True, 0.3), (520, 290, 'Web', False, 0.5), (760, 210, 'DB', False, 0.6), (650, 250, 'DS', True, 1.0),
         (800, 330, 'Algo', False, 0.7), (600, 400, 'API', False, 0.8), (700, 360, 'ML', True, 1.6)]
g = ''.join(f'<line class="in" x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}"{c.d(0.1 + i * 0.05)}/>' for i, (a, b) in enumerate(edges))
nd = ''.join(
    f'<g class="pop"{c.d(dl)}><circle cx="{x}" cy="{y}" r="{30 if on else 26}" fill="#0a1e30" stroke="{EM2 if on else LINE}" stroke-width="3"/>'
    f'<text x="{x}" y="{y + 5}" fill="{INK if on else MUTED}">{t}</text></g>' for x, y, t, on, dl in nodes)
art = f'''<g transform="translate(-40 0)">
<g stroke="{LINE}" stroke-width="3">{g}</g>
{c.draw([(560, 170), (650, 250), (700, 360), (640, 470)], 0.6, stroke=EM2, stroke_width=4, stroke_linecap="round", stroke_linejoin="round")}
<g font-family="{F}" font-size="13" font-weight="700" text-anchor="middle">{nd}
<circle class="ring" cx="640" cy="470" r="32" fill="none" stroke="{EM}" stroke-width="2"/>
<g class="pop"{c.d(2.2)}><circle cx="640" cy="470" r="32" fill="{EM}"/><text x="640" y="475" fill="#00140e">DL</text></g>
</g></g>'''
page('project-eduflow.svg', 'EDUFLOW learning path generator', 'C++ · DATA STRUCTURES', ['EDUFLOW'],
     ['Score courses · follow prerequisites', '· plan the week'], ['AVL tree', 'Graph', 'BST'], art, c, size=66)

# ── Student Management System ────────────────────────────────────────
c = Cover()
rows = [('Bubble', 230, ORANGE, '50M'), ('Selection', 230, ORANGE, '50M'), ('Insertion', 116, '#c98500', '25M'),
        ('Quick', 5, EM2, '0.23M'), ('Merge', 4, EM2, '0.12M')]
bars = ''
for i, (n, w, col, v) in enumerate(rows):
    y = 196 + i * 44
    bars += (f'<text x="500" y="{y + 16}" fill="{INK}">{n}</text>'
             f'<rect x="600" y="{y}" width="230" height="22" rx="5" fill="#13243a"/>'
             f'<rect class="grow" x="600" y="{y}" width="{w}" height="22" rx="{5 if w > 10 else 2}" fill="{col}"{c.d(0.3 + i * 0.18)}/>'
             f'<text class="in" x="{600 + w + 8 if w < 200 else 838}" y="{y + 16}" fill="{MUTED}"{c.d(1.2 + i * 0.18)}>{v}</text>')
art = f'''<g transform="translate(-40 0)" font-family="{F}" font-size="15">
<text x="500" y="168" fill="{MUTED}" font-weight="700">Comparisons at 10,000 records</text>
{bars}
<g class="pop"{c.d(2.4)}><rect x="672" y="410" width="158" height="32" rx="16" fill="#0a1e30" stroke="{EM2}"/>
<text x="751" y="431" text-anchor="middle" fill="{EM2}" font-weight="700">Merge sort wins</text></g>
</g>'''
page('project-student.svg', 'Student Management System sorting benchmark', 'C++ · ALGORITHMS', ['Student', 'Management'],
     ['5 sorting algorithms, measured'], ['C++', 'Sorting', 'AVL tree'], art, c, size=54)

# ── Escape Room ──────────────────────────────────────────────────────
# The app's real dashboard: its Theme.cs colours, sidebar buttons, the four
# cards and the bookings grid, filled with the sample data from
# database-setup.sql (as if it were 9 June 2026).
c = Cover()
BG_, SURF, SURF2, BORD, INK_, MUT, ACC, ACCL, EDIT, DANG = ('#0b101c', '#131c2e', '#19253c', '#2c3e5c', '#e8eef8',
                                                         '#96a8c0', '#00a884', '#40e0ba', '#d6961e', '#ce3c3c')
side = ['Rooms', 'Bookings', 'Filter', 'Leaderboard', 'Reports']
sb = ''
for i, name in enumerate(side):
    y = 70 + i * 36
    sb += (f'<rect x="10" y="{y}" width="84" height="28" rx="7" fill="{SURF2}" stroke="{BORD}" stroke-width="1.2"/>'
           f'<rect class="hov" x="10" y="{y}" width="84" height="28" rx="7" fill="{ACC}" fill-opacity=".18" stroke="{ACCL}" stroke-width="1.6" style="animation-delay:{i * 1.4:.1f}s"/>'
           f'<text x="52" y="{y + 18}" text-anchor="middle" font-size="11" font-weight="600" fill="{INK_}">{name}</text>')
sb += (f'<rect x="10" y="262" width="84" height="26" rx="7" fill="{SURF2}" stroke="{DANG}" stroke-opacity=".7" stroke-width="1.2"/>'
       f'<text x="52" y="279" text-anchor="middle" font-size="11" font-weight="600" fill="#f0a0a0">Logout</text>')
cards = [("Today's Bookings", '1', ACCL), ("Today's Revenue", 'EGP 3,150', ACCL), ('Weekly Revenue', 'EGP 7,350', EDIT), ('Available Rooms', '20', ACCL)]
cd = ''
for i, (lab, val, col) in enumerate(cards):
    x, y = 112 + (i % 2) * 148, 48 + (i // 2) * 62
    cd += (f'<g class="pop"{c.d(0.2 + i * 0.15)}><rect x="{x}" y="{y}" width="140" height="54" rx="9" fill="{SURF}" stroke="{BORD}" stroke-width="1.2"/>'
           f'<rect x="{x}" y="{y + 10}" width="3" height="34" rx="1.5" fill="{col}"/>'
           f'<text x="{x + 12}" y="{y + 20}" font-size="10" fill="{MUT}">{lab}</text>'
           f'<text x="{x + 12}" y="{y + 42}" font-size="17" font-weight="800" fill="{INK_}">{val}</text></g>')
rows = [('Youssef Tarek', 'Lost Pyramid', 'Paid', ACC), ('Omar Khaled', 'Zombie Escape', 'Paid', ACC),
        ('Mariam Adel', 'Secret Prison', 'Cancelled', DANG), ('Sarah Ahmed', 'The Cyber Vault', 'Pending', EDIT)]
gr = (f'<text x="112" y="190" font-size="11" font-weight="700" fill="{INK_}">Top Bookings</text>'
      f'<rect x="112" y="198" width="288" height="20" rx="5" fill="{SURF2}"/>'
      f'<g font-size="9.5" font-weight="700" fill="{MUT}"><text x="120" y="211">Customer</text><text x="215" y="211">Room</text><text x="340" y="211">Status</text></g>')
for i, (cust, room, st, col) in enumerate(rows):
    y = 222 + i * 20
    gr += (f'<g class="in"{c.d(1.0 + i * 0.15)}><rect x="112" y="{y}" width="288" height="18" fill="{SURF if i % 2 else BG_}"/>'
           f'<text x="120" y="{y + 13}" font-size="10" fill="{INK_}">{cust}</text><text x="215" y="{y + 13}" font-size="10" fill="{INK_}">{room}</text>'
           f'<rect x="336" y="{y + 3}" width="58" height="13" rx="6.5" fill="{col}" fill-opacity=".2"/>'
           f'<text x="365" y="{y + 13}" text-anchor="middle" font-size="9" font-weight="700" fill="{col}">{st}</text></g>')
art = f'''<g transform="translate(450 112)" font-family="'Segoe UI', -apple-system, Helvetica, Arial, sans-serif">
<rect x="-6" y="-6" width="422" height="350" rx="16" fill="#000" opacity=".35"/>
<rect width="410" height="338" rx="12" fill="{BG_}" stroke="{BORD}" stroke-width="1.5"/>
<path d="M0 12 a12 12 0 0 1 12 -12 h386 a12 12 0 0 1 12 12 v14 h-410 z" fill="#0e1524"/>
<text x="12" y="17" font-size="10" fill="{MUT}">Escape Room Management System</text>
<g stroke="{MUT}" stroke-width="1.2"><line x1="352" y1="13" x2="360" y2="13"/><rect x="370" y="9" width="8" height="8" fill="none"/><line x1="389" y1="9" x2="397" y2="17"/><line x1="397" y1="9" x2="389" y2="17"/></g>
<rect x="0" y="26" width="104" height="312" fill="#0c1222"/>
<g transform="translate(0 0)">
<text x="52" y="52" text-anchor="middle" font-size="10.5" font-weight="800" fill="{ACCL}" letter-spacing=".6">ESCAPE ROOM</text>
{sb}
</g>
<text x="112" y="42" font-size="13" font-weight="700" fill="{INK_}">Welcome, Admin</text>
<text x="400" y="42" text-anchor="end" font-size="9.5" fill="{MUT}">Tuesday, 09 Jun 2026 <tspan class="tick">|</tspan> 18:42</text>
{cd}
{gr}
</g>
<g transform="translate(838 452)"><g class="bob">
<circle r="22" fill="{GOLD}" opacity=".95"/><circle cy="-3" r="6" fill="#5a4205"/><path d="M-3 0 h6 l2 11 h-10 z" fill="#5a4205"/>
</g></g>'''
c.css.add('.hov{opacity:0;animation:hov 7s ease-in-out infinite both}'
          '@keyframes hov{0%{opacity:0}4%,16%{opacity:1}22%,100%{opacity:0}}'
          '.tick{animation:blink 1s steps(1) infinite}')
page('project-6.svg', 'Escape Room Management System dashboard', 'DESKTOP APP · C#', ['Escape Room', 'Management'],
     ['Bookings · reports · leaderboard'], ['C#', 'Windows Forms', 'SQL Server'], art, c)

# ── Finance Flare ────────────────────────────────────────────────────
c = Cover()
inc, exp = [70, 85, 80, 100, 110, 125], [55, 60, 70, 65, 75, 70]
base, bars, tops = 300, '', []
for i in range(6):
    x = 34 + i * 44
    bars += (f'<rect class="up" x="{x}" y="{base - inc[i]}" width="17" height="{inc[i]}" rx="4" fill="{EM}"{c.d(0.2 + i * 0.12)}/>'
             f'<rect class="up" x="{x + 20}" y="{base - exp[i]}" width="17" height="{exp[i]}" rx="4" fill="{ORANGE}"{c.d(0.26 + i * 0.12)}/>'
             f'<text x="{x + 18}" y="{base + 22}" text-anchor="middle" fill="{MUTED}" font-size="12">{"JFMAMJ"[i]}</text>')
    tops.append((x + 8.5, base - inc[i] - 18))
fc = [tops[-1], (322, 140), (352, 112)]
art = f'''<g transform="translate(470 120)" font-family="{F}">
{panel(0, 0, 380, 350)}
<text x="24" y="40" font-size="15" font-weight="700" fill="{INK}">Cash flow</text>
<g font-size="12" fill="{MUTED}"><circle cx="170" cy="36" r="5" fill="{EM}"/><text x="180" y="40">Income</text>
<circle cx="240" cy="36" r="5" fill="{ORANGE}"/><text x="250" y="40">Expenses</text>
<line x1="314" y1="36" x2="330" y2="36" stroke="{GOLD}" stroke-width="2.5" stroke-dasharray="4 3"/><text x="334" y="40">Return</text></g>
<line x1="20" y1="{base}" x2="360" y2="{base}" stroke="#2f3d50" stroke-width="1.5"/>
<line x1="300" y1="70" x2="300" y2="{base}" stroke="{LINE}" stroke-width="1.5" stroke-dasharray="3 5"/>
{bars}
{c.draw(tops, 1.0, stroke=GOLD, stroke_width=3, stroke_linejoin="round", stroke_linecap="round")}
<path class="flow" d="M{fc[0][0]:g} {fc[0][1]:g} L{fc[1][0]} {fc[1][1]} L{fc[2][0]} {fc[2][1]}" fill="none" stroke="{GOLD}" stroke-width="3" stroke-linecap="round"/>
<circle class="ring" cx="352" cy="112" r="8" fill="none" stroke="{GOLD}" stroke-width="2"/>
<circle cx="352" cy="112" r="6" fill="{GOLD}"/>
</g>
<g transform="translate(452 452)"><g class="bob">
<circle r="26" fill="{GOLD}"/><circle r="19" fill="none" stroke="#a87f10" stroke-width="2"/>
<text y="9" text-anchor="middle" font-family="{F}" font-size="26" font-weight="800" fill="#5a4205">$</text></g></g>'''
page('project-finance.svg', 'Finance Flare', 'TEAM PROJECT · C++', ['Finance', 'Flare'],
     ['Income · expenses · investment returns'], ['C++', 'OOP', 'File I/O'], art, c, glow=GOLD)

# ── Bank Management System ───────────────────────────────────────────
c = Cover()


def klass(x, y, w, name, head, dl, fields=(64, 44)):
    f = ''.join(f'<rect x="{x + 14}" y="{y + 38 + i * 12}" width="{fw}" height="6" rx="3" fill="{LINE}"/>' for i, fw in enumerate(fields))
    return (f'<g class="pop"{c.d(dl)}><rect x="{x}" y="{y}" width="{w}" height="64" rx="10" fill="#0a1e30" stroke="{LINE}" stroke-width="2"/>'
            f'<path d="M{x} {y + 10} a10 10 0 0 1 10 -10 h{w - 20} a10 10 0 0 1 10 10 v18 h-{w} z" fill="{head}"/>'
            f'<text x="{x + w / 2:g}" y="{y + 20}" text-anchor="middle" font-size="15" font-weight="700" fill="{INK}">{name}</text>{f}</g>')


art = f'''<g font-family="{F}">
{klass(600, 118, 130, 'Person', '#163a5c', 0.1, (80, 56))}
<path d="M665 182 L657 196 L673 196 Z" fill="#061522" stroke="{EM2}" stroke-width="2.5" stroke-linejoin="round"/>
{c.draw([(665, 196), (665, 232)], 0.5, stroke=EM2, stroke_width=2.5)}
{c.draw([(665, 232), (541, 232), (541, 266)], 0.75, stroke=EM2, stroke_width=2.5)}
{c.draw([(665, 232), (665, 266)], 0.75, stroke=EM2, stroke_width=2.5)}
{c.draw([(665, 232), (789, 232), (789, 266)], 0.75, stroke=EM2, stroke_width=2.5)}
{klass(485, 266, 112, 'Client', '#0b4a3c', 1.3)}
{klass(609, 266, 112, 'Employee', '#173e6e', 1.45)}
{klass(733, 266, 112, 'Admin', '#5a420c', 1.6)}
<g class="in"{c.d(1.9)}>
<rect x="485" y="384" width="120" height="58" rx="10" fill="#0f1826" stroke="{LINE}" stroke-width="2"/>
<text x="545" y="409" text-anchor="middle" font-size="15" font-weight="700" fill="{INK}">Client 100</text>
<text x="545" y="430" text-anchor="middle" font-size="13" fill="{ORANGE}">sent</text>
<rect x="725" y="384" width="120" height="58" rx="10" fill="#0f1826" stroke="{LINE}" stroke-width="2"/>
<text x="785" y="409" text-anchor="middle" font-size="15" font-weight="700" fill="{INK}">Client 101</text>
<text x="785" y="430" text-anchor="middle" font-size="13" fill="{EM2}">received</text>
<path class="flow" d="M611 413 H712" stroke="{GOLD}" stroke-width="2.5" fill="none"/>
<path d="M712 406 L722 413 L712 420 Z" fill="{GOLD}"/>
<text x="665" y="398" text-anchor="middle" font-size="15" font-weight="800" fill="{GOLD}">$300.00</text>
</g>
<g class="coin"><circle cx="626" cy="413" r="10" fill="{GOLD}"/><text x="626" y="418" text-anchor="middle" font-size="13" font-weight="800" fill="#5a4205">$</text></g>
</g>'''
c.css.add('.coin{animation:coin 2.6s cubic-bezier(.5,0,.5,1) infinite 2.2s both}'
          '@keyframes coin{0%{opacity:0;transform:translateX(0)}15%{opacity:1}80%{opacity:1;transform:translateX(74px)}100%{opacity:0;transform:translateX(74px)}}')
page('project-bank.svg', 'Bank Management System class hierarchy', 'C++ · OOP', ['Bank', 'Management'],
     ['Admin · employee · client roles'], ['C++', 'Inheritance', 'File I/O'], art, c)

# ── Sales Performance (Northwind) ────────────────────────────────────
c = Cover()
avg = [('1996', 34.7, BLUE), ('1997', 51.4, BLUE), ('1998', 88.1, EM)]
base, bars = 336, ''
for i, (yr, v, col) in enumerate(avg):
    h, x = round(v / 88.1 * 150), 50 + i * 110
    bars += (f'<rect class="up" x="{x}" y="{base - h}" width="70" height="{h}" rx="6" fill="{col}"{c.d(0.6 + i * 0.25)}/>'
             f'<text class="in" x="{x + 35}" y="{base - h - 10}" text-anchor="middle" font-size="16" font-weight="800" fill="{INK}"{c.d(1.3 + i * 0.25)}>${v}K</text>'
             f'<text x="{x + 35}" y="{base + 24}" text-anchor="middle" font-size="13" fill="{MUTED}">{yr}</text>')
art = f'''<g transform="translate(470 108)" font-family="{F}">
{panel(0, 0, 380, 384)}
<g class="in"{c.d(0.1)}><rect x="20" y="20" width="165" height="72" rx="10" fill="#172232"/>
<text x="34" y="44" font-size="12" fill="{MUTED}">Total sales</text><text x="34" y="77" font-size="27" font-weight="800" fill="#eef3f9">$1.27M</text></g>
<g class="in"{c.d(0.25)}><rect x="195" y="20" width="165" height="72" rx="10" fill="#172232"/>
<text x="209" y="44" font-size="12" fill="{MUTED}">Eastern region</text><text x="209" y="77" font-size="27" font-weight="800" fill="#eef3f9">52%</text>
<rect x="282" y="62" width="64" height="8" rx="4" fill="{LINE}"/><rect class="grow" x="282" y="62" width="33" height="8" rx="4" fill="{EM}" style="animation-delay:.6s"/></g>
<text x="20" y="128" font-size="13" font-weight="700" fill="{MUTED}">Average sales per month</text>
<g class="pop"{c.d(2.3)}><rect x="282" y="110" width="78" height="28" rx="14" fill="#2a2208" stroke="{GOLD}"/>
<text x="321" y="129" text-anchor="middle" font-size="14" font-weight="800" fill="{GOLD}">↑ 2.5×</text></g>
<line x1="20" y1="{base}" x2="360" y2="{base}" stroke="#2f3d50" stroke-width="1.5"/>
{bars}
</g>'''
page('project-sales.svg', 'Sales Performance Analytics dashboard', 'LIVE DASHBOARD', ['Sales', 'Performance'],
     ['Northwind orders, 1996–1998'], ['Excel', 'Pivot Tables', 'Chart.js'], art, c, glow=BLUE)

# ── Candy Line Sales ─────────────────────────────────────────────────
c = Cover()
monthly = [129755, 140837, 174506, 201610, 192675, 168083, 187732, 197811, 263977, 568292, 1029842, 261876,
           316576, 311419, 205735, 206150, 273438, 286678, 327143, 461507, 320751, 552924, 1089056, 372805,
           339549, 358191, 374268, 261632, 457863]
x0, x1, y0, y1 = 24, 356, 334, 176
pts = [(round(x0 + i * (x1 - x0) / 28, 1), round(y0 - v / 1089056 * (y0 - y1), 1)) for i, v in enumerate(monthly)]
area = 'M' + ' L'.join(f'{x:g} {y:g}' for x, y in pts) + f' L{x1} {y0} L{x0} {y0} Z'
peaks = ''.join(f'<circle class="ring" cx="{pts[i][0]:g}" cy="{pts[i][1]:g}" r="6" fill="none" stroke="{GOLD}" stroke-width="2"/>'
                f'<g class="pop"{c.d(2.2 + k * 0.3)}><circle cx="{pts[i][0]:g}" cy="{pts[i][1]:g}" r="5" fill="{GOLD}"/>'
                f'<text x="{pts[i][0]:g}" y="{pts[i][1] - 12:g}" text-anchor="middle" font-size="13" font-weight="800" fill="{GOLD}">Nov</text></g>'
                for k, i in enumerate((10, 22)))
circ = 2 * math.pi * 28
c.css.add(f'.donut{{stroke-dasharray:{circ * .39:.1f} {circ:.1f};animation:donut 7s ease-out infinite .4s both}}'
          f'@keyframes donut{{0%{{stroke-dasharray:0 {circ:.1f}}}25%,90%{{stroke-dasharray:{circ * .39:.1f} {circ:.1f}}}100%{{stroke-dasharray:0 {circ:.1f}}}}}')
years = ''.join(f'<text x="{pts[i][0]:g}" y="{y0 + 22}" text-anchor="{a}" font-size="13" fill="{MUTED}">{t}</text>'
                for i, t, a in ((0, '2003', 'start'), (12, '2004', 'middle'), (24, '2005', 'middle')))
art = f'''<g transform="translate(470 108)" font-family="{F}">
{panel(0, 0, 380, 384)}
<g class="in"{c.d(0.1)}><rect x="20" y="20" width="160" height="72" rx="10" fill="#172232"/>
<text x="34" y="44" font-size="12" fill="{MUTED}">Total sales</text><text x="34" y="77" font-size="27" font-weight="800" fill="#eef3f9">$10.03M</text></g>
<g transform="translate(228 56)"><circle r="28" fill="none" stroke="{LINE}" stroke-width="11"/>
<circle class="donut" r="28" fill="none" stroke="{EM}" stroke-width="11" transform="rotate(-90)"/>
<text y="5" text-anchor="middle" font-size="13" font-weight="800" fill="{INK}">39%</text></g>
<text x="270" y="52" font-size="13" font-weight="700" fill="{INK}">Classic</text><text x="270" y="69" font-size="13" font-weight="700" fill="{INK}">Cars</text>
<text x="20" y="132" font-size="13" font-weight="700" fill="{MUTED}">Monthly sales, 2003–2005</text>
<line x1="20" y1="{y0}" x2="360" y2="{y0}" stroke="#2f3d50" stroke-width="1.5"/>
<path class="in" d="{area}" fill="url(#area)"{c.d(1.2)}/>
{c.draw(pts, 0.4, stroke=EM, stroke_width=2.5, stroke_linejoin="round", stroke_linecap="round")}
{peaks}
{years}
</g>'''
page('project-candy.svg', 'Candy Line Sales Overview dashboard', 'LIVE DASHBOARD', ['Candy Line', 'Sales'],
     ['307 orders · 7 product lines · 19 countries'], ['Excel', 'Statistics', 'Chart.js'], art, c,
     defs=f'<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{EM}" stop-opacity=".4"/><stop offset="1" stop-color="{EM}" stop-opacity="0"/></linearGradient>')
