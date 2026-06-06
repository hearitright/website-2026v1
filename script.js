/* HearITright — shared JS */

(function () {
  'use strict';

  /* ---- Active nav link ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === '') page = 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (link) {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });

  /* ---- Hamburger ---- */
  var hamburger = document.querySelector('.nav__hamburger');
  var menu      = document.querySelector('.nav__menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Scroll reveal ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Cookie consent banner ---- */
  (function () {
    var KEY = 'hir_cookie_consent';
    if (localStorage.getItem(KEY)) return;

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p class="cookie-banner__title">We use cookies</p>' +
      '<p class="cookie-banner__text">We use analytics and visitor tools to improve your experience. ' +
      'See our <a href="cookie-policy.html">Cookie Policy</a> for details.</p>' +
      '<div class="cookie-banner__actions">' +
        '<button class="cookie-banner__decline">Decline</button>' +
        '<button class="cookie-banner__accept">Accept All</button>' +
      '</div>';
    document.body.appendChild(banner);

    setTimeout(function () { banner.classList.add('visible'); }, 700);

    function dismiss(choice) {
      localStorage.setItem(KEY, choice);
      banner.classList.remove('visible');
      banner.classList.add('hiding');
      setTimeout(function () { banner.remove(); }, 420);
    }

    banner.querySelector('.cookie-banner__accept').addEventListener('click', function () { dismiss('accepted'); });
    banner.querySelector('.cookie-banner__decline').addEventListener('click', function () { dismiss('declined'); });
  }());

  /* ---- Contact form ---- */
  var form = document.querySelector('.js-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('.form__success');
      if (success) {
        form.style.display = 'none';
        success.classList.add('visible');
      }
    });
  }

}());
