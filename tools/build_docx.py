# -*- coding: utf-8 -*-
"""גרסת Word של המאמר, לעריכה. אותה תבנית כמו ה-PDF: מקטע לכל דף, רקע לבן בגודל הדף
(תמונה בכותרת העליונה, כדי שהרקע יכסה גם את השוליים), ובכל דף אותו סדר ואותם גדלים:
תמונה ריבועית, מספר, כותרת, תווית, משפט מפתח, טקסט, ופס הגרפיקה (תמונה מ-print/bands).
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
from build_article import pages

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

IMG_MM = 112          # אותו גודל לכל התמונות במסמך
INK, INK2 = '111111', '707070'

def new_page(doc, first=False):
    sec = doc.sections[0] if first else doc.add_section(WD_SECTION.NEW_PAGE)
    sec.page_width, sec.page_height = Mm(210), Mm(297)
    for m in ('left_margin', 'right_margin', 'top_margin', 'bottom_margin'):
        setattr(sec, m, Mm(12))
    sec.header_distance = Mm(0)
    background(sec, '#ffffff')

def picture(doc, path, width):
    doc.add_picture(path, width=Mm(width)); rtl(doc.paragraphs[-1])
    doc.paragraphs[-1].paragraph_format.space_after = Pt(4)

def build():
    doc = Document()
    st = doc.styles['Normal']; st.font.name = 'David'; st.font.size = Pt(10.5)
    for i, pg in enumerate(pages()):
        new_page(doc, first=(i == 0))
        if pg['img']:
            picture(doc, os.path.join(ROOT, 'print', 'img', pg['img'] + '.jpg'), IMG_MM)
        else:
            # דף הסיום: רשת היצירות כתמונה אחת באותו גודל
            from PIL import Image as I
            cells = [I.open(os.path.join(ROOT, 'print', 'img', w['id'] + '.jpg')) for w in WORKS]
            cells.append(I.open(os.path.join(ROOT, 'print', 'img', 'hero-sq.jpg')))
            g, c = 1200, 1200 // 3
            grid = I.new('RGB', (g, g), 'white')
            for k, im in enumerate(cells):
                grid.paste(im.resize((c - 8, c - 8)), ((2 - k % 3) * c + 4, (k // 3) * c + 4))
            gp = os.path.join(TMP, 'grid.jpg'); grid.save(gp, quality=85)
            picture(doc, gp, IMG_MM)
        para(doc, 'הדמיה', 7, False, INK2, 'Arial', 6)
        if pg['kind'] == 'cover':
            para(doc, pg['label'], 8, False, INK2, 'Arial', 4)
            para(doc, TITLE_1, 28, False, INK, 'David', 0)
            para(doc, TITLE_2, 28, True, INK, 'David', 8)
        else:
            para(doc, pg['num'], 26, False, INK, 'Arial', 0)
            para(doc, pg['title'], 15, True, INK, 'David', 0)
            para(doc, pg['label'], 7, False, INK2, 'Arial', 6)
        for b in pg['body']:
            p = para(doc, '', after=4)
            if isinstance(b, tuple):
                run(p, b[0], 10, True, INK); run(p, b[1], 10, False, INK)
            else:
                run(p, b, 10.5 if pg['kind'] == 'cover' else 10, False, INK)
        para(doc, pg['caption'], 11.5 if pg['kind'] != 'cover' else 9, pg['kind'] != 'cover', INK if pg['kind'] != 'cover' else INK2, 'David', 6)
        band = os.path.join(ROOT, 'print', 'bands', f'band-{i+1:02d}.png')
        if os.path.exists(band):
            picture(doc, band, 186)
    out = os.path.join(ROOT, 'datasong-article.docx')
    doc.save(out)
    print('built', out)

if __name__ == '__main__':
    build()
