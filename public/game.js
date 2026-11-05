// Falling-block hero + coin slot (ported from the design canvas)
(() => {
  const C = { b1:'#3ee6d2', b2:'#ffe14a', b3:'#ff4f8b', b4:'#7ad33a', b5:'#ffa21f', b6:'#6b7cff', link:'#ffc46b', accent:'#ffa21f', muted:'#aaa4b6', glow:'rgba(255,162,31,0.45)' };
  const cols = [C.b1, C.b2, C.b3, C.b4, C.b5, C.b6, C.link];
  const W = 10, H = 14, KEYS = ['I','O','T','S','Z','J','L'];
  const bevel = 'box-shadow: inset -4px -4px 0 rgba(0,0,0,0.35), inset 4px 4px 0 rgba(255,255,255,0.35)';
  const base = { I:[[0,0],[1,0],[2,0],[3,0]], O:[[0,0],[1,0],[0,1],[1,1]], T:[[1,0],[0,1],[1,1],[2,1]], S:[[1,0],[2,0],[0,1],[1,1]], Z:[[0,0],[1,0],[1,1],[2,1]], J:[[0,0],[0,1],[1,1],[2,1]], L:[[2,0],[0,1],[1,1],[2,1]] };
  const norm = cs => { const mx = Math.min(...cs.map(p=>p[0])), my = Math.min(...cs.map(p=>p[1])); return cs.map(p=>[p[0]-mx,p[1]-my]).sort((a,b)=>a[1]-b[1]||a[0]-b[0]); };
  const ROTS = {};
  KEYS.forEach(k => { const out=[]; let cur=norm(base[k]); for (let i=0;i<4;i++){ const s=JSON.stringify(cur); if(!out.some(o=>JSON.stringify(o)===s)) out.push(cur); cur=norm(cur.map(p=>[-p[1],p[0]])); } ROTS[k]=out; });
  const randKey = () => KEYS[Math.floor(Math.random()*KEYS.length)];
  const emptyBoard = seed => { const b=[]; for(let y=0;y<H;y++) b.push(new Array(W).fill(-1)); if(seed){ for(let y=H-4;y<H;y++){ const gap=Math.floor(Math.random()*W); for(let x=0;x<W;x++) if(x!==gap&&Math.random()>0.12) b[y][x]=Math.floor(Math.random()*7); } } return b; };
  const fits = (b,cells,x,y) => cells.every(([cx,cy]) => { const X=x+cx,Y=y+cy; if(X<0||X>=W||Y>=H) return false; return !(Y>=0&&b[Y][X]>=0); });
  function plan(b,key){ let best=null; ROTS[key].forEach(cells=>{ const w=Math.max(...cells.map(p=>p[0]))+1; for(let x=0;x<=W-w;x++){ let y=-3; if(!fits(b,cells,x,y)) continue; while(fits(b,cells,x,y+1)) y++; const t=b.map(r=>r.slice()); let over=false; cells.forEach(([cx,cy])=>{ if(y+cy<0) over=true; else t[y+cy][x+cx]=0; }); const kept=t.filter(r=>r.some(v=>v<0)); const lines=H-kept.length; const h=[]; let holes=0; for(let cx=0;cx<W;cx++){ let top=kept.length; for(let cy=0;cy<kept.length;cy++){ if(kept[cy][cx]>=0){top=cy;break;} } h.push(kept.length-top); for(let cy=top+1;cy<kept.length;cy++) if(kept[cy][cx]<0) holes++; } let bump=0; for(let i=0;i<W-1;i++) bump+=Math.abs(h[i]-h[i+1]); const agg=h.reduce((s,v)=>s+v,0); const score=-0.51*agg+0.76*lines-0.36*holes-0.18*bump-(over?100:0)+Math.random()*0.05; if(!best||score>best.score) best={score,cells,x}; } }); return best; }
  const g = { board: emptyBoard(true), piece: null, next: randKey(), lines: 0, clear: null };
  const reset = () => { g.board=emptyBoard(true); g.piece=null; g.clear=null; g.lines=0; };
  function spawn(){ const key=g.next; g.next=randKey(); const best=plan(g.board,key); if(!best){reset();return;} const w=Math.max(...best.cells.map(p=>p[0]))+1; const sx=Math.floor((W-w)/2); if(!fits(g.board,best.cells,sx,-2)){reset();return;} g.piece={cells:best.cells,x:sx,tx:best.x,y:-2,color:KEYS.indexOf(key)}; }
  spawn(); if (g.piece) g.piece.y = 3;
  const boardEl = document.getElementById('board'), nextEl = document.getElementById('next'), linesEl = document.getElementById('lines');
  const cells = [], ncells = [];
  for (let i=0;i<W*H;i++){ const d=document.createElement('div'); boardEl.appendChild(d); cells.push(d); }
  for (let i=0;i<8;i++){ const d=document.createElement('div'); nextEl.appendChild(d); ncells.push(d); }
  function render(){
    const view=g.board.map(r=>r.slice());
    if(g.piece) g.piece.cells.forEach(([x,y])=>{ const X=g.piece.x+x,Y=g.piece.y+y; if(Y>=0&&Y<H&&X>=0&&X<W) view[Y][X]=g.piece.color; });
    const flash = g.clear && g.clear.t%2===0 ? g.clear.rows : [];
    for(let y=0;y<H;y++) for(let x=0;x<W;x++){ const v=view[y][x]; let s='background: rgba(255,255,255,0.035)'; if(flash.includes(y)) s='background: #ffffff; box-shadow: 0 0 10px #ffffff'; else if(v>=0) s='background: '+cols[v]+'; '+bevel; cells[y*W+x].style.cssText=s; }
    const shape=ROTS[g.next][0], nk=KEYS.indexOf(g.next);
    for(let y=0;y<2;y++) for(let x=0;x<4;x++){ const on=shape.some(([a,b])=>a===x&&b===y); ncells[y*4+x].style.cssText= on ? 'background: '+cols[nk]+'; box-shadow: inset -3px -3px 0 rgba(0,0,0,0.35), inset 3px 3px 0 rgba(255,255,255,0.35)' : 'background: transparent'; }
    linesEl.textContent=String(g.lines).padStart(3,'0');
  }
  function step(){
    if(g.clear){ g.clear.t--; if(g.clear.t<=0){ const rows=g.clear.rows; g.board=g.board.filter((r,i)=>!rows.includes(i)); while(g.board.length<H) g.board.unshift(new Array(W).fill(-1)); g.lines+=rows.length; g.clear=null; } return render(); }
    if(!g.piece){ spawn(); return render(); }
    const p=g.piece;
    for(let i=0;i<2&&p.x!==p.tx;i++){ const nx=p.x+(p.tx>p.x?1:-1); if(fits(g.board,p.cells,nx,p.y)) p.x=nx; else break; }
    if(fits(g.board,p.cells,p.x,p.y+1)) p.y++;
    else { if(p.cells.some(([,y])=>p.y+y<0)){ reset(); return render(); } p.cells.forEach(([x,y])=>{ g.board[p.y+y][p.x+x]=p.color; }); g.piece=null; const full=[]; g.board.forEach((r,i)=>{ if(r.every(v=>v>=0)) full.push(i); }); if(full.length) g.clear={rows:full,t:5}; }
    render();
  }
  render();
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = reduce ? null : setInterval(step, 110);
  document.addEventListener('visibilitychange', () => { if (reduce) return; clearInterval(timer); timer = document.hidden ? null : setInterval(step, 110); });

  // Coin slot
  const slot=document.getElementById('slot'), fly=document.getElementById('coinfly'), zone=document.getElementById('coinzone');
  const bar=document.getElementById('slotbar'), stext=document.getElementById('slottext'), status=document.getElementById('status');
  const lockedEl=document.getElementById('locked'), unlockedEl=document.getElementById('unlocked');
  let phase='locked';
  slot.addEventListener('click', e => {
    if(phase!=='locked') return;
    let fx=0, fy=-40;
    if(e.detail!==0){ const r=slot.getBoundingClientRect(); fx=Math.round(e.clientX-r.left-2-16-18); fy=Math.round(e.clientY-r.top-2-16-26); }
    phase='inserting';
    fly.style.setProperty('--sx',fx+'px'); fly.style.setProperty('--sy',fy+'px'); fly.hidden=false; fly.classList.add('coin-fly');
    zone.classList.remove('coin-zone'); bar.classList.remove('slot-blink');
    status.textContent='Coin accepted…'; status.style.color=C.accent;
    setTimeout(() => {
      phase='unlocked'; fly.hidden=true;
      bar.style.boxShadow='0 0 22px '+C.accent; stext.textContent='OK';
      slot.setAttribute('aria-label','Coin inserted, links unlocked');
      status.textContent='Credit 01 · Links unlocked';
      lockedEl.style.display='none'; unlockedEl.style.display='contents';
      const first=unlockedEl.querySelector('a'); if(first) first.focus({preventScroll:true});
    }, 750);
  });
})();
