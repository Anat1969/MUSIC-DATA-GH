# -*- coding: utf-8 -*-
"""בונה את המאמר מתוכן אחד לשלושה פלטים:
   print/article-a4.html  - דפי A4 לייצוא ל-PDF (tools/make_pdf.js)
   article.html           - עמוד המגזין באתר
   datasong-article.docx  - גרסה לעריכה (tools/build_docx.py)

תבנית אחת לכל הדפים (ענת, 2026-10-27): רקע לבן, בלי עמודים כהים ובלי מסגרות,
תמונה ריבועית אחת באותו גודל ובאותו מיקום בכל דף, עמודת צד קבועה (מספר, כותרת,
תווית, גרפיקה), וטקסט בשני טורים מתחת לתמונה. ראו PAGE_SPEC.

הרצה מתיקיית השורש:  python3 tools/build_article.py && node tools/make_pdf.js
"""
import json, html, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from article_content import *  # noqa

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
E = html.escape

# המידות של התבנית, במילימטרים. כל דף משתמש באותן משבצות.
PAGE_SPEC = dict(w=210, h=297, margin=12, img=129.8, gap=6)

def series(work_id):
    with open(os.path.join(ROOT, work_id + '.json'), encoding='utf-8') as f:
        return json.load(f)['melody']

def line_d(v, w, h, pad=2):
    mn, mx = min(v), max(v); r = (mx - mn) or 1
    return ' '.join(f"{'L' if i else 'M'}{w*i/(len(v)-1):.2f} {pad+(h-2*pad)*(1-(x-mn)/r):.2f}" for i, x in enumerate(v))

def spark_svg(work_id):
    return (f'<svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">'
            f'<path d="{line_d(series(work_id), 100, 24)}" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>')

# ---------------------------------------------------------------- הגרפיקה של עמודת הצד
def score_svg(work_id, caption):
    """הפרטיטורה בארבעה נתיבים. ציור מסביר, לא פלט של המנוע:
    הרמוניה כמדרגות, ביס כקו מוחלק, קצב כסימון בנקודות מפנה."""
    v = series(work_id); n = len(v); W, LH = 640, 22
    mn, mx = min(v), max(v); r = (mx - mn) or 1
    norm = [(x - mn) / r for x in v]
    k = max(2, n // 12)
    sm = [sum(norm[max(0, i-k):i+k+1]) / len(norm[max(0, i-k):i+k+1]) for i in range(n)]
    X = lambda i: W * i / (n - 1)
    Y = lambda x: LH - 3 - (LH - 8) * x
    def lane(j, label, inner):
        return (f'<g transform="translate(0 {j*(LH+8)})"><text x="{W+70}" y="{LH-6}" class="ln">{label}</text>'
                f'<line x1="0" y1="{LH}" x2="{W}" y2="{LH}" class="base"/>{inner}</g>')
    mel = ' '.join(f"{'L' if i else 'M'}{X(i):.1f} {Y(x):.1f}" for i, x in enumerate(norm))
    step = max(1, n // 6); har = ''
    for a in range(0, n - 1, step):
        b = min(n - 1, a + step); lvl = sum(sm[a:b+1]) / len(sm[a:b+1])
        har += f'<rect x="{X(a):.1f}" y="{Y(lvl)-1.5:.1f}" width="{X(b)-X(a)-1:.1f}" height="3"/>'
    bas = ' '.join(f"{'L' if i else 'M'}{X(i):.1f} {Y(x):.1f}" for i, x in enumerate(sm))
    d = [abs(norm[i+1]-norm[i]) for i in range(n-1)]
    floor = 0.10
    hits = [i for i in range(1, n-2) if d[i] >= d[i-1] and d[i] >= d[i+1] and d[i] > floor]
    per = ''.join(f'<line x1="{X(i):.1f}" y1="6" x2="{X(i):.1f}" y2="{LH}" class="hit"/>' for i in hits)
    body = (lane(0, 'מנגינה', f'<path d="{mel}" class="pl"/>') + lane(1, 'הרמוניה', har)
            + lane(2, 'ביס', f'<path d="{bas}" class="pl thick"/>') + lane(3, 'קצב', per))
    return (f'<figure class="graphic score"><svg viewBox="0 0 {W+70} {4*(LH+8)}">{body}</svg>'
            f'<figcaption>{E(caption)}</figcaption></figure>')

def readings_svg():
    """שלוש הקריאות של יום התנועה זו מעל זו: נקודות, קו, מבנים."""
    v = series('03_daily_traffic'); mx = max(v); n = len(v); W, H = 200, 60
    dots = ''.join(f'<circle cx="{3+(W-6)*i/(n-1):.1f}" cy="{H-3-(H-8)*x/mx:.1f}" r="1.6"/>' for i, x in enumerate(v))
    bw = W / n
    bars = ''.join(f'<rect x="{i*bw+bw*.14:.1f}" y="{H-max(1.5,(H-4)*x/mx):.1f}" width="{bw*.72:.1f}" height="{max(1.5,(H-4)*x/mx):.1f}"/>' for i, x in enumerate(v))
    def row(j, label, inner):
        return f'<g transform="translate({(2-j)*(W+30)} 0)"><text x="{W}" y="{H+16}" class="ln">{label}</text>{inner}</g>'
    body = (row(0, 'הנתונים', f'<g class="fill">{dots}</g>')
            + row(1, 'הזמן', f'<path d="{line_d(v, W, H, 3)}" class="pl"/>')
            + row(2, 'המקום', f'<g class="fill">{bars}</g>'))
    return (f'<figure class="graphic"><svg viewBox="0 0 {3*W+60} {H+20}">{body}</svg>'
            f'<figcaption>יום התנועה בשלוש קריאות.</figcaption></figure>')

def ruled_svg():
    """משטח מעוקל שנבנה כולו מקווים ישרים: שתי קורות מוטות והמיתרים ביניהן."""
    W, H, n = 700, 150, 46
    a0, a1 = (10, 14), (690, 120)       # הקורה העליונה
    b0, b1 = (10, 140), (690, 30)       # הקורה התחתונה
    lerp = lambda p, q, t: (p[0] + (q[0]-p[0])*t, p[1] + (q[1]-p[1])*t)
    lines = ''
    for i in range(n + 1):
        t = i / n; p = lerp(a0, a1, t); q = lerp(b0, b1, 1 - t)
        lines += f'<line x1="{p[0]:.1f}" y1="{p[1]:.1f}" x2="{q[0]:.1f}" y2="{q[1]:.1f}"/>'
    return (f'<figure class="graphic ruled"><svg viewBox="0 0 {W} {H}"><g class="rl">{lines}</g></svg>'
            f'<figcaption>מיתרים ישרים בין שתי קורות מוטות יוצרים משטח מעוקל. ציור מסביר.</figcaption></figure>')

def quote_html():
    return ('<blockquote class="graphic pull"><p lang="de" dir="ltr">Ich nenne die Architektur eine erstarrte Musik.</p>'
            '<p class="he">"אני קורא לאדריכלות מוזיקה שקפאה."</p><cite>גתה, בשיחה עם אקרמן, 1829</cite></blockquote>')

def cover_band():
    """שמונת קווי הנתונים זה לצד זה: הסדרה כולה במבט אחד."""
    cells = ''.join(f'<div class="sp"><svg viewBox="0 0 100 40" preserveAspectRatio="none"><path d="{line_d(series(w["id"]),100,40,3)}" class="pl" vector-effect="non-scaling-stroke"/></svg><span>{i+1:02d} {E(w["name"])}</span></div>'
                    for i, w in enumerate(WORKS))
    return f'<figure class="graphic sparks">{cells}</figure>'

def closing_band():
    srcs = ''.join(f'<li>{E(s)}</li>' for s in SOURCES)
    return (f'<div class="graphic notes"><div><h4>הערת הדמיה</h4><p>{E(NOTE.split(": ", 1)[-1])}</p></div>'
            f'<div><h4>מקורות</h4><ol>{srcs}</ol></div><div><h4>קולופון</h4><p>{E(COLOPHON)}</p></div></div>')

# ---------------------------------------------------------------- הדפים
def pages():
    """כל דף: תמונה, מספר, כותרת, תווית, קו נתונים (אופציונלי), גוף, תובנה, גרפיקה."""
    P = []
    P.append(dict(kind='cover', img='hero-sq', num='', title=None, label=KICKER, spark=None,
                  body=[LEDE], insight=None, caption=BYLINE, graphic=cover_band(),
                  alt='ביתן הגל: חזית של להבים לבנים שגובהם עוקב אחרי גל קול'))
    imgs = ['ch1_frozen_music', 'ch2_ruled_shell', 'ch3_three_readings']
    labels = ['GOETHE, 1829', 'IANNIS XENAKIS, EXPO 58', 'TIME, SPACE, IMAGE']
    graphics = [quote_html(), ruled_svg(), readings_svg()]
    alts = ['חזית של אולם קונצרטים עשויה להבי זכוכית, כמו גל קול שקפא',
            'ביתן של קליפות בטון מעוקלות שנבנו מקווים ישרים',
            'גלריה שקו הגג שלה הוא גרף בשני שיאים, משתקף במים ומטיל צל']
    for c, im, lb, g, al in zip(CHAPTERS, imgs, labels, graphics, alts):
        P.append(dict(kind='chapter', img=im, num=c['n'], title=c['title'], label=lb, spark=None,
                      body=c['body'], insight=None, caption=c['insight'], graphic=g, alt=al))
    for i, w in enumerate(WORKS):
        P.append(dict(kind='work', img=w['id'], num=f'{i+1:02d}', title=w['name'], label=w['latin'], spark=w['id'],
                      body=[('הנתונים. ', w['data']), ('הצליל. ', w['sound'])],
                      insight=None, caption=w['image'], graphic=score_svg(w['id'], f'הפרטיטורה של "{w["name"]}". ציור מסביר.'),
                      alt=w['image']))
    body = [PLANNING] + [f'{k}. {s}' for k, s in enumerate(STEPS, 1)]
    P.append(dict(kind='closing', img=None, num='4', title=PLANNING_TITLE, label='DATASONG', spark=None,
                  body=body, insight=None, caption=QUESTION, graphic=closing_band(), alt=''))
    return P

def para(p):
    if isinstance(p, tuple):
        return f'<p><b>{E(p[0])}</b>{E(p[1])}</p>'
    return f'<p>{E(p)}</p>'

def page_html(pg, i, src):
    """אותו HTML לדף ה-A4 ולמקטע באתר. src(name) מחזיר את נתיב התמונה."""
    if pg['img']:
        figure = (f'<figure class="pimg"><img src="{src(pg["img"])}" alt="{E(pg["alt"])}">'
                  f'<span class="hadmaya">הדמיה</span></figure>')
    else:   # דף הסיום: כל היצירות ברשת אחת, באותה משבצת
        cells = ''.join(f'<img src="{src(w["id"])}" alt="">' for w in WORKS) + f'<img src="{src("hero-sq")}" alt="">'
        figure = f'<figure class="pimg grid">{cells}<span class="hadmaya">הדמיות</span></figure>'
    if pg['kind'] == 'cover':
        head = f'<div class="label">{E(pg["label"])}</div>'
        title = f'<h1><span class="t1">{E(TITLE_1)}</span><span class="t2">{E(TITLE_2)}</span></h1>'
    else:
        head = (f'<div class="num">{E(pg["num"])}</div><h2>{E(pg["title"])}</h2><div class="label">{E(pg["label"])}</div>'
                + (spark_svg(pg['spark']) if pg['spark'] else ''))
        title = ''
    cap_cls = 'byline' if pg['kind'] == 'cover' else 'caption'
    side = f'<aside class="side"><div class="side-top">{head}</div><p class="{cap_cls}">{E(pg["caption"])}</p></aside>'
    band = f'<div class="band">{pg["graphic"]}</div>'
    body = ''.join(para(p) for p in pg['body'])
    if pg['insight']:
        body += f'<p class="insight">{E(pg["insight"])}</p>'
    return (f'<section class="page {pg["kind"]}" data-n="{i+1}">{figure}{side}'
            f'<div class="body">{title}<div class="cols">{body}</div></div>{band}')

COLOPHON_UNIFORM = ("כל הדפים לבנים ובנויים מאותה תבנית: תמונה ריבועית ברוחב חתך הזהב של הדף, תמיד באותו מקום, "
                    "עמודת צד עם המספר, הכותרת והגרפיקה, וטקסט בשני טורים מתחתיה.")

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500&family=Frank+Ruhl+Libre:wght@300;500;700&display=swap" rel="stylesheet">')

def build_print():
    src = lambda n: f'img/{n}.jpg'
    out = []
    for i, pg in enumerate(pages()):
        out.append(page_html(pg, i, src)
                   + f'<footer class="run"><span>DataSong. {E(TITLE_1)} {E(TITLE_2)}</span><span class="pn">{i+1:02d}</span></footer></section>')
    css = open(os.path.join(ROOT, 'tools', 'article_a4.css'), encoding='utf-8').read()
    doc = (f'<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8"><title>DataSong, המאמר</title>{FONTS}'
           f'<style>{css}</style></head><body>{"".join(out)}</body></html>')
    os.makedirs(os.path.join(ROOT, 'print'), exist_ok=True)
    open(os.path.join(ROOT, 'print', 'article-a4.html'), 'w', encoding='utf-8').write(doc)

def build_web():
    src = lambda n: f'art/{n}.webp'
    secs = ''.join(page_html(pg, i, src) + '</section>' for i, pg in enumerate(pages()))
    css = open(os.path.join(ROOT, 'tools', 'article_web.css'), encoding='utf-8').read()
    doc = f'''<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>{E(TITLE_1)} {E(TITLE_2)} · DataSong</title>
<meta name="description" content="{E(LEDE)}">
<meta name="theme-color" content="#ffffff">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
{FONTS}
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@200;300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<style>{css}</style>
<script src="https://appofapp-gh.vercel.app/ai-menu.js"></script>
</head>
<body class="article">
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
    {secs}
    <div class="dl">
      <a class="btn btn-solid" href="datasong-article.pdf" download>הורדת PDF להדפסה, A4</a>
      <a class="btn btn-line" href="datasong-article.docx" download>גרסה לעריכה, Word</a>
      <a class="btn btn-line" href="index.html#/">לגלריית היצירות</a>
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
    print('built print/article-a4.html and article.html,', len(pages()), 'pages')
