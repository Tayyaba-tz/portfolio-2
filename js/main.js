/* Portfolio behaviour: section switching, menu, counters, skill bars, project filter */
(() => {
    'use strict';

    const views = [...document.querySelectorAll('.view')];
    const triggers = [...document.querySelectorAll('[data-target]')];
    const navLinks = [...document.querySelectorAll('.nav-link')];
    const menu = document.getElementById('nav-links');
    const burger = document.getElementById('hamburger');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Hamburger menu ---------- */
    const setMenu = (open) => {
        menu.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenu(!menu.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });

    /* ---------- Stat counters (run on every Home activation) ---------- */
    const counters = [...document.querySelectorAll('.count')];
    let rafId;
    const runCounters = () => {
        cancelAnimationFrame(rafId);
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
            const t = reduceMotion ? 1 : Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            counters.forEach((el) => {
                el.textContent = Math.round(eased * Number(el.dataset.count)) + '+';
            });
            if (t < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
    };

    /* ---------- Skill bars (fill left to right on every Skills activation) ---------- */
    const fills = [...document.querySelectorAll('.fill')];
    fills.forEach((f) => f.style.setProperty('--w', f.dataset.level + '%'));
    const resetBars = () => fills.forEach((f) => f.classList.remove('filled'));
    const fillBars = () => {
        resetBars();
        setTimeout(() => fills.forEach((f) => f.classList.add('filled')), 250);
    };

    /* ---------- Section switching ---------- */
    const hooks = { home: runCounters, skills: fillBars };

    const show = (id, pushHash = true) => {
        const next = document.getElementById(id);
        if (!next) return;
        const current = views.find((v) => v.classList.contains('active'));
        if (current === next) { setMenu(false); return; }

        if (current) {
            current.classList.remove('active');
            if (current.id === 'skills') resetBars();
        }
        next.classList.add('active');
        navLinks.forEach((link) => {
            const on = link.dataset.target === id;
            link.classList.toggle('active', on);
            if (on) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
        });
        if (pushHash) history.replaceState(null, '', '#' + id);
        setMenu(false);
        if (hooks[id]) hooks[id]();
    };

    triggers.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            show(el.dataset.target);
        });
    });

    /* ---------- Project filter ---------- */
    const filterBtns = [...document.querySelectorAll('.filter-btn')];
    const cards = [...document.querySelectorAll('.card')];
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const f = btn.dataset.filter;
            filterBtns.forEach((b) => {
                const on = b === btn;
                b.classList.toggle('is-active', on);
                b.setAttribute('aria-pressed', String(on));
            });
            cards.forEach((c) => c.classList.toggle('hide', f !== 'all' && c.dataset.category !== f));
        });
    });

    /* ---------- Profile image fallback (shows initials if the photo is missing) ---------- */
    const img = document.getElementById('profile-img');
    const hideImg = () => img.classList.add('is-missing');
    img.addEventListener('error', hideImg);
    if (img.complete && img.naturalWidth === 0) hideImg();

    /* ---------- Initial view ---------- */
    const startId = location.hash.slice(1);
    const initial = views.some((v) => v.id === startId) ? startId : 'home';
    views.forEach((v) => v.classList.remove('active'));
    show(initial, false);
})();