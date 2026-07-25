(function () {
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          let cur = 0;
          const step = Math.max(1, Math.round(target / 30));
          const t = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(t); }
            el.textContent = cur;
          }, 35);
          cio.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(el => cio.observe(el));
  }

  function makeContours(container, seed, strokeColor) {
    if (!container) return;
    const w = 1200, h = 900;
    let rand = seed;
    function r() { rand = (rand * 9301 + 49297) % 233280; return rand / 233280; }
    let svg = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">`;
    const centers = [[200 + r() * 200, 300 + r() * 300], [900 + r() * 200, 200 + r() * 300], [600 + r() * 300, 700 + r() * 200]];
    centers.forEach((c, ci) => {
      for (let i = 1; i <= 7; i++) {
        const rad = i * 46 + ci * 10;
        const wob = 10 + r() * 14;
        let d = '';
        for (let a = 0; a <= 360; a += 18) {
          const rad2 = rad + Math.sin((a * Math.PI / 180) * 3 + ci + i) * wob;
          const x = c[0] + rad2 * Math.cos(a * Math.PI / 180);
          const y = c[1] + rad2 * 0.62 * Math.sin(a * Math.PI / 180);
          d += (a === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
        }
        d += 'Z';
        svg += `<path d="${d}" class="contour-line" style="stroke:${strokeColor};opacity:${0.5 - i * 0.055}"/>`;
      }
    });
    svg += '</svg>';
    container.innerHTML = svg;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      makeContours(document.getElementById('contourField'), 42, '#7C9B82');
      makeContours(document.getElementById('contourField2'), 17, '#47624F');
      makeContours(document.getElementById('contourField3'), 88, '#47624F');
    });
  } else {
    makeContours(document.getElementById('contourField'), 42, '#7C9B82');
    makeContours(document.getElementById('contourField2'), 17, '#47624F');
    makeContours(document.getElementById('contourField3'), 88, '#47624F');
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('formSuccess');
      leadForm.style.display = 'none';
      if (msg) msg.hidden = false;
    });
  }
})();
