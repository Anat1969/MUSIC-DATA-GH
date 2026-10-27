# -*- coding: utf-8 -*-
"""גרסת Word של המאמר, לעריכה. מקטע לכל דף, ובכל מקטע כותרת עליונה לא מקושרת
עם תמונת רקע בגודל הדף בגוון של אותו דף, כך שהרקע מכסה גם את השוליים.
הרצה מתיקיית השורש: python3 tools/build_docx.py"""
import os, sys, copy
from docx import Document
from docx.shared import Mm, Pt, RGBColor
from docx.enum.section import WD_SECTION
from docx.oxml.ns import qn
from docx.oxml import parse_xml
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from article_content import *  # noqa
from build_article import BG

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TMP = os.path.join(ROOT, 'print', 'bg')
os.makedirs(TMP, exist_ok=True)

def bg_png(hexcolor):
    path = os.path.join(TMP, hexcolor.strip('#') + '.png')
    if not os.path.exists(path):
        Image.new('RGB', (210, 297), hexcolor).save(path)
    return path

def rtl(p):
    pPr = p._p.get_or_add_pPr()
    pPr.append(parse_xml('<w:bidi xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"/>'))
    return p

def run(p, text, size=10, bold=False, color='111111', font='David', italic=False):
    r = p.add_run(text)
    r.bold = bold; r.italic = italic
    r.font.size = Pt(size); r.font.name = font
    r.font.color.rgb = RGBColor.from_string(color)
    rPr = r._r.get_or_add_rPr()
    rPr.rFonts.set(qn('w:cs'), font)
    rPr.append(parse_xml('<w:rtl xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"/>'))
    if bold: rPr.append(parse_xml('<w:bCs xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"/>'))
    rPr.append(parse_xml(f'<w:szCs xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" w:val="{int(size*2)}"/>'))
    return r

def para(doc, text='', size=10, bold=False, color='111111', font='David', after=6, italic=False):
    p = rtl(doc.add_paragraph())
    p.paragraph_format.space_after = Pt(after)
    if text: run(p, text, size, bold, color, font, italic)
    return p

def background(section, hexcolor):
    """תמונה בגודל הדף מאחורי הטקסט, מעוגנת לדף ולא לשוליים."""
    section.header.is_linked_to_previous = False
    hp = section.header.paragraphs[0]
    r = hp.add_run()
    r.add_picture(bg_png(hexcolor), width=Mm(210), height=Mm(297))
    inline = r._r.find('.//' + qn('wp:inline'))
    graphic = inline.find(qn('a:graphic'))
    docpr = inline.find(qn('wp:docPr'))
    anchor = parse_xml(
        '<wp:anchor xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
        'distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="0" behindDoc="1" locked="1" '
        'layoutInCell="1" allowOverlap="1"><wp:simplePos x="0" y="0"/>'
        '<wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH>'
        '<wp:positionV relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionV>'
        f'<wp:extent cx="{Mm(210)}" cy="{Mm(297)}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:wrapNone/></wp:anchor>')
    anchor.append(copy.deepcopy(docpr))
    anchor.append(parse_xml('<wp:cNvGraphicFramePr xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"/>'))
    anchor.append(copy.deepcopy(graphic))
    inline.getparent().replace(inline, anchor)

def new_page(doc, i, first=False):
    sec = doc.sections[0] if first else doc.add_section(WD_SECTION.NEW_PAGE)
    sec.page_width, sec.page_height = Mm(210), Mm(297)
    for m in ('left_margin', 'right_margin', 'top_margin', 'bottom_margin'):
        setattr(sec, m, Mm(12))
    sec.header_distance = Mm(0)
    background(sec, BG[i])
    dark = i >= 4
    return ('F2F2F2', 'A3A3A3') if dark else ('111111', '707070')

def chapter(doc, c, ink, ink2):
    para(doc, c['n'], 30, False, ink, 'Arial', 0)
    para(doc, c['title'], 16, True, ink, 'David', 6)
    for b in c['body']:
        para(doc, b, 10.5, False, ink, 'David', 6)
    para(doc, c['insight'], 12, True, ink, 'David', 14)

def build():
    doc = Document()
    st = doc.styles['Normal']; st.font.name = 'David'; st.font.size = Pt(10.5)
    # 1 שער
    ink, ink2 = new_page(doc, 0, first=True)
    doc.add_picture(os.path.join(ROOT, 'print', 'img', 'hero.jpg'), width=Mm(186))
    rtl(doc.paragraphs[-1])
    para(doc, 'הדמיה', 7, False, ink2, 'Arial', 8)
    para(doc, KICKER, 8, False, ink2, 'Arial', 4)
    para(doc, TITLE_1, 30, False, ink, 'David', 0)
    para(doc, TITLE_2, 30, True, ink, 'David', 8)
    para(doc, LEDE, 11, False, ink, 'David', 8)
    para(doc, BYLINE, 9, False, ink2, 'Arial', 0)
    # 2-3 פרקים
    ink, ink2 = new_page(doc, 1)
    chapter(doc, CHAPTERS[0], ink, ink2); chapter(doc, CHAPTERS[1], ink, ink2)
    para(doc, 'Ich nenne die Architektur eine erstarrte Musik.', 12, False, ink2, 'Arial', 2, italic=True)
    para(doc, '"אני קורא לאדריכלות מוזיקה שקפאה."', 20, False, ink, 'David', 2)
    para(doc, 'גתה, בשיחה עם אקרמן, 1829', 8, False, ink2, 'Arial', 0)
    ink, ink2 = new_page(doc, 2)
    chapter(doc, CHAPTERS[2], ink, ink2)
    # 4-7 יצירות, שתיים בכל דף
    for k in range(4):
        ink, ink2 = new_page(doc, 3 + k + (0 if k == 0 else 0))
        for j, w in enumerate(WORKS[k*2:k*2+2]):
            n = k*2 + j + 1
            doc.add_picture(os.path.join(ROOT, 'print', 'img', w['id'] + '.jpg'), width=Mm(78))
            rtl(doc.paragraphs[-1])
            para(doc, 'הדמיה', 7, False, ink2, 'Arial', 4)
            para(doc, f'{n:02d}  {w["name"]}', 15, True, ink, 'David', 0)
            para(doc, w['latin'], 7, False, ink2, 'Arial', 4)
            for lab, key in (('הנתונים. ', 'data'), ('הצליל. ', 'sound'), ('הדימוי. ', 'image')):
                p = para(doc, '', after=3)
                run(p, lab, 9.5, True, ink); run(p, w[key], 9.5, False, ink)
            para(doc, '', after=8)
    # 8 סיום
    ink, ink2 = new_page(doc, 7)
    para(doc, '4', 30, False, ink, 'Arial', 0)
    para(doc, PLANNING_TITLE, 16, True, ink, 'David', 6)
    para(doc, PLANNING, 10.5, False, ink, 'David', 6)
    for i, s in enumerate(STEPS, 1):
        para(doc, f'{i}. {s}', 10.5, False, ink, 'David', 3)
    para(doc, QUESTION, 18, False, ink, 'David', 12)
    para(doc, NOTE, 8.5, False, ink2, 'David', 8)
    para(doc, 'מקורות', 9, True, ink, 'Arial', 3)
    for s in SOURCES:
        para(doc, s, 8.5, False, ink2, 'David', 2)
    para(doc, COLOPHON, 8.5, False, ink2, 'David', 0)
    out = os.path.join(ROOT, 'datasong-article.docx')
    doc.save(out)
    print('built', out)

if __name__ == '__main__':
    build()
