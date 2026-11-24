(function () {
  var canvas = document.getElementById('hero-globe');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var points = [], connections = [], rotation = .48, last = 0;
  function point() { return { lat: Math.asin(Math.random() * 2 - 1), lon: Math.random() * Math.PI * 2, size: Math.random() * 1.35 + .45 }; }
  for (var i = 0; i < 310; i++) points.push(point());
  for (var j = 0; j < 44; j++) connections.push([points[Math.floor(Math.random() * points.length)], points[Math.floor(Math.random() * points.length)], Math.random() < .28]);
  function project(p, r, cx, cy) { var lon = p.lon + rotation; return { x: cx + r * Math.cos(p.lat) * Math.sin(lon), y: cy - r * Math.sin(p.lat), z: Math.cos(p.lat) * Math.cos(lon) }; }
  function resize() { var b = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); canvas.width = b.width * d; canvas.height = b.height * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  function networkLink(a, b, r, cx, cy, yellow, seed) {
    var start = project(a, r, cx, cy), end = project(b, r, cx, cy);
    if (start.z < -.08 || end.z < -.08) return;
    var midX = (start.x + end.x) / 2, midY = (start.y + end.y) / 2 - r * .17;
    ctx.beginPath(); ctx.moveTo(start.x, start.y); ctx.quadraticCurveTo(midX, midY, end.x, end.y);
    ctx.strokeStyle = yellow ? 'rgba(255, 207, 57, .5)' : 'rgba(43, 205, 255, .34)'; ctx.lineWidth = yellow ? 1.05 : .72; ctx.shadowBlur = yellow ? 8 : 3; ctx.shadowColor = yellow ? '#ffc92f' : '#04bfff'; ctx.stroke(); ctx.shadowBlur = 0;
  }
  function render(time) {
    var b = canvas.getBoundingClientRect(), w = b.width, h = b.height, cx = w * .52, cy = h * .5, r = Math.min(w, h) * .375;
    ctx.clearRect(0, 0, w, h);
    var halo = ctx.createRadialGradient(cx, cy, r * .25, cx, cy, r * 1.42); halo.addColorStop(0, 'rgba(0,132,255,.22)'); halo.addColorStop(.68, 'rgba(0,121,255,.08)'); halo.addColorStop(1, 'rgba(0,121,255,0)'); ctx.fillStyle = halo; ctx.fillRect(0, 0, w, h);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); var fill = ctx.createRadialGradient(cx - r * .32, cy - r * .39, r * .03, cx, cy, r); fill.addColorStop(0, '#b9f5ff'); fill.addColorStop(.12, '#1dd4ff'); fill.addColorStop(.47, '#086ec5'); fill.addColorStop(.78, '#03295e'); fill.addColorStop(1, '#010d28'); ctx.fillStyle = fill; ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
    ctx.strokeStyle = 'rgba(135,239,255,.23)'; ctx.lineWidth = .65;
    for (var latitude = -3; latitude <= 3; latitude++) { var ly = cy + latitude * r * .25; ctx.beginPath(); ctx.ellipse(cx, ly, r * Math.sqrt(Math.max(0, 1 - Math.pow((ly-cy)/r,2))), r * .105, 0, 0, Math.PI * 2); ctx.stroke(); }
    for (var longitude = -3; longitude <= 3; longitude++) { var horizontal = Math.abs(longitude) * r * .235; ctx.beginPath(); ctx.ellipse(cx, cy, Math.max(2, r - horizontal), r, 0, 0, Math.PI * 2); ctx.stroke(); }
    ctx.restore();
    connections.forEach(function (c, index) { networkLink(c[0], c[1], r, cx, cy, c[2], time / 1000 + index); });
    points.forEach(function (p, index) { var q = project(p, r, cx, cy); if (q.z < 0) return; var spark = q.z > .55 && index % 7 === 0; ctx.beginPath(); ctx.arc(q.x, q.y, p.size * (q.z * .55 + .6), 0, Math.PI * 2); ctx.fillStyle = spark ? '#fff1a4' : q.z > .6 ? '#8de9ff' : 'rgba(38,167,255,.7)'; ctx.shadowBlur = spark ? 11 : 3; ctx.shadowColor = spark ? '#ffca35' : '#00c5ff'; ctx.fill(); ctx.shadowBlur = 0; });
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(102,220,255,.75)'; ctx.lineWidth = 1.2; ctx.stroke();
    if (!reduceMotion) rotation += Math.min((time - last) / 1000, .05) * .18; last = time; requestAnimationFrame(render);
  }
  resize(); addEventListener('resize', resize); requestAnimationFrame(render);
}());