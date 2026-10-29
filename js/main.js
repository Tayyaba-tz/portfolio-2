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
        document.dispatchEvent(new CustomEvent('stagechange', { detail: id }));
    };

    triggers.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            show(el.dataset.target);
        });
    });

    /* Re-run the current view's animation when the game starts */
    document.addEventListener('gamestart', () => {
        const cur = views.find((v) => v.classList.contains('active'));
        if (cur && hooks[cur.id]) hooks[cur.id]();
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

/* ================================================================
   Game layer: start screen, XP, toasts, sound, controls, effects
   ================================================================ */
(() => {
    'use strict';
    const $ = (s) => document.querySelector(s);
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const order = ['home', 'about', 'skills', 'projects', 'contact'];
    const names = ['Start', 'Player Profile', 'Skill Tree', 'Level Select', 'Contact'];
    const stages = ['Stage 1: Start', 'Stage 2: Player Profile', 'Stage 3: Skill Tree', 'Stage 4: Level Select', 'Final Stage: Contact'];
    let started = false;
    let sfxOn = false;
    const visited = new Set(['home']);

    /* Stage tags and stagger order for pop-in animations */
    order.forEach((id, i) => {
        const tag = document.createElement('span');
        tag.className = 'stage-tag';
        tag.textContent = '\u2605 ' + stages[i];
        document.getElementById(id).prepend(tag);
    });
    document.querySelectorAll('.project-grid, .skills-grid, .contact-cards, .stats, .checklist')
        .forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty('--i', i)));

    /* Floating coins, stars and squares */
    const floaters = document.createElement('div');
    floaters.className = 'floaters';
    floaters.setAttribute('aria-hidden', 'true');
    ['coin', 'star', 'sq', 'coin', 'star', 'coin', 'sq', 'star'].forEach((t) => {
        const s = document.createElement('span');
        s.className = t;
        floaters.append(s);
    });
    document.body.insertBefore(floaters, $('main'));

    /* Mouse parallax */
    document.addEventListener('pointermove', (e) => {
        root.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(2));
        root.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(2));
    });

    /* Retro sound effects (Web Audio) */
    let ctx;
    const beep = (freq = 520, dur = 0.08) => {
        if (!sfxOn) return;
        try {
            ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = 'square';
            o.frequency.value = freq;
            g.gain.value = 0.04;
            o.connect(g);
            g.connect(ctx.destination);
            o.start();
            g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
            o.stop(ctx.currentTime + dur);
        } catch (err) { /* audio unavailable */ }
    };
    const jingle = () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 0.12), i * 110));
    const soundBtn = $('#sound');
    soundBtn.addEventListener('click', () => {
        sfxOn = !sfxOn;
        soundBtn.setAttribute('aria-pressed', String(sfxOn));
        beep(700);
    });

    /* Toast messages */
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    document.body.append(toast);
    let toastTimer;
    const say = (msg) => {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
    };

    /* XP and achievements */
    const xpFill = $('#xp-fill');
    const lvl = $('#lvl');
    const updateXp = () => {
        xpFill.style.width = (visited.size / order.length) * 100 + '%';
        lvl.textContent = visited.size === order.length ? 'MAX' : visited.size;
    };
    updateXp();

    /* Typewriter intro on Home (reserves space so the layout never jumps) */
    const lead = $('#home .lead');
    const full = lead.textContent.trim();
    let typeTimer;
    const typeLead = () => {
        clearInterval(typeTimer);
        const a = document.createElement('span');
        const b = document.createElement('span');
        b.className = 'ghost';
        lead.textContent = '';
        lead.append(a, b);
        if (reduce) { a.textContent = full; return; }
        b.textContent = full;
        let i = 0;
        setTimeout(() => {
            typeTimer = setInterval(() => {
                i += 2;
                a.textContent = full.slice(0, i);
                b.textContent = full.slice(i);
                if (i >= full.length) clearInterval(typeTimer);
            }, 16);
        }, 450);
    };

    document.addEventListener('stagechange', (e) => {
        const id = e.detail;
        if (id === 'home') typeLead();
        if (!started || visited.has(id)) return;
        visited.add(id);
        updateXp();
        if (visited.size === order.length) { say('Achievement unlocked: Completionist'); jingle(); }
        else { say('+20 XP: ' + names[order.indexOf(id)] + ' discovered'); beep(784); }
    });

    /* Start screen */
    const startEl = $('#start');
    const gated = [$('.navbar'), $('main')];
    gated.forEach((el) => { el.inert = true; });
    const begin = () => {
        if (started) return;
        started = true;
        startEl.classList.add('hide');
        gated.forEach((el) => { el.inert = false; });
        sfxOn = true;
        soundBtn.setAttribute('aria-pressed', 'true');
        jingle();
        typeLead();
        document.dispatchEvent(new CustomEvent('gamestart'));
    };
    $('#start-btn').addEventListener('click', begin);
    typeLead();

    /* Controls: arrow keys, 1 to 5, swipe */
    const go = (step) => {
        const cur = order.indexOf(document.querySelector('.view.active').id);
        const next = (cur + step + order.length) % order.length;
        document.querySelector('.nav-link[data-target="' + order[next] + '"]').click();
    };
    document.addEventListener('keydown', (e) => {
        if (!started) { if (e.key === 'Enter') begin(); return; }
        if (e.key === 'ArrowRight') go(1);
        else if (e.key === 'ArrowLeft') go(-1);
        else if (e.key >= '1' && e.key <= '5') {
            document.querySelector('.nav-link[data-target="' + order[Number(e.key) - 1] + '"]').click();
        }
    });
    let tx = 0;
    let ty = 0;
    document.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    document.addEventListener('touchend', (e) => {
        if (!started) return;
        const dx = e.changedTouches[0].clientX - tx;
        const dy = e.changedTouches[0].clientY - ty;
        if (Math.abs(dx) > 70 && Math.abs(dy) < 50) go(dx < 0 ? 1 : -1);
    }, { passive: true });

    /* Coin burst and click sound on interactive elements */
    document.addEventListener('click', (e) => {
        const el = e.target.closest('.btn, .nav-link, .contact-card, .filter-btn, .card');
        if (!el || reduce) return;
        let x = e.clientX;
        let y = e.clientY;
        if (!e.detail) { const r = el.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
        for (let i = 0; i < 10; i++) {
            const c = document.createElement('i');
            c.className = 'coin-p';
            c.style.left = x + 'px';
            c.style.top = y + 'px';
            document.body.append(c);
            const ang = (Math.PI * 2 * i) / 10;
            const dist = 40 + Math.random() * 40;
            c.animate(
                [{ transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: 'translate(' + Math.cos(ang) * dist + 'px,' + (Math.sin(ang) * dist - 20) + 'px) scale(0.3)', opacity: 0 }],
                { duration: 650, easing: 'cubic-bezier(.2,.8,.3,1)' }
            ).onfinish = () => c.remove();
        }
        beep(el.classList.contains('nav-link') ? 620 : 880, 0.06);
    });
})();