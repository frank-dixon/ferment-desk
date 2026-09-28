(function () {
  'use strict';

  const FOODS = ['bread', 'kraut', 'yogurt', 'coffee'];
  const state = {
    food: 'bread',
    advanced: false,
  };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function getFood() {
    const data = window.FERMENT_CONTENT;
    return data && data[state.food] ? data[state.food] : null;
  }

  function renderFoodChips() {
    const host = $('#food-switcher');
    if (!host) return;
    host.innerHTML = FOODS.map((id) => {
      const item = window.FERMENT_CONTENT[id];
      const active = id === state.food;
      return (
        '<button type="button" role="tab" aria-selected="' +
        active +
        '" data-food="' +
        id +
        '" class="chip ' +
        (active ? 'chip-active' : 'chip-idle') +
        '">' +
        (item ? item.label : id) +
        '</button>'
      );
    }).join('');
  }

  function renderModeToggle() {
    const simpleBtn = $('#mode-simple');
    const advBtn = $('#mode-advanced');
    if (!simpleBtn || !advBtn) return;
    const on =
      'border-action/40 bg-action-mist text-action-soft';
    const off = 'border-rule text-ink-muted hover:bg-void-elev hover:text-ink';
    simpleBtn.className =
      'chip ' + (state.advanced ? off : on);
    advBtn.className =
      'chip ' + (state.advanced ? on : off);
    simpleBtn.setAttribute('aria-pressed', String(!state.advanced));
    advBtn.setAttribute('aria-pressed', String(state.advanced));
  }

  function renderPathway() {
    const food = getFood();
    const root = $('#pathway');
    if (!food || !root) return;

    const stages = food.stages
      .map(function (s, i) {
        return (
          '<li class="relative pl-8">' +
          '<span class="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-sea/40 bg-sea-mist text-[10px] font-display font-semibold text-sea-soft">' +
          (i + 1) +
          '</span>' +
          '<h3 class="font-display text-base font-semibold text-ink">' +
          escapeHtml(s.title) +
          '</h3>' +
          '<p class="mt-1.5 text-sm text-ink-muted">' +
          escapeHtml(s.body) +
          '</p>' +
          '</li>'
        );
      })
      .join('');

    const organisms = food.organisms
      .map(function (o) {
        return (
          '<div class="rounded-lg border border-rule bg-void-soft/60 px-4 py-3">' +
          '<p class="font-display text-sm font-semibold text-sea-soft">' +
          escapeHtml(o.name) +
          '</p>' +
          '<p class="mt-1 text-sm text-ink-muted">' +
          escapeHtml(o.role) +
          '</p>' +
          '</div>'
        );
      })
      .join('');

    const takeaways = food.takeaways
      .map(function (t) {
        return (
          '<li class="flex gap-3 text-sm text-ink-muted">' +
          '<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-action"></span>' +
          '<span>' +
          escapeHtml(t) +
          '</span>' +
          '</li>'
        );
      })
      .join('');

    let citations = '';
    if (state.advanced && food.citations && food.citations.length) {
      citations =
        '<section class="desk-card mt-6 p-5 sm:p-6">' +
        '<h2 class="font-display text-lg font-semibold tracking-tight text-ink">Citations</h2>' +
        '<p class="mt-1 text-xs text-ink-faint">Published sources with DOIs or publisher URLs.</p>' +
        '<ul class="mt-4 space-y-3">' +
        food.citations
          .map(function (c) {
            return (
              '<li class="text-sm text-ink-muted">' +
              '<span>' +
              escapeHtml(c.text) +
              '</span> ' +
              '<a class="text-action-soft underline decoration-action/30 underline-offset-2 hover:text-action" href="' +
              escapeAttr(c.url) +
              '" target="_blank" rel="noopener noreferrer">' +
              escapeHtml(c.url) +
              '</a>' +
              '</li>'
            );
          })
          .join('') +
        '</ul></section>';
    }

    root.innerHTML =
      '<header class="mb-6">' +
      '<p class="text-xs font-medium uppercase tracking-[0.16em] text-sea">Pathway</p>' +
      '<h2 class="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">' +
      escapeHtml(food.label) +
      '</h2>' +
      '<p class="mt-2 max-w-2xl text-sm text-ink-muted">' +
      escapeHtml(food.tagline) +
      '</p>' +
      '</header>' +
      '<div class="grid gap-6 lg:grid-cols-2">' +
      '<section class="desk-card p-5 sm:p-6">' +
      '<h2 class="font-display text-lg font-semibold tracking-tight text-ink">Stages</h2>' +
      '<ol class="mt-5 space-y-5 border-l border-rule/80 ml-2.5">' +
      stages +
      '</ol>' +
      '</section>' +
      '<div class="space-y-6">' +
      '<section class="desk-card p-5 sm:p-6">' +
      '<h2 class="font-display text-lg font-semibold tracking-tight text-ink">Organisms</h2>' +
      '<div class="mt-4 space-y-3">' +
      organisms +
      '</div>' +
      '</section>' +
      '<section class="desk-card p-5 sm:p-6">' +
      '<h2 class="font-display text-lg font-semibold tracking-tight text-ink">Takeaways</h2>' +
      '<ul class="mt-4 space-y-3">' +
      takeaways +
      '</ul>' +
      '</section>' +
      '</div>' +
      '</div>' +
      citations;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, '&#39;');
  }

  function render() {
    renderFoodChips();
    renderModeToggle();
    renderPathway();
  }

  function bind() {
    const switcher = $('#food-switcher');
    if (switcher) {
      switcher.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-food]');
        if (!btn) return;
        state.food = btn.getAttribute('data-food');
        render();
      });
    }
    const simpleBtn = $('#mode-simple');
    const advBtn = $('#mode-advanced');
    if (simpleBtn) {
      simpleBtn.addEventListener('click', function () {
        state.advanced = false;
        render();
      });
    }
    if (advBtn) {
      advBtn.addEventListener('click', function () {
        state.advanced = true;
        render();
      });
    }
  }

  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () {
        /* offline shell optional */
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bind();
    render();
    registerSW();
  });
})();
