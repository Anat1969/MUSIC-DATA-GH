"use strict";
/* ==========================================================================
   02-CONTENT, ספריית הדוגמאות.
   כל פריט נושא `source` שאומר מאיפה הנתונים. פריטים המסומנים "המחשה"
   מחוללים מנוסחה ואינם מתיימרים לתאר מדידה אמיתית של העולם.
   ========================================================================== */
const SAMPLE_DATA = [
  {id:'01_ashdod_elevation', json:{"title": "פרופיל הגובה של אשדוד: מהים אל השפלה", "hint": "מסע מערב אל מזרח לאורך ~8 קמ. מקור: פרופיל מייצג (משוער)", "melody": [0, 0, 1, 3, 6, 11, 18, 26, 33, 37, 35, 30, 24, 18, 14, 12, 13, 15, 16, 15, 14, 13, 14, 16, 19, 22, 24, 25, 24, 23, 24, 26, 29, 32, 34, 35, 36, 38, 41, 44, 46, 47, 48, 50, 53, 56, 58, 60, 63, 66, 68, 70, 73, 76, 79, 82, 85, 88, 91, 95], "labels": ["חוף", "", "", "", "", "", "", "", "רכס כורכר", "", "", "", "", "שקע", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "מזרח"]}},
  {id:'02_density_transect', json:{"title": "צפיפות מגורים לאורך חתך עירוני", "hint": "נפש לדונם, פאתר אל מרכז אל פאתר. פרופיל מייצג (משוער)", "melody": [16.7, 16.4, 21.9, 19.1, 25.1, 26.5, 27.4, 34.9, 35.7, 44.0, 46.8, 53.1, 62.2, 72.1, 73.2, 80.4, 89.7, 97.6, 99.1, 101.1, 107.9, 101.4, 107.4, 101.0, 96.8, 92.4, 88.8, 87.0, 75.6, 72.2, 66.0, 57.3, 52.4, 42.7, 37.4, 33.8, 33.5, 27.9, 24.1, 23.8, 20.8, 18.0, 20.7, 19.0, 14.7, 16.8, 16.1, 18.6], "labels": null}},
  {id:'03_daily_traffic', json:{"title": "נפח תנועה יומי בצומת עירוני", "hint": "מדד תנועה לפי שעה, 00:00 אל 23:00. פרופיל מייצג (משוער)", "melody": [9.4, 6.7, 10.9, 5.7, 8.0, 14.5, 32.3, 79.6, 105.2, 80.7, 35.9, 13.4, 10.7, 7.1, 10.8, 18.1, 41.6, 77.8, 100.0, 80.8, 41.0, 18.5, 7.0, 9.4], "bass": [23.8, 22.7, 24.4, 22.3, 23.2, 25.8, 32.9, 51.8, 62.1, 52.3, 34.4, 25.4, 24.3, 22.8, 24.3, 27.2, 36.6, 51.1, 60.0, 52.3, 36.4, 27.4, 22.8, 23.8], "labels": ["00:00", "", "", "", "", "", "", "", "שיא בוקר", "", "", "", "", "", "", "", "", "", "שיא ערב", "", "", "", "", "23:00"]}},
  {id:'04_skyline_street', json:{"title": "קו רקיע: גובה מבנים לאורך רחוב", "hint": "מספר קומות לאורך ציר. פרופיל מייצג (משוער)", "melody": [3.1, 4.3, 3.2, 5.9, 7.9, 5.1, 3.7, 12.0, 14.8, 8.8, 5.7, 4.2, 2.8, 4.8, 6.9, 20.2, 21.7, 18.0, 10.0, 6.2, 4.2, 4.2, 7.9, 13.9, 15.9, 12.2, 7.3, 4.8, 3.8, 2.8, 5.8, 9.0, 11.1, 7.9, 4.7, 4.0, 2.9, 3.0, 4.3, 6.1]}},
  {id:'05_population_growth', json:{"title": "גידול אוכלוסייה לאורך 40 שנה", "hint": "אלפי תושבים, שנה אל שנה. פרופיל מייצג (משוער)", "melody": [8.3, 8.7, 9.1, 9.3, 9.8, 10.3, 10.8, 11.3, 11.8, 12.2, 12.5, 13.1, 13.4, 13.8, 14.2, 14.7, 15.2, 15.6, 16.0, 16.4, 16.9, 17.5, 17.9, 18.9, 19.7, 20.3, 20.9, 21.7, 22.4, 23.1, 24.3, 25.6, 26.6, 27.6, 28.4, 29.2, 30.2, 31.2, 32.8, 33.8], "bass": [5.0, 5.2, 5.4, 5.6, 5.9, 6.2, 6.5, 6.8, 7.1, 7.3, 7.5, 7.8, 8.1, 8.3, 8.5, 8.8, 9.1, 9.3, 9.6, 9.9, 10.1, 10.5, 10.8, 11.3, 11.8, 12.2, 12.6, 13.0, 13.5, 13.9, 14.6, 15.4, 16.0, 16.6, 17.0, 17.5, 18.1, 18.7, 19.7, 20.3], "labels": ["שנה 1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "אמצע", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "היום"]}},
  {id:'06_green_transect', json:{"title": "מדד צמחייה (ירוק עירוני) לאורך חתך", "hint": "אחוז כיסוי ירוק, רחוב אל פארק אל רחוב. פרופיל מייצג (משוער)", "melody": [12.2, 17.7, 15.2, 13.0, 15.5, 12.7, 16.1, 19.5, 19.8, 20.4, 20.0, 23.8, 26.8, 35.7, 40.6, 49.4, 54.6, 61.9, 73.0, 80.5, 84.3, 86.5, 86.6, 83.7, 75.9, 71.2, 62.7, 52.7, 44.8, 39.1, 32.6, 29.9, 27.3, 21.1, 21.8, 20.5, 19.3, 15.1, 13.8, 13.6, 13.3, 13.3, 15.8, 17.4], "labels": ["רחוב", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "לב הפארק", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "רחוב"]}},
  {id:'07_air_quality', json:{"title": "איכות אוויר יומית (חלקיקים)", "hint": "ריכוז PM2.5 לפי שעה. פרופיל מייצג (משוער)", "melody": [20.2, 18.4, 19.3, 20.0, 16.9, 21.9, 29.7, 39.4, 44.8, 37.9, 26.1, 22.6, 18.1, 20.1, 21.0, 19.0, 22.1, 32.0, 40.1, 41.9, 37.1, 28.0, 24.7, 21.1], "labels": ["לילה", "", "", "", "", "", "", "", "עומס בוקר", "", "", "", "", "", "", "", "", "", "", "עומס ערב", "", "", "", "לילה"]}},
  {id:'08_lachish_crosssection', json:{"title": "חתך רוחב של נחל לכיש: גדה אל גדה", "hint": "גובה קרקע לרוחב האפיק. פרופיל מייצג (משוער)", "melody": [19.7, 20.6, 21.2, 21.3, 21.4, 21.9, 22.0, 22.2, 23.3, 23.4, 23.6, 24.2, 24.1, 24.7, 24.9, 24.5, 24.5, 24.2, 23.3, 22.0, 19.3, 16.3, 12.6, 10.3, 8.1, 8.2, 10.0, 13.2, 16.3, 19.8, 21.9, 23.5, 24.4, 24.3, 24.7, 24.4, 24.0, 24.4, 23.6, 23.6, 23.5, 23.0, 22.5, 22.3, 21.9, 21.7, 20.8, 20.8, 20.2, 19.8], "labels": ["גדה צפונית", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "אפיק", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "גדה דרומית"]}}
];

/* פרשנות לכל מאגר: מה הנתונים מספרים, ומה האוזן אמורה לתפוס, ולמה.
   ה-preset הוא נקודת פתיחה שמדגישה את אופי המאגר, לא כלל. */
const SAMPLE_NOTES = {
  '01_ashdod_elevation':{
    short:'הקרקע עולה מהמים אל הרכס, צונחת לשקע, ואז מטפסת בלי לחזור.',
    story:'חתך גובה ממערב למזרח: קו המים, רכס הכורכר שחוסם אותו, השקע שמאחוריו, ומשם עלייה מתמדת אל השפלה. זו הצורה שקובעת איפה העיר יכולה הייתה להיבנות.',
    listen:'שלוש תנועות: טיפוס ראשון אל הרכס, נפילה קצרה, ואז עלייה ארוכה שלא נעצרת. הצליל הגבוה ביותר הוא הסוף, לא האמצע, וזה בדיוק ההבדל בין רכס לבין מדרון.',
    preset:{scale:'pent', mel:'harp', har:'pad', bas:'pad', per:'shaker', duration:26, archType:'section', archBays:40}
  },
  '02_density_transect':{
    short:'צפיפות שמתפוצצת במרכז ונרגעת אל הפאתר, קשת סימטרית.',
    story:'נפש לדונם לאורך חתך: פאתר אל מרכז אל פאתר. העלייה תלולה והירידה מתונה, וזה הסיפור, מרכז נבנה מהר יותר משהוא מתפוגג.',
    listen:'קשת אחת גדולה. הפסגה מגיעה קצת אחרי האמצע, ולכן הירידה ארוכה מהעלייה. הדרון מתחת מחזיק את המרכז גם כשהמנגינה כבר יורדת.',
    preset:{scale:'dorian', mel:'piano', har:'choir', bas:'drone', per:'shaker', duration:22, archType:'elevation', archBays:32}
  },
  '03_daily_traffic':{
    short:'יום שלם בצומת: שני שיאים, בוקר וערב, כמעט זהים.',
    story:'נפח תנועה לפי שעה, מחצות לחצות. שני גלים חדים, יציאה לעבודה וחזרה, ובין שניהם שקע צהריים.',
    listen:'המוטיב חוזר פעמיים כמעט זהה: היום מתחרז עם עצמו. שכבת הקצב מתפוצצת בדיוק בשתי הנקודות שבהן העומס נבנה ומתפרק, האוזן שומעת את שעות הפקק לפני שהעין קוראת את התוויות.',
    preset:{scale:'minor', mel:'marimba', har:'pad', bas:'upright', per:'kit', duration:16, archType:'colonnade', archBays:24}
  },
  '04_skyline_street':{
    short:'קו רקיע קופצני: מבנה נמוך, מגדל, נמוך שוב.',
    story:'מספר קומות לאורך רחוב. אין כאן מגמה, יש שכנות: כל מספר הוא בניין אחר, וההפרש בין שכנים הוא בדיוק מה שמרגישים כשהולכים ברחוב.',
    listen:'המאגר הכי "מקוטע" בסט. אין קו מוביל אלא קפיצות, ולכן שכבת הקצב עובדת קשה, כל מגדל הוא חבטה. פעמוני הזכוכית הופכים כל קפיצה לנקודה בודדת במקום לקו רציף.',
    preset:{scale:'pent', mel:'glass', har:'pad', bas:'pad', per:'wood', duration:20, archType:'elevation', archBays:40}
  },
  '05_population_growth':{
    short:'ארבעים שנות גדילה, עלייה שכמעט לא נעצרת.',
    story:'אלפי תושבים, שנה אחר שנה. אין דרמה ואין שיא: יש כיוון אחד, ובשליש האחרון הוא נעשה תלול יותר.',
    listen:'המנגינה כמעט לא יורדת לאורך 34 שניות, חוויה נדירה, כי רוב הדאטה מתנדנד. הקצב דליל, כי אין כאן נקודות מפנה אמיתיות אלא רק תנודות קטנות סביב הכיוון. שימו לב להאצה בשליש האחרון: אותם צעדים בזמן, אבל מרווחים גדולים יותר בגובה.',
    preset:{scale:'major', mel:'choir', har:'harp', bas:'cello', per:'shaker', duration:34, archType:'stack', archBays:40}
  },
  '06_green_transect':{
    short:'יוצאים מרחוב אפור, נכנסים ללב פארק, וחוזרים.',
    story:'אחוז כיסוי ירוק לאורך חתך. הקצוות נמוכים ורועשים, המרכז רחב וגבוה, הפארק לא מתחיל בגדר אלא נבנה בהדרגה.',
    listen:'המאגר הכי "נושם" בסט. הרעש הקטן בקצוות הופך לתנודות עדינות, והמרכז הוא רמה גבוהה ומוחזקת. אם תאריכו את המסע ל-40 שניות זה נשמע כמו כניסה איטית לצל.',
    preset:{scale:'pent', mel:'voxOo', har:'pad', bas:'pad', per:'shaker', duration:30, archType:'section', archBays:44}
  },
  '07_air_quality':{
    short:'מתח סביבתי שעולה בדיוק כשהעיר זזה.',
    story:'ריכוז חלקיקים לפי שעה. אותה צורה של יום התנועה, אבל דחוסה יותר, כי האוויר מתנקה לאט מכפי שהוא מזדהם.',
    listen:'השוו את זה ל"נפח תנועה": אותם שני שיאים, אבל כאן הירידה איטית מהעלייה. הצ׳לו מחזיק את המתח גם אחרי שהשיא עבר, וזה בדיוק ההבדל בין פקק שנגמר לבין אוויר שנשאר.',
    preset:{scale:'minor', mel:'cello', har:'choir', bas:'drone', per:'wood', duration:18, archType:'colonnade', archBays:24}
  },
  '08_lachish_crosssection':{
    short:'שתי גדות ואפיק אחד, צלילה חדה באמצע.',
    story:'גובה הקרקע לרוחב נחל לכיש, מגדה לגדה. הגדות כמעט שטוחות, והאפיק חותך ביניהן, עמק צר בתוך מישור.',
    listen:'ההיפך מכל השאר: כאן השיא הוא למטה. שני מישורים גבוהים ובאמצע נפילה חדה וחזרה. עם נבל, הצלילה נשמעת כמו מפל, ואז המים חוזרים לגובה.',
    preset:{scale:'dorian', mel:'harp', har:'choir', bas:'choir', per:'shaker', duration:24, archType:'section', archBays:50}
  }
};

/* היצירה: שם, והדמיה אדריכלית שמפרשת את צורת הנתונים.
   כל דימוי נבחר כך שהצורה שלו היא הצורה של הסדרה: שתי קשתות לשני שיאי תנועה,
   חריץ לאפיק, ספירלה לגדילה. `see` הוא מה שרואים בדימוי, בלי להגזים. */
const ART = {
  '01_ashdod_elevation':{name:'סרט החוף',
    see:'גג אחד רציף שעולה מקו המים אל הרכס, ונשען על בסיס אבן שנבלע בחול. הקו של הגג הוא קו הגובה.'},
  '02_density_transect':{name:'קרשנדו של מגדלים',
    see:'מגדלים שעולים מהקצוות אל שיא צפוף מעט אחרי האמצע, ונרגעים לטרסות נמוכות. הצללית היא החתך.'},
  '03_daily_traffic':{name:'שתי שעות שיא',
    see:'שתי קמרונות זהות מעל צומת, ושקע ביניהן. עקבות האור של המכוניות הם הזרימה שהנתונים סופרים.'},
  '04_skyline_street':{name:'רחוב של זכוכית',
    see:'מנסרות זכוכית בגבהים שונים לגמרי, צמודות זו לזו. כל קפיצה בגובה היא חבטה בקצב.'},
  '05_population_growth':{name:'ספירלת הגדילה',
    see:'מגדל שגדל ברמפה רציפה, כל סיבוב קצת רחב מקודמו. אין שיא, יש כיוון.'},
  '06_green_transect':{name:'הגג שהפך לפארק',
    see:'ביתן נמוך שגגו המגונן מתרומם לגבעה ירוקה במרכז ויורד חזרה אל הרחוב האפור.'},
  '07_air_quality':{name:'שתי נשימות',
    see:'שתי כיפות ממברנה שקופות מעל כיכר, אובך בפסגות ובהירות בבסיס. אותה צורה של יום התנועה, אבל רכה.'},
  '08_lachish_crosssection':{name:'החריץ',
    see:'שני מישורי אבן שטוחים וחריץ צר ועמוק ביניהם, ובתחתיתו ערוץ מים. כאן השיא הוא למטה.'}
};
const artSrc = (id, sm) => `art/${id}${sm?'-sm':''}.webp`;

/** מיזוג: המספרים מגיעים מקבצי ה-JSON שבתיקייה, הפרשנות נכתבת לצידם. */
const SAMPLES = SAMPLE_DATA.map(s => ({
  id: s.id,
  json: s.json,
  title: s.json.title,
  source: s.json.hint || '',
  ...(SAMPLE_NOTES[s.id] || {}),
  ...(ART[s.id] || {})
}));

/* ==========================================================================
   06-DATA — פענוח קלט, נורמליזציה וסדרות נגזרות.
   ========================================================================== */
const MAX_POINTS = 512;

/** DATA = {title, source, columns:[{name,values,numeric}], labels|null, n} */
let DATA = null;
let resampled = false;

const num = s => {
  if (typeof s === 'number') return isFinite(s) ? s : null;
  if (s == null) return null;
  let t = String(s).trim().replace(/[\s ‏‎]/g,'').replace(/[%₪$€]/g,'');
  if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) t = t.replace(/,/g,'');   // 1,234,567
  if (t === '' || t === '-' || /^(na|n\/a|null|nan|—|–)$/i.test(t)) return null;
  const v = parseFloat(t);
  return isFinite(v) ? v : null;
};

function splitLine(line, d){
  const out=[]; let cur='', q=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(q){
      if(c==='"'){ if(line[i+1]==='"'){cur+='"';i++;} else q=false; }
      else cur+=c;
    }
    else if(c==='"') q=true;
    else if(c===d){ out.push(cur); cur=''; }
    else cur+=c;
  }
  out.push(cur);
  return out.map(s=>s.trim());
}

function pickDelim(line){
  let best=',', bestN=-1;
  for(const d of [',',';','\t','|']){
    const n = splitLine(line,d).length;
    if(n>bestN){bestN=n;best=d;}
  }
  return bestN>1 ? best : ',';
}

/** CSV/TSV → {columns, headerUsed} */
function parseTable(text){
  const lines = text.replace(/^﻿/,'').split(/\r\n|\n|\r/).filter(l=>l.trim()!=='');
  if(!lines.length) return null;
  const d = pickDelim(lines[0]);
  let rows = lines.map(l=>splitLine(l,d));

  // שורה אחת רחבה של מספרים ("0, 3, 6, 11") היא סדרה, לא טבלה — מסובבים אותה.
  if(rows.length===1 && rows[0].length>1 && rows[0].every(c=>num(c)!=null))
    rows = rows[0].map(c=>[c]);

  const width = Math.max(...rows.map(r=>r.length));
  if(width < 1) return null;

  // כותרת? השורה הראשונה לא-מספרית בעוד שהשנייה כן.
  const numCount = r => r.reduce((a,c)=>a+(num(c)!=null?1:0),0);
  const hasHeader = rows.length>1 && numCount(rows[0]) < numCount(rows[1]) && numCount(rows[0]) < width;
  const header = hasHeader ? rows[0] : null;
  const body = hasHeader ? rows.slice(1) : rows;
  if(!body.length) return null;

  const columns=[];
  for(let c=0;c<width;c++){
    const raw = body.map(r=>r[c] ?? '');
    const parsed = raw.map(num);
    const good = parsed.filter(v=>v!=null).length;
    const numeric = good >= Math.max(2, body.length*0.6);
    columns.push({
      name: (header && header[c]) ? header[c] : (numeric ? `עמודה ${c+1}` : `טקסט ${c+1}`),
      values: numeric ? fillGaps(parsed) : raw,
      numeric
    });
  }
  return columns.some(c=>c.numeric) ? {columns, headerUsed:hasHeader} : null;
}

/** חורים בעמודה מספרית — נסגרים בערך האחרון התקף. */
function fillGaps(arr){
  const out=arr.slice();
  let first = out.find(v=>v!=null);
  if(first==null) first=0;
  let last=first;
  for(let i=0;i<out.length;i++){
    if(out[i]==null) out[i]=last; else last=out[i];
  }
  return out;
}

/** מקבל כל קלט — JSON, CSV, עמודת מספרים — ומחזיר את מודל DATA. */
function parseInput(text, fallbackTitle){
  text = String(text||'').trim();
  if(!text) return null;

  if(text[0]==='{' || text[0]==='['){
    try{
      const j = JSON.parse(text);
      if(Array.isArray(j)){
        const v = j.map(num).filter(x=>x!=null);
        if(v.length>1) return finalize({title:fallbackTitle||'נתונים מודבקים',
          columns:[{name:'ערך', values:v, numeric:true}]});
      } else if(j && typeof j==='object'){
        return fromJsonObject(j, fallbackTitle);
      }
    }catch(e){ /* לא JSON תקין — ננסה כטבלה */ }
  }

  const t = parseTable(text);
  if(t) return finalize({
    title: fallbackTitle || 'נתונים מודבקים',
    source: t.headerUsed ? 'טבלה עם שורת כותרת' : 'טבלה ללא כותרת',
    columns: t.columns
  });
  return null;
}

/** הפורמט המקורי {title, melody, bass, labels, hint} — נשמר לתאימות לאחור. */
function fromJsonObject(j, fallbackTitle){
  const columns=[];
  const add=(name,arr)=>{
    const v=(arr||[]).map(num);
    if(v.filter(x=>x!=null).length>1) columns.push({name, values:fillGaps(v), numeric:true});
  };
  add('מנגינה', j.melody);
  add('ליווי', j.bass);
  for(const [k,v] of Object.entries(j)){
    if(['title','melody','bass','labels','hint','source','name'].includes(k)) continue;
    if(Array.isArray(v)) add(k, v);
  }
  if(!columns.length) return null;
  const labels = Array.isArray(j.labels) ? j.labels.map(x=>x==null?'':String(x)) : null;
  if(labels) columns.push({name:'תוויות', values:labels, numeric:false});
  return finalize({
    title: j.title || fallbackTitle || 'מאגר נתונים',
    source: j.source || j.hint || '',
    columns, preferLabels: labels ? columns.length-1 : -1
  });
}

function resample(arr, m, numeric){
  const out=[], L=arr.length;
  for(let k=0;k<m;k++){
    const a=Math.floor(k*L/m), b=Math.max(a+1, Math.floor((k+1)*L/m));
    if(!numeric){ out.push(arr[a]); continue; }
    let s=0,c=0;
    for(let j=a;j<b && j<L;j++){ if(arr[j]!=null){s+=arr[j];c++;} }
    out.push(c ? s/c : 0);
  }
  return out;
}

function finalize(d){
  let n = Math.max(...d.columns.map(c=>c.values.length));
  d.columns.forEach(c=>{
    while(c.values.length<n) c.values.push(c.numeric ? (c.values[c.values.length-1]??0) : '');
  });
  resampled = false;
  if(n > MAX_POINTS){
    d.columns.forEach(c=>{ c.values = resample(c.values, MAX_POINTS, c.numeric); });
    n = MAX_POINTS; resampled = true;
  }
  d.n = n;
  d.source = d.source || '';
  const li = d.preferLabels >= 0 ? d.preferLabels : d.columns.findIndex(c=>!c.numeric);
  d.labelCol = li;
  d.labels = li >= 0 ? d.columns[li].values.map(String) : null;
  delete d.preferLabels;
  return d;
}

/* ---------- סדרות נגזרות ---------- */
function smoothSeries(arr, w){
  if(w<1) return arr.slice();
  return arr.map((_,i)=>{
    let s=0,c=0;
    for(let k=-w;k<=w;k++){ const j=i+k; if(j>=0&&j<arr.length){s+=arr[j];c++;} }
    return s/c;
  });
}
/** ממוצע נע איטי — קו הליווי הרך שעוקב אחרי המגמה. */
function deriveSmooth(arr){ return smoothSeries(arr, Math.max(2, Math.round(arr.length/12))); }

const percentile = (a,p) => {
  const s = a.filter(v=>v>0).sort((x,y)=>x-y);
  return s.length ? s[Math.min(s.length-1, Math.floor(p*s.length))] : 0;
};

/**
 * עוצמת השינוי, מנורמלת 0..1.
 *
 * שתי החלטות, שתיהן נדרשות:
 * 1. הנרמול לפי אחוזון 90 ולא לפי המקסימום — חריג בודד לא מוחק את כל השאר.
 * 2. רצפה של 10% מטווח הסדרה. בלי הרצפה, נרמול יחסי מנפח ריצוד זעיר לסקאלה
 *    מלאה: קו ישר לגמרי — שכל ההפרשים בו שווים — קיבל 50% צפיפות חבטות,
 *    ועקומת גדילה חלקה עם ריצוד עיגול קיבלה 38%. עם הרצפה: 0% ו-15%.
 *    כלומר השאלה היא כמה גדול השינוי ביחס לתמונה כולה, לא רק ביחס לשכניו.
 */
function deriveDelta(arr){
  const d = arr.map((v,i)=> i===0 ? 0 : Math.abs(v-arr[i-1]));
  const range = (Math.max(...arr) - Math.min(...arr)) || 1;
  const ref = Math.max(percentile(d, 0.90), 0.10*range) || 1;
  return d.map(v=>Math.min(1, v/ref));
}

/** ממיר מפרט מקור ("col:2" / "auto:smooth" / "auto:delta" / "off") לסדרת מספרים. */
function seriesFor(spec, smoothW){
  if(!DATA || spec==='off') return null;
  const numericIdx = DATA.columns.map((c,i)=>c.numeric?i:-1).filter(i=>i>=0);
  if(!numericIdx.length) return null;
  const base = smoothSeries(DATA.columns[numericIdx[0]].values, smoothW||0);
  if(spec==='auto:smooth') return deriveSmooth(base);
  if(spec==='auto:delta')  return deriveDelta(base);
  if(spec && spec.startsWith('col:')){
    const i = +spec.slice(4);
    const c = DATA.columns[i];
    if(c && c.numeric) return smoothSeries(c.values, smoothW||0);
  }
  return base;
}
const normOf = arr => {
  const mn=Math.min(...arr), mx=Math.max(...arr), r=(mx-mn)||1;
  return arr.map(v=>(v-mn)/r);
};

/* ==========================================================================
   05-LOGIC · A — תורת הצליל: סולמות ומיפוי דרגות.
   ========================================================================== */
const SCALES = {
  pent:[0,2,4,7,9], major:[0,2,4,5,7,9,11], minor:[0,2,3,5,7,8,10],
  dorian:[0,2,3,5,7,9,10], chromatic:[0,1,2,3,4,5,6,7,8,9,10,11]
};
const mtof = m => 440 * Math.pow(2,(m-69)/12);

/** דרגה בסולם (יכולה לחרוג מהאוקטבה) → תו MIDI. */
function degToMidi(scale, base, steps){
  const per = scale.length;
  const oct = Math.floor(steps/per);
  const deg = ((steps % per) + per) % per;
  return base + oct*12 + scale[deg];
}
const normToSteps = (norm, scale, octaves) =>
  Math.round(Math.max(0,Math.min(1,norm)) * (scale.length*octaves));

/* ==========================================================================
   05-LOGIC · B — buildScore: פונקציה טהורה. נתונים + הגדרות → תווים.
   בלי Tone, בלי DOM. זו הנקודה שמאפשרת גם נגינה חיה וגם רינדור לקובץ.
   ========================================================================== */
function buildScore(S){
  if(!DATA) return null;
  const n = DATA.n, scale = SCALES[S.scale], step = S.duration/n;
  const events = [];
  const series = {};
  const push = e => events.push(e);

  /* ---- שכבה 1 · מנגינה ---- */
  const melRaw = seriesFor(S.mel.src, S.smooth);
  if(S.mel.on && melRaw){
    series.mel = melRaw;
    const nm = normOf(melRaw);
    for(let i=0;i<n;i++){
      push({t:i*step, layer:'mel', i,
        midi:[degToMidi(scale, 52+S.root, normToSteps(nm[i], scale, 2))],
        dur:step*S.legato, vel:0.55+0.35*nm[i]});
    }
  }

  /* ---- שכבה 2 · הרמוניה: טריאדה מהסולם, לא עוד קו יחיד ---- */
  const harRaw = seriesFor(S.har.src, S.smooth);
  if(S.har.on && harRaw){
    series.har = harRaw;
    const nh = normOf(deriveSmooth(harRaw));
    const every = Math.max(2, Math.round(n/16));
    for(let i=0;i<n;i+=every){
      const s0 = normToSteps(nh[i], scale, 1.5);
      push({t:i*step, layer:'har',
        midi:[s0, s0+2, s0+4].map(s=>degToMidi(scale, 45+S.root, s)),
        dur:step*every*1.5, vel:0.4});
    }
  }

  /* ---- שכבה 3 · ביס ---- */
  const basRaw = seriesFor(S.bas.src, S.smooth);
  if(S.bas.on && basRaw){
    series.bas = basRaw;
    const nb = normOf(deriveSmooth(basRaw));
    if(S.bas.inst === 'drone'){
      // דרון: תו יסוד אחד לכל אורך היצירה.
      const med = nb.slice().sort((a,b)=>a-b)[Math.floor(n/2)];
      push({t:0, layer:'bas', midi:[degToMidi(scale, 33+S.root, normToSteps(med, scale, 1))],
        dur:S.duration, vel:0.5});
    } else {
      const every = Math.max(1, Math.round(n/32));
      for(let i=0;i<n;i+=every){
        push({t:i*step, layer:'bas',
          midi:[degToMidi(scale, 33+S.root, normToSteps(nb[i], scale, 1))],
          dur:step*every*1.8, vel:0.6});
      }
    }
  }

  /* ---- שכבה 4 · קצב: נקודות המפנה של הדאטה הן הגרוב ----
     חבטה נורית רק במקסימום מקומי של השינוי — כלומר בנקודת מפנה — ולא בכל
     צעד שחוצה סף. ההבדל מהותי: לגל חלק יש נגזרת גדולה אך חלקה, ובלי תנאי
     המקסימום המקומי הוא היה מקבל חבטה כמעט בכל צעד ונשמע צפוף יותר מדאטה
     סוער באמת. עם התנאי — חלק נשאר דליל, סוער נעשה צפוף.                */
  const perRaw = seriesFor(S.per.src, S.smooth);
  const hits = [];
  if(S.per.on && perRaw){
    const d = deriveDelta(perRaw);
    series.per = d;
    let lastHit = -99;
    for(let i=1;i<n;i++){
      if(d[i] < S.thresh) continue;
      if(d[i] < (d[i-1]||0) || d[i] < (d[i+1] ?? 0)) continue;   // לא נקודת מפנה
      if(i - lastHit < 2) continue;                              // זמן התאוששות
      lastHit = i;
      const rel = (d[i]-S.thresh)/((1-S.thresh) || 1);
      const strong = rel > 0.45;
      push({t:i*step, layer:'per', i, drum:strong?'low':'high',
        dur:strong?0.28:0.06, vel:0.35+0.55*Math.min(1,rel)});
      hits.push(i);
    }
  }

  events.sort((a,b)=>a.t-b.t);
  const tail = 2.6;
  return {events, series, hits, n, step, duration:S.duration, total:S.duration+tail};
}

/* ==========================================================================
   05-LOGIC · C — מנוע האודיו. הגרף נבנה פעם אחת ומתקיים בין נגינות.
   [כלי → Volume → Panner] ─┬→ Limiter → יציאה  (יבש)
                            └→ send   → Reverb ┘ (רטוב)
   ========================================================================== */
const LAYERS = [
  {k:'mel', label:'שכבה 1 · מנגינה', short:'מנגינה', color:'--gold',   vol:-3,  pan:0,     rev:0.30,
   about:'הקו שהאוזן עוקבת אחריו. כל נקודה בדאטה היא צליל אחד, וגובהו הוא הערך. ' +
         'תנו לה את העמודה שהיא לב הסיפור, זו שהייתם מציירים בגרף.'},
  {k:'har', label:'שכבה 2 · הרמוניה', short:'הרמוניה', color:'--rose',  vol:-13, pan:-0.30, rev:0.40,
   about:'אקורדים איטיים שמתחלפים כ-16 פעמים לאורך היצירה. הם נותנים את "מזג האוויר" הרגשי. ' +
         'עמודה שנייה כאן יוצרת מתח מעניין: שני מדדים שלא זזים יחד נשמעים כמו דיאלוג.'},
  {k:'bas', label:'שכבה 3 · ביס',     short:'ביס',     color:'--teal',  vol:-8,  pan:0.10,  rev:0.22,
   about:'היסוד. עוקב אחרי המגמה הרחבה ומתעלם מרעש. "דרון" מחזיק צליל אחד לאורך כל היצירה, ' +
         'בחירה טובה כשרוצים שהמנגינה תרחף מעל משהו יציב.'},
  {k:'per', label:'שכבה 4 · קצב',     short:'קצב',     color:'--violet',vol:-11, pan:0.28,  rev:0.14,
   about:'חבטה בכל נקודת מפנה, לא בכל צעד. דאטה חלק יישאר כמעט שקט, דאטה סוער ייתן גרוב צפוף. ' +
         'זו השכבה שמספרת עד כמה הנתונים "מתנהגים יפה".'}
];

const INSTRUMENTS = {
  mel:[['piano','פסנתר'],['harp','נבל'],['cello','צ׳לו (קשת)'],['choir','מקהלה “אהה”'],
       ['voxOo','קול “אוּ” רך'],['glass','פעמוני זכוכית'],['marimba','מרימבה']],
  har:[['pad','כרית מיתרים (Pad)'],['choir','מקהלה'],['glass','פעמוני זכוכית'],
       ['harp','נבל'],['cello','מיתרים (קשת)']],
  bas:[['pad','כרית מיתרים (Pad)'],['cello','צ׳לו נמוך'],['choir','מקהלה נמוכה'],
       ['upright','קונטרבס (Pizzicato)'],['drone','דרון, צליל אחיד מתמשך']],
  per:[['kit','ערכה, בעיטה + הַיהֶט'],['taiko','טאיקו, תוף עמוק'],
       ['shaker','שייקר, רעש רך'],['wood','וודבלוק, נקישה יבשה']]
};

/** בונה נוד כלי בהקשר Tone הנוכחי (חי או offline). מחזיר {node, chain[]}. */
function makeInst(kind){
  const poly = (cls, opts) => { const p = new Tone.PolySynth(cls, opts); p.maxPolyphony = 24; return p; };
  switch(kind){
    case 'piano':   return {node:poly(Tone.Synth,{oscillator:{type:'triangle'},envelope:{attack:.005,decay:.4,sustain:.1,release:1.2}}),chain:[]};
    case 'harp':    return {node:poly(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:.005,decay:1.0,sustain:0,release:1.5}}),chain:[]};
    case 'marimba': return {node:poly(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:.003,decay:.5,sustain:0,release:.4}}),chain:[]};
    case 'glass':   return {node:poly(Tone.FMSynth,{harmonicity:3,modulationIndex:6,envelope:{attack:.005,decay:1.4,sustain:0,release:1.6}}),chain:[]};
    case 'cello':   return {node:poly(Tone.Synth,{oscillator:{type:'sawtooth'},envelope:{attack:.25,decay:.2,sustain:.85,release:.6}}),
                            chain:[new Tone.Filter(1600,'lowpass')]};
    case 'choir':   return {node:poly(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:.4,decay:.3,sustain:.9,release:1.4}}),
                            chain:[new Tone.Chorus(3,2.5,.4).start()]};
    case 'voxOo':   return {node:poly(Tone.Synth,{oscillator:{type:'sine4'},envelope:{attack:.3,decay:.2,sustain:.85,release:1.2}}),
                            chain:[new Tone.Filter(900,'lowpass')]};
    case 'pad':     return {node:poly(Tone.Synth,{oscillator:{type:'sawtooth'},envelope:{attack:.8,decay:.4,sustain:.9,release:2.0}}),
                            chain:[new Tone.Filter(700,'lowpass')]};
    case 'upright': return {node:poly(Tone.Synth,{oscillator:{type:'triangle'},envelope:{attack:.005,decay:.5,sustain:0,release:.5}}),chain:[]};
    case 'drone':   return {node:poly(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:1.2,decay:.1,sustain:1,release:2}}),chain:[]};
    default:        return {node:poly(Tone.Synth,{oscillator:{type:'triangle'}}),chain:[]};
  }
}

/** ערכת הקשה. `hit(time, vel, 'low'|'high')` — אין לה גובה צליל. */
function makePerc(kind){
  const parts = [];
  const mk = {
    kit: () => ({
      low:  new Tone.MembraneSynth({pitchDecay:.05,octaves:5,envelope:{attack:.001,decay:.4,sustain:0}}),
      high: new Tone.MetalSynth({frequency:300,envelope:{attack:.001,decay:.07,release:.01},
              harmonicity:5.1,modulationIndex:32,resonance:4000,octaves:1.5,volume:-16})
    }),
    taiko: () => {
      const d = new Tone.MembraneSynth({pitchDecay:.12,octaves:3,envelope:{attack:.001,decay:.7,sustain:0}});
      return {low:d, high:d};
    },
    shaker: () => {
      const s = new Tone.NoiseSynth({noise:{type:'pink'},envelope:{attack:.001,decay:.09,sustain:0}});
      return {low:s, high:s};
    },
    wood: () => {
      const w = new Tone.MetalSynth({frequency:520,envelope:{attack:.001,decay:.05,release:.01},
                  harmonicity:8,modulationIndex:20,resonance:2600,octaves:1,volume:-14});
      return {low:w, high:w};
    }
  }[kind] || mk_kit_fallback;
  function mk_kit_fallback(){ return {low:new Tone.MembraneSynth(), high:new Tone.MembraneSynth()}; }

  const g = mk();
  parts.push(g.low); if(g.high !== g.low) parts.push(g.high);
  return {
    nodes: parts,
    hit(time, vel, which){
      const s = which==='low' ? g.low : g.high;
      // MembraneSynth דורש תו; MetalSynth ו-NoiseSynth לא.
      if(s instanceof Tone.MembraneSynth) s.triggerAttackRelease(which==='low'?'C1':'G1', .3, time, vel);
      else s.triggerAttackRelease(.06, time, vel);
    },
    connect(dest){ parts.forEach(p=>p.connect(dest)); },
    dispose(){ parts.forEach(p=>{try{p.dispose();}catch(e){}}); }
  };
}

/**
 * בונה את כל גרף האודיו בהקשר Tone הנוכחי.
 * פועל זהה חי ו-offline, ולכן הייצוא נשמע כמו הנגינה.
 */
async function buildGraph(S){
  const master = new Tone.Limiter(-1).toDestination();
  const reverb = new Tone.Reverb({decay:3.2, wet:1, preDelay:0.02}).connect(master);
  await reverb.generate();                       // חובה — אחרת הצלילים הראשונים יוצאים יבשים

  const ch = {};
  for(const L of LAYERS){
    const vol  = new Tone.Volume(S[L.k].vol);
    const pan  = new Tone.Panner(L.pan);
    const send = new Tone.Gain(L.rev);
    vol.connect(pan);
    pan.connect(master);                         // יבש
    pan.connect(send); send.connect(reverb);     // רטוב
    let inst = null, perc = null;
    if(L.k === 'per'){
      perc = makePerc(S.per.inst);
      perc.connect(vol);
    } else {
      const made = makeInst(S[L.k].inst);
      const nodes = [made.node, ...made.chain, vol];
      for(let i=0;i<nodes.length-1;i++) nodes[i].connect(nodes[i+1]);
      inst = made;
    }
    ch[L.k] = {vol, pan, send, inst, perc};
  }
  return {
    master, reverb, ch,
    fire(ev, time){
      const c = ch[ev.layer];
      if(!c) return;
      if(ev.layer === 'per'){ c.perc && c.perc.hit(time, ev.vel, ev.drum); return; }
      if(!c.inst) return;
      c.inst.node.triggerAttackRelease(ev.midi.map(mtof), ev.dur, time, ev.vel);
    },
    release(){
      for(const k in ch){
        const c = ch[k];
        if(c.inst && c.inst.node.releaseAll) { try{c.inst.node.releaseAll();}catch(e){} }
      }
    },
    dispose(){
      for(const k in ch){
        const c = ch[k];
        if(c.inst){ try{c.inst.node.dispose();}catch(e){} c.inst.chain.forEach(x=>{try{x.dispose();}catch(e){}}); }
        if(c.perc) c.perc.dispose();
        [c.vol,c.pan,c.send].forEach(x=>{try{x.dispose();}catch(e){}});
      }
      try{reverb.dispose();master.dispose();}catch(e){}
    }
  };
}

/* ==========================================================================
   05-LOGIC · D — ייצוא: WAV (offline render) ו-PNG/SVG.
   ========================================================================== */
function audioBufferToWav(buf){
  const nCh=buf.numberOfChannels, len=buf.length, sr=buf.sampleRate;
  const data=new ArrayBuffer(44+len*nCh*2), v=new DataView(data);
  const str=(o,s)=>{ for(let i=0;i<s.length;i++) v.setUint8(o+i, s.charCodeAt(i)); };
  str(0,'RIFF'); v.setUint32(4, 36+len*nCh*2, true); str(8,'WAVE');
  str(12,'fmt '); v.setUint32(16,16,true); v.setUint16(20,1,true);
  v.setUint16(22,nCh,true); v.setUint32(24,sr,true);
  v.setUint32(28,sr*nCh*2,true); v.setUint16(32,nCh*2,true); v.setUint16(34,16,true);
  str(36,'data'); v.setUint32(40, len*nCh*2, true);
  const chans=[]; for(let c=0;c<nCh;c++) chans.push(buf.getChannelData(c));
  let off=44;
  for(let i=0;i<len;i++)
    for(let c=0;c<nCh;c++){
      const s=Math.max(-1,Math.min(1,chans[c][i]));
      v.setInt16(off, s<0 ? s*0x8000 : s*0x7fff, true); off+=2;
    }
  return new Blob([data],{type:'audio/wav'});
}

function download(blob, name){
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=name; document.body.appendChild(a); a.click();
  setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},200);
}

const NS='http://www.w3.org/2000/svg';
/** מסדר SVG לקובץ עצמאי: מידות מפורשות, רקע אטום, בלי הסמן החי. */
function svgString(el, w, h){
  el = el || svg; w = w || VW; h = h || VH;
  const clone = el.cloneNode(true);
  clone.setAttribute('xmlns',NS);
  clone.setAttribute('width',w); clone.setAttribute('height',h);
  clone.removeAttribute('style');
  clone.querySelectorAll('[data-cursor]').forEach(e=>e.remove());
  const cs = getComputedStyle(document.documentElement);
  const bg = document.createElementNS(NS,'rect');
  bg.setAttribute('width',w); bg.setAttribute('height',h);
  bg.setAttribute('fill', cs.getPropertyValue('--panel2').trim() || '#1b262d');
  clone.insertBefore(bg, clone.firstChild);
  return new XMLSerializer().serializeToString(clone);
}

/* ==========================================================================
   04-COMPONENTS · A — הוויזואליזציה.
   ========================================================================== */
const svg = document.getElementById('viz');
const VW=800, VH=300, PAD={t:14,r:12,b:38,l:12};
let geom = null;                                     // {x(i), y(v)} של שכבת המנגינה
let cursorEls = null;

const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function el(tag, attrs){
  const e=document.createElementNS(NS,tag);
  for(const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

function drawSeries(series, color, opacity, fillOp){
  const mn=Math.min(...series), mx=Math.max(...series), r=(mx-mn)||1;
  const x=i=>PAD.l+(VW-PAD.l-PAD.r)*(series.length>1 ? i/(series.length-1) : .5);
  const y=v=>VH-PAD.b-(VH-PAD.t-PAD.b)*(v-mn)/r;
  let d=`M ${x(0).toFixed(1)} ${y(series[0]).toFixed(1)}`;
  for(let i=1;i<series.length;i++) d+=` L ${x(i).toFixed(1)} ${y(series[i]).toFixed(1)}`;
  if(fillOp) svg.appendChild(el('path',{d:d+` L ${x(series.length-1)} ${VH-PAD.b} L ${x(0)} ${VH-PAD.b} Z`,
    fill:color,'fill-opacity':fillOp,stroke:'none'}));
  svg.appendChild(el('path',{d,fill:'none',stroke:color,'stroke-width':2,
    'stroke-opacity':opacity,'stroke-linejoin':'round'}));
  return {x,y,mn,mx};
}

function drawViz(){
  svg.innerHTML=''; geom=null; cursorEls=null;
  if(!DATA){ setExportEnabled(false); return; }
  const S = readSettings();
  const score = buildScore(S);
  const FONT='Assistant, system-ui, sans-serif';

  // קו בסיס
  svg.appendChild(el('line',{x1:PAD.l,y1:VH-PAD.b,x2:VW-PAD.r,y2:VH-PAD.b,
    stroke:css('--line'),'stroke-width':1}));

  if(score.series.bas) drawSeries(score.series.bas, css('--teal'), .5, .10);
  if(score.series.har) drawSeries(score.series.har, css('--rose'), .5, 0);
  if(score.series.mel) geom = drawSeries(score.series.mel, css('--gold'), 1, .10);

  // חבטות הקצב — סימונים על קו הבסיס
  if(score.hits.length && geom){
    const g=el('g',{stroke:css('--violet'),'stroke-width':2,'stroke-opacity':.75});
    score.hits.forEach(i=>{
      const x=geom.x(i);
      g.appendChild(el('line',{x1:x,y1:VH-PAD.b,x2:x,y2:VH-PAD.b+7}));
    });
    svg.appendChild(g);
  }

  // ציר: מין/מקס של שכבת המנגינה
  if(geom){
    const fmt=v=>Math.abs(v)>=1000?Math.round(v).toLocaleString('he-IL'):(Math.round(v*10)/10);
    svg.appendChild(el('text',{x:VW-PAD.r,y:PAD.t+8,fill:css('--dim'),'font-size':11,
      'font-family':FONT,'text-anchor':'end',direction:'ltr'})).textContent=fmt(geom.mx);
    svg.appendChild(el('text',{x:VW-PAD.r,y:VH-PAD.b-4,fill:css('--dim'),'font-size':11,
      'font-family':FONT,'text-anchor':'end',direction:'ltr'})).textContent=fmt(geom.mn);
  }

  // תוויות מהדאטה
  if(DATA.labels && geom){
    const marks=[];
    DATA.labels.forEach((t,i)=>{ if(t && String(t).trim()) marks.push([i,String(t).trim()]); });
    const keep = marks.length>8 ? marks.filter((_,k)=>k%Math.ceil(marks.length/8)===0) : marks;
    keep.forEach(([i,t])=>{
      const x=geom.x(i);
      svg.appendChild(el('line',{x1:x,y1:VH-PAD.b,x2:x,y2:VH-PAD.b+4,
        stroke:css('--dim'),'stroke-width':1,'stroke-opacity':.6}));
      // הטקסט בעברית: בכיוון RTL, 'end' הוא הקצה השמאלי, ולכן הוא מעגן את הנקודה הראשונה
      const anchor = i===0?'end' : (i>=DATA.n-2?'start':'middle');
      svg.appendChild(el('text',{x,y:VH-PAD.b+20,fill:css('--dim'),'font-size':11,
        'font-family':FONT,'text-anchor':anchor,direction:'rtl'})).textContent=t;
    });
  }

  // סמן — נוסף אחרון כדי שיהיה מעל, ומסונן החוצה בייצוא
  if(geom){
    const line=el('line',{y1:PAD.t,y2:VH-PAD.b,stroke:css('--gold'),'stroke-width':1,
      'stroke-opacity':.45,opacity:0,'data-cursor':'1'});
    const dot=el('circle',{r:5.5,fill:css('--gold'),opacity:0,'data-cursor':'1'});
    svg.appendChild(line); svg.appendChild(dot);
    cursorEls={line,dot,series:score.series.mel};
  }
  setExportEnabled(true);
}

function moveCursor(i){
  if(!cursorEls || !geom || !cursorEls.series) return;
  const x=geom.x(i), y=geom.y(cursorEls.series[i]);
  cursorEls.line.setAttribute('x1',x); cursorEls.line.setAttribute('x2',x);
  cursorEls.line.setAttribute('opacity','1');
  cursorEls.dot.setAttribute('cx',x); cursorEls.dot.setAttribute('cy',y);
  cursorEls.dot.setAttribute('opacity','1');
  // קו הסריקה על הדימוי נע באותו קצב: אותו רגע, נשמע ונראה
  $('archFrame').style.setProperty('--prog', (geom.x(i)-PAD.l)/(VW-PAD.l-PAD.r));
}
function hideCursor(){
  if(!cursorEls) return;
  cursorEls.line.setAttribute('opacity','0');
  cursorEls.dot.setAttribute('opacity','0');
}

/* ==========================================================================
   05-LOGIC · E — הקריאה האדריכלית.
   אותה סדרת מספרים, מדיום אחר. המוזיקה קוראת אותה כזמן; כאן היא נקראת כמקום.
   הטיפולוגיה היא השאלה שמפנים לנתונים: האם הם מבנה, קרקע, מקצב, או ערימה.
   ========================================================================== */
const AW=520, AH=340, AP={t:22,r:20,b:34,l:20};
const archSvg = document.getElementById('arch');

/** מדגם מחדש למספר יחידות מבוקש, ומנרמל 0..1. */
function archSeries(bays){
  const s = seriesFor($('src_mel').value, +$('smooth').value) ||
            (DATA ? DATA.columns.find(c=>c.numeric).values : null);
  if(!s || !s.length) return null;
  const r = s.length === bays ? s.slice() : resample(s, bays, true);
  return {raw:r, norm:normOf(r)};
}

function ael(tag, attrs){
  const e=document.createElementNS(NS,tag);
  for(const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

/** מילוי לפי הגימור שנבחר — קו, מסה, או הצללה. */
function archSkin(fill, color, i){
  if(fill==='line')  return {fill:'none', 'fill-opacity':0, stroke:color, 'stroke-width':1.2};
  if(fill==='hatch') return {fill:'url(#ahatch)', stroke:color, 'stroke-width':.9};
  return {fill:color, 'fill-opacity':(0.20 + 0.10*((i%3))).toFixed(2), stroke:color, 'stroke-width':1};
}

function drawArch(){
  archSvg.innerHTML='';
  const canDraw = !!DATA;
  ['archPng','archSvg','archCopy'].forEach(id=>{ const b=$(id); if(b) b.disabled=!canDraw; });
  if(!canDraw){ ARCH_BODY=''; refreshRead(); return; }

  const type  = $('archType').value;
  const bays  = +$('archBays').value;
  const prop  = +$('archProp').value;
  const depth = +$('archDepth').value;
  const fill  = $('archFill').value;

  const S = archSeries(bays);
  if(!S) return;

  // הגדרות משותפות: הצללה, וקרקע
  const defs = ael('defs',{});
  const hatch = ael('pattern',{id:'ahatch',width:6,height:6,patternUnits:'userSpaceOnUse',
    patternTransform:'rotate(45)'});
  hatch.appendChild(ael('line',{x1:0,y1:0,x2:0,y2:6,stroke:css('--rose'),'stroke-width':1,'stroke-opacity':.5}));
  defs.appendChild(hatch); archSvg.appendChild(defs);

  const x0=AP.l, x1=AW-AP.r, y0=AP.t, y1=AH-AP.b;
  const W=x1-x0, H=y1-y0;
  const rose=css('--rose'), teal=css('--teal'), dim=css('--dim'), gold=css('--gold');

  // שכבות עומק — עותקים נסוגים שנותנים מרחב, לא רק אפקט
  for(let d=depth; d>=1; d--){
    const off=d*9, fade=(0.30/d).toFixed(2);
    drawArchBody(type, S, {x0:x0+off, x1:x1+off, y0:y0-off*0.5, y1:y1-off*0.5,
      W, H, prop, fill:'solid', color:teal, opacity:fade, ghost:true});
  }
  drawArchBody(type, S, {x0,x1,y0,y1,W,H,prop,fill,color:rose,opacity:1,ghost:false});

  // קו אופק — הקרקע שעליה הכול עומד
  archSvg.appendChild(ael('line',{x1:x0-6,y1:y1,x2:x1+6,y2:y1,
    stroke:dim,'stroke-width':1,'stroke-opacity':.55}));

  // סרגל: מה מייצג הגובה
  const FONT='Assistant, system-ui, sans-serif';
  const lab = ael('text',{x:x0,y:AH-12,fill:dim,'font-size':10,'font-family':FONT,direction:'rtl'});
  lab.textContent = `${bays} יחידות · ${DATA.columns.find(c=>c.numeric).name}`;
  archSvg.appendChild(lab);

  writeArchReading(type, S, bays);
}

/** גוף השרטוט. אותה חתימה לכל הטיפולוגיות, כדי ששכבות העומק יעבדו לכולן. */
function drawArchBody(type, S, g){
  const n=S.norm.length, bw=g.W/n;
  const put=(tag,attrs)=>{
    const e=ael(tag,attrs);
    if(g.opacity<1) e.setAttribute('opacity',g.opacity);
    archSvg.appendChild(e); return e;
  };

  if(type==='elevation'){
    // כל נקודה היא מבנה. הערך הוא הגובה, והרוחב אחיד — מקצב עירוני.
    S.norm.forEach((v,i)=>{
      const h=Math.max(4, v*g.H*g.prop);
      const x=g.x0+i*bw, y=g.y1-h;
      put('rect',{x:x+bw*0.12,y,width:Math.max(1,bw*0.76),height:h,
        ...archSkin(g.fill,g.color,i)});
      if(!g.ghost && g.fill!=='line' && h>26 && bw>7){
        // פתחים — רק כשיש מקום אמיתי, אחרת זה רעש
        const rows=Math.floor(h/13), cols=Math.max(1,Math.floor(bw*0.76/7));
        for(let r=0;r<rows;r++) for(let c=0;c<cols;c++)
          put('rect',{x:x+bw*0.12+3+c*7, y:y+6+r*13, width:3, height:5,
            fill:'#0e1418','fill-opacity':.55,stroke:'none'});
      }
    });
  }

  else if(type==='section'){
    // הנתונים הם קו הקרקע. המבנה יושב עליה ומגיב לה.
    let d=`M ${g.x0} ${g.y1}`;
    S.norm.forEach((v,i)=>{ d+=` L ${(g.x0+i*bw+bw/2).toFixed(1)} ${(g.y1-v*g.H*0.55*g.prop).toFixed(1)}`; });
    d+=` L ${g.x1} ${g.y1} Z`;
    put('path',{d,fill:g.fill==='line'?'none':'url(#ahatch)',stroke:g.color,'stroke-width':1.3});
    if(g.ghost) return;
    // נפחים בנויים על הקרקע, גובהם לפי חדות השינוי המקומי
    for(let i=1;i<n-1;i++){
      const slope=Math.abs(S.norm[i+1]-S.norm[i-1]);
      const h=(0.10+slope*1.5)*g.H*0.5*g.prop;
      if(h<6 || i%2) continue;
      const gy=g.y1-S.norm[i]*g.H*0.55*g.prop;
      put('rect',{x:g.x0+i*bw+bw*0.15,y:gy-h,width:Math.max(1.5,bw*0.7),height:h,
        ...archSkin(g.fill,g.color,i)});
    }
  }

  else if(type==='colonnade'){
    // המקצב הופך לעמודים: הערך קובע גובה, והקורה מעליהם עוקבת אחריו.
    const cap=g.y0+6;
    let beam=`M ${g.x0} ${cap}`;
    S.norm.forEach((v,i)=>{
      const h=Math.max(10, (0.35+v*0.65)*g.H*g.prop);
      const cx=g.x0+i*bw+bw/2, top=g.y1-h;
      const cw=Math.max(1.6, Math.min(bw*0.34, 9));
      put('rect',{x:cx-cw/2,y:top,width:cw,height:h,...archSkin(g.fill,g.color,i)});
      if(!g.ghost && bw>9){
        put('rect',{x:cx-cw*0.9,y:top-4,width:cw*1.8,height:4,
          fill:g.color,'fill-opacity':.5,stroke:'none'});   // כותרת
      }
      beam+=` L ${cx.toFixed(1)} ${(top-7).toFixed(1)}`;
    });
    beam+=` L ${g.x1} ${cap}`;
    put('path',{d:beam,fill:'none',stroke:g.color,'stroke-width':1.6,'stroke-opacity':.9});
  }

  else { // stack
    // הרצף נערם לגובה: כל ערך הוא רוחב תקרה, והזמן עולה במקום להתקדם.
    const fh=g.H/n;
    S.norm.forEach((v,i)=>{
      const w=Math.max(5,(0.16+v*0.84)*g.W*g.prop*0.9);
      const cx=(g.x0+g.x1)/2, y=g.y1-(i+1)*fh;
      put('rect',{x:cx-w/2,y,width:w,height:Math.max(1.2,fh*0.82),
        ...archSkin(g.fill,g.color,i)});
      if(!g.ghost && fh>7)
        put('line',{x1:cx-w/2,y1:y,x2:cx+w/2,y2:y,stroke:g.color,'stroke-width':.6,'stroke-opacity':.6});
    });
  }
}

/** קריאה מילולית של השרטוט — מקבילה ל"מה שומעים", ומשמשת גם כפרומפט להמחשה. */
function writeArchReading(type, S, bays){
  const v=S.raw, mx=Math.max(...v), mn=Math.min(...v);
  const peakAt=Math.round(100*v.indexOf(mx)/Math.max(1,v.length-1));
  const third=Math.max(1,Math.floor(v.length/3));
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
  const rise=(avg(v.slice(-third))-avg(v.slice(0,third)))/((mx-mn)||1);
  // שתי צורות, כי "הרצף" זכר ו"הקרקע" נקבה — התאם דקדוקי, לא קישוט
  const dirM = rise>0.25 ? 'עולה לאורך הציר' : rise<-0.25 ? 'יורד לאורך הציר'  : 'חוזר לגובה שממנו יצא';
  const dirF = rise>0.25 ? 'עולה לאורך הציר' : rise<-0.25 ? 'יורדת לאורך הציר' : 'חוזרת לגובה שממנו יצאה';
  // "מנגינה" הוא שם ברירת המחדל של פורמט ה-JSON, לא שם של מדד. בתוך משפט
  // אדריכלי הוא קורא לא נכון, ולכן נופלים לניסוח ניטרלי.
  const rawCol = DATA.columns.find(c=>c.numeric).name;
  const generic = ['מנגינה','ליווי','ערך','תוויות'].includes(rawCol) || /^עמודה \d+$/.test(rawCol);
  const col = generic ? 'הערכים' : `"${rawCol}"`;
  const title = DATA.title;

  const body = {
    elevation:`חזית בת ${bays} יחידות: כל מבנה מקבל את גובהו מ${col}. הרצף ${dirM}, והמבנה הגבוה עומד בערך ב-${peakAt}% מאורך הרחוב.`,
    section:  `חתך קרקע בן ${bays} חתכי מדידה לפי ${col}. הקרקע ${dirF}; הנפחים הבנויים מתרוממים דווקא במקומות שבהם השיפוע חד, ונעלמים במישורים.`,
    colonnade:`קולונדה בת ${bays} עמודים שגובהם נגזר מ${col}. הקורה שמעליהם אינה ישרה, היא מעתיקה את קו הנתונים, כך שהמקצב נראה ולא רק נשמע.`,
    stack:    `מסה מוערמת מ-${bays} מפלסים: הזמן עולה במקום להתקדם, ורוחב כל מפלס נגזר מ${col} באותו רגע. הצללית ${dirF}.`
  }[type];

  ARCH_BODY = body; refreshRead();
  ARCH_TEXT = `${title}. ${body}`;
}
let ARCH_TEXT = '', ARCH_BODY = '', SPACE_MODE = 'gen';
/** "מה רואים": בהדמיה, מה שבדימוי; בשרטוט, הקריאה שנגזרה מהמספרים. */
function refreshRead(){
  const b = activeId && activeId.startsWith('built:') ? SAMPLES.find(x=>'built:'+x.id===activeId) : null;
  const t = SPACE_MODE==='art' && b ? b.see : SPACE_MODE==='gen' ? ARCH_BODY : '';
  $('archRead').textContent = t;
  $('archReadWrap').hidden = !t;
}

/* ==========================================================================
   04-COMPONENTS · B — המיקסר: כרטיס מתקפל לכל שכבה.
   ========================================================================== */
const SRC_FIXED = [['auto:smooth','אוטומטי, קו מוחלק'],['auto:delta','אוטומטי, קצב שינוי'],['off','כבוי']];

function buildMixer(){
  const wrap=document.getElementById('layers');
  wrap.innerHTML='';
  LAYERS.forEach(L=>{
    const d=document.createElement('div');
    d.className='voice'; d.id='voice_'+L.k;
    d.style.setProperty('--c',`var(${L.color})`);
    // רצועה קומפקטית: שם + מתג בשורה, שני בוררים בשורה, עוצמה בשורה.
    // הכול נראה בבת אחת — בלי לפתוח ובלי לגלול.
    d.innerHTML=`
      <div class="vtop">
        <input type="checkbox" id="on_${L.k}" checked aria-label="הפעל ${L.label}">
        <span class="name">${L.short}</span>
        <input type="range" id="vol_${L.k}" min="-40" max="4" value="${L.vol}" step="1"
          aria-label="עוצמה, ${L.short}">
        <span class="vol"><span id="volV_${L.k}">${L.vol}</span> dB</span>
      </div>
      <div class="vrow">
        <select id="inst_${L.k}" aria-label="כלי, ${L.short}"
          >${INSTRUMENTS[L.k].map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select>
        <select id="src_${L.k}" aria-label="מקור בנתונים, ${L.short}"></select>
      </div>
      <span class="sr" id="meta_${L.k}"></span>
      <p class="help">${L.about}</p>`;
    wrap.appendChild(d);
  });
  LAYERS.forEach(L=>{
    document.getElementById(`on_${L.k}`).addEventListener('change',onStructuralChange);
    document.getElementById(`src_${L.k}`).addEventListener('change',e=>{
      e.target.dataset.touched='1'; onStructuralChange();
    });
    document.getElementById(`inst_${L.k}`).addEventListener('change',()=>{ needsRebuild=true; onStructuralChange(); });
    const v=document.getElementById(`vol_${L.k}`);
    v.addEventListener('input',()=>{
      document.getElementById(`volV_${L.k}`).textContent=v.value;
      if(graph && graph.ch[L.k]) graph.ch[L.k].vol.volume.value = +v.value;
      saveSettings();
    });
  });
}

/** ממלא את בוררי המקור בעמודות שנטענו. */
function refreshSources(){
  const opts = [];
  if(DATA) DATA.columns.forEach((c,i)=>{ if(c.numeric) opts.push([`col:${i}`, c.name]); });
  LAYERS.forEach(L=>{
    const s=document.getElementById(`src_${L.k}`);
    const prev=s.value;
    s.innerHTML=[...opts, ...SRC_FIXED].map(([v,t])=>`<option value="${v}">${t}</option>`).join('');
    // בחירה מפורשת של המשתמש נשמרת; ערך שנקבע כברירת מחדל בלבד — נדרס.
    const keep = s.dataset.touched && [...opts,...SRC_FIXED].some(([v])=>v===prev);
    s.value = keep ? prev : DEFAULT_SRC[L.k](opts);
  });
  // עמודת התוויות
  const lf=document.getElementById('labelsField'), lc=document.getElementById('labelCol');
  const textCols = DATA ? DATA.columns.map((c,i)=>[i,c]).filter(([,c])=>!c.numeric) : [];
  if(textCols.length){
    lc.innerHTML = `<option value="-1">— ללא —</option>` +
      textCols.map(([i,c])=>`<option value="${i}">${c.name}</option>`).join('');
    lc.value = String(DATA.labelCol);
    lf.hidden=false;
  } else lf.hidden=true;
  updateMeta();
}
/** ברירות מחדל: מנגינה מהעמודה הראשונה, הרמוניה מהשנייה אם קיימת, ביס תמיד מוחלק. */
const DEFAULT_SRC = {
  mel:o=>o.length ? o[0][0] : 'auto:smooth',
  har:o=>o.length>1 ? o[1][0] : 'auto:smooth',
  bas:() =>'auto:smooth',
  per:o=>o.length ? o[0][0] : 'auto:smooth'
};

function updateMeta(){
  LAYERS.forEach(L=>{
    const src=document.getElementById(`src_${L.k}`);
    const inst=document.getElementById(`inst_${L.k}`);
    const on=document.getElementById(`on_${L.k}`).checked;
    const srcTxt = src.selectedOptions[0] ? src.selectedOptions[0].textContent : '';
    const instTxt = inst.selectedOptions[0] ? inst.selectedOptions[0].textContent : '';
    document.getElementById(`meta_${L.k}`).textContent = on ? `${instTxt} · ${srcTxt}` : 'כבוי';
    // שכבה כבויה מתעמעמת, כך שמצב המיקסר נקרא במבט אחד
    document.getElementById('voice_'+L.k).classList.toggle('off', !on);
  });
}

/* ==========================================================================
   04-COMPONENTS · C — הגדרות, מצב ונגינה.
   ========================================================================== */
const $ = id => document.getElementById(id);
const btnPlay=$('play'), btnPause=$('pause'), btnStop=$('stop');
const setPlayLabel = t => { btnPlay.querySelector('.play-label').textContent=t; btnPlay.setAttribute('aria-label',t); };
const setPlaying = on => $('app').classList.toggle('playing', on);
let graph=null, part=null, needsRebuild=true, playing=false, paused=false;

function readSettings(){
  const S = {
    duration:+$('tempo').value,
    scale:$('scale').value,
    root:+$('root').value,
    smooth:+$('smooth').value,
    legato:+$('legato').value,
    thresh:+$('thresh').value,
    archType:$('archType').value,   archBays:+$('archBays').value,
    archProp:+$('archProp').value,  archDepth:+$('archDepth').value,
    archFill:$('archFill').value
  };
  LAYERS.forEach(L=>{
    S[L.k]={
      on:$(`on_${L.k}`).checked,
      src:$(`src_${L.k}`).value,
      inst:$(`inst_${L.k}`).value,
      vol:+$(`vol_${L.k}`).value
    };
  });
  return S;
}

function saveSettings(){
  try{ localStorage.setItem('datasong.v2', JSON.stringify(readSettings())); }catch(e){}
}
function loadSettings(){
  let S=null;
  try{ S=JSON.parse(localStorage.getItem('datasong.v2')||'null'); }catch(e){}
  if(!S) return;
  const set=(id,v)=>{ const e=$(id); if(e && v!=null) e.value=v; };
  set('tempo',S.duration); set('scale',S.scale); set('root',S.root);
  set('smooth',S.smooth); set('legato',S.legato); set('thresh',S.thresh);
  ['archType','archBays','archProp','archDepth','archFill'].forEach(k=>set(k,S[k]));
  LAYERS.forEach(L=>{
    if(!S[L.k]) return;
    const on=$(`on_${L.k}`); if(on) on.checked=!!S[L.k].on;
    set(`inst_${L.k}`,S[L.k].inst); set(`vol_${L.k}`,S[L.k].vol);
    const vv=$(`volV_${L.k}`); if(vv) vv.textContent=S[L.k].vol;
  });
  syncLabels();
}

function syncLabels(){
  $('tempoV').textContent=$('tempo').value;
  $('smoothV').textContent=$('smooth').value;
  $('legatoV').textContent=(+$('legato').value).toFixed(1);
  $('threshV').textContent=(+$('thresh').value).toFixed(2);
  $('archBaysV').textContent=$('archBays').value;
  $('archPropV').textContent=(+$('archProp').value).toFixed(2).replace(/0$/,'');
  $('archDepthV').textContent=$('archDepth').value;
  if(DATA){
    const rate = DATA.n / +$('tempo').value;
    $('rateHint').textContent = `${DATA.n} נקודות, כ-${rate.toFixed(1)} צלילים בשנייה`;
  } else $('rateHint').textContent='';
}

function setStatus(msg,cls){ const s=$('status'); s.textContent=msg; s.className='status'+(cls?' '+cls:''); }
function setExportEnabled(on){ ['expWav','expPng','expSvg'].forEach(id=>$(id).disabled=!on); }

/** שינוי שמחייב ציור מחדש ובניית תווים מחדש. */
function onStructuralChange(){
  updateMeta(); syncLabels(); saveSettings();
  if(playing) stopPlayback();
  drawViz(); drawArch();
}

async function ensureGraph(S){
  if(graph && !needsRebuild) return graph;
  if(graph){ graph.dispose(); graph=null; }
  graph = await buildGraph(S);
  needsRebuild=false;
  return graph;
}

async function startPlayback(){
  if(!DATA) return;
  if(paused){                                   // המשך מהשהיה
    Tone.Transport.start(); playing=true; paused=false;
    btnPlay.disabled=true; btnPause.disabled=false; btnPause.textContent='השהה';
    setPlaying(true);
    return;
  }
  if(playing) return;
  await Tone.start();
  const S = readSettings();
  const score = buildScore(S);
  if(!score || !score.events.length){ setStatus('אין שכבה פעילה לנגן.','err'); return; }

  btnPlay.disabled=true; setPlayLabel('מכין');
  const g = await ensureGraph(S);
  LAYERS.forEach(L=>{ g.ch[L.k].vol.volume.value = S[L.k].vol; });

  Tone.Transport.stop(); Tone.Transport.cancel(); Tone.Transport.position=0;
  if(part){ part.dispose(); part=null; }

  part = new Tone.Part((time, ev)=>g.fire(ev, time), score.events.map(e=>[e.t, e]));
  part.start(0);

  // הסמן רץ על שעון האודיו, לא על שעון ה-JS
  for(let i=0;i<score.n;i++){
    Tone.Transport.schedule(time=>{
      Tone.Draw.schedule(()=>{
        moveCursor(i);
        const raw = score.series.mel ? score.series.mel[i] : null;
        const lbl = (DATA.labels && DATA.labels[i] && DATA.labels[i].trim()) ? ` · ${DATA.labels[i].trim()}` : '';
        const val = raw==null ? '' : (Math.round(raw*10)/10) + '';
        $('readout').textContent = `${val}${lbl} · ${Math.round(100*i/Math.max(1,score.n-1))}%`;
      }, time);
    }, i*score.step);
  }
  // הסיום נקבע על שעון ה-Transport ולא דרך Tone.Draw: כשהלשונית ברקע
  // requestAnimationFrame נעצר, ואז ה-UI היה נתקע על "מנגן…" לנצח.
  Tone.Transport.schedule(()=>{ setTimeout(finishPlayback, 0); }, score.duration + 0.05);

  Tone.Transport.start('+0.1');
  playing=true; paused=false;
  setPlayLabel('מנגן'); btnPause.disabled=false; btnStop.disabled=false; setPlaying(true);
}

function pausePlayback(){
  if(!playing) return;
  Tone.Transport.pause();
  if(graph) graph.release();
  playing=false; paused=true;
  btnPlay.disabled=false; setPlayLabel('המשך'); setPlaying(false);
  btnPause.disabled=true;
}

function stopPlayback(){
  Tone.Transport.stop(); Tone.Transport.cancel(); Tone.Transport.position=0;
  if(part){ part.dispose(); part=null; }
  if(graph) graph.release();
  playing=false; paused=false;
  btnPlay.disabled=!DATA; setPlayLabel('נגן'); setPlaying(false);
  btnPause.disabled=true; btnPause.textContent='השהה'; btnStop.disabled=true;
  hideCursor(); $('readout').textContent='';
}

function finishPlayback(){
  if(graph) graph.release();
  playing=false; paused=false;
  btnPlay.disabled=!DATA; setPlayLabel('שוב'); setPlaying(false);
  btnPause.disabled=true; btnStop.disabled=true;
  setTimeout(()=>{ if(!playing){ hideCursor(); $('readout').textContent=''; } }, 1400);
  Tone.Transport.stop(); Tone.Transport.cancel(); Tone.Transport.position=0;
  if(part){ part.dispose(); part=null; }
}

/* ---------- טעינת דאטה ---------- */
/** `libId` — מזהה האריח בספרייה, אם המאגר הגיע משם. אחרת נציע לשמור אותו. */
function setData(d, libId){
  if(!d){ setStatus('לא הצלחתי לזהות נתונים בקלט.','err'); return; }
  const numericCols = d.columns.filter(c=>c.numeric);
  if(!numericCols.length || d.n<2){ setStatus('לא נמצאו מספיק מספרים בדאטה.','err'); return; }
  stopPlayback();
  DATA = d;
  showWorkMeta(d, libId);
  refreshSources();
  needsRebuild = true;
  drawViz(); syncLabels();
  btnPlay.disabled=false;
  const cols = numericCols.length;
  setStatus(
    `נטענו ${d.n} נקודות · ${cols} ${cols===1?'עמודה מספרית':'עמודות מספריות'}` +
    (resampled ? ' (דוגם מחדש ל-512 כדי שיישאר מוזיקלי)' : '') + '. אפשר לנגן.',
    'ok');
  showInterp(libId);
  // עמודת תוויות רלוונטית רק לטבלה שהעלית, לא ליצירה מהסדרה
  if(libId && libId.startsWith('built:')) $('labelsField').hidden = true;

  // הקריאה האדריכלית נבנית מאותם נתונים, ולכן מתרעננת יחד איתם
  markActive(libId || null);
  drawArch();
  // תמונה שמורה גוברת; ליצירה מובנית יש הדמיה; לנתונים חדשים השרטוט הוא הדימוי
  setArchTab(imgGet(libId || null) ? 'own' : (libId && libId.startsWith('built:') ? 'art' : 'gen'));

  // הצעת שמירה — רק למאגר שאינו כבר בספרייה, וכשהאחסון בכלל זמין
  $('saveRow').hidden = !!libId || !storageAvailable;
  if(!$('saveRow').hidden) $('saveName').value = d.title;
  $('toStudio').hidden = !!libId;
  $('toStudio').href = '#/studio';

  saveSettings();
}

/**
 * לוח הפרשנות. למאגר מובנה — הטקסט שנכתב לו. למאגר של המשתמשת אין פרשנות
 * כתובה, ולכן נגזרת קריאה של הצורה מתוך המספרים עצמם: בלי להמציא סיפור
 * שאיננו בנתונים, רק תיאור של מה שהם עושים.
 */
function showInterp(libId){
  const box=$('interp');
  const built = libId && libId.startsWith('built:')
    ? SAMPLES.find(s=>'built:'+s.id===libId) : null;
  if(built){
    $('ipStory').textContent  = built.story  || '';
    $('ipListen').textContent = built.listen || '';
    $('ipSrc').textContent    = built.source || '';
    $('ipSrcWrap').hidden = !built.source;
    box.hidden = false;
    return;
  }
  const shape = describeShape();
  $('ipStory').textContent  = shape.data;
  $('ipListen').textContent = shape.sound;
  $('ipSrc').textContent    = DATA.source || '';
  $('ipSrcWrap').hidden = !DATA.source;
  box.hidden = false;
}

/** קריאת הצורה של מאגר לא-מוכר: טווח, מגמה ותנודתיות. */
function describeShape(){
  const cols = DATA.columns.filter(c=>c.numeric);
  const v = cols[0].values;
  const mn=Math.min(...v), mx=Math.max(...v);
  const third=Math.max(1,Math.floor(v.length/3));
  const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
  const rise=(avg(v.slice(-third))-avg(v.slice(0,third)))/((mx-mn)||1);
  const trend = rise>0.25 ? 'עולה מההתחלה לסוף'
              : rise<-0.25 ? 'יורדת מההתחלה לסוף'
              : 'חוזרת בערך לאותו מקום';
  const peakAt = Math.round(100*v.indexOf(mx)/Math.max(1,v.length-1));
  const sc = buildScore(readSettings());
  const dens = sc ? sc.hits.length/v.length : 0;
  const texture = dens>0.30 ? 'מחוספס, שכבת הקצב תעבוד קשה'
                : dens>0.12 ? 'מעורב, יש נקודות מפנה ברורות'
                : 'חלק, הקצב יישאר דליל, וזה נכון לדאטה כזה';
  const fmt=x=>Math.round(x*10)/10;
  return {
    data: `${cols.length} ${cols.length===1?'עמודה מספרית':'עמודות מספריות'} · ${DATA.n} נקודות · ` +
          `"${cols[0].name}" נעה בין ${fmt(mn)} ל-${fmt(mx)}, והמגמה ${trend}.`,
    sound:`השיא נמצא בערך ב-${peakAt}% מהמסע, שם יגיע הצליל הגבוה ביותר. הדאטה ${texture}. ` +
          `נסו להחליף עמודה בכל שכבה: אותם מספרים נשמעים אחרת לגמרי כשהם מנהלים את הביס במקום את המנגינה.`
  };
}

const readText = f => new Promise((res,rej)=>{
  const r=new FileReader();
  r.onload=()=>res(r.result); r.onerror=()=>rej(new Error(f.name));
  r.readAsText(f,'utf-8');
});

/**
 * קורא קובץ אחד או כמה. קובץ בודד — נטען ומוצע לשמירה בשם.
 * כמה קבצים יחד — כולם נכנסים לספרייה בשם הקובץ, והאחרון מתנגן.
 */
async function readFiles(files){
  const list = Array.from(files||[]);
  if(!list.length) return;

  if(list.length === 1){
    try{
      const d = parseInput(await readText(list[0]), list[0].name.replace(/\.[^.]+$/,''));
      if(d) setData(d); else setStatus(`לא הצלחתי לזהות נתונים בקובץ "${list[0].name}".`,'err');
    }catch(e){ setStatus('שגיאה בקריאת הקובץ.','err'); }
    return;
  }

  let ok=0; const failed=[];
  for(const f of list){
    try{
      const d = parseInput(await readText(f), f.name.replace(/\.[^.]+$/,''));
      if(d){ setData(d); saveToLibrary(f.name.replace(/\.[^.]+$/,'')); ok++; }
      else failed.push(f.name);
    }catch(e){ failed.push(f.name); }
  }
  renderLibrary();
  setStatus(
    `${ok} מתוך ${list.length} קבצים נוספו לספרייה` +
    (failed.length ? ` · לא זוהו נתונים ב: ${failed.join(', ')}` : '') + '.',
    failed.length ? 'err' : 'ok');
}

function loadSample(id){
  const s = SAMPLES.find(x=>x.id===id);
  if(!s) return;
  // אותו מסלול פענוח כמו קובץ שנגרר פנימה — בלי ענף מיוחד לדוגמאות.
  const d = fromJsonObject(s.json);
  if(!d) return setStatus('הדוגמה הזו לא נטענה.','err');
  if(s.preset && $('applyPreset').checked) applyPreset(s.preset);
  setData(d, 'built:'+id);
}

/** ההגדרה המומלצת למאגר — נקודת פתיחה שמדגישה את אופיו, לא כלל. */
function applyPreset(p){
  if(p.scale) $('scale').value = p.scale;
  if(p.duration) $('tempo').value = p.duration;
  LAYERS.forEach(L=>{
    if(p[L.k]){ $(`inst_${L.k}`).value = p[L.k]; $(`on_${L.k}`).checked = true; }
  });
  // גם הטיפולוגיה מומלצת: לכל מאגר יש הצורה שהוא מבקש להיות
  if(p.archType) $('archType').value = p.archType;
  if(p.archBays) $('archBays').value = p.archBays;
  needsRebuild = true;
  syncLabels(); updateMeta();
}

/* ==========================================================================
   04-COMPONENTS · E — הספרייה: מאגרים מובנים + מאגרים שהמשתמשת שמרה.
   נשמרת ב-localStorage, ולכן היא אישית לדפדפן הזה ולא עוזבת את המחשב.
   ========================================================================== */
const LIB_KEY = 'datasong.library';
let activeId = null;

function libRead(){
  try{ const v=JSON.parse(localStorage.getItem(LIB_KEY)||'[]'); return Array.isArray(v)?v:[]; }
  catch(e){ return []; }
}
function libWrite(list){
  try{ localStorage.setItem(LIB_KEY, JSON.stringify(list)); return true; }
  catch(e){ return false; }        // מכסה גם מצב שבו האחסון חסום או מלא
}
const storageAvailable = (()=>{ try{
  localStorage.setItem('datasong.probe','1'); localStorage.removeItem('datasong.probe'); return true;
}catch(e){ return false; } })();

/** שומר את המאגר הטעון כרגע תחת שם שנבחר. */
function saveToLibrary(name){
  if(!DATA) return;
  name = (name||'').trim() || DATA.title || 'מאגר ללא שם';
  const list = libRead();
  const entry = {
    id: 'u'+Date.now().toString(36),
    title: name,
    source: DATA.source || 'הועלה על ידך',
    savedAt: new Date().toISOString().slice(0,10),
    labelCol: DATA.labelCol,
    columns: DATA.columns.map(c=>({name:c.name, numeric:c.numeric, values:c.values}))
  };
  const dup = list.findIndex(x=>x.title===name);
  if(dup>=0) list[dup]=entry; else list.push(entry);
  if(!libWrite(list)){
    setStatus('לא הצלחתי לשמור, האחסון המקומי חסום או מלא בדפדפן הזה.','err');
    return;
  }
  activeId = 'user:'+entry.id;
  $('toStudio').href = '#/mine/'+entry.id;   // הנתונים נשמרו: הקישור מוביל ליצירה השמורה
  renderLibrary();
  setStatus(`"${name}" נשמר בספרייה. לחיצה על האריח תשמיע אותו שוב.`,'ok');
  $('saveRow').hidden = true;
}

function loadFromLibrary(id){
  const e = libRead().find(x=>x.id===id);
  if(!e) return;
  setData(finalize({
    title:e.title, source:e.source,
    columns:e.columns.map(c=>({name:c.name, numeric:c.numeric, values:c.values.slice()})),
    preferLabels: e.labelCol ?? -1
  }), 'user:'+id);
}

function deleteFromLibrary(id, title){
  if(!confirm(`למחוק את "${title}" מהספרייה?`)) return;
  libWrite(libRead().filter(x=>x.id!==id));
  imgDel('user:'+id);                    // בלי זה התמונה נשארת תופסת מקום בלי כרטיסייה
  if(activeId==='user:'+id) activeId=null;
  renderLibrary();
  setStatus(`"${title}" נמחק מהספרייה.`,'');
}

function markActive(id){
  activeId = id;
  document.querySelectorAll('#library .chip').forEach(c=>
    c.classList.toggle('active', c.dataset.id===id));
}

/* ---------- תמונה לכל כרטיסייה בספרייה ----------
   אותה תמונה שנשמרת כאן היא "התמונה שלי" של המאגר במסגרת האדריכלית — מפתח אחד,
   שני מקומות תצוגה. כך אין שתי אמיתות לאותו מאגר.                              */
function buildThumb(id, title){
  const t=document.createElement('label');
  t.className='thumb'; t.title='הוספה או החלפה של תמונה למאגר "'+title+'"';
  const own=imgGet(id);
  const url=own || (id.startsWith('built:') ? artSrc(id.slice(6), true) : null);

  const inp=document.createElement('input');
  inp.type='file'; inp.accept='image/*'; inp.hidden=true;
  inp.addEventListener('click', ev=>ev.stopPropagation());     // בלי זה הלחיצה גם מנגנת
  inp.addEventListener('change', ev=>{
    const f=ev.target.files && ev.target.files[0];
    if(f) setChipImage(id, f);
    ev.target.value='';
  });
  t.appendChild(inp);

  if(url){
    t.classList.add('has');
    const im=document.createElement('img');
    im.src=url; im.alt='התמונה שנשמרה למאגר '+title;
    t.appendChild(im);
    if(own){
    const x=document.createElement('button');
    x.type='button'; x.className='tx'; x.textContent='הסרה';
    x.title='הסרת התמונה'; x.setAttribute('aria-label','הסר תמונה מ'+title);
    x.addEventListener('click', ev=>{
      ev.stopPropagation(); ev.preventDefault();
      imgDel(id);
      if(activeId===id) showOwnImage();
      renderLibrary();
    });
    t.appendChild(x);
    }
  }else{
    t.appendChild(document.createTextNode('תמונה'));
  }

  t.addEventListener('click', ev=>ev.stopPropagation());       // התמונה היא פעולה נפרדת מהנגינה
  t.addEventListener('dragover', ev=>{ ev.preventDefault(); ev.stopPropagation(); t.classList.add('over'); });
  t.addEventListener('dragleave', ()=>t.classList.remove('over'));
  t.addEventListener('drop', ev=>{
    ev.preventDefault(); ev.stopPropagation(); t.classList.remove('over');
    const f=ev.dataTransfer.files && ev.dataTransfer.files[0];
    if(f) setChipImage(id, f);
  });
  return t;
}

async function setChipImage(id, file){
  if(!file || !/^image\//.test(file.type)){ libNote('זה לא קובץ תמונה.','err'); return; }
  try{
    const url = await shrinkImage(file);
    if(!imgPut(id, url)){
      libNote('אין מקום באחסון הדפדפן. הסירו תמונה אחרת ונסו שוב.','err'); return;
    }
    if(activeId===id) showOwnImage();
    renderLibrary();
    libNote('התמונה נשמרה לכרטיסייה.','ok');
  }catch(e){ libNote('לא הצלחתי לקרוא את התמונה.','err'); }
}
const libNote=(m,c)=>{ const e=$('libNote'); e.textContent=m; e.className='status'+(c?' '+c:''); };

function renderLibrary(){
  const wrap = $('library');
  const mine = libRead();
  wrap.innerHTML = '';

  const chip = (id, title, source, badge, isMine, onClick, onDelete) => {
    const b=document.createElement('div');
    b.className='chip'+(isMine?' mine':'')+(activeId===id?' active':'');
    b.dataset.id=id;
    b.setAttribute('role','button'); b.tabIndex=0;
    b.innerHTML = `<span class="ctext"><span class="ct"></span><span class="cs"></span>` +
                  `<span class="cb">${badge}</span></span>`;
    b.querySelector('.ct').textContent = title;                 // textContent — התוכן מגיע מקבצי המשתמשת
    b.querySelector('.cs').textContent = source || '';
    b.insertBefore(buildThumb(id, title), b.firstChild);        // התמונה ליד השם
    b.addEventListener('click', onClick);
    b.addEventListener('keydown', ev=>{
      if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault(); onClick(); }
    });
    if(onDelete){
      const d=document.createElement('button');
      d.type='button'; d.className='del'; d.textContent='מחיקה';
      d.title='מחק מהספרייה'; d.setAttribute('aria-label','מחק את '+title);
      d.addEventListener('click',ev=>{ ev.stopPropagation(); onDelete(); });
      b.appendChild(d);
    }
    wrap.appendChild(b);
  };

  SAMPLES.forEach(s=>chip('built:'+s.id, s.name, s.title, 'יצירה מהסדרה', false,
    ()=>go('#/work/'+s.id), null));
  mine.forEach(e=>chip('user:'+e.id, e.title,
    `${e.columns.filter(c=>c.numeric).length} עמודות, ${e.columns[0].values.length} נקודות. נשמר ${e.savedAt}`,
    'שלי', true, ()=>go('#/mine/'+e.id), ()=>deleteFromLibrary(e.id, e.title)));

  libNote(storageAvailable
    ? (mine.length
        ? `${mine.length} מאגרים שלך נשמרים בדפדפן הזה. גררו כמה קבצים יחד כדי להוסיף עוד.`
        : 'כאן יופיעו גם הנתונים שלך. טענו קובץ או הדביקו טבלה, תנו שם ולחצו "שמירה בספרייה". אפשר לגרור כמה קבצים בבת אחת.')
    : 'האחסון המקומי חסום בהקשר הזה, ולכן אי אפשר לשמור מאגרים. פתחו את הקובץ ישירות בדפדפן כדי שהספרייה תעבוד.', '');
}

/* ==========================================================================
   04-COMPONENTS · F — התמונה שלך. נשמרת לכל מאגר בנפרד, כולל המובנים.
   מוקטנת לפני השמירה: אחסון הדפדפן קטן, ותמונת מצלמה מלאה תמלא אותו לבד.
   ========================================================================== */
const IMG_KEY='datasong.images', IMG_MAX=900, IMG_Q=0.72;

function imgMap(){ try{ return JSON.parse(localStorage.getItem(IMG_KEY)||'{}'); }catch(e){ return {}; } }
function imgGet(id){ return id ? (imgMap()[id]||null) : null; }
function imgPut(id, dataUrl){
  const m=imgMap(); m[id]=dataUrl;
  try{ localStorage.setItem(IMG_KEY, JSON.stringify(m)); return true; }
  catch(e){ return false; }        // בדרך כלל חריגה ממכסת האחסון
}
function imgDel(id){
  const m=imgMap(); delete m[id];
  try{ localStorage.setItem(IMG_KEY, JSON.stringify(m)); }catch(e){}
}

/** מקטין ודוחס לפני שמירה, כדי שהאחסון המקומי לא יתמלא מתמונה אחת. */
function shrinkImage(file){
  return new Promise((res,rej)=>{
    const url=URL.createObjectURL(file), im=new Image();
    im.onload=()=>{
      const s=Math.min(1, IMG_MAX/Math.max(im.width,im.height));
      const cv=document.createElement('canvas');
      cv.width=Math.max(1,Math.round(im.width*s)); cv.height=Math.max(1,Math.round(im.height*s));
      cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);
      URL.revokeObjectURL(url);
      res(cv.toDataURL('image/jpeg', IMG_Q));
    };
    im.onerror=()=>{ URL.revokeObjectURL(url); rej(new Error('bad image')); };
    im.src=url;
  });
}

async function acceptArchImage(file){
  if(!file || !/^image\//.test(file.type)){ archStatus('זה לא קובץ תמונה.','err'); return; }
  if(!activeId){ archStatus('שמרו קודם את המאגר בספרייה, כדי שתהיה לתמונה כתובת.','err'); return; }
  try{
    const url = await shrinkImage(file);
    if(!imgPut(activeId, url)){
      archStatus('אין מקום באחסון הדפדפן. הסירו תמונה אחרת ונסו שוב.','err'); return;
    }
    showOwnImage();
    renderLibrary();                     // הכרטיסייה בספרייה מציגה את אותה תמונה
    archStatus('התמונה נשמרה למאגר הזה.','ok');
  }catch(e){ archStatus('לא הצלחתי לקרוא את התמונה.','err'); }
}

function showOwnImage(){
  const url = imgGet(activeId);
  const img=$('ownImg'), empty=$('ownEmpty'), clear=$('ownClear');
  img.classList.toggle('has', !!url);
  if(url) img.src=url; else img.removeAttribute('src');
  empty.hidden = !!url;
  clear.hidden = !url;
}

/** שלושה מצבים למסגרת: 'art' הדמיה, 'gen' שרטוט מהנתונים, 'own' התמונה שלך. */
function setArchTab(mode){
  const built = activeId && activeId.startsWith('built:') ? activeId.slice(6) : null;
  if(mode==='art' && !built) mode='gen';
  [['tabArt','art'],['tabGen','gen'],['tabOwn','own']].forEach(([id,m])=>{
    $(id).classList.toggle('on', mode===m);
    $(id).setAttribute('aria-selected', String(mode===m));
  });
  $('tabArt').hidden = !built;
  const img = $('artImg');
  if(mode==='art'){
    const src = artSrc(built);
    if(img.getAttribute('src')!==src){
      img.classList.remove('ready');
      img.onload = ()=>img.classList.add('ready');
      img.src = src;
      img.alt = (SAMPLES.find(s=>s.id===built)||{}).see || '';
    }
    if(img.complete && img.naturalWidth) img.classList.add('ready');
  }
  img.hidden = mode!=='art';
  $('artMark').hidden = mode!=='art';
  $('ownWrap').hidden = mode!=='own';
  archSvg.style.visibility = mode==='gen' ? 'visible' : 'hidden';
  $('archCtl').style.opacity = mode==='gen' ? '1' : '.6';
  if(mode==='own') showOwnImage();
  SPACE_MODE = mode; refreshRead();
}
const archStatus=(m,c)=>{ const e=$('archStatus'); e.textContent=m; e.className='status'+(c?' '+c:''); };

/* ---------- ייצוא ---------- */
async function exportWav(){
  if(!DATA) return;
  const S=readSettings(), score=buildScore(S);
  if(!score || !score.events.length){ expStatus('אין שכבה פעילה לייצוא.','err'); return; }
  const btn=$('expWav'); btn.disabled=true;
  $('expProg').hidden=false; $('expProg').removeAttribute('value');   // מצב "עסוק" — אין אחוזים אמיתיים
  // הרינדור עשוי לקחת יותר מאורך היצירה (הריוורב הקונבולוציוני יקר), לכן מונה זמן אמיתי
  // במקום הבטחה שלא נוכל לעמוד בה.
  const t0 = performance.now();
  const tick = setInterval(()=>{
    expStatus(`מרנדר ${score.total.toFixed(0)} שנ׳ של אודיו… ${((performance.now()-t0)/1000).toFixed(0)} שנ׳ עברו.`,'');
  }, 250);
  expStatus('מרנדר…','');
  try{
    const buffer = await Tone.Offline(async ()=>{
      const g = await buildGraph(S);
      score.events.forEach(ev=>g.fire(ev, ev.t));
    }, score.total, 2, 44100);
    const wav = audioBufferToWav(buffer.get ? buffer.get() : buffer);
    download(wav, fileBase()+'.wav');
    expStatus(`נשמר, ${score.total.toFixed(1)} שנ׳, ${(wav.size/1048576).toFixed(1)} MB ` +
              `(רינדור: ${((performance.now()-t0)/1000).toFixed(1)} שנ׳).`,'ok');
  }catch(err){
    console.error(err);
    expStatus('הרינדור נכשל: '+(err && err.message ? err.message : err),'err');
  }finally{
    clearInterval(tick);
    btn.disabled=false; $('expProg').hidden=true;
  }
}

function exportSvg(){
  download(new Blob([svgString()],{type:'image/svg+xml;charset=utf-8'}), fileBase()+'.svg');
  expStatus('קובץ SVG נשמר.','ok');
}

/** ממיר SVG כלשהו ל-PNG ברזולוציה כפולה. משרת גם את הגרף וגם את השרטוט. */
function pngFrom(el, w, h, name, say){
  const scale=2;
  const blob=new Blob([svgString(el,w,h)],{type:'image/svg+xml;charset=utf-8'});
  const url=URL.createObjectURL(blob), img=new Image();
  img.onload=()=>{
    const cv=document.createElement('canvas');
    cv.width=w*scale; cv.height=h*scale;
    const ctx=cv.getContext('2d');
    ctx.fillStyle=css('--panel2')||'#1b262d';
    ctx.fillRect(0,0,cv.width,cv.height);
    ctx.drawImage(img,0,0,cv.width,cv.height);
    URL.revokeObjectURL(url);
    cv.toBlob(b=>{ download(b, name); say('קובץ PNG נשמר (רזולוציה כפולה).','ok'); },'image/png');
  };
  img.onerror=()=>{ URL.revokeObjectURL(url); say('המרת ה-PNG נכשלה, נסו SVG.','err'); };
  img.src=url;
}
function exportPng(){ pngFrom(svg, VW, VH, fileBase()+'.png', expStatus); }

const fileBase = () => 'datasong-' + (DATA && DATA.title ? DATA.title.replace(/[\\/:*?"<>|]/g,'').slice(0,40).trim() : 'export');
function expStatus(m,c){ const e=$('expStatus'); e.textContent=m; e.className='status'+(c?' '+c:''); }

/* ==========================================================================
   04-COMPONENTS · D — חיווט.
   ========================================================================== */
buildMixer();
refreshSources();
loadSettings();
syncLabels();

renderLibrary();

/* ---------- האדריכלות ---------- */
['archType','archFill'].forEach(id=>$(id).addEventListener('change',()=>{ drawArch(); saveSettings(); }));
['archBays','archProp','archDepth'].forEach(id=>$(id).addEventListener('input',()=>{
  $('archBaysV').textContent=$('archBays').value;
  $('archPropV').textContent=(+$('archProp').value).toFixed(2).replace(/0$/,'');
  $('archDepthV').textContent=$('archDepth').value;
  drawArch(); saveSettings();
}));

$('tabArt').addEventListener('click',()=>setArchTab('art'));
$('tabGen').addEventListener('click',()=>setArchTab('gen'));
$('tabOwn').addEventListener('click',()=>setArchTab('own'));

const archFile=$('archFile'), ownEmpty=$('ownEmpty');
archFile.addEventListener('change',e=>{ acceptArchImage(e.target.files[0]); e.target.value=''; });
['dragover','dragenter'].forEach(ev=>ownEmpty.addEventListener(ev,e=>{e.preventDefault();ownEmpty.classList.add('over');}));
['dragleave','drop'].forEach(ev=>ownEmpty.addEventListener(ev,e=>{e.preventDefault();ownEmpty.classList.remove('over');}));
ownEmpty.addEventListener('drop',e=>acceptArchImage(e.dataTransfer.files[0]));
$('ownClear').addEventListener('click',()=>{
  if(!activeId || !confirm('להסיר את התמונה השמורה למאגר הזה?')) return;
  imgDel(activeId); showOwnImage(); renderLibrary(); archStatus('התמונה הוסרה.','');
});

$('archPng').addEventListener('click',()=>pngFrom(archSvg,AW,AH,fileBase()+'-אדריכלות.png',archStatus));
$('archSvg').addEventListener('click',async ()=>{
  const ok = await download(new Blob([svgString(archSvg,AW,AH)],{type:'image/svg+xml;charset=utf-8'}),
                            fileBase()+'-אדריכלות.svg');
  if(ok !== false) archStatus('קובץ SVG נשמר.','ok');
});
$('archCopy').addEventListener('click',async ()=>{
  try{ await navigator.clipboard.writeText(ARCH_TEXT); archStatus('התיאור הועתק.','ok'); }
  catch(e){ archStatus('ההעתקה נחסמה, סמנו את הטקסט שמתחת לשרטוט.','err'); }
});

// מתג ההסברים — מצב נשמר, כך שהבחירה מחזיקה בין ביקורים
$('showHelp').addEventListener('change',e=>{
  document.getElementById('app').classList.toggle('showhelp', e.target.checked);
  try{ localStorage.setItem('datasong.help', e.target.checked ? '1':'0'); }catch(err){}
});
try{
  if(localStorage.getItem('datasong.help')==='1'){
    $('showHelp').checked=true;
    document.getElementById('app').classList.add('showhelp');
  }
}catch(err){}

$('saveLib').addEventListener('click',()=>saveToLibrary($('saveName').value));
$('saveName').addEventListener('keydown',e=>{ if(e.key==='Enter') saveToLibrary(e.target.value); });

btnPlay.addEventListener('click',startPlayback);
btnPause.addEventListener('click',pausePlayback);
btnStop.addEventListener('click',stopPlayback);

['tempo','smooth','legato','thresh'].forEach(id=>
  $(id).addEventListener('input',()=>{ syncLabels(); saveSettings(); drawViz(); }));
['scale','root'].forEach(id=>$(id).addEventListener('change',onStructuralChange));
$('labelCol').addEventListener('change',e=>{
  const i=+e.target.value;
  DATA.labelCol=i;
  DATA.labels = i>=0 ? DATA.columns[i].values.map(String) : null;
  drawViz();
});

// קובץ
const fileInput=$('file'), drop=$('drop');
drop.addEventListener('click',()=>fileInput.click());
fileInput.addEventListener('change',e=>{ readFiles(e.target.files); e.target.value=''; });
['dragover','dragenter'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over');}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over');}));
drop.addEventListener('drop',e=>readFiles(e.dataTransfer.files));

// הדבקה
$('load').addEventListener('click',()=>{
  const d=parseInput($('paste').value);
  if(d) setData(d); else setStatus('לא נמצאו נתונים בהדבקה.','err');
});

// ייצוא
$('expWav').addEventListener('click',exportWav);
$('expPng').addEventListener('click',exportPng);
$('expSvg').addEventListener('click',exportSvg);

// מקלדת: רווח מנגן/משהה — אך לא כשהמיקוד בשדה קלט
document.addEventListener('keydown',e=>{
  if(e.code!=='Space') return;
  const t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT'||t==='BUTTON'||t==='SUMMARY') return;
  e.preventDefault();
  if(playing) pausePlayback(); else if(DATA) startPlayback();
});

window.addEventListener('beforeunload',()=>{ try{Tone.Transport.stop();}catch(e){} });

/* ==========================================================================
   04-COMPONENTS · G — המעטפת: דף הבית, הסטודיו והניווט ביניהם.
   ========================================================================== */
const pad2 = n => String(n).padStart(2,'0');

/** כותרת הסטודיו: ליצירה מהסדרה שם היצירה, לנתונים שלך שם הקובץ. */
function showWorkMeta(d, libId){
  const i = libId && libId.startsWith('built:') ? SAMPLES.findIndex(s=>'built:'+s.id===libId) : -1;
  const b = i>=0 ? SAMPLES[i] : null;
  $('workNo').textContent = b ? `יצירה ${pad2(i+1)} מתוך ${pad2(SAMPLES.length)}` : 'הנתונים שלך';
  $('title').textContent = b ? b.name : d.title;
  $('workShort').textContent = b ? `${b.title}. ${b.short}` : (d.source || '');
  document.title = `${b ? b.name : d.title} · DataSong`;
  renderStrip();
}

/** נתיב קו מתוך סדרה, מנורמל לתיבה. משמש את דף הבית בלבד. */
function linePath(v, W, H, padTop){
  const mn=Math.min(...v), mx=Math.max(...v), r=(mx-mn)||1, t=padTop||0;
  return v.map((x,i)=>`${i?'L':'M'}${(W*i/(v.length-1)).toFixed(1)} ${(t+(H-t)*(1-(x-mn)/r)).toFixed(1)}`).join(' ');
}
const melOf = id => (SAMPLES.find(s=>s.id===id)||{json:{melody:[]}}).json.melody;

function renderGallery(){
  const g=$('gallery'); g.innerHTML='';
  SAMPLES.forEach((s,i)=>{
    const a=document.createElement('a');
    a.className='work'; a.href='#/work/'+s.id;
    const d=linePath(melOf(s.id),100,40,6);
    a.innerHTML=`
      <div class="work-frame">
        <img loading="lazy" decoding="async" src="${artSrc(s.id,true)}"
             srcset="${artSrc(s.id,true)} 640w, ${artSrc(s.id)} 1600w"
             sizes="(max-width:620px) 92vw, (max-width:860px) 46vw, 50vw" alt="">
        <svg class="spark" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <path class="sf" d="${d} L100 40 L0 40 Z" fill="rgba(255,255,255,.10)"/><path d="${d}"/>
        </svg>
      </div>
      <div class="work-meta">
        <span class="work-n">${pad2(i+1)}</span>
        <h3 class="work-t"></h3>
        <p class="work-s"></p>
      </div>`;
    a.querySelector('img').alt = s.see;
    a.querySelector('.work-t').textContent = s.name;
    a.querySelector('.work-s').textContent = s.short;
    g.appendChild(a);
  });
}

function renderStrip(){
  const r=$('strip'); r.innerHTML='';
  SAMPLES.forEach((s,i)=>{
    const a=document.createElement('a');
    a.href='#/work/'+s.id;
    a.setAttribute('aria-current', String(activeId==='built:'+s.id));
    a.innerHTML=`<img loading="lazy" src="${artSrc(s.id,true)}" alt=""><span></span>`;
    a.querySelector('span').textContent = `${pad2(i+1)} ${s.name}`;
    r.appendChild(a);
  });
}

/** הרגע היחיד שזז בלי שנגעו בו: קו הגובה של אשדוד נמתח לאורך תמונת הפתיחה. */
function drawHeroLine(){
  const svgH=$('heroLine'), v=melOf('01_ashdod_elevation');
  const d=linePath(v,1000,120,8);
  svgH.innerHTML=`<defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3d9a6" stop-opacity=".28"/><stop offset="1" stop-color="#f3d9a6" stop-opacity="0"/></linearGradient></defs>
    <path class="fillp" d="${d} L1000 120 L0 120 Z"/><path class="ln" d="${d}"/>`;
  const ln=svgH.querySelector('.ln');
  ln.style.setProperty('--len', Math.ceil(ln.getTotalLength()));
}

/** שלושת הסימנים של השיטה: אותה סדרה (יום התנועה) כנקודות, כקו וכמבנים. */
function drawGlyphs(){
  const v=melOf('03_daily_traffic'), mx=Math.max(...v), n=v.length, W=120, H=60;
  $('glyphData').innerHTML = v.map((x,i)=>`<circle cx="${(4+(W-8)*i/(n-1)).toFixed(1)}" cy="${(H-4-(H-10)*x/mx).toFixed(1)}" r="1.7"/>`).join('');
  $('glyphSound').setAttribute('d', linePath(v,W,H-2,4));
  const bw=W/n;
  $('glyphSpace').innerHTML = v.map((x,i)=>{
    const h=Math.max(2,(H-6)*x/mx);
    return `<rect x="${(i*bw+bw*.14).toFixed(1)}" y="${(H-h).toFixed(1)}" width="${(bw*.72).toFixed(1)}" height="${h.toFixed(1)}" opacity="${(.45+.55*x/mx).toFixed(2)}"/>`;
  }).join('');
}

/* ---------- מגירת הכיוונון ---------- */
function setTune(open){
  $('tune').hidden=!open; $('scrim').hidden=!open;
  $('openTune').setAttribute('aria-expanded', String(open));
  if(open) $('closeTune').focus();
}
$('openTune').addEventListener('click',()=>setTune($('tune').hidden));
$('closeTune').addEventListener('click',()=>{ setTune(false); $('openTune').focus(); });
$('scrim').addEventListener('click',()=>setTune(false));
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && !$('tune').hidden) setTune(false); });

/* ---------- ניווט ---------- */
function go(hash){ if(location.hash===hash) route(); else location.hash=hash; }
let lastStudio = '#/work/01_ashdod_elevation';

function showView(v){
  ['home','studio','data'].forEach(k=>{ $('view-'+k).hidden = k!==v; });
  $('app').dataset.view=v;
  // הסטודיו הוא חדר האזנה: אפל, כדי שהדימוי והצליל יובילו
  document.documentElement.classList.toggle('room', v==='studio');
  document.querySelector('meta[name="theme-color"]').content = v==='studio' ? '#0f1114' : '#e7e5e1';
  document.querySelectorAll('.nav a').forEach(a=>{
    const on = (a.dataset.nav==='home' && v==='home') || (a.dataset.nav==='work' && v==='studio') || (a.dataset.nav==='data' && v==='data');
    if(on) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  });
  document.querySelector('.nav a[data-nav="work"]').href = lastStudio;
}

function route(){
  const h = location.hash || '#/';
  const m = h.match(/^#\/(work|mine)\/([\w-]+)/);
  if(v_current==='studio' && !(m || h==='#/studio')){ if(playing||paused) stopPlayback(); setTune(false); }
  if(m){
    const [ , kind, id] = m;
    const key = (kind==='work'?'built:':'user:')+id;
    if(activeId!==key || !DATA){
      if(kind==='work') loadSample(id); else loadFromLibrary(id);
    }
    if(activeId!==key) return go('#/');           // מזהה שלא קיים: חוזרים לגלריה
    lastStudio=h; v_current='studio'; showView('studio');
    window.scrollTo({top:0});
    redrawForTheme();
    return;
  }
  if(h==='#/studio'){
    if(!DATA) return go('#/work/01_ashdod_elevation');
    lastStudio=h; v_current='studio'; showView('studio'); window.scrollTo({top:0}); redrawForTheme(); return;
  }
  if(h==='#/data'){ v_current='data'; showView('data'); window.scrollTo({top:0}); return; }
  v_current='home'; showView('home');
  if(h==='#/works') $('works').scrollIntoView(); else window.scrollTo({top:0});
}
let v_current = null;
/** הצבעים בשרטוט ובגרף נקראים מהטוקנים, ולכן מציירים מחדש אחרי החלפת חדר. */
function redrawForTheme(){ if(DATA){ drawViz(); drawArch(); } }

renderGallery();
drawHeroLine();
drawGlyphs();
window.addEventListener('hashchange', route);
route();

if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost')){
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
