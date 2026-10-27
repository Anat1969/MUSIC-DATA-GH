/* בדיקת קצה לקצה. דורש שרת סטטי: python3 -m http.server 8765 (משורש הריפו).
   הרצה: node tests/e2e.js */
const {chromium}=require('playwright');
const BASE=process.env.BASE||'http://localhost:8765/';
let fails=0; const ok=(c,m)=>{ console.log((c?'PASS ':'FAIL ')+m); if(!c) fails++; };

(async()=>{
  const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
  const ctx=await b.newContext({viewport:{width:1440,height:900},acceptDownloads:true});
  const p=await ctx.newPage(); const errs=[];
  p.on('pageerror',e=>errs.push(e.message));
  p.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });

  await p.goto(BASE+'#/',{waitUntil:'networkidle'});
  ok(await p.locator('ai-menu .logo').isVisible(),'A&I logo button in the top bar');
  ok(!(await p.locator('header >> text=העתקת קישור').first().isVisible().catch(()=>false)),'no loose development buttons in the bar');
  ok(await p.locator('.brand').getAttribute('href')==='#/','app name links home');
  ok(await p.locator('#gallery .work').count()===8,'gallery shows 8 works');
  const order=await p.evaluate(()=>[...document.querySelectorAll('#view-home > section')].map(s=>s.className.split(' ')[0]));
  ok(order.join(',')==='hero,works,method,data-band,essay-band','home follows the nav order: '+order.join(','));
  await p.evaluate(async()=>{ for(let y=0;y<6000;y+=500){ scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); } });
  await p.waitForTimeout(800);
  const broken=await p.evaluate(()=>[...document.querySelectorAll('#gallery img')].filter(i=>!i.naturalWidth).length);
  ok(broken===0,'all gallery images load');
  ok((await p.locator('#heroLine path.ln').count())===1,'hero data line drawn');

  await p.locator('#gallery .work').nth(2).click();
  await p.waitForTimeout(600);
  ok(p.url().endsWith('#/work/03_daily_traffic'),'card opens its work');
  ok((await p.textContent('#title')).trim()==='שתי שעות שיא','studio shows the work name');
  ok(await p.evaluate(()=>!document.documentElement.classList.contains('room') && getComputedStyle(document.body).backgroundColor!=='rgb(15, 17, 20)'),'studio stays light, like every screen');
  await p.waitForFunction(()=>document.getElementById('artImg').classList.contains('ready'),null,{timeout:5000}).then(()=>ok(true,'artwork loads in the frame')).catch(()=>ok(false,'artwork loads in the frame'));
  ok((await p.textContent('#archRead')).includes('קמרונות'),'reading describes the image');

  await p.click('#tabGen'); ok(await p.evaluate(()=>document.getElementById('arch').childElementCount>3 && getComputedStyle(document.getElementById('arch')).visibility==='visible'),'drawing tab shows the generated drawing');
  ok((await p.textContent('#archRead')).includes('קולונדה'),'reading follows the drawing');
  await p.click('#tabOwn'); ok(await p.locator('#ownEmpty').isVisible(),'my-image tab offers an upload');
  await p.click('#tabArt'); ok(await p.locator('#artImg').isVisible(),'back to the artwork');

  await p.click('#play');
  await p.waitForFunction(()=>document.getElementById('app').classList.contains('playing'),null,{timeout:8000}).then(()=>ok(true,'play starts')).catch(()=>ok(false,'play starts'));
  await p.waitForTimeout(1500);
  ok((await p.textContent('#readout')).length>0,'readout follows the music');
  const prog=await p.evaluate(()=>+getComputedStyle(document.getElementById('archFrame')).getPropertyValue('--prog')||0);
  ok(prog>0,'scan line moves across the image');
  await p.click('#pause'); ok(!(await p.evaluate(()=>document.getElementById('app').classList.contains('playing'))),'pause stops the room');
  ok((await p.textContent('#play .play-label')).trim()==='המשך','play button offers resume');
  await p.click('#stop'); ok((await p.textContent('#play .play-label')).trim()==='נגן','stop resets');

  await p.click('#openTune'); ok(await p.locator('#tune').isVisible(),'tune drawer opens');
  const top=await p.evaluate(()=>document.getElementById('tune').getBoundingClientRect().top);
  ok(top>=60,'drawer opens beneath the top bar');
  // כל מכוון נחווה: שינוי בעצירה משמיע האזנה קצרה, ומסומן עם חזרה למקרה המייצג
  await p.evaluate(()=>{ const t=document.getElementById('tempo'); t.value=40; t.dispatchEvent(new Event('input',{bubbles:true})); });
  await p.waitForFunction(()=>document.getElementById('app').classList.contains('playing'),null,{timeout:5000})
    .then(()=>ok(true,'a tuner change while stopped plays a short audition')).catch(()=>ok(false,'a tuner change while stopped plays a short audition'));
  ok(await p.locator('#tempo').locator('xpath=..').locator('.rep').isVisible(),'changed tuner offers a return to the representative case');
  await p.locator('#tempo').locator('xpath=..').locator('.rep').click();
  ok((await p.inputValue('#tempo'))==='16','return restores the representative value');
  await p.waitForTimeout(300);
  ok(await p.evaluate(()=>!document.querySelector('#tempo').closest('.field').classList.contains('changed')),'mark clears after the return');
  await p.selectOption('#scale','major'); await p.waitForTimeout(800);
  ok(await p.evaluate(()=>document.getElementById('app').classList.contains('playing')),'a structural change keeps playing in the new sound');
  await p.click('#stop').catch(()=>{});
  await p.click('#tabArt');
  await p.selectOption('#archType','stack');
  ok(await p.evaluate(()=>document.getElementById('tabGen').classList.contains('on')),'touching a space tuner shows the drawing');
  await p.click('#repAll'); await p.waitForTimeout(300);
  ok((await p.inputValue('#archType'))==='colonnade' && (await p.inputValue('#scale'))==='minor','all back to the representative case');
  await p.keyboard.press('Escape'); ok(!(await p.locator('#tune').isVisible()),'Esc closes the drawer');

  const [dl]=await Promise.all([p.waitForEvent('download',{timeout:5000}).catch(()=>null), p.click('#expSvg')]);
  ok(!!dl,'graph SVG downloads');

  await p.hover('.rail'); await p.locator('#strip a').nth(7).dispatchEvent('click'); await p.waitForTimeout(500);
  ok((await p.textContent('#title')).trim()==='החריץ','strip moves to another work');
  const rail=await p.evaluate(()=>{const r=document.querySelector('.rail').getBoundingClientRect(), m=document.querySelector('.stage').getBoundingClientRect();
    return {left:r.right<=m.left+1, moving:document.getElementById('strip').classList.contains('moving'), tall:r.height>r.width*2};});
  ok(rail.left && rail.tall,'works rail is a vertical axis on the left side');
  ok(rail.moving,'works rail drifts up and down');

  await p.click('.nav a[data-nav="data"]'); await p.waitForTimeout(300);
  ok(!(await p.evaluate(()=>document.documentElement.classList.contains('room'))),'data view is light');
  await p.fill('#paste','שנה,ערך\n2000,3\n2001,5\n2002,9\n2003,4\n2004,12\n2005,7');
  await p.click('#load');
  ok((await p.getAttribute('#status','class')).includes('ok'),'pasted table loads');
  await p.fill('#saveName','בדיקה'); await p.click('#saveLib');
  ok(await p.locator('#library .chip.mine').count()===1,'saved to the library');
  ok(await p.locator('#toStudio').isVisible(),'open-in-studio offered');
  await p.locator('#library .chip.mine').click(); await p.waitForTimeout(400);
  ok((await p.textContent('#workNo')).includes('הנתונים שלך'),'own data opens in the studio');
  ok(await p.locator('#tabArt').isHidden(),'no artwork tab for own data');

  await p.goto(BASE+'article.html',{waitUntil:'networkidle'});
  ok(await p.locator('ai-menu .logo').isVisible(),'article has the logo button');
  const uni=await p.evaluate(()=>{
    const secs=[...document.querySelectorAll('.mag .page')], out=[];
    if(secs.length!==13) out.push('sections '+secs.length);
    secs.forEach((s,i)=>{
      if(getComputedStyle(s).backgroundColor!=='rgb(255, 255, 255)') out.push(i+' not white');
      if(!s.querySelector('.pimg')||!s.querySelector('.side')||!s.querySelector('.body')||!s.querySelector('.band')) out.push(i+' missing a slot');
    });
    return out;
  });
  ok(uni.length===0,'article sections share one white template'+(uni.length?': '+uni.join(', '):''));
  for(const f of ['datasong-article.pdf','datasong-article.docx']){
    const r=await p.request.get(BASE+f); ok(r.ok(),f+' is served');
  }

  const cdp=await ctx.newCDPSession(p);
  await p.goto(BASE+'#/',{waitUntil:'networkidle'}); await p.waitForTimeout(1500);
  const inst=await cdp.send('Page.getInstallabilityErrors');
  ok(inst.installabilityErrors.length===0,'installable: '+JSON.stringify(inst.installabilityErrors));

  // מסך מחשב: כל מסך מציג את התוכן שלו במלואו בגובה החלון
  for(const [w,h] of [[1440,900],[1280,720],[1920,1080]]){
    const d=await b.newPage({viewport:{width:w,height:h}});
    await d.goto(BASE+'#/work/03_daily_traffic',{waitUntil:'networkidle'}); await d.waitForTimeout(500);
    const fit=await d.evaluate(()=>{
      const H=innerHeight, out=[];
      if(document.documentElement.scrollHeight>H+1) out.push('page scrolls '+document.documentElement.scrollHeight);
      ['#play','#archFrame','#viz','#interp','#openTune','#expWav','.rail'].forEach(q=>{
        const r=document.querySelector(q).getBoundingClientRect();
        if(r.bottom>H+1||r.height<20) out.push(q+' '+Math.round(r.top)+'-'+Math.round(r.bottom));
      });
      return out;
    });
    ok(fit.length===0,`studio fits one screen at ${w}x${h}`+(fit.length?': '+fit.join(', '):''));
    await d.goto(BASE+'#/',{waitUntil:'networkidle'});
    const home=await d.evaluate(()=>{
      const H=innerHeight-document.querySelector('.topbar').offsetHeight, out=[];
      document.querySelectorAll('.hero,.method,.works,.essay-band').forEach(s=>{
        if(Math.abs(s.offsetHeight-H)>2) out.push(s.className+' '+s.offsetHeight+'/'+H);
      });
      const g=document.getElementById('works').getBoundingClientRect();
      document.querySelectorAll('#gallery .work').forEach((c,i)=>{ const r=c.getBoundingClientRect(); if(r.bottom>g.bottom+1) out.push('work '+(i+1)+' overflows'); });
      return out;
    });
    ok(home.length===0,`home sections are one screen each at ${w}x${h}`+(home.length?': '+home.join(', '):''));
    await d.goto(BASE+'article.html',{waitUntil:'networkidle'});
    const art=await d.evaluate(()=>{
      const H=innerHeight-document.querySelector('.topbar').offsetHeight, out=[];
      document.querySelectorAll('.mag .page').forEach((s,i)=>{ if(Math.abs(s.offsetHeight-H)>2) out.push(i+':'+s.offsetHeight+'/'+H); });
      return out;
    });
    ok(art.length===0,`every article section is one screen at ${w}x${h}`+(art.length?': '+art.join(', '):''));
    await d.close();
  }

  const m=await b.newPage({viewport:{width:390,height:844}});
  for(const h of ['#/','#/work/05_population_growth','#/data']){
    await m.goto(BASE+h,{waitUntil:'networkidle'}); await m.waitForTimeout(300);
    ok(await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal scroll on mobile '+h);
  }
  await m.goto(BASE+'article.html',{waitUntil:'networkidle'});
  ok(await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal scroll on mobile article');

  const real=errs.filter(e=>!/favicon|net::ERR|Failed to load resource/.test(e));
  ok(real.length===0,'no page errors'+(real.length?': '+real.join(' | '):''));
  await b.close();
  console.log(fails?`\n${fails} failed`:'\nall passed'); process.exitCode=fails?1:0;
})();
