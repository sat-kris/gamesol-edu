/* Gamesol Edu – "Play & learn" hands-on activities.
   A tutor lesson can list {"play":[{"type":"<name>", "title":"…", "say":"…", …}]}.
   PLAY[type](hostElement, config) builds the activity inside hostElement. */
(function(){
const NS="http://www.w3.org/2000/svg";
function el(t,a,...kids){const e=document.createElement(t);a=a||{};for(const k in a){const v=a[k];if(v==null||v===false)continue;if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else e.setAttribute(k,v===true?"":v)}kids.flat().forEach(c=>{if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(String(c)))});return e}
function S(t,a,...kids){const e=document.createElementNS(NS,t);a=a||{};for(const k in a){if(a[k]==null)continue;if(k==="text")e.textContent=a[k];else if(k.startsWith("on"))e.addEventListener(k.slice(2),a[k]);else e.setAttribute(k,a[k])}kids.flat().forEach(c=>c&&e.append(c));return e}
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const factors=n=>{const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f};
const pf=n=>{const f=[];let m=n;for(let p=2;p*p<=m;p++)while(m%p===0){f.push(p);m/=p}if(m>1)f.push(m);return f};
const PRAISE=["Brilliant!","Well done!","Super!","You got it!","Excellent!","Great thinking!"];
const btn=(label,on,cls)=>el("button",{type:"button",class:"pbtn"+(cls?" "+cls:""),onclick:on},label);
function svgPoint(svg,evt){const p=svg.createSVGPoint();p.x=evt.clientX;p.y=evt.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
/* one drag listener per drawing: pickFn(point) chooses what is being dragged (or null) */
function dragOn(svg,pickFn,move){let id=null;
  svg.addEventListener("pointerdown",e=>{const p=svgPoint(svg,e),t=pickFn(p);if(t==null)return;id=t;try{svg.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault();move(id,p)});
  svg.addEventListener("pointermove",e=>{if(id==null)return;e.preventDefault();move(id,svgPoint(svg,e))});
  const up=()=>{id=null};svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",up)}
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function frame(host,cfg){
  host.innerHTML="";
  const box=el("div",{class:"play"});
  box.append(el("div",{class:"play-h"},el("span",{class:"play-badge"},"Play & learn"),el("strong",{},cfg.title||"")));
  if(cfg.say)box.append(el("p",{class:"play-say"},cfg.say));
  const stage=el("div",{class:"play-stage"}),fb=el("p",{class:"play-fb","aria-live":"polite"});
  box.append(stage,fb);host.append(box);
  let stars=0;const star=el("span",{class:"play-stars",title:"Stars earned"});box.querySelector(".play-h").append(star);
  return {box,stage,
    say(m,good){fb.textContent=m||"";fb.className="play-fb"+(good===true?" good":good===false?" bad":"");
      if(good===true){stars++;star.textContent="★ "+stars;const p=el("span",{class:"pop"},"★");box.append(p);setTimeout(()=>p.remove(),900)}},
    praise(){return pick(PRAISE)}};
}
const row=(...k)=>el("div",{class:"prow"},...k);

const PLAY={

/* ================= Chapter 1 ================= */
seqGuess(host,cfg){const F=frame(host,cfg);
  const SEQ=[["Odd numbers",n=>2*n-1],["Square numbers",n=>n*n],["Triangular numbers",n=>n*(n+1)/2],["Virahānka numbers",n=>{let a=1,b=2;for(let i=1;i<n;i++)[a,b]=[b,a+b];return a}],["Powers of 2",n=>Math.pow(2,n-1)],["Cube numbers",n=>n*n*n],["Hexagonal numbers",n=>3*n*(n-1)+1]];
  let cur,shown,gaps=false,mystery=true;
  const chips=el("div",{class:"chips"}),cards=el("div",{class:"seqcards"}),inp=el("input",{type:"number",inputmode:"numeric",class:"pin","aria-label":"Next number"});
  const gapBtn=btn("Show gaps",()=>{gaps=!gaps;gapBtn.textContent=gaps?"Hide gaps":"Show gaps";draw()});
  function start(i){cur=i==null?ri(0,SEQ.length-1):i;mystery=i==null;shown=5;inp.value="";F.say(mystery?"Mystery sequence! What comes next?":"What comes next in the "+SEQ[cur][0].toLowerCase()+"?");draw()}
  function draw(){cards.innerHTML="";const f=SEQ[cur][1];
    for(let k=1;k<=shown;k++){const c=el("div",{class:"seqcard"},el("b",{},String(f(k))));if(gaps&&k>1)c.append(el("small",{},"+"+(f(k)-f(k-1))));cards.append(c)}
    cards.append(el("div",{class:"seqcard q"},el("b",{},"?")))}
  function check(){const want=SEQ[cur][1](shown+1);if(+inp.value===want){F.say(F.praise()+" It is "+want+(mystery?". These are "+SEQ[cur][0].toLowerCase()+".":"."),true);shown++;inp.value="";draw()}
    else F.say(inp.value===""?"Type your guess first.":"Not quite – look at the gaps between the numbers ("+(gaps?"they are shown":"tap Show gaps")+").",false)}
  inp.addEventListener("keydown",e=>{if(e.key==="Enter")check()});
  chips.append(btn("🎲 Mystery",()=>start()),...SEQ.map((s,i)=>btn(s[0],()=>start(i),"light")));
  F.stage.append(chips,cards,row(inp,btn("Check",check,"primary"),gapBtn));start(cfg.start);
},
dots(host,cfg){const F=frame(host,cfg);let shape=cfg.shape||"tri",n=4;
  const svg=S("svg",{viewBox:"0 0 320 250",class:"psvg",role:"img"}),out=el("p",{class:"pbig"}),table=el("div",{class:"minitable"});
  const rng=el("input",{type:"range",min:1,max:8,value:n,"aria-label":"Step number",oninput:e=>{n=+e.target.value;draw()}});
  const val=k=>shape==="tri"?k*(k+1)/2:shape==="sq"?k*k:3*k*(k-1)+1;
  const name={tri:"triangular",sq:"square",hex:"hexagonal"};
  function pts(k){const p=[];if(shape==="tri"){for(let r=0;r<k;r++)for(let c=0;c<=r;c++)p.push([c-r/2,r-(k-1)/2,r===k-1])}
    else if(shape==="sq"){for(let r=0;r<k;r++)for(let c=0;c<k;c++)p.push([c-(k-1)/2,r-(k-1)/2,r===k-1||c===k-1])}
    else{const R=k-1;for(let q=-R;q<=R;q++)for(let r=-R;r<=R;r++){const z=-q-r;if(Math.abs(z)<=R)p.push([q+r/2,r*0.87,Math.max(Math.abs(q),Math.abs(r),Math.abs(z))===R])}}return p}
  function draw(){svg.innerHTML="";const k=n,g=Math.min(28,200/(shape==="hex"?2*k:k+1));
    pts(k).forEach(p=>svg.append(S("circle",{cx:160+p[0]*g,cy:125+p[1]*g,r:Math.max(4,g*0.34),class:p[2]&&k>1?"pd2":"pd1"})));
    out.innerHTML="";out.append("Step ",el("b",{},String(k))," → ",el("b",{},String(val(k)))," dots");
    table.innerHTML="";for(let i=1;i<=8;i++)table.append(el("span",{class:i===k?"on":""},String(val(i))));
    F.say(k>1?"The orange dots are the new ones: "+(val(k)-val(k-1))+" added. These are "+name[shape]+" numbers.":"Every pattern starts with 1 dot.")}
  const tabs=el("div",{class:"chips"},[["tri","Triangle"],["sq","Square"],["hex","Hexagon"]].map(([s,l])=>btn(l,()=>{shape=s;draw()},"light")));
  F.stage.append(tabs,svg,row(el("label",{class:"plab"},"Grow it ",rng)),out,table);draw();
},
oddLayers(host,cfg){const F=frame(host,cfg);let k=1;
  const svg=S("svg",{viewBox:"0 0 260 260",class:"psvg",role:"img"}),eq=el("p",{class:"pbig"});
  const cols=["pd1","pd2","pd3"];
  function draw(){svg.innerHTML="";const g=Math.min(40,220/k);const o=(260-g*k)/2;
    for(let r=0;r<k;r++)for(let c=0;c<k;c++){const layer=Math.max(r,c);svg.append(S("rect",{x:o+c*g+2,y:o+(k-1-r)*g+2,width:g-4,height:g-4,rx:4,class:cols[layer%3]}))}
    const odds=[];for(let i=1;i<=k;i++)odds.push(2*i-1);eq.textContent=odds.join(" + ")+" = "+(k*k)+" = "+k+" × "+k}
  const add=btn("Add the next odd number",()=>{if(k<10){k++;draw();F.say("You added "+(2*k-1)+" squares as an L-shape. Still a square: "+k+" × "+k+"!",k>=4)}else F.say("Great – now predict: what is the sum of the first 100 odd numbers?")});
  const inp=el("input",{type:"number",class:"pin",placeholder:"Sum of first 10 odd numbers?","aria-label":"Sum of the first 10 odd numbers"});
  F.stage.append(svg,eq,row(add,btn("Start again",()=>{k=1;draw();F.say("")},"light")),row(inp,btn("Check",()=>F.say(+inp.value===100?"Yes! 10 × 10 = 100 – no long adding needed.":"Hint: the first 10 odd numbers make a 10 × 10 square.",+inp.value===100),"primary")));draw();
},
kgraph(host,cfg){const F=frame(host,cfg);let n=4;
  const svg=S("svg",{viewBox:"0 0 260 260",class:"psvg",role:"img"}),out=el("p",{class:"pbig"}),table=el("div",{class:"minitable"});
  const rng=el("input",{type:"range",min:2,max:9,value:n,"aria-label":"Number of points",oninput:e=>{n=+e.target.value;draw()}});
  function draw(){svg.innerHTML="";const P=[];for(let i=0;i<n;i++){const a=-Math.PI/2+2*Math.PI*i/n;P.push([130+100*Math.cos(a),130+100*Math.sin(a)])}
    let d=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){svg.append(S("line",{x1:P[i][0],y1:P[i][1],x2:P[j][0],y2:P[j][1],class:"pline",style:"animation-delay:"+(d++*40)+"ms"}))}
    P.forEach(p=>svg.append(S("circle",{cx:p[0],cy:p[1],r:7,class:"pd2"})));
    out.textContent=n+" points → "+(n*(n-1)/2)+" lines";table.innerHTML="";for(let i=2;i<=9;i++)table.append(el("span",{class:i===n?"on":""},String(i*(i-1)/2)));
    F.say(n>=5?"1, 3, 6, 10, 15 … the lines follow the triangular numbers!":"Add more points and watch the number of lines.",n===6)}
  F.stage.append(svg,row(el("label",{class:"plab"},"Points ",rng)),out,table);draw();
},

/* ================= Chapter 2 ================= */
lineKinds(host,cfg){const F=frame(host,cfg);let A={x:90,y:150},B={x:220,y:100},mode="segment";
  const svg=S("svg",{viewBox:"0 0 320 240",class:"psvg drag",role:"img"});
  const INFO={segment:"Line segment AB: 2 end points, a fixed length you can measure.",ray:"Ray AB: starts at A (1 end point) and goes on forever through B.",line:"Line AB: no end points – goes on forever both ways."};
  function ext(P,Q,t){return {x:P.x+(Q.x-P.x)*t,y:P.y+(Q.y-P.y)*t}}
  function draw(){svg.innerHTML="";svg.append(S("defs",{},S("marker",{id:"pah",viewBox:"0 0 10 10",refX:8,refY:5,markerWidth:7,markerHeight:7,orient:"auto-start-reverse"},S("path",{d:"M0 0L10 5L0 10z",class:"pah"}))));
    let P1=A,P2=B;if(mode!=="segment"){P2=ext(A,B,6)}if(mode==="line"){P1=ext(B,A,6)}
    svg.append(S("line",{x1:P1.x,y1:P1.y,x2:P2.x,y2:P2.y,class:"pline2","marker-end":mode!=="segment"?"url(#pah)":null,"marker-start":mode==="line"?"url(#pah)":null}));
    [[A,"A"],[B,"B"]].forEach(([p,l])=>{svg.append(S("circle",{cx:p.x,cy:p.y,r:12,class:"phandle"}),S("text",{x:p.x+12,y:p.y-14,class:"plbl",text:l}))});
    F.say(INFO[mode])}
  dragOn(svg,p=>dist(p,A)<30?0:dist(p,B)<30?1:null,(i,q)=>{const t=i?B:A;t.x=Math.max(20,Math.min(300,q.x));t.y=Math.max(20,Math.min(220,q.y));draw()});
  F.stage.append(el("div",{class:"chips"},["segment","ray","line"].map(m=>btn(m[0].toUpperCase()+m.slice(1),()=>{mode=m;draw()},"light"))),svg,el("p",{class:"phint"},"Drag the points A and B."));draw();
},
angleMaker(host,cfg){const F=frame(host,cfg);let deg=40;const targets=(cfg.targets||[90,45,180,120,270]).slice();let ti=0;
  const svg=S("svg",{viewBox:"0 0 320 260",class:"psvg drag",role:"img"}),read=el("p",{class:"pbig"}),task=el("p",{class:"ptask"});
  const O={x:160,y:140},R=100;
  const type=d=>d===0?"no turn":d<90?"acute":d===90?"right":d<180?"obtuse":d===180?"straight":d<360?"reflex":"full turn";
  function draw(){svg.innerHTML="";const r=deg*Math.PI/180,B={x:O.x+R*Math.cos(r),y:O.y-R*Math.sin(r)};
    const big=deg>180?1:0,ar=34;
    if(deg>0&&deg<360)svg.append(S("path",{d:"M"+O.x+" "+O.y+" L"+(O.x+ar)+" "+O.y+" A"+ar+" "+ar+" 0 "+big+" 0 "+(O.x+ar*Math.cos(r))+" "+(O.y-ar*Math.sin(r))+" Z",class:"pwedge"}));
    if(deg===90)svg.append(S("path",{d:"M"+(O.x+16)+" "+O.y+" v-16 h-16",class:"pright"}));
    svg.append(S("line",{x1:O.x,y1:O.y,x2:O.x+R+20,y2:O.y,class:"parm"}),S("line",{x1:O.x,y1:O.y,x2:B.x,y2:B.y,class:"parm2"}),S("circle",{cx:O.x,cy:O.y,r:4,class:"pdot"}),
      S("text",{x:O.x-6,y:O.y+22,class:"plbl",text:"O"}),S("text",{x:O.x+R+14,y:O.y+22,class:"plbl",text:"A"}),S("text",{x:B.x+(Math.cos(r)>=0?10:-22),y:B.y+(Math.sin(r)>=0?-8:18),class:"plbl",text:"B"}));
    svg.append(S("circle",{cx:B.x,cy:B.y,r:14,class:"phandle"}));
    read.innerHTML="";read.append("∠AOB = ",el("b",{},deg+"°")," · ",el("span",{class:"ptype"},type(deg)+" angle"))}
  function setTask(){task.textContent=ti<targets.length?"Challenge "+(ti+1)+" of "+targets.length+": make an angle of "+targets[ti]+"°":"All challenges done! Try making a reflex angle of your own."}
  const nudge=d=>()=>{deg=(deg+d+360)%360;draw()};
  dragOn(svg,p=>dist(p,O)>12?0:null,(_,q)=>{let a=Math.atan2(O.y-q.y,q.x-O.x)*180/Math.PI;if(a<0)a+=360;deg=Math.round(a)%360;if(Math.abs(deg-90)<3)deg=90;if(Math.abs(deg-180)<3)deg=180;draw()});
  F.stage.append(task,svg,read,row(btn("−10°",nudge(-10),"light"),btn("−1°",nudge(-1),"light"),btn("+1°",nudge(1),"light"),btn("+10°",nudge(10),"light"),btn("Check",()=>{if(ti>=targets.length)return;if(Math.abs(deg-targets[ti])<=2){F.say(F.praise()+" That is "+targets[ti]+"°, a "+type(targets[ti])+" angle.",true);ti++;setTask()}else F.say("You made "+deg+"°. Need "+targets[ti]+"° – drag "+(deg<targets[ti]?"further round.":"back a little."),false)},"primary")),el("p",{class:"phint"},"Drag the blue dot at B, or use the buttons."));
  setTask();draw();
},
angleSort(host,cfg){const F=frame(host,cfg);let deg,streak=0,done=false;
  const svg=S("svg",{viewBox:"0 0 280 200",class:"psvg",role:"img"}),st=el("p",{class:"ptask"});
  const T=[["Acute",d=>d<90],["Right",d=>d===90],["Obtuse",d=>d>90&&d<180],["Straight",d=>d===180],["Reflex",d=>d>180]];
  function next(){deg=pick([ri(10,80),90,ri(100,170),180,ri(190,340),ri(15,85),ri(95,175),ri(200,350)]);done=false;draw();F.say("")}
  function draw(){svg.innerHTML="";const O={x:140,y:110},R=90,r=deg*Math.PI/180,big=deg>180?1:0;
    svg.append(S("path",{d:"M"+O.x+" "+O.y+" L"+(O.x+30)+" "+O.y+" A30 30 0 "+big+" 0 "+(O.x+30*Math.cos(r))+" "+(O.y-30*Math.sin(r))+" Z",class:"pwedge"}),S("line",{x1:O.x,y1:O.y,x2:O.x+R,y2:O.y,class:"parm"}),S("line",{x1:O.x,y1:O.y,x2:O.x+R*Math.cos(r),y2:O.y-R*Math.sin(r),class:"parm2"}),S("circle",{cx:O.x,cy:O.y,r:4,class:"pdot"}));
    st.textContent="Streak: "+streak+(streak>=5?" 🔥":"")}
  F.stage.append(st,svg,el("div",{class:"chips"},T.map(([n,f])=>btn(n,()=>{if(done)return;done=true;const ok=f(deg);streak=ok?streak+1:0;F.say((ok?F.praise()+" ":"Not this one. ")+"It is "+deg+"°, so it is "+T.find(t=>t[1](deg))[0].toLowerCase()+". "+(deg<90?"Less than a right angle.":deg===90?"Exactly a quarter turn.":deg<180?"Between 90° and 180°.":deg===180?"A half turn – a straight line.":"More than a straight angle."),ok);draw()}))),row(btn("Next angle →",next,"primary")));next();
},
protractorDraw(host,cfg){const F=frame(host,cfg);let deg=30,target=ri(3,16)*10,mode="draw",readDeg=0;
  const svg=S("svg",{viewBox:"0 0 360 230",class:"psvg drag",role:"img"}),task=el("p",{class:"ptask"}),inp=el("input",{type:"number",class:"pin","aria-label":"Your reading"});
  const O={x:180,y:200},R=150;const P=(d,r)=>[O.x+r*Math.cos(d*Math.PI/180),O.y-r*Math.sin(d*Math.PI/180)];
  function draw(){svg.innerHTML="";svg.append(S("path",{d:"M"+(O.x-R)+" "+O.y+" A"+R+" "+R+" 0 0 1 "+(O.x+R)+" "+O.y+" Z",class:"pprot"}));
    for(let d=0;d<=180;d+=10){const a=P(d,R),b=P(d,R-(d%30?8:14));svg.append(S("line",{x1:a[0],y1:a[1],x2:b[0],y2:b[1],class:"ptick"}));
      if(d%30===0){const t=P(d,R-24),t2=P(d,R-44);svg.append(S("text",{x:t[0],y:t[1]+4,class:"pscale in","text-anchor":"middle",text:String(d)}),S("text",{x:t2[0],y:t2[1]+4,class:"pscale out","text-anchor":"middle",text:String(180-d)}))}}
    svg.append(S("line",{x1:O.x,y1:O.y,x2:O.x+R+10,y2:O.y,class:"parm"}),S("text",{x:O.x+R+2,y:O.y+18,class:"plbl",text:"A"}),S("circle",{cx:O.x,cy:O.y,r:4,class:"pdot"}),S("text",{x:O.x-5,y:O.y+18,class:"plbl",text:"O"}));
    const d=mode==="draw"?deg:readDeg,e=P(d,R+12);svg.append(S("line",{x1:O.x,y1:O.y,x2:e[0],y2:e[1],class:"parm2"}),S("text",{x:e[0]+(d>90?-16:6),y:e[1]-4,class:"plbl",text:"B"}));
    if(mode==="draw"){svg.append(S("circle",{cx:P(deg,R-60)[0],cy:P(deg,R-60)[1],r:13,class:"phandle"}));
      task.innerHTML="";task.append("Draw ∠AOB = ",el("b",{},target+"°"),". Arm OA is on the right, so count from the ",el("span",{class:"pinword"},"blue scale")," that starts at 0 on OA. Now: ",el("b",{},deg+"°"))}
    else{task.innerHTML="";task.append("Read ∠AOB. Which scale starts at 0 on arm OA?")}}
  dragOn(svg,p=>mode==="draw"&&dist(p,O)>12?0:null,(_,q)=>{let a=Math.atan2(O.y-q.y,q.x-O.x)*180/Math.PI;deg=Math.max(0,Math.min(180,Math.round(a<-90?180:a<0?0:a)));draw()});
  const tabs=el("div",{class:"chips"},btn("Draw an angle",()=>{mode="draw";target=ri(3,16)*10;F.say("");draw();inp.hidden=true},"light"),btn("Read an angle",()=>{mode="read";readDeg=ri(2,17)*10+pick([0,5]);F.say("");inp.value="";inp.hidden=false;draw()},"light"));
  F.stage.append(tabs,task,svg,row(inp,btn("Check",()=>{if(mode==="draw"){if(Math.abs(deg-target)<=1){F.say(F.praise()+" "+target+"° exactly. New target set.",true);target=ri(3,16)*10;draw()}else F.say("You are at "+deg+"°. Target "+target+"° – count on the blue scale from 0 at A.",false)}
    else{if(+inp.value===readDeg){F.say(F.praise()+" "+readDeg+"° on the blue scale.",true);readDeg=ri(2,17)*10+pick([0,5]);inp.value="";draw()}else F.say(+inp.value===180-readDeg?"That is the grey scale. OA starts at 0 on the blue scale – read that one.":"Look again: follow the blue numbers from 0 at A up to arm OB.",false)}},"primary")),el("p",{class:"phint"},"Drag the dot on arm OB."));
  inp.hidden=true;draw();
},

/* ================= Chapter 3 ================= */
supercells(host,cfg){const F=frame(host,cfg);let row_=[],marked=new Set();
  const grid=el("div",{class:"cells"});
  const isSC=i=>(i===0||row_[i]>row_[i-1])&&(i===row_.length-1||row_[i]>row_[i+1]);
  function fresh(){row_=[];while(row_.length<8){const x=ri(100,999);if(!row_.includes(x))row_.push(x)}marked=new Set();draw();F.say("Tap every cell that is bigger than both its neighbours.")}
  function draw(check){grid.innerHTML="";row_.forEach((v,i)=>{const c=el("button",{type:"button",class:"cell"+(marked.has(i)?" on":"")+(check?(isSC(i)?" sc":"")+(marked.has(i)&&!isSC(i)?" wrong":""):""),onclick:()=>{marked.has(i)?marked.delete(i):marked.add(i);draw()}},String(v));grid.append(c)})}
  F.stage.append(grid,row(btn("Check",()=>{const right=row_.every((v,i)=>isSC(i)===marked.has(i));draw(true);F.say(right?F.praise()+" You found all "+[...marked].length+" supercells.":"Green = real supercells, red = not a supercell. Compare each cell only with its neighbours.",right)},"primary"),btn("New numbers",fresh,"light")));fresh();
},
digitSum(host,cfg){const F=frame(host,cfg);let target,num="",mode="small";
  const task=el("p",{class:"ptask"}),disp=el("div",{class:"pdisplay"}),keys=el("div",{class:"keys"});
  const smallest=t=>{const k=Math.ceil(t/9);return String(t-9*(k-1))+"9".repeat(k-1)};
  const largest5=t=>{let s="",r=t;for(let i=0;i<5;i++){const d=Math.min(9,r);s+=d;r-=d}return s};
  function fresh(){target=ri(10,30);num="";task.textContent=(mode==="small"?"Make the SMALLEST number":"Make the LARGEST 5-digit number")+" whose digit sum is "+target+".";draw();F.say("")}
  function draw(){const s=num.split("").reduce((a,d)=>a+ +d,0);disp.innerHTML="";disp.append(el("b",{},num||"–"),el("small",{}," digit sum = "+s+(s>target?" (too big!)":"")))}
  for(let d=0;d<=9;d++)keys.append(btn(String(d),()=>{if(num===""&&d===0){F.say("A number cannot start with 0.",false);return}if(num.length<(mode==="small"?6:5)){num+=d;draw()}},"key"));
  keys.append(btn("⌫",()=>{num=num.slice(0,-1);draw()},"key"));
  F.stage.append(el("div",{class:"chips"},btn("Smallest",()=>{mode="small";fresh()},"light"),btn("Largest 5-digit",()=>{mode="large";fresh()},"light")),task,disp,keys,
    row(btn("Check",()=>{const s=num.split("").reduce((a,d)=>a+ +d,0);const want=mode==="small"?smallest(target):largest5(target);
      if(s!==target)F.say("The digits add to "+s+", not "+target+".",false);else if(mode==="large"&&num.length!==5)F.say("It must have exactly 5 digits.",false);
      else if(num===want){F.say(F.praise()+" "+want+" is the best.",true)}else F.say("Digit sum is right, but "+want+" is "+(mode==="small"?"smaller – use fewer digits, put the small digit first.":"bigger – put 9s first."),false)},"primary"),btn("New target",fresh,"light")));fresh();
},
reverseAdd(host,cfg){const F=frame(host,cfg);let n,steps=[];
  const inp=el("input",{type:"number",class:"pin",value:String(pick([39,57,68,79,87,95,48,69])),"aria-label":"Starting number"}),list=el("div",{class:"steps"});
  const rev=x=>+String(x).split("").reverse().join(""),isPal=x=>String(x)===String(rev(x));
  function start(){n=+inp.value;if(!(n>=10&&n<100000)){F.say("Pick a number from 10 to 99999.",false);return}steps=[];draw();F.say(isPal(n)?n+" is already a palindrome!":"Now tap ‘Reverse and add’.",isPal(n)?true:undefined)}
  function step(){if(n==null)start();if(isPal(n)&&steps.length)return;const r=rev(n),s=n+r;steps.push([n,r,s]);n=s;draw();
    if(isPal(n))F.say(F.praise()+" "+n+" reads the same both ways – a palindrome in "+steps.length+" step"+(steps.length>1?"s":"")+".",true);else if(steps.length>=24)F.say("Still no palindrome after 24 steps! (Some numbers, like 196, may never give one – nobody knows.)")}
  function draw(){list.innerHTML="";steps.forEach(([a,b,c])=>list.append(el("div",{class:"step"},a+" + "+b+" = ",el("b",{class:isPal(c)?"palin":""},String(c)))))}
  F.stage.append(row(el("label",{class:"plab"},"Start with ",inp),btn("Start",start,"light"),btn("Reverse and add",step,"primary")),list);start();
},
kaprekar(host,cfg){const F=frame(host,cfg);let digits,stage,A,B,rounds=0;
  const inp=el("input",{type:"number",class:"pin","aria-label":"4-digit number"}),cards=el("div",{class:"dcards"}),work=el("div",{class:"steps"}),ctrl=el("div",{class:"prow"});
  function start(v){let s=String(v||ri(1000,9999)).padStart(4,"0").slice(-4);if(new Set(s).size<2){F.say("Use at least two different digits.",false);return}digits=s.split("");stage=0;rounds=0;work.innerHTML="";inp.value=s;draw();F.say("Step 1: arrange the digits to make the BIGGEST number.")}
  function draw(){cards.innerHTML="";digits.forEach(d=>cards.append(el("span",{class:"dcard"},d)));ctrl.innerHTML="";
    if(stage===0)ctrl.append(btn("Make biggest (A)",()=>{digits.sort((a,b)=>b-a);A=digits.join("");stage=1;draw();F.say("A = "+A+". Now make the SMALLEST number.")},"primary"));
    else if(stage===1)ctrl.append(btn("Make smallest (B)",()=>{digits.sort((a,b)=>a-b);B=digits.join("");stage=2;draw();F.say("B = "+B+". Now subtract: A − B.")},"primary"));
    else if(stage===2)ctrl.append(btn("Subtract A − B",()=>{const C=String(+A - +B).padStart(4,"0");rounds++;work.append(el("div",{class:"step"},"Round "+rounds+": "+A+" − "+B+" = ",el("b",{class:C==="6174"?"palin":""},C)));digits=C.split("");
      if(C==="6174"){stage=3;draw();F.say("6174! Kaprekar’s magic number in "+rounds+" round"+(rounds>1?"s":"")+".",true)}else{stage=0;draw();F.say("C = "+C+". Repeat with these digits: make the biggest number.")}},"primary"));
    else ctrl.append(btn("Try another number",()=>start(),"primary"))}
  F.stage.append(row(el("label",{class:"plab"},"Your number ",inp),btn("Use it",()=>start(inp.value),"light"),btn("Random",()=>start(),"light")),cards,ctrl,work);start(cfg.start);
},
estimate(host,cfg){const F=frame(host,cfg);let q,score=0,n=0;
  const task=el("p",{class:"pbig"}),ch=el("div",{class:"chips"}),st=el("p",{class:"ptask"});
  function next(){F.say("");n++;const base=pick([100,200,300,500,1000]);const k=3;const parts=[];let left=base;for(let i=0;i<k-1;i++){const p=Math.round(base/k)+ri(-base/20,base/20)|0;parts.push(p);left-=p}parts.push(left+ri(-base/25,base/25)|0);
    const sum=parts.reduce((a,b)=>a+b,0);const opts=shuf([base,base/2,base*2,base*3].filter((v,i,a)=>a.indexOf(v)===i)).slice(0,4);if(!opts.includes(base))opts[0]=base;
    q={parts,sum,base};task.textContent=parts.join(" + ")+" is about…";ch.innerHTML="";shuf(opts).forEach(o=>ch.append(btn(String(o),()=>{const ok=o===base;if(ok)score++;F.say((ok?F.praise():"Not quite.")+" Round each number: "+parts.map(p=>{const u=base>=500?100:10;return Math.round(p/u)*u}).join(" + ")+" ≈ "+base+" (exact: "+sum+").",ok);st.textContent="Score "+score+" / "+n},"light")));st.textContent="Score "+score+" / "+(n-1)}
  F.stage.append(st,task,ch,row(btn("Next sum →",next,"primary")));next();
},
collatz(host,cfg){const F=frame(host,cfg);let seq=[];
  const inp=el("input",{type:"number",class:"pin",value:String(cfg.start||pick([21,7,12,17,27,6])),"aria-label":"Start number"}),svg=S("svg",{viewBox:"0 0 360 200",class:"psvg wide",role:"img"}),line=el("p",{class:"ptask"}),rule=el("p",{class:"phint"});
  const nx=x=>x%2===0?x/2:3*x+1;let timer=null;
  function start(){clearInterval(timer);const v=+inp.value;if(!(v>=1&&v<=1000)){F.say("Pick a number from 1 to 1000.",false);return}seq=[v];draw();F.say("Tap ‘Next step’ or ‘Play all’.")}
  function step(){if(!seq.length)start();const last=seq[seq.length-1];if(last===1){clearInterval(timer);return}const n=nx(last);rule.textContent=last+(last%2===0?" is even → half: "+n:" is odd → 3 × "+last+" + 1 = "+n);seq.push(n);draw();
    if(n===1){clearInterval(timer);F.say("Reached 1 in "+(seq.length-1)+" steps. Highest point: "+Math.max(...seq)+". The Collatz conjecture holds for "+seq[0]+"!",true)}}
  function draw(){svg.innerHTML="";const mx=Math.max(...seq),w=Math.min(28,340/Math.max(seq.length,1));
    seq.forEach((v,i)=>{const h=Math.max(3,170*v/mx);svg.append(S("rect",{x:10+i*w,y:185-h,width:Math.max(2,w-3),height:h,rx:2,class:v%2?"pbar2":"pbar"}))});
    line.textContent=seq.join(" → ")}
  F.stage.append(row(el("label",{class:"plab"},"Start with ",inp),btn("Start",start,"light"),btn("Next step",step,"primary"),btn("Play all",()=>{if(!seq.length||seq[seq.length-1]===1)start();clearInterval(timer);timer=setInterval(step,350)},"light")),rule,svg,line,el("p",{class:"phint"},"Blue bars are even numbers, orange bars are odd – the ‘hailstone’ goes up and down before falling to 1."));start();
},

/* ================= Chapter 4 ================= */
tally(host,cfg){const F=frame(host,cfg);const cats=cfg.cats||[["🍎","Apple"],["🍌","Banana"],["🍇","Grapes"],["🥭","Mango"]];let items=[],i=0,counts;
  const big=el("div",{class:"pitem"}),tbl=el("div",{class:"tallies"}),st=el("p",{class:"ptask"});
  function fresh(){items=[];for(let k=0;k<20;k++)items.push(ri(0,cats.length-1));i=0;counts=cats.map(()=>0);draw();F.say("Tap the fruit’s name each time a new fruit appears.")}
  function tallySVG(n){const g=Math.floor(n/5),r=n%5,W=g*44+r*9+14;const s=S("svg",{viewBox:"0 0 "+Math.max(W,20)+" 34",width:Math.max(W,20),height:34});let x=6;
    for(let a=0;a<g;a++){for(let j=0;j<4;j++)s.append(S("line",{x1:x+j*8,y1:4,x2:x+j*8,y2:30,class:"ptl"}));s.append(S("line",{x1:x-4,y1:26,x2:x+28,y2:8,class:"ptl"}));x+=44}
    for(let j=0;j<r;j++)s.append(S("line",{x1:x+j*9,y1:4,x2:x+j*9,y2:30,class:"ptl"}));return s}
  function draw(){big.textContent=i<items.length?cats[items[i]][0]:"✔";tbl.innerHTML="";tbl.append(el("div",{class:"trow th"},el("span",{},"Fruit"),el("span",{},"Tally marks"),el("span",{},"Frequency")));
    cats.forEach((c,k)=>tbl.append(el("div",{class:"trow"},el("span",{},c[0]+" "+c[1]),el("span",{},tallySVG(counts[k])),el("span",{},i>=items.length?String(counts[k]):"?"))));
    st.textContent=i<items.length?"Item "+(i+1)+" of "+items.length:"Total = "+counts.reduce((a,b)=>a+b,0)}
  F.stage.append(st,big,el("div",{class:"chips"},cats.map((c,k)=>btn(c[0]+" "+c[1],()=>{if(i>=items.length)return;if(items[i]===k){counts[k]++;i++;draw();if(i===items.length)F.say("All 20 counted! Each bundle of 5 is four lines with one across. Frequencies add up to 20 ✓",true);else F.say("")}else F.say("Look again – that one is "+cats[items[i]][1]+".",false)},"light"))),tbl,row(btn("New basket",fresh,"light")));fresh();
},
picto(host,cfg){const F=frame(host,cfg);const data=cfg.data||[["Anu",16],["Diya",14],["Riya",12],["Kabir",10],["Meera",12]];let key=cfg.key||2,sym;
  const tbl=el("div",{class:"prows"}),task=el("p",{class:"ptask"});
  function fresh(){sym=data.map(()=>0);draw();task.innerHTML="";task.append("Key: one 📘 = ",el("b",{},key+" books"),". Add symbols so each row shows the right number of books.")}
  function draw(){tbl.innerHTML="";data.forEach(([n,v],i)=>{const icons=el("span",{class:"icons"});for(let k=0;k<Math.floor(sym[i]);k++)icons.append(el("span",{class:"ico"},"📘"));if(sym[i]%1)icons.append(el("span",{class:"ico half"},"📘"));
    tbl.append(el("div",{class:"prowi"},el("span",{class:"pn"},n+" – "+v+" books"),icons,el("span",{class:"pctl"},btn("−",()=>{sym[i]=Math.max(0,sym[i]-(sym[i]%1?0.5:1));draw()},"key"),btn("+",()=>{sym[i]+=sym[i]%1?0.5:1;draw()},"key"),key%2===0?btn("½",()=>{sym[i]=sym[i]%1?Math.floor(sym[i]):sym[i]+0.5;draw()},"key"):null)))})}
  F.stage.append(el("div",{class:"chips"},[2,4].map(k=>btn("Key = "+k,()=>{key=k;fresh()},"light"))),task,tbl,row(btn("Check",()=>{const bad=data.filter(([n,v],i)=>sym[i]*key!==v);F.say(bad.length?bad[0][0]+" needs "+bad[0][1]+" ÷ "+key+" = "+(bad[0][1]/key)+" symbols.":F.praise()+" Symbols × key = books for every row.",!bad.length)},"primary"),btn("Clear",fresh,"light")));fresh();
},
barReader(host,cfg){const F=frame(host,cfg);const data=cfg.data||[["VI A",12],["VI B",16],["VI C",20],["VI D",24],["VI E",20]];const step=cfg.step||4;let q,ans;
  const svg=S("svg",{viewBox:"0 0 380 240",class:"psvg wide",role:"img"}),task=el("p",{class:"pbig"}),inp=el("input",{type:"number",class:"pin","aria-label":"Answer"});
  const top=Math.ceil(Math.max(...data.map(d=>d[1]))*1.15/step)*step,L=40,B=210,H=180,bw=300/data.length;const Y=v=>B-H*v/top;
  function draw(sel){svg.innerHTML="";for(let v=0;v<=top;v+=step)svg.append(S("line",{x1:L,x2:370,y1:Y(v),y2:Y(v),class:"pgrid"}),S("text",{x:L-6,y:Y(v)+4,"text-anchor":"end",class:"pax",text:String(v)}));
    data.forEach(([n,v],i)=>{const x=L+10+i*bw;const r=S("rect",{x,y:Y(v),width:bw*0.6,height:B-Y(v),rx:3,class:"pbar"+(sel===i?" on":""),tabindex:0,role:"button","aria-label":n,onclick:()=>{draw(i);F.say(n+": the top of the bar is level with "+v+" on the scale.")}});svg.append(r,S("text",{x:x+bw*0.3,y:B+16,"text-anchor":"middle",class:"pax",text:n}));
      if(sel===i)svg.append(S("line",{x1:L,x2:x,y1:Y(v),y2:Y(v),class:"pguide"}))})}
  function next(){const i=ri(0,data.length-1);let j=ri(0,data.length-1);if(j===i)j=(i+1)%data.length;const t=pick(["read","more","total"]);
    if(t==="read"){q="How many saplings did "+data[i][0]+" plant?";ans=data[i][1]}else if(t==="more"){const [a,b]=data[i][1]>=data[j][1]?[i,j]:[j,i];q="How many more did "+data[a][0]+" plant than "+data[b][0]+"?";ans=data[a][1]-data[b][1]}else{q="How many saplings in all?";ans=data.reduce((s,d)=>s+d[1],0)}
    task.textContent=q;inp.value="";F.say("Tap a bar to read it with a guide line.");draw()}
  F.stage.append(task,svg,row(inp,btn("Check",()=>F.say(+inp.value===ans?F.praise():"Not yet – tap the bars to read them. Answer: "+ans+".",+inp.value===ans),"primary"),btn("New question",next,"light")),el("p",{class:"phint"},"Scale: 1 unit = "+step+" saplings"));next();
},
barBuilder(host,cfg){const F=frame(host,cfg);const data=cfg.data||[["Cricket",40],["Football",60],["Tennis",25],["Hockey",35]];let scale=null,val=data.map(()=>0);
  const svg=S("svg",{viewBox:"0 0 380 250",class:"psvg wide drag",role:"img"}),task=el("p",{class:"ptask"}),tbl=el("div",{class:"minitable data"});
  data.forEach(d=>tbl.append(el("span",{},d[0]+": "+d[1])));
  const L=46,B=220,H=190,units=10;
  function draw(){svg.innerHTML="";if(!scale){svg.append(S("text",{x:190,y:120,"text-anchor":"middle",class:"pax",text:"First choose a scale ↑"}));return}
    const top=units*scale,Y=v=>B-H*v/top,bw=300/data.length;
    for(let u=0;u<=units;u++){const v=u*scale;svg.append(S("line",{x1:L,x2:370,y1:Y(v),y2:Y(v),class:"pgrid"}));if(u%2===0||units<=10)svg.append(S("text",{x:L-6,y:Y(v)+4,"text-anchor":"end",class:"pax",text:String(v)}))}
    data.forEach(([n,v],i)=>{const x=L+10+i*bw,h=Math.min(val[i],top);svg.append(S("rect",{x,y:Y(h),width:bw*0.6,height:B-Y(h),rx:3,class:"pbar"}),S("text",{x:x+bw*0.3,y:B+16,"text-anchor":"middle",class:"pax",text:n}));
      svg.append(S("rect",{x:x-4,y:Y(h)-9,width:bw*0.6+8,height:18,rx:9,class:"phandlebar"}))})}
  dragOn(svg,p=>{if(!scale)return null;const bw=300/data.length,i=Math.floor((p.x-L-10+bw*0.2)/bw);return i>=0&&i<data.length?i:null},(i,q)=>{const top=units*scale;const sn=cfg.snap||scale;val[i]=Math.max(0,Math.min(top,Math.round((B-q.y)/H*top/sn)*sn));draw()});
  F.stage.append(el("p",{class:"ptask"},cfg.task||"Votes for favourite sport. Choose a scale, then drag the top of each bar."),tbl,el("div",{class:"chips"},(cfg.scales||[1,5,10,50]).map(s=>btn("1 unit = "+s,()=>{scale=s;val=data.map(()=>0);draw();
      const fits=Math.max(...data.map(d=>d[1]))<=units*s;const tiny=s*units>=4*Math.max(...data.map(d=>d[1]));F.say(!fits?"Too small – the biggest value ("+Math.max(...data.map(d=>d[1]))+") will not fit on 10 units!":tiny?"This fits, but the bars will be tiny and hard to compare. Try a smaller scale.":"Good scale – now drag the bars.",fits&&!tiny?undefined:false)},"light"))),svg,
    row(btn("Check",()=>{if(!scale)return F.say("Choose a scale first.",false);const bad=data.findIndex((d,i)=>val[i]!==d[1]);F.say(bad<0?F.praise()+" Every bar is the right height. Don’t forget a title and the scale on paper!":data[bad][0]+" should reach "+data[bad][1]+" (that is "+(+(data[bad][1]/scale).toFixed(2))+" units).",bad<0)},"primary")));draw();
},

/* ================= Chapter 5 ================= */
idliVada(host,cfg){const F=frame(host,cfg);const a=cfg.a||3,b=cfg.b||5;let n=1,lives=3,score=0;
  const big=el("div",{class:"pitem num"}),st=el("p",{class:"ptask"});
  const right=x=>x%a===0&&x%b===0?"idli-vada":x%a===0?"idli":x%b===0?"vada":"number";
  function draw(){big.textContent=lives>0?String(n):"Game over";st.textContent="Score "+score+" · Lives "+"❤".repeat(Math.max(0,lives))}
  const say=w=>()=>{if(lives<=0)return;const r=right(n);if(w===r){score++;F.say(r==="idli-vada"?n+" is a multiple of both "+a+" and "+b+" – a common multiple! 🎉":(r==="number"?"Correct – just say the number.":r==="idli"?n+" is a multiple of "+a+".":n+" is a multiple of "+b+"."),r==="idli-vada");n++}
    else{lives--;F.say("Oops! "+n+(r==="number"?" is not a multiple of "+a+" or "+b+".":" → say “"+r+"”."),false);n++}draw()};
  F.stage.append(el("p",{class:"phint"},"Idli = multiple of "+a+" · Vada = multiple of "+b+" · Idli-vada = both"),st,big,el("div",{class:"chips"},btn("Say the number",say("number"),"light"),btn("Idli",say("idli"),"light"),btn("Vada",say("vada"),"light"),btn("Idli-vada",say("idli-vada"),"light")),row(btn("Restart",()=>{n=1;lives=3;score=0;F.say("");draw()},"primary")));draw();
},
arrays(host,cfg){const F=frame(host,cfg);let n=12;
  const rng=el("input",{type:"range",min:2,max:40,value:n,"aria-label":"Number of counters",oninput:e=>{n=+e.target.value;draw()}}),out=el("p",{class:"pbig"}),wrap=el("div",{class:"rects"});
  function draw(){wrap.innerHTML="";const pairs=[];for(let r=1;r*r<=n;r++)if(n%r===0)pairs.push([r,n/r]);
    pairs.forEach(([r,c])=>{const g=Math.max(5,Math.min(14,220/c)),s=S("svg",{viewBox:"0 0 "+(c*g+4)+" "+(r*g+4),width:c*g+4,height:r*g+4});for(let i=0;i<r;i++)for(let j=0;j<c;j++)s.append(S("circle",{cx:2+g/2+j*g,cy:2+g/2+i*g,r:g*0.38,class:pairs.length===1?"pd2":"pd1"}));
      wrap.append(el("figure",{class:"rect"},s,el("figcaption",{},r+" × "+c)))});
    out.innerHTML="";out.append(el("b",{},String(n))," counters make ",el("b",{},String(pairs.length))," rectangle"+(pairs.length>1?"s":"")+" → ",el("span",{class:"ptype"},pairs.length===1?"PRIME (only one row!)":"composite"));
    F.say(pairs.length===1?n+" can only make one row – its only factors are 1 and "+n+".":"Factors of "+n+": "+factors(n).join(", ")+".",pairs.length===1)}
  F.stage.append(row(el("label",{class:"plab"},"Counters ",rng)),out,wrap);draw();
},
sieve(host,cfg){const F=frame(host,cfg);let state,p;
  const grid=el("div",{class:"sieve"});
  function fresh(){state=Array(101).fill(0);p=1;draw();F.say("Tap ‘Next step’. First we cross out 1 – it is neither prime nor composite.")}
  function draw(){grid.innerHTML="";for(let i=1;i<=100;i++)grid.append(el("span",{class:state[i]===1?"x":state[i]===2?"p":""},String(i)))}
  function step(){if(p===1){state[1]=1;p=2;draw();F.say("Now circle 2 and cross out every multiple of 2.");return}
    while(p<=100&&state[p]!==0)p++;if(p>100){F.say("Done! All circled numbers are primes: 25 primes up to 100.",true);return}
    state[p]=2;let c=0;for(let m=p*p;m<=100;m+=p)if(state[m]===0){state[m]=1;c++}draw();
    if(p*p>100){for(let i=2;i<=100;i++)if(state[i]===0)state[i]=2;draw();F.say("After "+p+", every number left is prime (because "+p+" × "+p+" > 100). 25 primes up to 100!",true);p=101;return}
    F.say("Circled "+p+" and crossed out "+c+" more multiples of "+p+".");p++}
  F.stage.append(grid,row(btn("Next step",step,"primary"),btn("Start again",fresh,"light")));fresh();
},
coprime(host,cfg){const F=frame(host,cfg);let a=cfg.a||14,b=cfg.b||25;
  const A=el("input",{type:"number",class:"pin",value:a,"aria-label":"First number"}),Bi=el("input",{type:"number",class:"pin",value:b,"aria-label":"Second number"}),out=el("div",{class:"fcompare"});
  function draw(){a=Math.max(2,Math.min(200,+A.value||2));b=Math.max(2,Math.min(200,+Bi.value||2));const fa=factors(a),fb=factors(b),com=fa.filter(x=>b%x===0);
    out.innerHTML="";[[a,fa],[b,fb]].forEach(([n,f])=>out.append(el("div",{class:"fl"},el("b",{},n+" = "+pf(n).join(" × ")),el("div",{class:"fchips"},f.map(x=>el("span",{class:com.includes(x)?(x===1?"one":"com"):""},String(x)))))));
    const ok=com.length===1;F.say(ok?a+" and "+b+" are CO-PRIME: their only common factor is 1.":"Not co-prime – common factors "+com.join(", ")+".",ok?true:undefined)}
  A.addEventListener("input",draw);Bi.addEventListener("input",draw);
  F.stage.append(row(el("label",{class:"plab"},"Number 1 ",A),el("label",{class:"plab"},"Number 2 ",Bi),btn("Random pair",()=>{A.value=ri(4,60);Bi.value=ri(4,60);draw()},"light")),out,el("p",{class:"phint"},"Orange = shared factors other than 1."));draw();
},
factorLadder(host,cfg){const F=frame(host,cfg);let n0,cur,rows=[];
  const task=el("p",{class:"pbig"}),lad=el("div",{class:"ladder2"}),keys=el("div",{class:"chips"});
  function fresh(v){if(v)n0=v;else{do{n0=1;const k=ri(3,5);for(let i=0;i<k;i++)n0*=pick([2,2,2,3,3,5,7,11,13])}while(n0<24||n0>600)}cur=n0;rows=[];draw();F.say("Tap a prime that divides "+cur+". Start with the smallest!")}
  function draw(){task.textContent="Prime factorisation of "+n0;lad.innerHTML="";rows.forEach(([p,v])=>lad.append(el("div",{class:"lr"},el("span",{class:"lp"},String(p)),el("span",{class:"lv"},String(v)))));
    lad.append(el("div",{class:"lr"},el("span",{class:"lp"},cur===1?"":"?"),el("span",{class:"lv"},String(cur))))}
  [2,3,5,7,11,13,17,19].forEach(p=>keys.append(btn(String(p),()=>{if(cur===1)return;if(cur%p===0){rows.push([p,cur]);cur/=p;draw();
    if(cur===1)F.say(n0+" = "+rows.map(r=>r[0]).join(" × ")+"  ✔ Every factor is prime.",true);else F.say(p+" works! "+rows[rows.length-1][1]+" ÷ "+p+" = "+cur+". Keep going.")}
    else F.say(p+" does not divide "+cur+" (remainder "+(cur%p)+"). Try another prime.",false)},"key")));
  const own=el("input",{type:"number",class:"pin",placeholder:"Your number","aria-label":"Your number"});
  F.stage.append(task,lad,keys,row(btn("New number",()=>fresh(),"primary"),own,btn("Use mine",()=>{const v=+own.value;if(v>=4&&v<=5000&&pf(v).every(p=>p<=19))fresh(v);else F.say("Pick a number from 4 to 5000 made of primes up to 19.",false)},"light")));fresh(cfg.start);
},
divisDetective(host,cfg){const F=frame(host,cfg);let n,d,done;
  const num=el("div",{class:"pdisplay big"}),task=el("p",{class:"ptask"});
  const K={2:1,5:1,10:1,4:2,8:3},RULE={2:"last digit even",5:"last digit 0 or 5",10:"last digit 0",4:"last two digits ÷ 4",8:"last three digits ÷ 8"};
  function fresh(){d=pick([2,4,5,8,10]);n=ri(10000,999999);if(Math.random()<0.5)n-=n%d;done=false;draw();F.say("")}
  function draw(){const s=String(n),k=K[d];num.innerHTML="";num.append(el("span",{},s.slice(0,-k)),el("span",{class:"tail"},s.slice(-k)));task.innerHTML="";task.append("Is it divisible by ",el("b",{},String(d)),"? Look only at the orange digits (",RULE[d],").")}
  const ans=y=>()=>{if(done)return;done=true;const k=K[d],tail=n%Math.pow(10,k),ok=(n%d===0)===y;F.say((ok?F.praise()+" ":"Not quite. ")+String(tail).padStart(k,"0")+(k>1?" ÷ "+d+(tail%d===0?" = "+(tail/d)+" exactly":" leaves remainder "+(tail%d)):"")+" → "+(n%d===0?"YES, divisible by "+d:"NO, not divisible by "+d)+".",ok)};
  F.stage.append(task,num,row(btn("Yes",ans(true),"primary"),btn("No",ans(false),"primary"),btn("Next number →",fresh,"light")));fresh();
}
};
/* ================= Generic (any subject) ================= */
/* sort: cfg.buckets=["A","B"], cfg.items=[[text, bucketIndex, why?], …] */
PLAY.sort=function(host,cfg){const F=frame(host,cfg);let items,i,score,wrongs;
  const card=el("div",{class:"sortcard"}),st=el("p",{class:"ptask"}),bins=el("div",{class:"bins"}),btns=el("div",{class:"chips sortbtns"});
  function fresh(){items=shuf(cfg.items);i=0;score=0;wrongs=0;bins.innerHTML="";cfg.buckets.forEach((b,k)=>bins.append(el("div",{class:"bin","data-k":k},el("b",{},b),el("div",{class:"bincards"}))));show();F.say("")}
  function show(){st.textContent=i<items.length?"Card "+(i+1)+" of "+items.length+" · Score "+score:"Finished! "+score+" / "+items.length+" right first time";
    card.textContent=i<items.length?items[i][0]:(score===items.length?"Perfect sort! 🎉":"Done – tap ‘Play again’ to beat your score.");card.className="sortcard"+(i>=items.length?" done":"")}
  cfg.buckets.forEach((b,k)=>btns.append(btn(b,()=>{if(i>=items.length)return;const it=items[i];
    if(it[1]===k){if(!wrongs)score++;bins.querySelector('[data-k="'+k+'"] .bincards').append(el("span",{class:"mini"},it[0].length>60?it[0].slice(0,57)+"…":it[0]));F.say((wrongs?"Now it’s right. ":F.praise()+" ")+(it[2]||""),!wrongs);i++;wrongs=0;show()}
    else{wrongs++;card.classList.remove("shake");void card.offsetWidth;card.classList.add("shake");F.say("Not "+b+". "+(wrongs>1&&it[2]?"Hint: "+it[2]:"Think again."),false)}},"light")));
  F.stage.append(st,card,btns,bins,row(btn("Play again",fresh,"primary")));fresh();
};
/* match: cfg.pairs=[[left,right],…] */
PLAY.match=function(host,cfg){const F=frame(host,cfg);let sel=null,done,tries;
  const L=el("div",{class:"mcol"}),R=el("div",{class:"mcol"}),grid=el("div",{class:"mgrid"},L,R),st=el("p",{class:"ptask"});
  function fresh(){done=new Set();tries=0;sel=null;L.innerHTML="";R.innerHTML="";const idx=cfg.pairs.map((_,k)=>k);
    shuf(idx).forEach(k=>L.append(el("button",{type:"button",class:"mitem","data-k":k,onclick:e=>{if(done.has(k))return;L.querySelectorAll(".mitem").forEach(b=>b.classList.remove("on"));e.currentTarget.classList.add("on");sel=k}},cfg.pairs[k][0])));
    shuf(idx).forEach(k=>R.append(el("button",{type:"button",class:"mitem r","data-k":k,onclick:e=>pickR(k,e.currentTarget)},cfg.pairs[k][1])));upd();F.say("Tap an item on the left, then its partner on the right.")}
  function upd(){st.textContent="Matched "+done.size+" / "+cfg.pairs.length+" · Tries "+tries}
  function pickR(k,b){if(sel==null){F.say("First tap an item on the left.",false);return}if(done.has(k))return;tries++;
    if(k===sel){done.add(k);[L,R].forEach(c=>c.querySelector('[data-k="'+k+'"]').classList.add("ok"));L.querySelector('[data-k="'+k+'"]').classList.remove("on");sel=null;
      F.say(done.size===cfg.pairs.length?"All matched in "+tries+" tries! "+(tries===cfg.pairs.length?"Perfect!":""):F.praise(),true)}
    else{b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");F.say("Not a pair – try another.",false)}upd()}
  F.stage.append(st,grid,row(btn("Shuffle and play again",fresh,"primary")));fresh();
};
/* order: cfg.items=[first,…,last] in correct order; cfg.first / cfg.last labels */
PLAY.order=function(host,cfg){const F=frame(host,cfg);let next,pool;
  const box=el("div",{class:"obox"}),built=el("ol",{class:"obuilt"}),st=el("p",{class:"ptask"});
  function fresh(){next=0;built.innerHTML="";pool=shuf(cfg.items.map((t,k)=>[t,k]));box.innerHTML="";
    pool.forEach(([t,k])=>box.append(el("button",{type:"button",class:"oitem",onclick:e=>tap(k,e.currentTarget)},t)));st.textContent="Tap them in order: "+(cfg.first||"first")+" → "+(cfg.last||"last");F.say("")}
  function tap(k,b){if(k===next){built.append(el("li",{},cfg.items[k]));b.remove();next++;if(next===cfg.items.length)F.say("Perfect order! "+(cfg.done||""),true);else F.say(F.praise())}
    else{b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");F.say("Not yet – which comes "+(next===0?"first":"next")+"?",false)}}
  F.stage.append(st,built,box,row(btn("Start again",fresh,"primary")));fresh();
};
/* dataBars: cfg.labels=[…], cfg.series=[{name,values}], cfg.unit, cfg.source, cfg.qs=[{q,a,opts,e}] */
PLAY.dataBars=function(host,cfg){const F=frame(host,cfg);let qi=0;
  const svg=S("svg",{viewBox:"0 0 420 250",class:"psvg wide",role:"img","aria-label":cfg.title}),qp=el("p",{class:"pbig"}),ch=el("div",{class:"chips"}),legend=el("div",{class:"legend"}),src=el("p",{class:"phint"},cfg.source?"Source: "+cfg.source:"");
  const sers=cfg.series,n=cfg.labels.length,max=Math.max(...sers.flatMap(s=>s.values));const top=Math.ceil(max*1.12/(cfg.step||5))*(cfg.step||5);
  const L=40,B=200,H=175,W=370,gw=W/n,bw=Math.min(34,gw*0.8/sers.length);const Y=v=>B-H*v/top;
  function draw(hi){svg.innerHTML="";const st=cfg.step||5;for(let v=0;v<=top+1e-9;v+=st)svg.append(S("line",{x1:L,x2:L+W,y1:Y(v),y2:Y(v),class:"pgrid"}),S("text",{x:L-5,y:Y(v)+4,"text-anchor":"end",class:"pax",text:String(+v.toFixed(2))}));
    cfg.labels.forEach((lab,i)=>{const x0=L+i*gw+(gw-bw*sers.length)/2;sers.forEach((s,j)=>{const v=s.values[i];const r=S("rect",{x:x0+j*bw,y:Y(v),width:bw-2,height:B-Y(v),rx:2,class:(j?"pbar2":"pbar")+(hi===i?" on":""),tabindex:0,role:"button","aria-label":lab+" "+s.name+" "+v});
        r.addEventListener("click",()=>{draw(i);F.say(lab+" – "+sers.map(t=>t.name+": "+t.values[i]+(cfg.unit||"")).join(" · "))});svg.append(r)});
      const words=String(lab).split(" ");svg.append(S("text",{x:L+i*gw+gw/2,y:B+14,"text-anchor":"middle",class:"pax",text:words.slice(0,2).join(" ")}));if(words.length>2)svg.append(S("text",{x:L+i*gw+gw/2,y:B+27,"text-anchor":"middle",class:"pax",text:words.slice(2).join(" ")}))})}
  if(sers.length>1)sers.forEach((s,j)=>legend.append(el("span",{},el("i",{class:j?"lg2":"lg1"}),s.name)));
  function ask(){ch.innerHTML="";if(!cfg.qs||!cfg.qs.length)return;const q=cfg.qs[qi%cfg.qs.length];qp.textContent=q.q;let answered=false;
    shuf(q.opts).forEach(o=>ch.append(btn(o,()=>{if(answered)return;answered=true;const ok=o===q.a;F.say((ok?F.praise()+" ":"Not quite – it is "+q.a+". ")+(q.e||""),ok)},"light")))}
  F.stage.append(el("p",{class:"ptask"},el("b",{},cfg.chart||"")),legend,svg,src,qp,ch,row(btn("Next question →",()=>{qi++;F.say("");ask()},"primary")),el("p",{class:"phint"},"Tap a bar to read its exact value."));draw();ask();
};
window.PLAY=PLAY;
})();
