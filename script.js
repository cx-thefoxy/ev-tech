const $=s=>document.querySelector(s);
const v=(x,u)=>x==null?NA:`<span class="num">${x}${u?" "+u:""}</span>`;
function carSvg(c){return `<svg viewBox="0 0 300 110"><path d="M20 80Q25 55 80 50L115 30Q150 20 195 30L245 50Q285 55 282 80Z" fill="#0b1118" stroke="${c}" stroke-width="2"/><circle cx="80" cy="82" r="16" fill="#07090d" stroke="${c}" stroke-width="3"/><circle cx="225" cy="82" r="16" fill="#07090d" stroke="${c}" stroke-width="3"/></svg>`}
const vs=(x,u)=>x==null?'<span class="na">—</span>':`<span class="num">${x} ${u}</span>`;
const bar=(x,m)=>x==null?"":`<i style="--w:${Math.round(x/m*100)}%"></i>`;
function card(c){return `<article class="card reveal" data-id="${c.id}" tabindex="0"><div class="ph"><img src="images/${c.id}.jpg" alt="${c.brand} ${c.model}" loading="lazy"><span class="chip">${c.cat}</span><span class="yr num">${c.year}</span></div><div class="cb"><small class="en">${c.brand}</small><h3 class="en">${c.model}</h3><div class="st"><div><label>توان</label><b>${vs(c.power,"kW")}</b>${bar(c.power,830)}</div><div><label>باتری</label><b>${vs(c.battery,"kWh")}</b>${bar(c.battery,120)}</div><div><label>برد</label><b>${vs(c.range,"km")}</b>${bar(c.range,850)}</div></div><span class="more">مشاهده جزئیات ←</span></div></article>`}
function render(){const q=$("#q").value.toLowerCase(),b=$("#fb").value,k=$("#fc").value,s=$("#so").value;
let l=VEHICLES.filter(c=>(c.brand+" "+c.model).toLowerCase().includes(q)&&(!b||c.brand===b)&&(!k||c.cat===k));
if(s)l.sort((a,z)=>(z[s]??-1)-(a[s]??-1));
$("#list").innerHTML=l.length?l.map(card).join(""):"<p>خودرویی پیدا نشد. فیلترها را تغییر دهید.</p>";reveal()}
function fill(sel,arr,ph){sel.innerHTML=(ph?`<option value="">${ph}</option>`:"")+arr.map((x,i)=>`<option value="${ph?x:i}">${x}</option>`).join("")}
fill($("#fb"),[...new Set(VEHICLES.map(c=>c.brand))],"همه سازندگان");
fill($("#fc"),[...new Set(VEHICLES.map(c=>c.cat))],"همه دسته‌ها");
["#q","#fb","#fc","#so"].forEach(s=>$(s).addEventListener("input",render));render();
$("#list").addEventListener("click",e=>{const c=e.target.closest(".card");if(c)openD(c.dataset.id)});
function row(a,b){return `<div class="spec"><span>${a}</span><b>${b}</b></div>`}
function openD(id){const c=VEHICLES.find(x=>x.id===id);
const T={
"عمومی":[["سازنده",c.brand],["مدل",c.model],["سال مدل",v(c.year)],["دسته",c.cat],["سیستم محرک",c.drive],["تعداد موتور",v(c.motors)]],
"موتور":[["نوع",c.motorType],["توان اوج",v(c.power,"kW")],["گشتاور",v(c.torque,"Nm")],["جایگاه",c.placement],["خنک‌کاری",c.motorCool]],
"باتری":[["شیمی",c.chem],["ظرفیت (ناخالص)",v(c.battery,"kWh")],["ظرفیت قابل استفاده",v(c.usable,"kWh")],["ولتاژ",c.volt||NA],["معماری",c.arch]],
"شارژ":[["شارژ",c.charge],["کانکتور",c.connector]],
"عملکرد":[["۰ تا ۱۰۰",v(c.accel,"s")],["حداکثر سرعت",v(c.top,"km/h")],["برد "+(c.rangeNote||""),v(c.range,"km")],["مصرف انرژی",c.cons?`<span class="num">${c.cons}</span>`:NA]],
"درایوترین":[["سیستم محرک",c.drive],["گیربکس",c.id=="tc"?"جلو تک‌سرعته، عقب دو سرعته":"تک‌سرعته"],["دیفرانسیل","گشتاور را بین دو چرخ هر محور پخش می‌کند؛ جزئیات این تریم: "+NA],["اینورتر","DC باتری را به AC سه‌فاز برای موتور تبدیل می‌کند"],["مبدل DC-DC","ولتاژ بالا را به ۱۲ ولت برای تجهیزات جانبی می‌رساند"],["مسیر توان","باتری ← اینورتر ← موتور ← گیربکس ← دیفرانسیل ← چرخ‌ها"]],
"حرارتی":[["خنک‌کاری باتری","با مایع خنک‌کننده؛ جزئیات این تریم: "+NA],["خنک‌کاری موتور",c.motorCool],["خنک‌کاری اینورتر","معمولاً مدار مایع مشترک با موتور؛ تأییدشده برای این تریم: "+NA],["پمپ حرارتی","تأییدشده برای این تریم: "+NA],["اصل کار","گرما از اجزای داغ به رادیاتور یا پمپ حرارتی منتقل می‌شود تا باتری در دمای مناسب بماند و شارژ سریع ممکن شود."]]};
const first="عمومی";
$("#detail").innerHTML=`<div class="sheet"><button class="x" id="cl" aria-label="بستن">×</button><div class="dh"><img class="dimg" src="images/${c.id}.jpg" alt="${c.brand} ${c.model}"><div class="dt"><small class="en">${c.brand} · ${c.year}</small><h2 class="en">${c.model}</h2></div></div><div class="tabs">${Object.keys(T).map(k=>`<button class="tab ${k==first?"on":""}" data-k="${k}">${k}</button>`).join("")}</div><div id="tb"></div><p class="note">${c.note}</p><p class="note">منابع: ${c.src}</p><p class="note">توان اوج یعنی حداکثر لحظه‌ای؛ توان پیوسته معمولاً کمتر است. برد WLTP و EPA قابل مقایسه مستقیم نیستند.</p></div>`;
const show=k=>{$("#tb").innerHTML=T[k].map(r=>row(...r)).join("");[...$("#tb").children].forEach((e,i)=>e.style.animationDelay=i*50+"ms");document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t.dataset.k==k))};
show(first);$("#detail").classList.add("open");
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>show(t.dataset.k));
$("#cl").onclick=()=>$("#detail").classList.remove("open")}
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#detail").classList.remove("open")});
// anatomy
const H={battery:[230,195,270,28],motor:[516,180,50,38],inverter:[500,148,45,28],obc:[440,158,45,26],dcdc:[388,158,45,26],bms:[300,158,60,26],cooling:[105,165,30,50],trans:[572,195,30,26],diff:[604,198,26,26],port:[650,128,24,20]};
const svg=$("#svg");
svg.innerHTML=`<line class="floor" x1="30" y1="270" x2="770" y2="270"/><path class="body draw" d="M60 245 L58 212 Q60 182 118 174 L225 156 Q300 96 392 88 L522 88 Q590 94 642 154 L718 170 Q748 178 748 212 L746 245 Z"/><path class="glass" d="M250 156 Q310 106 392 100 L520 100 Q572 106 612 152 Z"/>${Array.from({length:30},(_,i)=>`<line class="cell" x1="${232+i*9}" y1="212" x2="${232+i*9}" y2="236"/>`).join("")}<g class="wheel"><circle cx="180" cy="225" r="42" fill="#07090d" stroke="#cfd3da" stroke-width="2"/>${[0,72,144,216,288].map(a=>`<line x1="180" y1="225" x2="${180+36*Math.cos(a*Math.PI/180)}" y2="${225+36*Math.sin(a*Math.PI/180)}" stroke="#5b5f69" stroke-width="3"/>`).join("")}</g><g class="wheel"><circle cx="620" cy="225" r="42" fill="#07090d" stroke="#cfd3da" stroke-width="2"/>${[0,72,144,216,288].map(a=>`<line x1="620" y1="225" x2="${620+36*Math.cos(a*Math.PI/180)}" y2="${225+36*Math.sin(a*Math.PI/180)}" stroke="#5b5f69" stroke-width="3"/>`).join("")}</g>`+
PARTS.map(p=>{const[h,y,w,t]=H[p.id];return `<rect class="hot" data-id="${p.id}" x="${h}" y="${y+15}" width="${y&&w}" height="${t}" rx="4" tabindex="0"><title>${p.fa}</title></rect>`}).join("");
svg.querySelectorAll(".hot").forEach(r=>{const[x,y,w,h]=H[r.dataset.id];r.setAttribute("x",x);r.style.animationDelay=PARTS.findIndex(p=>p.id===r.dataset.id)*.25+"s";r.setAttribute("y",y+15);r.setAttribute("width",w);r.setAttribute("height",h);
r.onclick=()=>pick(r.dataset.id);r.onkeydown=e=>{if(e.key==="Enter")pick(r.dataset.id)}});
PARTS.forEach((p,i)=>{const[x,y,w,h]=H[p.id];svg.insertAdjacentHTML("beforeend",`<text class="num-t" x="${x+w/2}" y="${y+15+h/2+4}">${i+1}</text>`)});
$("#chips").innerHTML=PARTS.map((p,i)=>`<button class="tab" data-id="${p.id}">${i+1}. ${p.fa}</button>`).join("");
$("#chips").onclick=e=>{const b=e.target.closest(".tab");if(b)pick(b.dataset.id)};
const REL={battery:["inverter","bms","cooling","obc","dcdc"],motor:["inverter","trans","cooling"],inverter:["battery","motor","cooling"],obc:["port","battery","bms"],dcdc:["battery"],bms:["battery","cooling","obc"],cooling:["battery","motor","inverter"],trans:["motor","diff"],diff:["trans"],port:["obc","battery"]};
svg.insertAdjacentHTML("beforeend",'<text id="lbl" class="lbl"></text>');
function pick(id){const p=PARTS.find(x=>x.id===id);svg.querySelectorAll(".hot").forEach(r=>{r.classList.toggle("on",r.dataset.id===id);r.classList.toggle("rel",(REL[id]||[]).includes(r.dataset.id))});{const[x,y,w,h]=H[id],t=$("#lbl");t.textContent=p.en;t.setAttribute("x",Math.min(Math.max(x+w/2,90),710));t.setAttribute("y",y+15+h+15)}
$("#info").innerHTML=`<div class="fade"><h3>${p.fa} <span class="en tag">${p.en}</span></h3><p><b>عملکرد:</b> ${p.f}</p><p><b>تعامل با سایر قطعات:</b> ${p.i}</p><p class="note">${p.s}</p><button class="tab" id="rs">بازنشانی</button></div>`;
$("#rs").onclick=()=>{svg.querySelectorAll(".hot").forEach(r=>{r.classList.remove("on");r.classList.remove("rel")});$("#lbl").textContent="";$("#info").innerHTML="<p>روی یکی از قطعات کلیک کنید.</p>"}}
// flow
$("#fl").innerHTML=`<svg viewBox="0 0 800 150" class="flowsvg"><path class="track" d="M720 62H80"/>${[0,1,2,3].map(k=>`<circle class="dot" r="4"><animateMotion dur="4s" begin="${k}s" repeatCount="indefinite" path="M720 62H80"/></circle>`).join("")}${FLOW.map((f,i)=>`<g class="node" data-i="${i}" tabindex="0"><circle cx="${720-160*i}" cy="62" r="30"/><text class="n" x="${720-160*i}" y="62">${i+1}</text><text class="l" x="${720-160*i}" y="118">${f.t}</text></g>`).join("")}</svg>`;
$("#fl").onclick=e=>{const n=e.target.closest(".node");if(!n)return;document.querySelectorAll(".node").forEach(x=>x.classList.toggle("on",x===n));$("#fi").innerHTML=`<b>${FLOW[n.dataset.i].t}:</b> ${FLOW[n.dataset.i].d}`};
const FL2=[{t:"BMS",d:"سیستم مدیریت باتری در تمام مراحل، ولتاژ و دمای سلول‌ها را می‌سنجد و حد جریان مجاز را به اینورتر و شارژر اعلام می‌کند."},{t:"مدیریت حرارتی",d:"مایع خنک‌کننده گرمای باتری، موتور و اینورتر را جابه‌جا می‌کند تا همه در دمای مناسب کار کنند."}];
$("#fl2").innerHTML=FL2.map((f,i)=>`<button class="node" data-j="${i}">${f.t}</button>`).join("");
$("#fl2").onclick=e=>{const n=e.target.closest(".node");if(!n)return;document.querySelectorAll("#fl .node").forEach(x=>x.classList.remove("on"));document.querySelectorAll("#fl2 .node").forEach(x=>x.classList.toggle("on",x===n));$("#fi").innerHTML=`<b>${FL2[n.dataset.j].t}:</b> ${FL2[n.dataset.j].d}`};
// compare
const ca=$("#ca"),cb=$("#cb");[ca,cb].forEach(s=>fill(s,VEHICLES.map(c=>c.brand+" "+c.model)));cb.value=2;
function cmp(){const a=VEHICLES[ca.value],b=VEHICLES[cb.value];
const R=[["توان اوج (kW)","power",1],["گشتاور (Nm)","torque",1],["باتری ناخالص (kWh)","battery",1],["برد (روش‌های مختلف)","range",1],["شتاب ۰-۱۰۰ (s)","accel",-1],["شارژ","charge",0],["مصرف انرژی","cons",0],["سیستم محرک","drive",0],["حداکثر سرعت (km/h)","top",1]];
const cl=(x,y,d)=>d&&x!=null&&y!=null&&x!==y&&(d>0?x>y:x<y)?"win":"";
$("#ct").innerHTML=`<table><colgroup><col style="width:30%"><col style="width:35%"><col style="width:35%"></colgroup><thead><tr><th></th><th class="ha"><small class="en">${a.brand}</small><b class="en">${a.model}</b></th><th class="hb"><small class="en">${b.brand}</small><b class="en">${b.model}</b></th></tr></thead><tbody>`+R.map(([t,k,d])=>`<tr><td>${t}</td><td class="${cl(a[k],b[k],d)}">${a[k]??NA}</td><td class="${cl(b[k],a[k],d)}">${b[k]??NA}</td></tr>`).join("")+`</tbody></table><p class="note">دامنه‌ی برد با WLTP و EPA متفاوت است و تریم‌ها یکسان نیستند؛ مقایسه تقریبی است. سرعت شارژ و مصرف انرژی در جزئیات هر خودرو آمده یا تأییدشده نیست.</p>`}
[ca,cb].forEach(s=>s.onchange=cmp);cmp();
const ICON=["<circle cx=\"12\" cy=\"12\" r=\"8\"/><circle cx=\"12\" cy=\"12\" r=\"2.5\"/><path d=\"M12 4v5M12 15v5M4 12h5M15 12h5\"/>", "<rect x=\"3\" y=\"7\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M21 10v4M7 10v4M11 10v4M15 10v4\"/>", "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M6 12c2-5 4-5 6 0s4 5 6 0\"/>", "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"1.5\"/><path d=\"M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3\"/>", "<rect x=\"3\" y=\"6\" width=\"18\" height=\"12\" rx=\"2\"/><path d=\"M8 10l4 4 4-4\"/>", "<path d=\"M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4\"/>", "<path d=\"M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z\"/><path d=\"M12 9v7\"/>", "<path d=\"M20 12a8 8 0 1 1-3-6.2M20 4v5h-5\"/>"];
$("#lib").innerHTML=LIB.map((l,i)=>`<div class="lc reveal"><svg class="li" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICON[i]}</svg><span class="idx">0${i+1}</span><h3>${l[0]}</h3><small class="en">${l[1]}</small><dl><dt>عملکرد</dt><dd>${l[2]}</dd><dt>نحوه کار</dt><dd>${l[3]}</dd><dt>اهمیت</dt><dd>${l[4]}</dd></dl></div>`).join("");
$("#fut").innerHTML=FUT.map((f,i)=>`<details class="fc reveal"${i<2?" open":""}><summary><span class="idx">0${i+1}</span><b>${f[0]}</b><em class="s ${f[1].startsWith("تجاری")?"ok":"dev"}">${f[1]}</em></summary><p>${f[2]}</p></details>`).join("");
$("#burger").onclick=()=>$("#nav").classList.toggle("open");$("#nav").onclick=()=>$("#nav").classList.remove("open");
const tp=$("#top-btn"),rg=tp.querySelector(".ring");addEventListener("scroll",()=>{const m=document.documentElement.scrollHeight-innerHeight,p=m>0?Math.min(scrollY/m,1):0;tp.classList.toggle("show",scrollY>600);rg.style.strokeDashoffset=157.08*(1-p)},{passive:true});tp.onclick=()=>scrollTo({top:0,behavior:"smooth"});

function reveal(){if(!window._io)window._io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");window._io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll(".reveal:not(.seen)").forEach((el,i)=>{el.classList.add("seen");el.style.transitionDelay=(i%6)*80+"ms";window._io.observe(el)})}
document.querySelectorAll("[data-count]").forEach(el=>{const t=+el.dataset.count,s0=performance.now(),f=n=>{const p=Math.min((n-s0)/1600,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};setTimeout(()=>requestAnimationFrame(f),900)});
addEventListener("scroll",()=>{const y=scrollY;$(".hero-bg").style.setProperty("--py",Math.min(y,900)*.22+"px");$("#prog").style.width=y/(document.documentElement.scrollHeight-innerHeight)*100+"%"},{passive:true});
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});document.querySelectorAll("main section[id]").forEach(x=>io2.observe(x));
reveal();
