
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
 
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
 
function initParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.4 + 0.1,
      c: ['#00ff88','#00d4ff','#ff0080'][Math.floor(Math.random() * 3)]
    });
  }
}
 
function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.globalAlpha = p.a;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
 
  particles.forEach((p, i) => {
    particles.slice(i + 1).forEach(q => {
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = p.c;
        ctx.globalAlpha = (1 - dist / 120) * 0.08;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
 
resize(); initParticles(); drawParticles();
window.addEventListener('resize', () => { resize(); initParticles(); });
 
const tickerData = [
  { sym: 'BTC', price: '$67,420.00', change: '+2.4%', up: true },
  { sym: 'ETH', price: '$3,521.80', change: '+1.8%', up: true },
  { sym: 'SOL', price: '$182.45', change: '+6.2%', up: true },
  { sym: 'BNB', price: '$412.30', change: '-0.9%', up: false },
  { sym: 'XRP', price: '$0.6234', change: '+3.1%', up: true },
  { sym: 'ADA', price: '$0.4812', change: '-1.4%', up: false },
  { sym: 'DOGE', price: '$0.1834', change: '+8.7%', up: true },
  { sym: 'MATIC', price: '$0.9201', change: '-2.1%', up: false },
  { sym: 'DOT', price: '$8.44', change: '+0.5%', up: true },
  { sym: 'AVAX', price: '$41.20', change: '+4.3%', up: true },
];
 
function buildTicker() {
  const track = document.getElementById('ticker');
  const doubled = [...tickerData, ...tickerData];
  track.innerHTML = doubled.map(t => `
    <div class="ticker-item">
      <span class="ticker-symbol">${t.sym}</span>
      <span class="ticker-price">${t.price}</span>
      <span class="ticker-change ${t.up ? 'up' : 'down'}">${t.change}</span>
    </div>
  `).join('');
}
buildTicker();
 
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'dashboard') initDashboard();
}
 
const coins = [
  { rank:1,  name:'Bitcoin',   sym:'BTC', icon:'₿', color:'#f7931a', bg:'rgba(247,147,26,0.12)', price:'$67,420.00', change:'+2.4%',  cap:'$1.32T', vol:'$28.4B', up:true,  tag:'none'    },
  { rank:2,  name:'Ethereum',  sym:'ETH', icon:'Ξ', color:'#627eea', bg:'rgba(98,126,234,0.12)', price:'$3,521.80',  change:'+1.8%',  cap:'$423.1B',vol:'$14.2B', up:true,  tag:'none'    },
  { rank:3,  name:'Solana',    sym:'SOL', icon:'◎', color:'#9945ff', bg:'rgba(153,69,255,0.12)', price:'$182.45',    change:'+6.2%',  cap:'$82.4B', vol:'$4.1B',  up:true,  tag:'gainers' },
  { rank:4,  name:'BNB',       sym:'BNB', icon:'B', color:'#f3ba2f', bg:'rgba(243,186,47,0.12)', price:'$412.30',    change:'-0.9%',  cap:'$61.3B', vol:'$1.8B',  up:false, tag:'losers'  },
  { rank:5,  name:'XRP',       sym:'XRP', icon:'✕', color:'#00aae4', bg:'rgba(0,170,228,0.12)',  price:'$0.6234',    change:'+3.1%',  cap:'$34.2B', vol:'$1.2B',  up:true,  tag:'gainers' },
  { rank:6,  name:'Cardano',   sym:'ADA', icon:'♦', color:'#0033ad', bg:'rgba(0,51,173,0.12)',   price:'$0.4812',    change:'-1.4%',  cap:'$17.1B', vol:'$0.6B',  up:false, tag:'losers'  },
  { rank:7,  name:'Dogecoin',  sym:'DOGE',icon:'Ð', color:'#c2a633', bg:'rgba(194,166,51,0.12)', price:'$0.1834',    change:'+8.7%',  cap:'$26.4B', vol:'$2.8B',  up:true,  tag:'gainers' },
  { rank:8,  name:'Avalanche', sym:'AVAX',icon:'A', color:'#e84142', bg:'rgba(232,65,66,0.12)',  price:'$41.20',     change:'+4.3%',  cap:'$17.2B', vol:'$0.9B',  up:true,  tag:'gainers' },
  { rank:9,  name:'Polkadot',  sym:'DOT', icon:'●', color:'#e6007a', bg:'rgba(230,0,122,0.12)',  price:'$8.44',      change:'+0.5%',  cap:'$11.6B', vol:'$0.4B',  up:true,  tag:'none'    },
  { rank:10, name:'Polygon',   sym:'MATIC',icon:'▲',color:'#8247e5', bg:'rgba(130,71,229,0.12)', price:'$0.9201',    change:'-2.1%',  cap:'$9.1B',  vol:'$0.5B',  up:false, tag:'losers'  },
  { rank:11, name:'Chainlink', sym:'LINK',icon:'⬡', color:'#2a5ada', bg:'rgba(42,90,218,0.12)',  price:'$18.72',     change:'+5.9%',  cap:'$11.0B', vol:'$0.7B',  up:true,  tag:'new'     },
  { rank:12, name:'Uniswap',   sym:'UNI', icon:'🦄',color:'#ff007a', bg:'rgba(255,0,122,0.12)',  price:'$9.84',      change:'-3.2%',  cap:'$5.9B',  vol:'$0.3B',  up:false, tag:'new'     },
];
 
let marketFilter = 'all';
 
function filterMarket(f, btn) {
  marketFilter = f;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderMarkets();
}
 
function renderMarkets() {
  const q = document.getElementById('coin-search').value.toLowerCase().trim();
  let list = coins.filter(c => {
    const matchFilter = marketFilter === 'all' || c.tag === marketFilter;
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.sym.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });
 
  document.getElementById('market-rows').innerHTML = list.map(c => `
    <div class="table-row">
      <div class="row-rank">${c.rank}</div>
      <div class="row-coin">
        <div class="coin-icon" style="background:${c.bg};color:${c.color}">${c.icon}</div>
        <div>
          <div class="coin-name">${c.name}</div>
          <div class="coin-sym">${c.sym}</div>
        </div>
      </div>
      <div class="row-price">${c.price}</div>
      <div style="text-align:right"><span class="row-change ${c.up?'up':'down'}">${c.change}</span></div>
      <div class="row-cap">${c.cap}</div>
      <div class="row-vol">${c.vol}</div>
      <div class="row-action"><button class="trade-btn">Trade</button></div>
    </div>
  `).join('');
}
 
renderMarkets();
 
let portfolioChart = null;
 
function initDashboard() {
  const ctx2 = document.getElementById('portfolio-chart').getContext('2d');
  if (portfolioChart) portfolioChart.destroy();
 
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data = [42000, 48000, 44000, 52000, 58000, 63000, 59000, 68000, 72000, 69000, 78000, 84291];
 
  portfolioChart = new Chart(ctx2, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: '#00ff88',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        backgroundColor: function(ctx) {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 180);
          g.addColorStop(0, 'rgba(0,255,136,0.2)');
          g.addColorStop(1, 'rgba(0,255,136,0)');
          return g;
        },
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: '#111',
        borderColor: '#00ff88',
        borderWidth: 1,
        titleColor: '#888',
        bodyColor: '#00ff88',
        titleFont: { family: 'JetBrains Mono', size: 10 },
        bodyFont: { family: 'JetBrains Mono', size: 12 },
        callbacks: { label: ctx => ' $' + ctx.parsed.y.toLocaleString() }
      }},
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#444', font: { family: 'JetBrains Mono', size: 10 } } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#444', font: { family: 'JetBrains Mono', size: 10 }, callback: v => '$' + (v/1000).toFixed(0) + 'K' } }
      }
    }
  });
 
  const assets = [
    { name:'Bitcoin',  sym:'BTC', icon:'₿', color:'#f7931a', bg:'rgba(247,147,26,0.15)', value:'$42,180', amount:'0.6254 BTC', pct:'+2.4%', up:true,  bar:'#f7931a', barW:50 },
    { name:'Ethereum', sym:'ETH', icon:'Ξ', color:'#627eea', bg:'rgba(98,126,234,0.15)',  value:'$21,130', amount:'6.0 ETH',    pct:'+1.8%', up:true,  bar:'#627eea', barW:25 },
    { name:'Solana',   sym:'SOL', icon:'◎', color:'#9945ff', bg:'rgba(153,69,255,0.15)',  value:'$12,772', amount:'70 SOL',     pct:'+6.2%', up:true,  bar:'#9945ff', barW:15 },
    { name:'Cash',     sym:'USD', icon:'$', color:'#00ff88', bg:'rgba(0,255,136,0.10)',   value:'$8,209',  amount:'Stablecoin', pct:'0.00%', up:true,  bar:'#00ff88', barW:10 },
  ];
 
  document.getElementById('asset-list').innerHTML = assets.map(a => `
    <div class="asset-item">
      <div class="asset-icon" style="background:${a.bg};color:${a.color}">${a.icon}</div>
      <div class="asset-info">
        <div class="asset-name">${a.name}</div>
        <div class="asset-amount">${a.amount}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${a.barW}%;background:${a.bar}"></div></div>
      </div>
      <div class="asset-right">
        <div class="asset-value">${a.value}</div>
        <div class="asset-pct ${a.up?'up':'down'}">${a.pct}</div>
      </div>
    </div>
  `).join('');
 
  const txns = [
    { type:'Bought BTC', date:'Today, 14:32', amount:'+0.0124 BTC', usd:'+$836.41', side:'buy' },
    { type:'Sold ETH',   date:'Today, 09:11', amount:'-1.5 ETH',   usd:'-$5,282.70', side:'sell' },
    { type:'Bought SOL', date:'Yesterday',    amount:'+10 SOL',    usd:'+$1,824.50', side:'buy' },
    { type:'Bought BNB', date:'Dec 18',       amount:'+2 BNB',     usd:'+$824.60',   side:'buy' },
    { type:'Sold ADA',   date:'Dec 15',       amount:'-500 ADA',   usd:'-$240.60',   side:'sell' },
  ];
 
  document.getElementById('txn-list').innerHTML = txns.map(t => `
    <div class="txn-item">
      <div class="txn-icon ${t.side}">${t.side === 'buy' ? '↓' : '↑'}</div>
      <div class="txn-info">
        <div class="txn-type">${t.type}</div>
        <div class="txn-date">${t.date}</div>
      </div>
      <div>
        <div class="txn-amount ${t.side}">${t.amount}</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:var(--text-muted);text-align:right">${t.usd}</div>
      </div>
    </div>
  `).join('');
}
 
function setTradeTab(type, btn) {
  document.querySelectorAll('.trade-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const tradeBtn = document.getElementById('trade-btn');
  if (type === 'buy') {
    tradeBtn.style.background = 'var(--green)';
    tradeBtn.style.boxShadow = 'var(--green-glow)';
    tradeBtn.textContent = 'BUY NOW';
  } else {
    tradeBtn.style.background = 'var(--pink)';
    tradeBtn.style.boxShadow = 'var(--pink-glow)';
    tradeBtn.textContent = 'SELL NOW';
  }
}
 
function setPct(p) {
  document.getElementById('trade-amount').value = (84291.50 * p / 100).toFixed(2);
}
 
function executeTrade() {
  const amt = document.getElementById('trade-amount').value;
  if (!amt) { alert('Enter an amount first.'); return; }
  alert('✅ Order placed for $' + parseFloat(amt).toLocaleString());
}
 
window.addEventListener('scroll', () => {});