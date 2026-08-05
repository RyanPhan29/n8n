/* SKINLAB · BS Lê Hiếu — interactions */
(function () {
  'use strict';

  // Dịch nhãn (fallback về tiếng Việt nếu i18n chưa nạp)
  function tt(key, vi) {
    return (typeof window.__i18nText === 'function') ? window.__i18nText(key) : vi;
  }

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
      // Validate chip-based fields when present (booking page)
      var svc = form.querySelector('[name="service"]');
      var slot = form.querySelector('[name="slot"]');
      if ((svc && !svc.value) || (slot && !slot.value)) {
        if (ok) {
          ok.textContent = 'Vui lòng chọn dịch vụ và khung giờ trước khi đặt lịch.';
          ok.style.display = 'block';
          ok.style.background = 'rgba(192,83,29,.08)';
          ok.style.borderColor = 'rgba(192,83,29,.3)';
          ok.style.color = '#C0531D';
        }
        return;
      }
      function val(n) { var el = form.querySelector('[name="' + n + '"]'); return el ? (el.value || '').trim() : ''; }
      var name = val('name'), phone = val('phone');
      if (!name || !phone) {
        if (ok) {
          ok.textContent = 'Vui lòng nhập họ tên và số điện thoại.';
          ok.style.display = 'block';
          ok.style.background = 'rgba(192,83,29,.08)'; ok.style.borderColor = 'rgba(192,83,29,.3)'; ok.style.color = '#C0531D';
        }
        return;
      }
      // Soạn nội dung đặt lịch, sao chép vào clipboard & mở Zalo để khách gửi cho bác sĩ
      var service = val('service') || val('issue'), date = val('date'), slotv = val('slot'), note = val('note');
      var lines = ['📅 ĐẶT LỊCH KHÁM — SKINLAB DE BEAUTY', '• Họ tên: ' + name, '• SĐT: ' + phone];
      if (service) lines.push('• Vấn đề / Dịch vụ: ' + service);
      if (date) lines.push('• Ngày mong muốn: ' + date);
      if (slotv) lines.push('• Khung giờ: ' + slotv);
      if (note) lines.push('• Ghi chú: ' + note);
      var text = lines.join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).catch(function () {}); }
      try { window.open('https://zalo.me/0934113839', '_blank', 'noopener'); } catch (e2) {}
      if (ok) {
        ok.style.background = ''; ok.style.borderColor = ''; ok.style.color = '';
        ok.innerHTML = 'Đã mở Zalo &amp; sao chép thông tin đặt lịch của bạn. Vui lòng <b>dán (paste) vào khung chat Zalo</b> rồi gửi để bác sĩ xác nhận. Hoặc gọi ngay <a href="tel:+84934113839">0934 113 839</a>.';
        ok.style.display = 'block';
      }
    });
  }

  // Đếm số liệu hero (0 → mục tiêu) — tạo ấn tượng quy mô ngay khi vào trang
  (function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var nums = document.querySelectorAll('.hero-stats .num[data-count]');
    if (!nums.length || reduce) return;
    function animate(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1300, start = null;
      el.textContent = '0' + suffix;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.5 });
      nums.forEach(function (n) { io.observe(n); });
    } else { nums.forEach(animate); }
  })();

  // Sticky mobile call bar (Gọi · Zalo · Đặt lịch) — chèn vào mọi trang
  (function () {
    if (document.querySelector('.mobile-callbar')) return;
    var inServices = /\/services\//.test(location.pathname);
    var bookHref = (inServices ? '../' : '') + 'dat-lich.html';
    var call = '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1z"/></svg>';
    var zalo = '<svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.4 4.7 3.6 6.1-.1 1-.5 2.2-1.1 3.1-.2.3.1.7.4.6 1.7-.5 3.1-1.3 4-2 1 .2 2 .3 3.1.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>';
    var book = '<svg viewBox="0 0 24 24"><path d="M7 2v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 7v10H5V9h14z"/></svg>';
    var bar = document.createElement('nav');
    bar.className = 'mobile-callbar';
    bar.setAttribute('aria-label', 'Liên hệ nhanh');
    bar.innerHTML =
      '<a class="mcb-call" href="tel:+84934113839">' + call + '<span data-i18n="mb.call">' + tt('mb.call', 'Gọi') + '</span></a>' +
      '<a class="mcb-zalo" href="https://zalo.me/0934113839" target="_blank" rel="noopener">' + zalo + '<span data-i18n="mb.zalo">' + tt('mb.zalo', 'Zalo') + '</span></a>' +
      '<a class="mcb-book" href="' + bookHref + '">' + book + '<span data-i18n="mb.book">' + tt('mb.book', 'Đặt lịch') + '</span></a>';
    document.body.appendChild(bar);
  })();

  // Booking page: single-select chip groups (service + time slot)
  function chipGroup(selector, hiddenName) {
    var chips = document.querySelectorAll(selector);
    if (!chips.length) return;
    var hidden = hiddenName ? document.querySelector('[name="' + hiddenName + '"]') : null;
    chips.forEach(function (chip) {
      if (chip.classList.contains('off')) return;
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        if (hidden) hidden.value = chip.getAttribute('data-value') || chip.textContent.trim();
      });
    });
  }
  chipGroup('.js-service', 'service');
  chipGroup('.js-slot', 'slot');

  // Shrink header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 20px rgba(14,30,52,0.08)' : 'none';
    }, { passive: true });
  }

  // Cookie consent (lưu localStorage, chỉ hiện 1 lần)
  (function () {
    try { if (localStorage.getItem('skinlab-cookie-ok')) return; } catch (e) { return; }
    var inServices = /\/services\//.test(location.pathname);
    var priv = (inServices ? '../' : '') + 'chinh-sach-bao-mat.html';
    var bar = document.createElement('div');
    bar.className = 'cookie-bar';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Thông báo cookie');
    bar.innerHTML = '<p><span data-i18n="ck.text">' + tt('ck.text', 'Website dùng cookie để cải thiện trải nghiệm và đo lường hiệu quả.') + '</span> <a href="' + priv + '" data-i18n="ck.more">' + tt('ck.more', 'Xem Chính sách bảo mật') + '</a></p><button class="btn btn--primary" type="button" data-i18n="ck.ok">' + tt('ck.ok', 'Đồng ý') + '</button>';
    document.body.appendChild(bar);
    bar.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem('skinlab-cookie-ok', '1'); } catch (e) {}
      bar.remove();
    });
  })();
})();
