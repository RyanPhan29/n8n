/* SKINLAB · BS Lê Hiếu — interactions */
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && !e.target.closest('.has-sub')) {
        nav.classList.remove('open');
      }
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Booking form (demo handler — thay bằng endpoint thật khi go-live)
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.form-ok');
      var name = (form.querySelector('[name="name"]') || {}).value || 'bạn';
      if (ok) {
        ok.textContent = 'Cảm ơn ' + name + '! Phòng khám sẽ liên hệ xác nhận lịch trong thời gian sớm nhất.';
        ok.style.display = 'block';
      }
      form.reset();
    });
  }

  // Shrink header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 20px rgba(14,30,52,0.08)' : 'none';
    }, { passive: true });
  }
})();
