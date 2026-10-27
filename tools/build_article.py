# -*- coding: utf-8 -*-
"""בונה את המאמר משלושה פלטים מאותו תוכן:
   print/article-a4.html  - שמונה דפי A4 קבועים, לייצוא ל-PDF (tools/make_pdf.js)
   article.html           - עמוד המגזין באתר
   datasong-article.docx  - גרסה לעריכה ב-Word

הרצה מתיקיית השורש:  python3 tools/build_article.py && node tools/make_pdf.js
"""
import json, html, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from article_content import *  # noqa

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
E = html.escape

def series(work_id):
    with open(os.path.join(ROOT, work_id + '.json'), encoding='utf-8') as f:
        return json.load(f)['melody']

def spark(v, w=100, h=24, pad=2):
    mn, mx = min(v), max(v); r = (mx - mn) or 1
    pts = ' '.join(f"{'L' if i else 'M'}{w*i/(len(v)-1):.2f} {pad+(h-2*pad)*(1-(x-mn)/r):.2f}" for i, x in enumerate(v))
    return pts

def spark_svg(work_id, cls='spark'):
    d = spark(series(work_id))
    return (f'<svg class="{cls}" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">'
            f'<path d="{d}" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>')

def glyphs_svg():
    """שלוש הקריאות של יום התנועה: נקודות, קו, מבנים."""
    v = series('03_daily_traffic'); mx = max(v); n = len(v); W, H = 120, 50
    dots = ''.join(f'<circle cx="{4+(W-8)*i/(n-1):.1f}" cy="{H-3-(H-8)*x/mx:.1f}" r="1.3"/>' for i, x in enumerate(v))
    line = spark(v, W, H, 3)
    bw = W / n
    bars = ''.join(f'<rect x="{i*bw+bw*.14:.1f}" y="{H-max(1.5,(H-4)*x/mx):.1f}" width="{bw*.72:.1f}" height="{max(1.5,(H-4)*x/mx):.1f}" opacity="{.45+.55*x/mx:.2f}"/>' for i, x in enumerate(v))
    cell = lambda inner, cap: (f'<figure><svg viewBox="0 0 {W} {H}">{inner}</svg><figcaption>{cap}</figcaption></figure>')
    return ('<div class="glyphs">'
            + cell(f'<g fill="currentColor">{dots}</g>', 'הנתונים')
            + cell(f'<path d="{line}" fill="none" stroke="currentColor" stroke-width="1.3"/>', 'הזמן')
            + cell(f'<g fill="currentColor">{bars}</g>', 'המקום')
            + '</div>')

def score_svg():
    """הפרטיטורה של יום התנועה בארבעה נתיבים. ציור מסביר, לא פלט של המנוע:
    הרמוניה כמדרגות, ביס כקו מוחלק, קצב כסימון בנקודות מפנה."""
    v = series('03_daily_traffic'); n = len(v); W, LH = 400, 26
    mn, mx = min(v), max(v); r = (mx - mn) or 1
    norm = [(x - mn) / r for x in v]
    sm = [sum(norm[max(0, i-2):i+3]) / len(norm[max(0, i-2):i+3]) for i in range(n)]
    X = lambda i: W * i / (n - 1)
    def lane(k, label, inner):
        y = k * (LH + 10)
        return (f'<g transform="translate(0 {y})"><text x="{W+8}" y="{LH-8}" class="ln">{label}</text>'
                f'<line x1="0" y1="{LH}" x2="{W}" y2="{LH}" class="base"/>{inner}</g>')
    mel = ' '.join(f"{'L' if i else 'M'}{X(i):.1f} {LH-2-(LH-4)*x:.1f}" for i, x in enumerate(norm))
    step = max(1, n // 6); har = ''
    for a in range(0, n, step):
        b = min(n - 1, a + step); lvl = sum(sm[a:b+1]) / len(sm[a:b+1])
        har += f'<rect x="{X(a):.1f}" y="{LH-2-(LH-4)*lvl:.1f}" width="{X(b)-X(a):.1f}" height="3"/>'
    bas = ' '.join(f"{'L' if i else 'M'}{X(i):.1f} {LH-2-(LH-4)*x:.1f}" for i, x in enumerate(sm))
    d = [abs(norm[i+1]-norm[i]) for i in range(n-1)]
    hits = [i for i in range(1, n-1) if d[i] >= d[i-1] and d[i] >= d[i+1] and d[i] > 0.12]
    per = ''.join(f'<line x1="{X(i):.1f}" y1="4" x2="{X(i):.1f}" y2="{LH}" class="hit"/>' for i in hits)
    body = (lane(0, 'מנגינה', f'<path d="{mel}" class="pl"/>') + lane(1, 'הרמוניה', har)
            + lane(2, 'ביס', f'<path d="{bas}" class="pl thick"/>') + lane(3, 'קצב', per))
    return (f'<figure class="score"><svg viewBox="0 0 {W+60} {4*(LH+10)}">{body}</svg>'
            f'<figcaption>הפרטיטורה של "שתי שעות שיא": ארבע שכבות שנגזרות מאותה סדרה. ציור מסביר.</figcaption></figure>')

QUOTE = ('<blockquote class="pull"><p lang="de" dir="ltr">Ich nenne die Architektur eine erstarrte Musik.</p>'
         '<p>"אני קורא לאדריכלות מוזיקה שקפאה."</p><cite>גתה, בשיחה עם אקרמן, 1829</cite></blockquote>')

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500&family=Frank+Ruhl+Libre:wght@300;500;700&display=swap" rel="stylesheet">')

def chapter_html(c):
    body = ''.join(f'<p>{E(p)}</p>' for p in c['body'])
    return (f'<section class="chapter"><div class="cnum">{c["n"]}</div><div class="ctext">'
            f'<h2>{E(c["title"])}</h2>{body}<p class="insight">{E(c["insight"])}</p></div></section>')

def work_strip(w, i, img_prefix):
    side = 'right' if i % 2 == 0 else 'left'
    return f'''<div class="strip img-{side}">
  <figure class="wimg"><img src="{img_prefix}{'print/img/' if img_prefix else 'art/'}{w['id']}.{'jpg' if img_prefix else 'webp'}" alt=""><span class="hadmaya">הדמיה</span></figure>
  <div class="wtext">
    <div class="wn">{i+1:02d}</div>
    <h3>{E(w['name'])}</h3>
    <div class="latin">{E(w['latin'])}</div>
    {spark_svg(w['id'])}
    <p><b>הנתונים.</b> {E(w['data'])}</p>
    <p><b>הצליל.</b> {E(w['sound'])}</p>
    <p><b>הדימוי.</b> {E(w['image'])}</p>
  </div>
</div>'''

# ---------------------------------------------------------------- A4 print
BG = ['#ffffff', '#f3f3f3', '#e6e6e6', '#dddddd', '#3e3e3e', '#2e2e2e', '#1f1f1f', '#131313']

def build_print():
    P = '../'
    pages = []
    pages.append(f'''<section class="page cover">
  <div class="cover-img"><img src="img/hero.jpg" alt=""><span class="hadmaya">הדמיה</span></div>
  <div class="cover-text">
    <div class="kicker">{E(KICKER)}</div>
    <h1><span class="t1">{E(TITLE_1)}</span><span class="t2">{E(TITLE_2)}</span></h1>
    <p class="lede">{E(LEDE)}</p>
    <div class="byline">{E(BYLINE)}</div>
  </div>''')
    pages.append('<section class="page">' + chapter_html(CHAPTERS[0]) + chapter_html(CHAPTERS[1]) + QUOTE)
    pages.append('<section class="page">' + chapter_html(CHAPTERS[2]) + glyphs_svg() + score_svg())
    for k in range(4):
        pair = WORKS[k*2:k*2+2]
        pages.append('<section class="page works">' + ''.join(work_strip(w, k*2+j, P) for j, w in enumerate(pair)) + '<div class="divider"></div>')
    steps = ''.join(f'<li>{E(s)}</li>' for s in STEPS)
    thumbs = ''.join(f'<img src="img/{w["id"]}-sm.jpg" alt="">' for w in WORKS)
    srcs = ''.join(f'<li>{E(s)}</li>' for s in SOURCES)
    pages.append(f'''<section class="page closing">
  <section class="chapter"><div class="cnum">4</div><div class="ctext">
    <h2>{E(PLANNING_TITLE)}</h2><p>{E(PLANNING)}</p><ol class="steps">{steps}</ol></div></section>
  <p class="question">{E(QUESTION)}</p>
  <div class="thumbs">{thumbs}</div>
  <p class="note">{E(NOTE)}</p>
  <div class="sources"><h4>מקורות</h4><ol>{srcs}</ol></div>
  <p class="colophon">{E(COLOPHON)}</p>''')
    out = []
    for i, p in enumerate(pages):
        dark = i >= 4
        out.append(p.replace('<section class="page', f'<section style="--bg:{BG[i]}" class="{"dark " if dark else ""}page', 1)
                   + f'<footer class="run"><span>DataSong. {E(TITLE_1)} {E(TITLE_2)}</span><span class="pn">{i+1:02d}</span></footer></section>')
    css = open(os.path.join(ROOT, 'tools', 'article_a4.css'), encoding='utf-8').read()
    doc = f'''<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8"><title>DataSong, המאמר</title>{FONTS}<style>{css}</style></head><body>{''.join(out)}</body></html>'''
    os.makedirs(os.path.join(ROOT, 'print'), exist_ok=True)
    open(os.path.join(ROOT, 'print', 'article-a4.html'), 'w', encoding='utf-8').write(doc)

# ---------------------------------------------------------------- web
def build_web():
    chapters = ''.join(chapter_html(c) for c in CHAPTERS)
    works = ''.join(work_strip(w, i, '') for i, w in enumerate(WORKS))
    steps = ''.join(f'<li>{E(s)}</li>' for s in STEPS)
    srcs = ''.join(f'<li>{E(s)}</li>' for s in SOURCES)
    thumbs = ''.join(f'<a href="index.html#/work/{w["id"]}"><img loading="lazy" src="art/{w["id"]}-sm.webp" alt="{E(w["name"])}"></a>' for w in WORKS)
    css = open(os.path.join(ROOT, 'tools', 'article_web.css'), encoding='utf-8').read()
    doc = f'''<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>{E(TITLE_1)} {E(TITLE_2)} · DataSong</title>
<meta name="description" content="{E(LEDE)}">
<meta name="theme-color" content="#e7e5e1">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
{FONTS}
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@200;300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<style>{css}</style>
<script src="https://appofapp-gh.vercel.app/ai-menu.js"></script>
</head>
<body>
<!-- נוצר על ידי tools/build_article.py. לעריכת התוכן: tools/article_content.py -->
<div class="app" id="app">
  <header class="topbar">
    <a class="brand" href="index.html#/" aria-label="DataSong, לדף הבית">
      <svg class="brandmark" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 22 L7 17 L11 19 L15 9 L19 14 L23 6 L29 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/><path d="M3 27 H29" stroke="currentColor" stroke-width="1.2" opacity=".45"/></svg>
      <span>DataSong</span>
    </a>
    <nav class="nav" aria-label="ניווט ראשי">
      <a href="index.html#/">יצירות</a>
      <a href="index.html#/work/01_ashdod_elevation">סטודיו</a>
      <a href="index.html#/data">הנתונים שלך</a>
      <a href="article.html" aria-current="page">מאמר</a>
    </nav>
    <span class="grow"></span>
    <ai-menu chat="https://claude.ai/code/session_017XCpuEgzrjyP4rAvwPMzjL"></ai-menu>
  </header>

  <article class="mag">
    <header class="mag-cover">
      <img src="art/hero.webp" alt="ביתן הגל: חזית של להבים לבנים שגובהם עוקב אחרי גל קול. הדמיה">
      <div class="mag-cover-text">
        <div class="kicker">{E(KICKER)}</div>
        <h1><span class="t1">{E(TITLE_1)}</span><span class="t2">{E(TITLE_2)}</span></h1>
        <p class="lede">{E(LEDE)}</p>
        <div class="byline">{E(BYLINE)}</div>
        <div class="dl">
          <a class="btn btn-solid" href="datasong-article.pdf" download>הורדת PDF להדפסה, A4</a>
          <a class="btn btn-line" href="datasong-article.docx" download>גרסה לעריכה, Word</a>
        </div>
      </div>
    </header>
    <div class="mag-body tone-1">{chapter_html(CHAPTERS[0])}{QUOTE}{chapter_html(CHAPTERS[1])}{chapter_html(CHAPTERS[2])}{glyphs_svg()}{score_svg()}</div>
    <div class="mag-works">{works}</div>
    <div class="mag-close">
      <section class="chapter"><div class="cnum">4</div><div class="ctext">
        <h2>{E(PLANNING_TITLE)}</h2><p>{E(PLANNING)}</p><ol class="steps">{steps}</ol></div></section>
      <p class="question">{E(QUESTION)}</p>
      <div class="thumbs">{thumbs}</div>
      <p class="note">{E(NOTE)}</p>
      <div class="sources"><h4>מקורות</h4><ol>{srcs}</ol></div>
      <p class="colophon">{E(COLOPHON)}</p>
      <div class="dl">
        <a class="btn btn-solid light" href="datasong-article.pdf" download>הורדת PDF להדפסה, A4</a>
        <a class="btn btn-line light" href="index.html#/">לגלריית היצירות</a>
      </div>
    </div>
  </article>
</div>
<script>if('serviceWorker' in navigator && location.protocol==='https:') navigator.serviceWorker.register('sw.js').catch(()=>{{}});</script>
</body>
</html>
'''
    open(os.path.join(ROOT, 'article.html'), 'w', encoding='utf-8').write(doc)

if __name__ == '__main__':
    build_print(); build_web()
    print('built print/article-a4.html and article.html')
