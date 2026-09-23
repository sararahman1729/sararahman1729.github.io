/* Starfield */
(function () {
  const c = document.getElementById('starfield'), ctx = c.getContext('2d');
  let stars = [];
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function init() {
    c.width = innerWidth; c.height = innerHeight;
    stars = Array.from({ length: 200 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.2 + .2, s: Math.random() * .003 + .001, p: Math.random() * Math.PI * 2 }));
  }
  function draw(t) {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(s => {
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${(.3 + .5 * Math.sin(t * s.s + s.p)).toFixed(2)})`; ctx.fill();
    });
    if (!still) requestAnimationFrame(draw);
  }
  init(); requestAnimationFrame(draw);
  addEventListener('resize', () => { init(); if (still) requestAnimationFrame(draw); });
})();

/* Scroll reveal */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: .1 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('visible'));

/* Activity filter tabs */
document.querySelectorAll('.extra-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.extra-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const f = tab.dataset.f;
  document.querySelectorAll('.extra-item').forEach(it => {
    it.hidden = !(f === 'all' || it.dataset.cats.split(' ').includes(f));
    if (!it.hidden) it.classList.add('visible');
  });
}));
