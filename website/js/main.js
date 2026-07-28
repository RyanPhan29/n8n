/* =====================================================================
   VĂN PHÒNG LUẬT SƯ — Cấu hình & hiệu ứng trang web
   =====================================================================
   👉 CHỈ CẦN SỬA Ở "CAU_HINH" BÊN DƯỚI là toàn bộ số điện thoại, Zalo,
      email... trên trang sẽ tự cập nhật. Không cần đụng tới chỗ khác.
   ===================================================================== */

const CAU_HINH = {
  // Số điện thoại (dùng để bấm gọi). Viết liền, không khoảng trắng:
  soDienThoai: "0984243629",
  // Cách hiển thị số cho đẹp (có khoảng trắng):
  soHienThi: "0984 243 629",
  // Số Zalo (thường trùng số điện thoại):
  zalo: "0984243629",
  // Email nhận liên hệ:
  email: "email@vanphongluat.vn",
  // Link trang Facebook (fanpage). Nếu chưa có thì để "#":
  facebook: "#",

  // (Tùy chọn) Địa chỉ nhận thông tin từ form đặt lịch.
  // - Cách dễ nhất: tạo form miễn phí tại https://formspree.io rồi dán link vào đây.
  //   Ví dụ: "https://formspree.io/f/abcxyz"
  // - Nếu để trống "", form sẽ tự mở Zalo kèm nội dung khách đã điền.
  formEndpoint: ""
};

/* ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const { soDienThoai, soHienThi, zalo, email, facebook } = CAU_HINH;
  const zaloLink = "https://zalo.me/" + zalo.replace(/\D/g, "");

  // --- Cập nhật số điện thoại hiển thị & link gọi ---
  document.querySelectorAll("[data-phone-text]").forEach(el => (el.textContent = soHienThi));
  document.querySelectorAll("[data-phone-link]").forEach(el => (el.href = "tel:" + soDienThoai.replace(/\s/g, "")));

  // --- Email ---
  document.querySelectorAll("[data-email-text]").forEach(el => (el.textContent = email));
  document.querySelectorAll("[data-email-link]").forEach(el => (el.href = "mailto:" + email));

  // --- Zalo ---
  document.querySelectorAll("[data-zalo-link]").forEach(el => {
    el.href = zaloLink;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // --- Facebook ---
  document.querySelectorAll("[data-fanpage-link]").forEach(el => {
    el.href = facebook;
    if (facebook !== "#") { el.target = "_blank"; el.rel = "noopener"; }
  });

  // --- Năm hiện tại ở footer ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Menu trên điện thoại ---
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));
    document.addEventListener("click", e => {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
  }

  // --- Xử lý các form (đặt lịch / gọi lại) ---
  document.querySelectorAll("[data-quickform]").forEach(form => {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.ten || !data.sdt) { showToast("Vui lòng nhập họ tên và số điện thoại."); return; }

      const btn = form.querySelector("button[type=submit]");
      const oldText = btn ? btn.textContent : "";

      // Cách 1: Gửi qua Formspree nếu đã cấu hình
      if (CAU_HINH.formEndpoint) {
        try {
          if (btn) { btn.disabled = true; btn.textContent = "Đang gửi..."; }
          const res = await fetch(CAU_HINH.formEndpoint, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(form)
          });
          if (res.ok) {
            form.reset();
            showToast("✅ Đã gửi! Văn phòng sẽ gọi lại cho bạn sớm nhất.");
          } else {
            throw new Error("fail");
          }
        } catch (_) {
          showToast("Có lỗi khi gửi. Bạn vui lòng gọi trực tiếp giúp ạ.");
        } finally {
          if (btn) { btn.disabled = false; btn.textContent = oldText; }
        }
        return;
      }

      // Cách 2: Chưa cấu hình -> mở Zalo kèm nội dung khách đã điền
      const lines = [
        "Xin chào, tôi cần tư vấn pháp luật:",
        "• Họ tên: " + data.ten,
        "• Số điện thoại: " + data.sdt,
        data.linhvuc ? "• Lĩnh vực: " + data.linhvuc : "",
        data.thoigian ? "• Muốn được gọi: " + data.thoigian : "",
        data.noidung ? "• Nội dung: " + data.noidung : ""
      ].filter(Boolean).join("\n");

      const zaloUrl = "https://zalo.me/" + CAU_HINH.zalo.replace(/\D/g, "");
      window.open(zaloUrl, "_blank", "noopener");
      // Sao chép nội dung để khách dán vào Zalo cho nhanh
      try { await navigator.clipboard.writeText(lines); } catch (_) {}
      form.reset();
      showToast("Đã mở Zalo. Nội dung đã được sao chép, bạn chỉ cần dán & gửi nhé!");
    });
  });
});

// --- Thông báo nhỏ (toast) ---
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 4200);
}
