/* מפיק את datasong-article.pdf מ-print/article-a4.html, ובודק שאף רכיב לא חורג מהדף
   ולא נתקל בשורת מספר העמוד. הרצה: node tools/make_pdf.js [תיקייה לתצוגות מקדימות]
   דורש שרת סטטי על שורש הריפו בפורט 8765 (python3 -m http.server 8765). */
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:900,height:1200}});
  await p.goto('http://localhost:8765/print/article-a4.html',{waitUntil:'networkidle'});
  await p.evaluate(()=>document.fonts.ready);
  const problems = await p.evaluate(()=>{
    const out=[];
    document.querySelectorAll('.page').forEach((pg,i)=>{
      const R=pg.getBoundingClientRect(), run=pg.querySelector('.run').getBoundingClientRect();
      pg.querySelectorAll('p,h1,h2,h3,li,figure,.thumbs,.glyphs,.wtext,.question,.colophon').forEach(el=>{
        const r=el.getBoundingClientRect();
        if(r.bottom>R.bottom+0.5 || r.left<R.left-0.5 || r.right>R.right+0.5) out.push(`page ${i+1}: ${el.tagName}.${el.className} leaves the page`);
        else if(!el.closest('.wimg,.cover-img') && r.bottom>run.top-1 && r.top<run.bottom) out.push(`page ${i+1}: ${el.tagName}.${el.className} touches the folio`);
      });
    });
    return out;
  });
  console.log(problems.length ? problems.join('\n') : 'layout ok: nothing leaves a page or touches the folio');
  await p.pdf({path:'datasong-article.pdf',width:'210mm',height:'297mm',printBackground:true,preferCSSPageSize:true});
  const dir=process.argv[2];
  if(dir){
    const pages=await p.$$('.page');
    for(let i=0;i<pages.length;i++) await pages[i].screenshot({path:`${dir}/a4-${i+1}.png`});
  }
  await b.close();
  if(problems.length) process.exitCode=1;
})();
