/* =====================================================================
   Triều Nguyên Law — hiệu ứng & xử lý form
   Thông tin liên hệ được lấy từ WordPress (Giao diện → Tùy biến),
   truyền sang đây qua biến VP_CONFIG. KHÔNG sửa số ở file này.
   ===================================================================== */

(function () {
  "use strict";

  var CFG = window.VP_CONFIG || {
    soDienThoai: "0123456789",
    soHienThi: "0123 456 789",
    zalo: "0123456789",
    email: "email@vanphongluat.vn",
    facebook: "#",
    formEndpoint: ""
  };

  document.addEventListener("DOMContentLoaded", function () {
    var zaloLink = "https://zalo.me/" + String(CFG.zalo).replace(/\D/g, "");

    document.querySelectorAll("[data-phone-text]").forEach(function (el) { el.textContent = CFG.soHienThi; });
    document.querySelectorAll("[data-phone-link]").forEach(function (el) { el.href = "tel:" + String(CFG.soDienThoai).replace(/\s/g, ""); });
    document.querySelectorAll("[data-email-text]").forEach(function (el) { el.textContent = CFG.email; });
    document.querySelectorAll("[data-email-link]").forEach(function (el) { el.href = "mailto:" + CFG.email; });
    document.querySelectorAll("[data-zalo-link]").forEach(function (el) { el.href = zaloLink; el.target = "_blank"; el.rel = "noopener"; });
    document.querySelectorAll("[data-fanpage-link]").forEach(function (el) {
      el.href = CFG.facebook || "#";
      if (CFG.facebook && CFG.facebook !== "#") { el.target = "_blank"; el.rel = "noopener"; }
    });

    // Menu trên điện thoại
    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("nav");
    if (navToggle && nav) {
      var closeNav = function () {
        nav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      };
      navToggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        navToggle.classList.toggle("open", open);
        navToggle.setAttribute("aria-expanded", String(open));
      });
      nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeNav); });
      document.addEventListener("click", function (e) {
        if (nav.classList.contains("open") && !nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
      });
    }

    // Xử lý các form
    document.querySelectorAll("[data-quickform]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        if (!data.ten || !data.sdt) { showToast("Vui lòng nhập họ tên và số điện thoại."); return; }

        var btn = form.querySelector("button[type=submit]");
        var oldText = btn ? btn.textContent : "";

        // Cách 1: gửi qua Formspree nếu đã cấu hình
        if (CFG.formEndpoint) {
          if (btn) { btn.disabled = true; btn.textContent = "Đang gửi..."; }
          fetch(CFG.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) })
            .then(function (res) {
              if (res.ok) { form.reset(); showToast("✅ Đã gửi! Văn phòng sẽ gọi lại cho bạn sớm nhất."); }
              else { throw new Error("fail"); }
            })
            .catch(function () { showToast("Có lỗi khi gửi. Bạn vui lòng gọi trực tiếp giúp ạ."); })
            .finally(function () { if (btn) { btn.disabled = false; btn.textContent = oldText; } });
          return;
        }

        // Cách 2: mở Zalo kèm nội dung khách đã điền
        var lines = [
          "Xin chào, tôi cần tư vấn pháp luật:",
          "• Họ tên: " + data.ten,
          "• Số điện thoại: " + data.sdt,
          data.linhvuc ? "• Lĩnh vực: " + data.linhvuc : "",
          data.thoigian ? "• Muốn được gọi: " + data.thoigian : "",
          data.noidung ? "• Nội dung: " + data.noidung : ""
        ].filter(Boolean).join("\n");

        window.open(zaloLink, "_blank", "noopener");
        if (navigator.clipboard) { navigator.clipboard.writeText(lines).catch(function () {}); }
        form.reset();
        showToast("Đã mở Zalo. Nội dung đã được sao chép, bạn chỉ cần dán & gửi nhé!");
      });
    });
  });

  function showToast(message) {
    var toast = document.querySelector(".toast");
    if (!toast) { toast = document.createElement("div"); toast.className = "toast"; document.body.appendChild(toast); }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove("show"); }, 4200);
  }
})();
