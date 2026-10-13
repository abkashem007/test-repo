/* CartPickify — shared behaviour. Depends on assets/data.js. */
(function () {
  'use strict';
  var D = window.CP_DATA || { goals: [], products: [], posts: [], quiz: [] };
  var params = new URLSearchParams(location.search);

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function goalById(id) { return D.goals.filter(function (g) { return g.id === id; })[0]; }
  function productById(id) { return D.products.filter(function (p) { return p.id === id; })[0]; }
  function ranked(list) { return list.slice().sort(function (a, b) { return a.rank - b.rank; }); }
  function imgOr(p, text) { return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '">' : esc(text); }
  var ICON_ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  /* ---------- CTA colour (data.js, or ?cta=1D4ED8 for quick A/B previews) ---------- */
  var cta = params.get('cta');
  if (cta && /^[0-9a-f]{6}$/i.test(cta)) cta = '#' + cta; else cta = D.cta;
  if (cta) {
    document.documentElement.style.setProperty('--cta', cta);
    document.documentElement.style.setProperty('--cta-hover', 'color-mix(in srgb, ' + cta + ' 80%, #000)');
  }

  /* ---------- Mobile menu ---------- */
  $$('.menu-toggle').forEach(function (btn) {
    var header = btn.closest('.site-header');
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    $$('.site-header.open').forEach(function (h) {
      h.classList.remove('open');
      var b = $('.menu-toggle', h); if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); }
    });
  });

  /* ---------- Affiliate links ---------- */
  function wireAffiliates(root) {
    $$('a[data-aff]', root).forEach(function (a) {
      var p = productById(a.getAttribute('data-aff'));
      if (p && p.affiliateUrl) a.href = p.affiliateUrl;
      a.rel = 'sponsored nofollow noopener';
      if (a.getAttribute('href') !== '#') a.target = '_blank';
    });
  }

  /* ---------- Goal grid ---------- */
  $$('[data-goals]').forEach(function (el) {
    el.innerHTML = D.goals.map(function (g) {
      return '<a class="goal-card" href="category.html?goal=' + esc(g.id) + '">' +
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1E6B4F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + g.icon + '</svg>' +
        '<div class="t">' + esc(g.label) + '</div><div class="n">' + esc(g.reviews) + ' reviews</div></a>';
    }).join('');
  });

  /* ---------- Ranked picks ---------- */
  function pickHTML(p, i) {
    var g = goalById(p.goal);
    return '<article class="card rank-item">' +
      '<div class="rank-no">#' + (i + 1) + '</div>' +
      '<div class="ph">' + imgOr(p, '[Image]') + '</div>' +
      '<div class="rank-info"><div class="meta"><span class="eyebrow" style="font-size:12px">' + esc(g ? g.short : '') + '</span>' +
      (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '') + '</div>' +
      '<h3>' + esc(p.name) + '</h3><p>' + esc(p.blurb) + '</p></div>' +
      '<div class="rank-score"><div class="num">' + esc(p.score) + '</div><div class="cap">score / 10</div></div>' +
      '<div class="rank-actions"><a class="btn btn-cta" href="#" data-aff="' + esc(p.id) + '">Check price ↗</a>' +
      '<a class="text-link" href="' + esc(p.review) + '">Read review</a></div></article>';
  }
  function renderPicks(el, goal) {
    var limit = parseInt(el.getAttribute('data-limit'), 10) || 0;
    var list = ranked(D.products).filter(function (p) { return !goal || goal === 'all' || p.goal === goal; });
    if (limit && (!goal || goal === 'all')) list = list.slice(0, limit);
    el.innerHTML = list.length ? list.map(pickHTML).join('')
      : '<div class="card empty">No picks in this category yet — <a href="quiz.html">take the quiz</a> instead.</div>';
    wireAffiliates(el);
  }
  $$('[data-picks]').forEach(function (el) {
    renderPicks(el, el.getAttribute('data-picks') || 'all');
  });
  $$('[data-filter-for]').forEach(function (group) {
    var target = document.getElementById(group.getAttribute('data-filter-for'));
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      $$('button[data-filter]', group).forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      renderPicks(target, btn.getAttribute('data-filter'));
    });
  });

  /* ---------- Post cards ---------- */
  function postHTML(p) {
    return '<a class="post-card" href="' + esc(p.url) + '"><div class="ph">[Featured image 16:9]</div>' +
      '<div class="body"><span class="eyebrow">' + esc(p.type) + '</span><h3>' + esc(p.title) + '</h3>' +
      '<span class="meta">' + esc(p.read) + ' min read · ' + esc(p.date) + '</span></div></a>';
  }
  $$('[data-posts]').forEach(function (el) {
    var limit = parseInt(el.getAttribute('data-limit'), 10) || 0;
    var goal = el.getAttribute('data-posts');
    var list = D.posts.filter(function (p) { return !goal || goal === 'all' || p.goal === goal; });
    if (limit) list = list.slice(0, limit);
    el.innerHTML = list.length ? list.map(postHTML).join('') : '<div class="card empty">Reviews for this category are on the way.</div>';
  });

  /* ---------- Reviews index: type filter + search ---------- */
  var archive = document.getElementById('archive');
  if (archive) {
    var q = (params.get('q') || '').trim();
    var type = params.get('type') || 'all';
    var qInput = $('#archive-q');
    if (qInput) qInput.value = q;
    var draw = function () {
      var needle = q.toLowerCase();
      var list = D.posts.filter(function (p) {
        var g = goalById(p.goal);
        var hay = (p.title + ' ' + p.type + ' ' + (g ? g.label : '')).toLowerCase();
        return (type === 'all' || p.type === type) && (!needle || hay.indexOf(needle) > -1);
      });
      archive.innerHTML = list.length ? list.map(postHTML).join('')
        : '<div class="card empty">Nothing matches “' + esc(q) + '”. Try another word, or <a href="quiz.html">take the 60-sec quiz</a>.</div>';
      var status = $('#archive-status');
      if (status) status.textContent = list.length + (list.length === 1 ? ' article' : ' articles') + (q ? ' matching “' + q + '”' : '');
    };
    $$('[data-type]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-type') === type ? 'true' : 'false');
      b.addEventListener('click', function () {
        type = b.getAttribute('data-type');
        $$('[data-type]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        draw();
      });
    });
    var af = $('#archive-form');
    if (af) af.addEventListener('submit', function (e) {
      e.preventDefault();
      q = qInput.value.trim();
      var u = new URL(location.href); if (q) u.searchParams.set('q', q); else u.searchParams.delete('q');
      history.replaceState(null, '', u);
      draw();
    });
    draw();
  }

  /* ---------- Category page ---------- */
  var cat = document.getElementById('category-page');
  if (cat) {
    var g = goalById(params.get('goal')) || D.goals[0];
    document.title = g.label + ' supplement reviews — CartPickify';
    $$('[data-cat="label"]').forEach(function (n) { n.textContent = g.label; });
    $$('[data-cat="intro"]').forEach(function (n) { n.textContent = g.intro; });
    $$('[data-cat="count"]').forEach(function (n) { n.textContent = g.reviews; });
    renderPicks($('#cat-picks'), g.id);
    var posts = $('#cat-posts');
    var list = D.posts.filter(function (p) { return p.goal === g.id; });
    posts.innerHTML = list.length ? list.map(postHTML).join('') : '<div class="card empty">In-depth reviews for this category are on the way.</div>';
    $$('.main-nav a').forEach(function (a) {
      if (a.getAttribute('href') === 'category.html?goal=' + g.id) a.setAttribute('aria-current', 'page');
    });
    var others = $('#cat-others');
    if (others) others.innerHTML = D.goals.filter(function (x) { return x.id !== g.id; }).map(function (x) {
      return '<a class="chip" style="display:inline-flex;align-items:center;text-decoration:none" href="category.html?goal=' + esc(x.id) + '">' + esc(x.label) + '</a>';
    }).join('');
  }

  /* ---------- Featured product slots (data-product="product-a" data-field="name") ---------- */
  $$('[data-product][data-field]').forEach(function (n) {
    var p = productById(n.getAttribute('data-product'));
    if (p && p[n.getAttribute('data-field')] != null) n.textContent = p[n.getAttribute('data-field')];
  });

  /* ---------- Email forms (newsletter, quiz, contact) ---------- */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$('form[data-email-form]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input[type="email"]', form);
      var msg = $('.form-msg', form);
      if (!msg) { msg = document.createElement('div'); msg.className = 'form-msg'; msg.setAttribute('role', 'status'); form.appendChild(msg); }
      if (!EMAIL.test(input.value.trim())) {
        msg.className = 'form-msg error';
        msg.textContent = 'Please enter a valid email address.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      // Hook up your email provider here (ConvertKit, Mailchimp, etc.).
      msg.className = 'form-msg';
      msg.textContent = form.getAttribute('data-success') || 'Thanks! Check your inbox in a minute.';
      form.reset();
    });
  });

  /* ---------- Review page: score bars + sticky mobile CTA ---------- */
  var bars = $$('.bar > i[data-pct]');
  if (bars.length) {
    var fill = function () { bars.forEach(function (b) { b.style.width = b.getAttribute('data-pct'); }); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (en) { return en.isIntersecting; })) { fill(); io.disconnect(); }
      });
      io.observe(bars[0]);
    } else fill();
  }
  var sticky = $('.sticky-cta');
  if (sticky) {
    var anchor = $('#verdict') || document.body;
    var onScroll = function () {
      var past = anchor.getBoundingClientRect().top < 0;
      var foot = $('.site-footer');
      var atFoot = foot && foot.getBoundingClientRect().top < window.innerHeight - 40;
      sticky.classList.toggle('show', past && !atFoot);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Quiz ---------- */
  var quiz = document.getElementById('quiz');
  if (quiz) {
    var state = { step: 0, answers: [] };
    var total = D.quiz.length;
    var stage = $('#quiz-stage');
    var stepLabel = $('#quiz-step-label');
    var bar = $('#quiz-bar');

    var matchFor = function () {
      var goal = state.answers[0] && state.answers[0].goal;
      var pool = ranked(D.products).filter(function (p) { return p.goal === goal; });
      var fmt = state.answers[1] && state.answers[1].label;
      var byFmt = pool.filter(function (p) { return p.format === fmt; });
      return byFmt[0] || pool[0] || ranked(D.products)[0];
    };

    var render = function () {
      var s = state.step;
      stepLabel.textContent = s < total ? 'Question ' + (s + 1) + ' of ' + total : (s === total ? 'Almost done' : 'Your result');
      bar.style.width = Math.round(((s + 1) / (total + 2)) * 100) + '%';
      var html;
      if (s < total) {
        var q = D.quiz[s];
        html = '<div class="quiz-step"><h1 tabindex="-1">' + esc(q.title) + '</h1><p class="sub">' + esc(q.sub) + '</p>' +
          '<div class="quiz-options">' + q.options.map(function (o, i) {
            var sel = state.answers[s] && state.answers[s].label === o.label ? ' selected' : '';
            return '<button type="button" class="quiz-option' + sel + '" data-opt="' + i + '">' + esc(o.label) + ICON_ARROW + '</button>';
          }).join('') + '</div>' +
          (s > 0 ? '<button type="button" class="link-btn" data-back style="align-self:flex-start">← Back</button>' : '') + '</div>';
      } else if (s === total) {
        html = '<form class="quiz-step" id="quiz-email" novalidate><h1 tabindex="-1">Your match is ready.</h1>' +
          '<p class="sub">Where should we send your personalised shortlist and the free “Label Decoder” cheat sheet?</p>' +
          '<label for="q-email">Email address</label>' +
          '<input class="input" id="q-email" type="email" autocomplete="email" placeholder="you@email.com">' +
          '<div class="form-msg error" role="alert" hidden></div>' +
          '<button type="submit" class="btn btn-cta btn-xl btn-block">Show my match</button>' +
          '<button type="button" class="link-btn" data-skip style="font-weight:400;font-size:14px;color:var(--muted);text-decoration:underline;align-self:center">Skip and show results</button>' +
          '<p class="small-center">No spam. Unsubscribe in one click. See our <a href="privacy.html">privacy policy</a>.</p>' +
          '<button type="button" class="link-btn" data-back style="align-self:flex-start">← Back</button></form>';
      } else {
        var p = matchFor();
        var goalAns = state.answers[0] ? state.answers[0].label : 'Your goal';
        var why = 'Why it fits you: matches your goal (' + goalAns.toLowerCase() + ')' +
          (state.answers[1] ? ', comes as ' + String(p.format).toLowerCase() : '') +
          (state.answers[2] ? ' and fits a “' + state.answers[2].label + '” budget with bundle pricing.' : '.');
        html = '<div class="quiz-step"><span class="pill" style="font-size:13px;padding:6px 12px">Your best match · ' + esc(goalAns) + '</span>' +
          '<div class="quiz-result-head"><div class="ph">' + imgOr(p, '[Image]') + '</div><div>' +
          '<h1 tabindex="-1">' + esc(p.name) + '</h1><p class="sub">' + esc(why) + '</p>' +
          '<div class="score-inline"><span class="num">' + esc(p.score) + '</span><span class="cap">CartPickify<br>score / 10</span></div></div></div>' +
          '<div class="callout"><strong>Before you buy:</strong> ' + esc(p.caveat) + '</div>' +
          '<a class="btn btn-cta btn-xl btn-block" href="#" data-aff="' + esc(p.id) + '">Visit official site ↗</a>' +
          '<div class="row-between"><a class="text-link" href="' + esc(p.review) + '" style="height:44px;display:inline-flex;align-items:center">Read the full review first</a>' +
          '<button type="button" class="link-btn" data-restart style="color:var(--muted)">Retake quiz</button></div></div>';
      }
      stage.innerHTML = html;
      wireAffiliates(stage);
      var h = $('h1', stage); if (h && state.touched) h.focus({ preventScroll: true });
    };

    stage.addEventListener('click', function (e) {
      var opt = e.target.closest('[data-opt]');
      if (opt) {
        state.answers[state.step] = D.quiz[state.step].options[+opt.getAttribute('data-opt')];
        state.step++; state.touched = true; render(); return;
      }
      if (e.target.closest('[data-back]')) { state.step = Math.max(0, state.step - 1); state.touched = true; render(); return; }
      if (e.target.closest('[data-skip]')) { state.step = total + 1; state.touched = true; render(); return; }
      if (e.target.closest('[data-restart]')) { state = { step: 0, answers: [], touched: true }; render(); }
    });
    stage.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('#q-email'), err = $('.form-msg', stage);
      if (!EMAIL.test(input.value.trim())) {
        err.hidden = false; err.textContent = 'Please enter a valid email address, or skip below.';
        input.setAttribute('aria-invalid', 'true'); input.focus(); return;
      }
      // Send { email, answers } to your email provider here.
      state.step = total + 1; state.touched = true; render();
    });

    // Deep link: quiz.html?goal=sleep starts at question 2 with the goal answered.
    var pre = params.get('goal');
    var preOpt = pre && D.quiz[0].options.filter(function (o) { return o.goal === pre; })[0];
    if (preOpt) { state.answers[0] = preOpt; state.step = 1; }
    render();
  }

  wireAffiliates(document);

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
})();
