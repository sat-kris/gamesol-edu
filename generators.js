/* Gamesol Edu – question generators and figures for maths banks.
   A bank question {"type":"fn","fn":"<name>","args":{...}} calls GEN[name](args)
   and gets back {q, ans, wrong:[3 strings], expl, fig?}. */
(function(){
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const uniq=(ans,list)=>[...new Set(list.map(String))].filter(x=>x!==String(ans));
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const factors=n=>{const f=[];for(let i=1;i<=n;i++)if(n%i===0)f.push(i);return f};
const gcd=(a,b)=>b?gcd(b,a%b):a;
const lcm=(a,b)=>a/gcd(a,b)*b;
const pf=n=>{const f=[];let m=n;for(let p=2;p*p<=m;p++)while(m%p===0){f.push(p);m/=p}if(m>1)f.push(m);return f};
const X=" × ";
const pfStr=n=>pf(n).join(X);
const rev=n=>+String(n).split("").reverse().join("");
const dsum=n=>String(n).split("").reduce((s,d)=>s+ +d,0);
const pad4=n=>String(n).padStart(4,"0");
const kapStep=n=>{const d=pad4(n).split("").sort();const B=+d.join(""),A=+d.slice().reverse().join("");return {A,B,C:A-B,As:d.slice().reverse().join(""),Bs:d.join("")}};
const kapRounds=n=>{let r=0,m=n;while(m!==6174&&r<10){m=kapStep(m).C;r++}return r};
const col=n=>n%2===0?n/2:3*n+1;
const colSeq=(n,k)=>{const s=[n];while(s.length<k&&s[s.length-1]!==1)s.push(col(s[s.length-1]));return s};
const tri=n=>n*(n+1)/2, hex=n=>3*n*(n-1)+1;
const ord=n=>n+(n%100>=11&&n%100<=13?"th":({1:"st",2:"nd",3:"rd"}[n%10]||"th"));
const out=(q,ans,wrong,expl,fig)=>{const w=shuf(uniq(ans,wrong)).slice(0,3);return w.length===3?{q,ans:String(ans),wrong:w,expl,fig}:null};
const angType=d=>d===90?"Right angle":d===180?"Straight angle":d===360?"Full turn":d<90?"Acute angle":d<180?"Obtuse angle":"Reflex angle";

const GEN={
/* ---------- Chapter 1 · Patterns ---------- */
triNth(){const n=ri(5,15);return out("What is the "+ord(n)+" triangular number?",tri(n),[n*n,tri(n-1),n*(n+1),tri(n+1)],
  "Triangular numbers are 1, 3, 6, 10, … The "+ord(n)+" one is 1 + 2 + … + "+n+" = "+n+" × "+(n+1)+" ÷ 2 = "+tri(n)+".",{type:"dots",shape:"tri",n:[1,2,3,4]})},
oddSum(){const n=ri(5,25);return out("Find the sum of the first "+n+" odd numbers: 1 + 3 + 5 + … + "+(2*n-1)+".",n*n,[2*n,n*(n+1),n*n+1,tri(n)],
  "Adding odd numbers from 1 always gives a square number: the first "+n+" odd numbers add up to "+n+" × "+n+" = "+(n*n)+".",{type:"dots",shape:"oddsq",n:[1,2,3,4]})},
upDown(){const n=ri(4,12);const s=[];for(let i=1;i<=n;i++)s.push(i);const t=s.concat(s.slice(0,-1).reverse());
  return out("Find 1 + 2 + … + "+n+" + … + 2 + 1 (adding up to "+n+" and back down).",n*n,[n*(n+1),tri(n),2*n*n,n*n-1],
  "Adding counting numbers up and then down gives a square number: 1 + 2 + … + "+n+" + … + 1 = "+n+"² = "+(n*n)+".")},
hexNext(){const n=ri(3,7);return out("Hexagonal numbers: 1, 7, 19, 37, … The "+ord(n)+" one is "+hex(n)+". What is the next hexagonal number?",hex(n+1),[hex(n)+6*(n-1),hex(n)+6,hex(n)*2,hex(n)+12],
  "The gaps grow by 6 each time (6, 12, 18, 24, …). The next gap is 6 × "+n+" = "+(6*n)+", so "+hex(n)+" + "+(6*n)+" = "+hex(n+1)+".",{type:"dots",shape:"hex",n:[1,2,3]})},
completeGraph(){const n=ri(4,10);return out("A complete graph K"+n+" has "+n+" points, each joined to every other point. How many lines does it have?",n*(n-1)/2,[n*(n+1)/2,n*n,n*(n-1),2*n],
  "Lines in complete graphs follow the triangular numbers: K2 = 1, K3 = 3, K4 = 6, … K"+n+" = "+n+" × "+(n-1)+" ÷ 2 = "+(n*(n-1)/2)+".")},
viraNext(){const k=ri(5,9);const s=[1,2];while(s.length<k+1)s.push(s[s.length-1]+s[s.length-2]);const show=s.slice(0,k),a=s[k];
  return out("Find the next Virahānka number: "+show.join(", ")+", …",a,[show[k-1]*2,show[k-1]+2,a+1,show[k-1]+show[k-3]],
  "Each Virahānka number is the sum of the two before it: "+show[k-2]+" + "+show[k-1]+" = "+a+".")},
seqNext(){const T=[["Odd numbers",n=>2*n-1],["Even numbers",n=>2*n],["Square numbers",n=>n*n],["Cube numbers",n=>n*n*n],["Powers of 2",n=>Math.pow(2,n-1)],["Powers of 3",n=>Math.pow(3,n-1)],["Triangular numbers",tri]];
  const [name,f]=pick(T);const st=ri(1,3);const terms=[0,1,2,3,4].map(i=>f(st+i));const a=f(st+5);
  return out("What comes next? "+terms.join(", ")+", …",a,[terms[4]+(terms[4]-terms[3]),a+1,a-2,terms[4]*2+1],
  "These are "+name.toLowerCase()+". The next one is "+a+".")},
stackedSquares(){const n=ri(4,9);return out("In the Stacked Squares sequence, the 1st shape has 1 little square, the 2nd has 4, the 3rd has 9. How many little squares are in the "+ord(n)+" shape?",n*n,[4*n,n*(n+1),2*n+1,tri(n)],
  "The "+ord(n)+" shape is a "+n+" × "+n+" square, so it has "+(n*n)+" little squares – the square numbers.",{type:"dots",shape:"sq",n:[1,2,3,4]})},

/* ---------- Chapter 2 · Lines and Angles ---------- */
angleType(){const d=pick([ri(5,85),ri(95,175),ri(185,355),90,180,ri(5,85),ri(95,175),ri(185,355)]);const a=angType(d);
  return out("An angle measures "+d+"°. What type of angle is it?",a,["Acute angle","Right angle","Obtuse angle","Straight angle","Reflex angle"],
  "Acute: less than 90°. Right: 90°. Obtuse: between 90° and 180°. Straight: 180°. Reflex: between 180° and 360°. So "+d+"° is "+a.toLowerCase()+".",{type:"angle",deg:d})},
clockAngle(){const h=pick([1,2,3,4,5,6,7,8,9,10,11]);const big=30*h,a=Math.min(big,360-big);
  return out("What is the smaller angle between the hour hand and the minute hand of a clock at "+h+" o'clock?",a+"°",[(360-a)+"°",(h*5)+"°",(a+30)+"°",(a===90?"180":"90")+"°"],
  "The clock face is a full turn of 360° split into 12 equal parts, so each hour mark is 360° ÷ 12 = 30°. At "+h+" o'clock the hands are "+Math.min(h,12-h)+" marks apart: "+Math.min(h,12-h)+" × 30° = "+a+"°.")},
turns(){const k=pick([["a quarter turn",90],["a half turn",180],["three quarter turns",270],["a full turn",360],["two right angles",180],["three right angles",270],["four right angles",360]]);
  return out("How many degrees is "+k[0]+"?",k[1]+"°",["90°","180°","270°","360°","45°"],
  "A full turn is 360°. A half turn is 180°, a quarter turn (a right angle) is 90°. So "+k[0]+" = "+k[1]+"°.")},
protractor(){let a=ri(2,7)*10+pick([0,5]);let b=a+ri(2,7)*10;if(b>170)b=170;const mode=pick(["AXB","BXC","CXE","BXE"]);
  const val={AXB:a,BXC:b-a,CXE:180-b,BXE:180-a}[mode];
  const w={AXB:[180-a,b,b-a],BXC:[b,a,180-b,b+a],CXE:[b,180-a,b-a],BXE:[a,b,180-b]}[mode];
  return out("Rays XB and XC are drawn from X on the straight line AXE (see the protractor readings, measured from A). Find ∠"+mode+".",val+"°",w.map(x=>x+"°"),
  "Read both rays on the same scale (starting from 0° at A). ∠AXB = "+a+"°, ∠AXC = "+b+"°, and ∠AXE = 180° (a straight angle). So ∠"+mode+" = "+val+"°.",{type:"protractor",rays:[{deg:a,label:"B"},{deg:b,label:"C"}]})},
straightPair(){const a=ri(3,16)*10+pick([0,5]);return out("A ray OC stands on the straight line AOB. If ∠AOC = "+a+"°, find ∠COB.",(180-a)+"°",[(90-a>0?90-a:a+10)+"°",(360-a)+"°",a+"°",(180+a)+"°"],
  "∠AOB is a straight angle = 180°. So ∠COB = 180° − "+a+"° = "+(180-a)+"°.",{type:"protractor",rays:[{deg:a,label:"C"}],base:["A","O","B"],noScale:true})},
nameAngle(){const L=shuf(["P","Q","R","S","T","M","N","O","X","Y"]).slice(0,3);const [p,v,r]=L;const d=ri(35,150);
  return out("Name the marked angle in the figure. (Vertex "+v+")","∠"+p+v+r,["∠"+v+p+r,"∠"+p+r+v,"∠"+r+p+v,"∠"+v+r+p],
  "The vertex letter always goes in the middle. The marked angle is ∠"+p+v+r+" (also called ∠"+r+v+p+").",{type:"angle",deg:d,labels:[r,v,p]})},

/* ---------- Chapter 3 · Number Play ---------- */
kapStep(){let n;do n=ri(1000,9999);while(new Set(String(n)).size<2);const s=kapStep(n);
  return out("Kaprekar routine on "+n+": make the largest number A and the smallest number B from its digits. What is A − B?",s.C,[s.C+90,s.C-99,s.A+s.B,Math.abs(s.A-n)||s.C+9,s.C+900],
  "A = "+s.As+", B = "+s.Bs+" (a 4-digit number may start with 0). A − B = "+s.As+" − "+s.Bs+" = "+s.C+".")},
kapRounds(){let n,r;do{n=ri(1000,9999);r=kapRounds(n)}while(new Set(String(n)).size<2||r<2||r>5);let m=n;const steps=[];for(let i=0;i<r;i++){const s=kapStep(m);steps.push(s.As+" − "+s.Bs+" = "+pad4(s.C));m=s.C}
  return out("How many rounds does "+n+" take to reach the Kaprekar constant 6174?",r,[r-1,r+1,r+2,7],
  "Round by round: "+steps.join("; ")+". That is "+r+" rounds.")},
collatzNext(){const n=ri(7,99);const a=col(n);return out("Collatz rule: if even, halve it; if odd, multiply by 3 and add 1. What comes after "+n+"?",a,[n%2?n/2|0:3*n+1,n*2,3*n,n%2?3*n-1:n/2+1],
  n%2===0?n+" is even, so take half: "+n+" ÷ 2 = "+a+".":n+" is odd, so 3 × "+n+" + 1 = "+a+".")},
collatzSeq(){const n=pick([6,7,9,10,11,12,13,14,15,17,18,20,21,22,24,26,28,34]);const s=colSeq(n,7);const good=s.join(" → ");
  const bad1=s.map((x,i)=>i===2?(s[1]%2?s[1]/2|0:s[1]*3+1):x);const bad2=[n].concat(colSeq(n%2?n/2|0:3*n+1,6));const bad3=s.map((x,i)=>i>0&&x%2===0&&s[i-1]%2?x+2:x);
  return out("Which is the correct Collatz sequence starting with "+n+"?",good,[bad1.join(" → "),bad2.join(" → "),bad3.join(" → "),s.slice().reverse().join(" → ")],
  "Even → halve; odd → × 3 + 1. Starting at "+n+": "+colSeq(n,40).join(" → ")+".")},
digitSum(){const n=ri(1000,99999);return out("What is the digit sum of "+n.toLocaleString("en-IN")+"?",dsum(n),[dsum(n)+1,dsum(n)-2,dsum(n)+9,String(n).length*5],
  "Add the digits: "+String(n).split("").join(" + ")+" = "+dsum(n)+".")},
palinFind(){const k=ri(4,6);const mk=()=>{const h=[ri(1,9)];for(let i=1;i<Math.ceil(k/2);i++)h.push(ri(0,9));const f=h.concat(h.slice(0,Math.floor(k/2)).reverse());return +f.join("")};
  const p=mk();const w=[];while(w.length<3){let x=mk();const s=String(x).split("");const i=ri(0,Math.floor(k/2)-1);s[i]=String((+s[i]+ri(1,8))%10||1);x=+s.join("");if(x!==rev(x)&&!w.includes(x))w.push(x)}
  return out("Which of these numbers is a palindrome?",p,w,"A palindrome reads the same from left to right and from right to left: "+p+" reversed is still "+p+".")},
palinExtreme(){const k=ri(3,6);const s=Math.pow(10,k-1)+1,l=Math.pow(10,k)-1;const m=pick(["sum","diff","small","large"]);
  const v={sum:s+l,diff:l-s,small:s,large:l}[m];const q={sum:"What is the sum of the smallest and largest "+k+"-digit palindromes?",diff:"What is the difference between the largest and smallest "+k+"-digit palindromes?",small:"What is the smallest "+k+"-digit palindrome?",large:"What is the largest "+k+"-digit palindrome?"}[m];
  return out(q,v,{sum:[l+s-1,l+Math.pow(10,k-1),2*l,l+s+10],diff:[l-Math.pow(10,k-1),l-s+2,l-s-10,l-s+11],small:[Math.pow(10,k-1),s+10,Math.pow(10,k-1)+11,s+Math.pow(10,k-2)*11,Math.pow(10,k)+1],large:[l-1,l-10,Math.pow(10,k),l-Math.pow(10,k-2)*11,Math.pow(10,k)+1]}[m],
  "Smallest "+k+"-digit palindrome = "+s+", largest = "+l+". "+(m==="sum"?s+" + "+l+" = "+v+".":m==="diff"?l+" − "+s+" = "+v+".":"Answer: "+v+"."))},
supercells(){const row=[];while(row.length<7){const x=ri(100,999);if(!row.includes(x))row.push(x)}
  const sc=row.filter((x,i)=>(i===0||x>row[i-1])&&(i===row.length-1||x>row[i+1]));
  return out("A cell is a supercell if its number is larger than its neighbours (left and right). How many supercells are in this row?",sc.length,[sc.length+1,sc.length-1>0?sc.length-1:sc.length+2,sc.length+2,1],
  "Supercells: "+sc.join(", ")+" – each is bigger than every neighbour. The end cells have only one neighbour.",{type:"cells",row})},
digitCount(){const k=ri(1,5);const v=9*Math.pow(10,k-1);return out("How many "+k+"-digit numbers are there?",v,[Math.pow(10,k),Math.pow(10,k)-1,v+1,v*10,v-1],
  "From "+Math.pow(10,k-1)+" to "+(Math.pow(10,k)-1)+": "+(Math.pow(10,k)-1)+" − "+Math.pow(10,k-1)+" + 1 = "+v+".")},

/* ---------- Chapter 4 · Data handling ---------- */
tallyFreq(){const b=ri(1,5),r=ri(0,4);return out("What frequency do these tally marks show?",5*b+r,[4*b+r,5*b+r+1,b+r,5*(b+1)],
  "Each bundle (four lines with a line across) is 5. "+b+" bundle"+(b>1?"s":"")+" = "+(5*b)+(r?", plus "+r+" more = "+(5*b+r):"")+".",{type:"tally",n:5*b+r})},
freqCount(){const vals=[5,6,7,8,9,10];const data=[];for(let i=0;i<18;i++)data.push(pick(vals));const v=pick(vals);const f=data.filter(x=>x===v).length;
  return out("Marks scored by 18 students (out of 10): "+data.join(", ")+". What is the frequency of the mark "+v+"?",f,[f+1,f-1>=0?f-1:f+2,f+2,v],
  "Count every "+v+" in the list (tally them): it appears "+f+" times.")},
pictoRead(){const key=pick([2,4,5,10]);const cats=shuf(["Maths Club","Sports Club","Art Club","Music Club","Science Club","Dance Club"]).slice(0,4);
  const syms=cats.map(()=>ri(2,8)+(key%2===0&&Math.random()<.35?0.5:0));const i=ri(0,3);const m=pick(["one","diff","total"]);
  const val=m==="one"?syms[i]*key:m==="diff"?(Math.max(...syms)-Math.min(...syms))*key:syms.reduce((s,x)=>s+x,0)*key;
  const q=m==="one"?"How many students are in the "+cats[i]+"?":m==="diff"?"How many more students are in the biggest club than in the smallest club?":"How many students are there in all four clubs together?";
  const base=m==="one"?syms[i]:m==="diff"?Math.max(...syms)-Math.min(...syms):syms.reduce((s,x)=>s+x,0);
  return out(q+" (Key: 1 symbol = "+key+" students)",val,[base,val+key,val-key>0?val-key:val+2*key,Math.round(base)*key+ (base%1?key:0)],
  "Count the symbols ("+base+") and multiply by the key: "+base+" × "+key+" = "+val+"."+(syms.some(x=>x%1)?" A half symbol = "+(key/2)+".":""),{type:"picto",key,unit:"students",rows:cats.map((c,j)=>[c,syms[j]])})},
barRead(){const scale=pick([2,4,5,10]);const cls=["VI A","VI B","VI C","VI D","VI E"];const v=cls.map(()=>ri(2,7)*scale);const m=pick(["most","least","diff","total"]);
  const mx=Math.max(...v),mn=Math.min(...v);if(v.filter(x=>x===mx).length>1&&m==="most")return GEN.barRead();if(v.filter(x=>x===mn).length>1&&m==="least")return GEN.barRead();
  const fig={type:"bars",title:"Saplings planted by each class",x:"Class",y:"Saplings",bars:cls.map((c,i)=>[c,v[i]]),step:scale};
  if(m==="most"||m==="least"){const a=cls[v.indexOf(m==="most"?mx:mn)];return out("Which class planted the "+(m==="most"?"most":"fewest")+" saplings?",a,cls,"The "+(m==="most"?"tallest":"shortest")+" bar is "+a+" ("+(m==="most"?mx:mn)+" saplings).",fig)}
  if(m==="diff"){const i=ri(0,4);let j=ri(0,4);if(i===j)j=(i+1)%5;const d=Math.abs(v[i]-v[j]);return out("How many more saplings did "+(v[i]>=v[j]?cls[i]:cls[j])+" plant than "+(v[i]>=v[j]?cls[j]:cls[i])+"?",d,[v[i]+v[j],d+scale,Math.max(v[i],v[j]),d/scale],"Read both bars: "+v[i]+" and "+v[j]+". Difference = "+d+".",fig)}
  const t=v.reduce((s,x)=>s+x,0);return out("How many saplings were planted by all five classes together?",t,[t-scale,t+scale,mx*5,t/scale],"Add the bar heights: "+v.join(" + ")+" = "+t+".",fig)},
barScale(){const k=pick([2,4,5,10,20,50,100]);const u=ri(3,9)+(Math.random()<.3?0.5:0);return out("In a bar graph the scale is 1 unit length = "+k+" students. A bar is "+u+" units long. How many students does it show?",u*k,[u+k,Math.round(u)*k+k,u*k/2,k],
  "Multiply the length by the scale: "+u+" × "+k+" = "+(u*k)+".")},
chooseScale(){const k=pick([4,5,10,20,50,100]);const v=[ri(2,9)*k,ri(2,9)*k,ri(2,9)*k,ri(2,9)*k];
  return out("The values "+v.join(", ")+" are to be shown on a bar graph. Which scale is the most suitable?","1 unit = "+k,["1 unit = 1","1 unit = "+(k*10),"1 unit = "+(k===4?3:k+3),"1 unit = "+(k/2|0||1)],
  "Choose a scale that divides the values neatly and keeps the bars a sensible length: all values are multiples of "+k+", so 1 unit = "+k+" works best.")},

/* ---------- Chapter 5 · Prime time ---------- */
idliVada(){const P=pick([[3,5,"idli","vada"],[2,3,"idli","vada"],[4,6,"idli","vada"],[3,4,"idli","vada"],[6,8,"idli","vada"]]);const n=ri(2,12);const L=lcm(P[0],P[1]);
  return out("In the idli-vada game, ‘idli’ is said for multiples of "+P[0]+" and ‘vada’ for multiples of "+P[1]+". At what number is ‘idli-vada’ said for the "+ord(n)+" time?",L*n,[P[0]*P[1]*n===L*n?L*n+P[0]:P[0]*P[1]*n,L*n+L,L*(n-1),(P[0]+P[1])*n],
  "‘Idli-vada’ is said at common multiples of "+P[0]+" and "+P[1]+": "+L+", "+(2*L)+", "+(3*L)+", … The "+ord(n)+" one is "+n+" × "+L+" = "+(L*n)+".")},
commonFactors(){const P=pick([[20,28],[12,18],[24,36],[16,40],[30,45],[18,27],[14,42],[36,60],[48,64],[45,75],[32,48],[42,56]]);const [a,b]=P;
  const cf=factors(a).filter(x=>b%x===0);const fa=factors(a),fb=factors(b);
  return out("What are the common factors of "+a+" and "+b+"?",cf.join(", "),[fa.join(", "),cf.slice(0,-1).join(", ")||"1",cf.concat([lcm(a,b)]).join(", "),cf.slice(1).join(", ")+", "+a],
  "Factors of "+a+": "+fa.join(", ")+". Factors of "+b+": "+fb.join(", ")+". Common factors: "+cf.join(", ")+".")},
primeFactorise(){let n;do{n=1;const k=ri(3,5);for(let i=0;i<k;i++)n*=pick([2,2,2,3,3,5,7,11,13,19])}while(n<40||n>1000);
  const f=pf(n);const w1=f[0]===2&&f[1]===2?["4"].concat(f.slice(2)).join(X):f[0]===3&&f[1]===3?["9"].concat(f.slice(2)).join(X):["1"].concat(f).join(X);
  const w2=pf(n*2).join(X),w3=f.length>2?f.slice(1).join(X):pf(n*3).join(X);
  return out("What is the prime factorisation of "+n+"?",f.join(X),[w1,w2,w3,f.join(" + ")],
  "Keep dividing by the smallest prime: "+n+" = "+f.join(X)+". Check: every factor is prime and they multiply back to "+n+".")},
coprimePair(){const good=[[4,9],[8,15],[14,25],[28,45],[16,21],[9,20],[35,48],[12,25],[27,32],[10,21],[33,56]];const bad=[[22,44],[15,39],[56,63],[12,18],[21,35],[24,30],[26,39],[45,60],[14,49],[18,33],[34,51]];
  const g=pick(good),b=shuf(bad).slice(0,3);const s=p=>p[0]+" and "+p[1];
  return out("Which pair of numbers is co-prime?",s(g),b.map(s),
  s(g)+": "+g[0]+" = "+(pf(g[0]).join(X))+", "+g[1]+" = "+(pf(g[1]).join(X))+" – no common prime factor, so their only common factor is 1. The others share a factor ("+b.map(p=>p[0]+" & "+p[1]+" share "+gcd(p[0],p[1])).join("; ")+").")},
divisible(){const d=pick([2,4,5,8,10]);const rule={2:"its last digit is even (0, 2, 4, 6 or 8)",4:"the number formed by its last two digits is divisible by 4",5:"its last digit is 0 or 5",8:"the number formed by its last three digits is divisible by 8",10:"its last digit is 0"}[d];
  const yes=ri(1000,99999)*d;const w=[];while(w.length<3){const x=ri(10000,999999);if(x%d!==0&&!w.includes(x))w.push(x)}
  return out("Which of these numbers is divisible by "+d+"?",yes,w,"A number is divisible by "+d+" if "+rule+". "+yes+" passes this test; the others do not.")},
lastDigitsTest(){const d=pick([4,8]);const k=d===4?2:3;let n=ri(10000,999999);const yes=Math.random()<.5;if(yes)n=n-n%d;else if(n%d===0)n+=ri(1,d-1);const tail=n%Math.pow(10,k);
  return out("Is "+n+" divisible by "+d+"?",yes?"Yes – "+String(tail).padStart(k,"0")+" is divisible by "+d:"No – "+String(tail).padStart(k,"0")+" is not divisible by "+d,
  [yes?"No – "+String(tail).padStart(k,"0")+" is not divisible by "+d:"Yes – "+String(tail).padStart(k,"0")+" is divisible by "+d,yes?"No – the digit sum is not divisible by "+d:"Yes – the last digit is even","Yes – the number is even",(yes?"No":"Yes")+" – check the first "+k+" digits"].filter((x,i,a)=>a.indexOf(x)===i),
  "For "+d+", only the last "+k+" digits matter: "+String(tail).padStart(k,"0")+" ÷ "+d+(tail%d===0?" = "+(tail/d)+", so it IS divisible.":" leaves a remainder, so it is NOT divisible."))},
primeInList(){const P=[23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];const C=[21,27,33,39,49,51,57,63,69,77,81,87,91,93,95,99];const p=pick(P);
  return out("Which of these is a prime number?",p,shuf(C).slice(0,3),p+" has only two factors, 1 and "+p+". The others look prime but are not (e.g. 51 = 3 × 17, 57 = 3 × 19, 91 = 7 × 13).")},
primesCount(){const a=pick([1,11,21,31,41,51,61,71,81,91]);const b=a+9;const ps=[];for(let i=a;i<=b;i++)if(isPrime(i))ps.push(i);
  return out("How many prime numbers are there from "+a+" to "+b+"?",ps.length,[ps.length+1,ps.length+2,ps.length?ps.length-1:3,5],"Primes from "+a+" to "+b+": "+(ps.join(", ")||"none")+" → "+ps.length+".")},
composites(){const a=pick([20,30,40,50,60,70,80,90]);const b=a+10;const c=[],p=[];for(let i=a;i<=b;i++)(isPrime(i)?p:c).push(i);
  const w1=c.concat(p.slice(0,1)).sort((x,y)=>x-y).join(", "),w2=c.slice(1).join(", "),w3=c.filter(x=>x%2===0).join(", ");
  return out("Which list shows ALL the composite numbers from "+a+" to "+b+"?",c.join(", "),[w1,w2,w3,c.slice(0,-1).join(", ")],
  "Composite numbers have more than two factors. From "+a+" to "+b+" the primes are "+p.join(", ")+"; every other number is composite: "+c.join(", ")+".")},
divByPF(){const P=pick([[72,18],[60,12],[90,15],[84,14],[96,24],[126,21],[80,12],[90,12],[100,8],[108,27],[64,12],[75,10]]);const [n,m]=P;const y=n%m===0;
  return out("Using prime factorisation, is "+n+" divisible by "+m+"? ("+n+" = "+pfStr(n)+", "+m+" = "+pfStr(m)+")",y?"Yes – all prime factors of "+m+" appear in "+n:"No – "+m+" has a prime factor that "+n+" does not have enough of",
  [y?"No – "+m+" has a prime factor that "+n+" does not have enough of":"Yes – all prime factors of "+m+" appear in "+n,"Yes – both numbers are even","No – "+m+" is not a prime number"],
  y?"Every prime factor of "+m+" ("+pfStr(m)+") appears in "+pfStr(n)+", so "+n+" ÷ "+m+" = "+(n/m)+".":"Compare the factorisations: "+pfStr(n)+" does not contain all of "+pfStr(m)+", so "+n+" is not divisible by "+m+".")}
};

/* ---------- figures ---------- */
const E=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const FIG={
dots(f){const W=Math.min(620,f.n.length*150),H=130;let s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Dot pattern">';const cw=W/f.n.length;
  f.n.forEach((k,i)=>{const cx=cw*i+cw/2;const pts=[];
    if(f.shape==="tri"){for(let r=0;r<k;r++)for(let c=0;c<=r;c++)pts.push([c-r/2,r-(k-1)/2])}
    else if(f.shape==="sq"||f.shape==="oddsq"){for(let r=0;r<k;r++)for(let c=0;c<k;c++)pts.push([c-(k-1)/2,r-(k-1)/2,Math.max(r,c)])}
    else if(f.shape==="hex"){const R=k-1;for(let q=-R;q<=R;q++)for(let r=-R;r<=R;r++){const z=-q-r;if(Math.abs(z)<=R)pts.push([q+r/2,r*0.87])}}
    const g=Math.min(16,(cw-20)/(k+1),90/(k+1));
    pts.forEach(p=>{s+='<circle cx="'+(cx+p[0]*g)+'" cy="'+(58+p[1]*g)+'" r="'+Math.max(3,g*0.33)+'" class="'+(f.shape==="oddsq"&&p[2]%2?"d2":"d1")+'"/>'});
    const val=f.shape==="tri"?k*(k+1)/2:f.shape==="hex"?3*k*(k-1)+1:k*k;s+='<text x="'+cx+'" y="'+(H-6)+'" text-anchor="middle">'+val+'</text>'});
  return s+'</svg>'},
angle(f){const W=300,H=200,vx=70,vy=160,L=190;const r=f.deg*Math.PI/180;const x2=vx+L*Math.cos(r),y2=vy-L*Math.sin(r);const lab=f.labels||["","",""];
  const big=f.deg>180?1:0;const ar=36;
  let s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Angle of '+f.deg+' degrees">';
  s+='<line class="ray" x1="'+vx+'" y1="'+vy+'" x2="'+(vx+L)+'" y2="'+vy+'"/><line class="ray" x1="'+vx+'" y1="'+vy+'" x2="'+x2+'" y2="'+y2+'"/>';
  s+='<path class="arc" d="M'+(vx+ar)+' '+vy+' A'+ar+' '+ar+' 0 '+big+' 0 '+(vx+ar*Math.cos(r))+' '+(vy-ar*Math.sin(r))+'"/>';
  s+='<circle cx="'+vx+'" cy="'+vy+'" r="4" class="pt"/><text class="pl" x="'+(vx-6)+'" y="'+(vy+20)+'">'+E(lab[1])+'</text><text class="pl" x="'+(vx+L-4)+'" y="'+(vy+20)+'">'+E(lab[0])+'</text><text class="pl" x="'+(x2+(Math.cos(r)>=0?8:-18))+'" y="'+(y2+(Math.sin(r)>=0?-4:16))+'">'+E(lab[2])+'</text>';
  return s+'</svg>'},
protractor(f){const W=460,H=262,cx=230,cy=222,R=170;const P=(deg,rr)=>[cx-rr*Math.cos(deg*Math.PI/180),cy-rr*Math.sin(deg*Math.PI/180)];
  let s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Protractor reading">';
  if(!f.noScale){s+='<path class="prot" d="M'+(cx-R)+' '+cy+' A'+R+' '+R+' 0 0 1 '+(cx+R)+' '+cy+' Z"/>';
    for(let d=0;d<=180;d+=10){const a=P(d,R),b=P(d,R-(d%30===0?16:9));s+='<line class="tk" x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'"/>';if(d%30===0){const t=P(d,R-28);s+='<text x="'+t[0]+'" y="'+(t[1]+4)+'" text-anchor="middle">'+d+'</text>'}}}
  const base=f.base||["A","X","E"];
  s+='<line class="ray" x1="'+(cx-R-20)+'" y1="'+cy+'" x2="'+(cx+R+20)+'" y2="'+cy+'"/>';
  s+='<text class="pl" x="'+(cx-R-18)+'" y="'+(cy+22)+'">'+E(base[0])+'</text><text class="pl" x="'+(cx-5)+'" y="'+(cy+22)+'">'+E(base[1])+'</text><text class="pl" x="'+(cx+R+8)+'" y="'+(cy+22)+'">'+E(base[2])+'</text><circle class="pt" cx="'+cx+'" cy="'+cy+'" r="4"/>';
  (f.rays||[]).forEach(r=>{const e=P(r.deg,R+14);s+='<line class="ray hl" x1="'+cx+'" y1="'+cy+'" x2="'+e[0]+'" y2="'+e[1]+'"/>';const t=P(r.deg,R+28);s+='<text class="pl" x="'+t[0]+'" y="'+(t[1]+5)+'" text-anchor="middle">'+E(r.label)+(f.noScale?'':' <tspan class="rd">'+r.deg+'°</tspan>')+'</text>';});
  if(f.noScale&&f.rays&&f.rays[0]){const d=f.rays[0].deg;const a=P(0,34),b=P(d,34);s+='<path class="arc" d="M'+a[0]+' '+a[1]+' A34 34 0 0 1 '+b[0]+' '+b[1]+'"/>';const t=P(d/2,54);s+='<text class="rd" x="'+t[0]+'" y="'+(t[1]+4)+'" text-anchor="middle">'+d+'°</text>'}
  return s+'</svg>'},
cells(f){const n=f.row.length,cw=76,W=n*cw+2,H=50;let s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Row of numbers">';
  f.row.forEach((v,i)=>{s+='<rect class="cell" x="'+(1+i*cw)+'" y="4" width="'+cw+'" height="40"/><text class="cv" x="'+(1+i*cw+cw/2)+'" y="30" text-anchor="middle">'+v+'</text>'});return s+'</svg>'},
tally(f){const n=f.n,g=Math.floor(n/5),r=n%5;const W=g*62+r*12+30,H=60;let s='<svg viewBox="0 0 '+Math.max(W,120)+' '+H+'" role="img" aria-label="Tally marks">';let x=10;
  for(let i=0;i<g;i++){for(let j=0;j<4;j++)s+='<line class="tl" x1="'+(x+j*11)+'" y1="10" x2="'+(x+j*11)+'" y2="50"/>';s+='<line class="tl" x1="'+(x-6)+'" y1="44" x2="'+(x+40)+'" y2="16"/>';x+=62}
  for(let j=0;j<r;j++)s+='<line class="tl" x1="'+(x+j*12)+'" y1="10" x2="'+(x+j*12)+'" y2="50"/>';return s+'</svg>'},
picto(f){const rows=f.rows,cw=26,lw=120,maxn=Math.max(...rows.map(r=>Math.ceil(r[1])));const W=lw+maxn*cw+20,H=rows.length*34+36;
  let s='<svg viewBox="0 0 '+Math.max(W,300)+' '+H+'" role="img" aria-label="Pictograph">';
  rows.forEach((r,i)=>{const y=14+i*34;s+='<text x="6" y="'+(y+15)+'">'+E(r[0])+'</text>';for(let k=0;k<Math.ceil(r[1]);k++){const half=r[1]-k<1;const x=lw+k*cw;
    s+=half?'<path class="ic" d="M'+(x+11)+' '+y+' A11 11 0 0 0 '+(x+11)+' '+(y+22)+' Z"/>':'<circle class="ic" cx="'+(x+11)+'" cy="'+(y+11)+'" r="11"/>'}});
  s+='<circle class="ic" cx="'+(lw+11)+'" cy="'+(H-14)+'" r="8"/><text x="'+(lw+26)+'" y="'+(H-9)+'">= '+f.key+' '+E(f.unit||"")+'</text>';return s+'</svg>'},
bars(f){const W=460,H=260,L=46,R=12,T=f.title?30:12,B=40;const vals=f.bars.map(b=>b[1]);const step=f.step||1;const top=Math.max(step,Math.ceil(Math.max(...vals)*1.1/step)*step);
  const n=f.bars.length,bw=(W-L-R)/n;const Y=v=>T+(H-T-B)*(1-v/top);
  let s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Bar graph">'+(f.title?'<text x="'+(W/2)+'" y="16" text-anchor="middle" class="ttl">'+E(f.title)+(f.scaleNote!==false?' (1 unit = '+step+')':'')+'</text>':'');
  for(let v=0;v<=top;v+=step)s+='<line class="gl" x1="'+L+'" x2="'+(W-R)+'" y1="'+Y(v)+'" y2="'+Y(v)+'"/><text x="'+(L-6)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+v+'</text>';
  f.bars.forEach((b,i)=>{const x=L+i*bw+bw*0.2,w=bw*0.6;s+='<rect class="br" x="'+x+'" y="'+Y(b[1])+'" width="'+w+'" height="'+(Y(0)-Y(b[1]))+'" rx="3"/><text x="'+(x+w/2)+'" y="'+(H-B+16)+'" text-anchor="middle">'+E(b[0])+'</text>'});
  s+='<line class="ax" x1="'+L+'" y1="'+Y(0)+'" x2="'+(W-R)+'" y2="'+Y(0)+'"/><line class="ax" x1="'+L+'" y1="'+T+'" x2="'+L+'" y2="'+Y(0)+'"/>';
  s+='<text x="'+((L+W-R)/2)+'" y="'+(H-4)+'" text-anchor="middle">'+E(f.x||"")+'</text><text transform="translate(12,'+((T+H-B)/2)+') rotate(-90)" text-anchor="middle">'+E(f.y||"")+'</text>';
  return s+'</svg>'}
};
window.GEN=GEN;window.FIG=FIG;
})();
