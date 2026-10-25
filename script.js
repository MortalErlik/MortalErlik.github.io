// The privacy policy used to open as a dialog at /#privacy; old links still land on it.
if (location.hash === '#privacy') location.replace('privacy.html');

const header = document.querySelector('.top');
const light = document.querySelector('.light');
const onScroll = () => {
  if (!header) return;
  header.classList.toggle('scrolled', scrollY > 8);
  // The bar takes the colours of the section under it.
  if (light) {
    const r = light.getBoundingClientRect(), h = header.offsetHeight / 2;
    header.classList.toggle('on-light', r.top <= h && r.bottom >= h);
  }
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const toast = document.getElementById('toast');
let toastTimer;
const show = (text) => {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
};

document.querySelectorAll('[data-copy-email]').forEach((button) => {
  button.addEventListener('click', async () => {
    const email = 'coralstudiosdev@yandex.com';
    try {
      await navigator.clipboard.writeText(email);
      show('Email address copied');
    } catch {
      location.href = 'mailto:' + email;
    }
  });
});

// Scroll-driven parts of the home page. Without motion (or without this
// script) every step simply shows its final state.
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');

// Fade sections up the first time they are seen.
const seen = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); seen.unobserve(e.target); }
}, { rootMargin: '0px 0px -12% 0px' });
document.querySelectorAll('.reveal').forEach((el) => (still ? el.classList.add('in') : seen.observe(el)));

// With scroll timelines the CSS drives these itself (see style.css).
const progressed = CSS.supports('animation-timeline: view()') ? [] : [...document.querySelectorAll('[data-progress]')];
const wall = document.querySelector('.lang-wall');
const words = wall ? [...wall.children] : [];
const stage = document.querySelector('.stage');
const steps = stage ? [...stage.querySelectorAll('.step')] : [];
const shots = stage ? [...stage.querySelectorAll('.frame img')] : [];
const dots = stage ? [...stage.querySelectorAll('.dots li')] : [];
const frame = stage && stage.querySelector('.frame');
let current = -1;

// 0 when the element's top enters the bottom of the viewport, 1 when its
// centre reaches the middle of it.
const through = (el) => {
  const r = el.getBoundingClientRect();
  return Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight / 2 + r.height / 2)));
};

const sizeFrame = (portrait) => {
  const box = frame.parentElement.getBoundingClientRect();
  const maxH = innerHeight * (innerWidth < 900 ? 0.5 : 0.72);
  let w, h;
  if (portrait) { h = maxH; w = h * 1200 / 1848; }
  else { w = Math.min(box.width, maxH * 2000 / 1052); h = w * 1052 / 2000; }
  frame.style.setProperty('--fw', w + 'px');
  frame.style.setProperty('--fh', h + 'px');
};

const showStep = (i) => {
  if (i === current) return;
  const turning = (i === 3) !== (current === 3);
  current = i;
  steps.forEach((s, k) => s.classList.toggle('on', k === i));
  shots.forEach((s, k) => s.classList.toggle('on', k === i));
  dots.forEach((d, k) => d.classList.toggle('on', k === i));
  if (turning || frame.dataset.sized !== '1') {
    frame.classList.toggle('portrait', i === 3);
    sizeFrame(i === 3);
    frame.dataset.sized = '1';
  }
};

const tick = () => {
  for (const el of progressed) el.style.setProperty('--p', still ? 1 : through(el).toFixed(3));
  if (wall) {
    const r = wall.getBoundingClientRect();
    const p = still ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.25)));
    words.forEach((w, k) => w.classList.toggle('lit', p * words.length > k));
  }
  if (stage) {
    const r = stage.getBoundingClientRect();
    const p = Math.min(0.999, Math.max(0, -r.top / (r.height - innerHeight)));
    showStep(Math.floor(p * steps.length));
  }
};

let queued = false;
const onFrame = () => { queued = false; tick(); };
addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(onFrame); } }, { passive: true });
addEventListener('resize', () => { if (frame) sizeFrame(current === 3); tick(); });
tick();

// Mouse wheels step 100 px at a time; on the home page each step glides
// instead (touchpads, touch screens and keyboards keep the browser's own
// scrolling). Off when the reader asks for less motion.
if (document.body.classList.contains('home') && !still && matchMedia('(pointer: fine)').matches) {
  let target = scrollY, at = scrollY, gliding = false;
  const glide = () => {
    at += (target - at) * 0.14;
    if (Math.abs(target - at) < 0.5) at = target;
    scrollTo(0, at);
    gliding = at !== target;
    if (gliding) requestAnimationFrame(glide);
  };
  addEventListener('wheel', (e) => {
    // Pinch zoom, sideways scrolling and touchpads (small, fractional steps) stay native.
    if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    const lines = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1;
    const dy = e.deltaY * lines;
    if (e.deltaMode === 0 && Math.abs(dy) < 50 && !Number.isInteger(dy)) return;
    e.preventDefault();
    if (!gliding) at = target = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    target = Math.max(0, Math.min(max, target + dy));
    if (!gliding) { gliding = true; requestAnimationFrame(glide); }
  }, { passive: false });
  // Keyboard, scrollbar and links move the page directly; follow them.
  addEventListener('scroll', () => { if (!gliding) at = target = scrollY; }, { passive: true });
}
