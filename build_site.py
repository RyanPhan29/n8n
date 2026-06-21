#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh website tĩnh ĐA TRANG cho Văn phòng Luật sư Triều Nguyên và Cộng sự.
Chạy: python3 build_site.py  -> xuất ra thư mục ./website/
Mỗi mục là 1 trang/URL riêng (chuẩn SEO), dùng chung header/footer.
"""
import os, shutil, html

OUT = os.path.join(os.path.dirname(__file__), "website")
SRC = os.path.join(os.path.dirname(__file__), "law-office-website")

NAME = "Triều Nguyên và Cộng sự"
FULL = "Văn phòng Luật sư " + NAME
PHONE = "0123456789"
PHONE_D = "0123 456 789"
EMAIL = "email@vanphongluat.vn"
ADDR = "[Số nhà, tên đường], Tây Sơn, Bình Định"

NAV = [
    ("index.html", "Trang chủ"),
    ("gioi-thieu.html", "Giới thiệu"),
    ("dich-vu.html", "Dịch vụ"),
    ("bang-phi.html", "Bảng phí"),
    ("cam-nang.html", "Cẩm nang"),
    ("lien-he.html", "Liên hệ"),
]

# --------------------------------------------------------------------------
# Dữ liệu lĩnh vực dịch vụ (mỗi cái 1 trang riêng)
# --------------------------------------------------------------------------
SERVICES = [
    dict(slug="dv-dat-dai", icon="🏡", name="Đất đai – Nhà ở",
         h1="Luật sư tư vấn Đất đai – Nhà ở tại Tây Sơn, Bình Định",
         meta="Luật sư tư vấn đất đai, nhà ở tại Tây Sơn, Bình Định: tranh chấp ranh đất, sang tên sổ đỏ, tách thửa, đền bù giải phóng mặt bằng.",
         intro="Tranh chấp đất đai, nhà ở là vấn đề phổ biến và phức tạp nhất ở quê. Chúng tôi hỗ trợ bà con từ bước hòa giải ở xã đến khởi kiện tại tòa, bảo vệ quyền lợi hợp pháp về đất đai.",
         items=["Tranh chấp ranh đất, lối đi chung","Sang tên, tách thửa, cấp đổi sổ đỏ","Đòi lại đất cho mượn, cho ở nhờ","Đền bù, giải phóng mặt bằng","Chuyển mục đích sử dụng đất"],
         related=["bai-tranh-chap-dat-dai"]),
    dict(slug="dv-thua-ke", icon="📜", name="Thừa kế – Di chúc",
         h1="Tư vấn Thừa kế – Lập di chúc hợp pháp",
         meta="Tư vấn thừa kế, lập di chúc hợp pháp, chia di sản, khai nhận thừa kế tại Tây Sơn, Bình Định. Tránh tranh chấp tài sản trong gia đình.",
         intro="Lập di chúc rõ ràng và chia thừa kế đúng luật giúp con cháu thuận hòa, tránh tranh chấp về sau. Chúng tôi soạn thảo di chúc, hướng dẫn khai nhận và phân chia di sản đúng quy định.",
         items=["Lập di chúc hợp pháp, có công chứng","Khai nhận, từ chối di sản thừa kế","Phân chia di sản theo pháp luật","Giải quyết tranh chấp thừa kế","Xác định hàng thừa kế, kỷ phần"],
         related=["bai-lam-di-chuc"]),
    dict(slug="dv-hon-nhan", icon="👨‍👩‍👧", name="Hôn nhân – Gia đình",
         h1="Luật sư Hôn nhân – Gia đình: ly hôn, nuôi con, chia tài sản",
         meta="Luật sư hôn nhân gia đình tại Tây Sơn, Bình Định: thủ tục ly hôn thuận tình, đơn phương, giành quyền nuôi con, chia tài sản vợ chồng.",
         intro="Khi hôn nhân không thể tiếp tục, một luật sư đồng hành sẽ giúp bạn giải quyết nhanh gọn, bảo vệ quyền nuôi con và phần tài sản chính đáng của mình.",
         items=["Ly hôn thuận tình / đơn phương","Giành quyền nuôi con, mức cấp dưỡng","Chia tài sản chung vợ chồng","Xác định cha, mẹ, con","Tư vấn tài sản trước hôn nhân"],
         related=["bai-thu-tuc-ly-hon"]),
    dict(slug="dv-hinh-su", icon="⚖️", name="Hình sự",
         h1="Luật sư bào chữa Hình sự",
         meta="Luật sư bào chữa hình sự tại Tây Sơn, Bình Định: bảo vệ bị can, bị cáo, người bị hại từ giai đoạn điều tra đến xét xử, kháng cáo.",
         intro="Trong vụ án hình sự, có luật sư tham gia sớm giúp bảo vệ quyền lợi tốt nhất cho thân chủ. Chúng tôi đồng hành từ giai đoạn điều tra đến khi xét xử.",
         items=["Bào chữa cho bị can, bị cáo","Bảo vệ quyền lợi người bị hại","Tham gia từ giai đoạn điều tra","Xin giảm nhẹ hình phạt, hưởng án treo","Kháng cáo, kháng nghị bản án"],
         related=[]),
    dict(slug="dv-dan-su", icon="🤝", name="Dân sự – Hợp đồng",
         h1="Tư vấn Dân sự – Hợp đồng, đòi nợ, bồi thường",
         meta="Tư vấn dân sự, hợp đồng tại Tây Sơn, Bình Định: đòi nợ, tranh chấp vay mượn, bồi thường thiệt hại, soạn thảo và rà soát hợp đồng.",
         intro="Vay mượn, đặt cọc, bồi thường thiệt hại… là những tranh chấp dân sự hay gặp. Chúng tôi tư vấn, soạn hồ sơ và đại diện đòi lại quyền lợi cho bạn.",
         items=["Đòi nợ, tranh chấp vay mượn","Bồi thường thiệt hại, tai nạn","Soạn thảo, rà soát hợp đồng","Tranh chấp mua bán, đặt cọc","Khiếu nại, tố cáo đúng pháp luật"],
         related=[]),
    dict(slug="dv-doanh-nghiep", icon="🏢", name="Doanh nghiệp – Lao động",
         h1="Tư vấn Doanh nghiệp – Lao động",
         meta="Tư vấn doanh nghiệp, lao động tại Tây Sơn, Bình Định: thành lập công ty, hộ kinh doanh, đăng ký kinh doanh, tranh chấp lao động, BHXH.",
         intro="Từ thành lập công ty, hộ kinh doanh đến tư vấn pháp lý thường xuyên, chúng tôi giúp doanh nghiệp địa phương hoạt động đúng luật và an toàn.",
         items=["Thành lập công ty, hộ kinh doanh","Đăng ký, thay đổi giấy phép kinh doanh","Soạn thảo hợp đồng thương mại","Tranh chấp lao động, bảo hiểm xã hội","Tư vấn pháp lý thường xuyên"],
         related=[]),
]
SVC_BY_SLUG = {s["slug"]: s for s in SERVICES}

# --------------------------------------------------------------------------
# Bài viết Cẩm nang (mỗi bài 1 trang)
# --------------------------------------------------------------------------
ARTICLES = [
    dict(slug="bai-thu-tuc-ly-hon", tag="Hôn nhân – Gia đình",
         title="Thủ tục ly hôn cần giấy tờ gì? Mất bao lâu?",
         meta="Hướng dẫn thủ tục ly hôn thuận tình và đơn phương: hồ sơ cần chuẩn bị, nộp ở đâu, mất bao lâu. Tư vấn tại Tây Sơn, Bình Định.",
         body="""
<p>Ly hôn là điều không ai mong muốn, nhưng khi đã quyết định, việc nắm rõ thủ tục sẽ giúp bạn đỡ vất vả và nhanh chóng hơn.</p>
<h2>1. Có mấy loại ly hôn?</h2>
<ul><li><strong>Ly hôn thuận tình:</strong> hai vợ chồng cùng đồng ý, thỏa thuận được về con cái và tài sản.</li>
<li><strong>Ly hôn đơn phương:</strong> chỉ một bên muốn ly hôn, hoặc không thỏa thuận được.</li></ul>
<h2>2. Hồ sơ cần chuẩn bị</h2>
<ul><li>Đơn xin ly hôn (theo mẫu của Tòa án);</li><li>Giấy chứng nhận đăng ký kết hôn (bản chính);</li>
<li>CCCD/CMND và sổ hộ khẩu (bản sao);</li><li>Giấy khai sinh của các con (bản sao);</li>
<li>Giấy tờ tài sản chung nếu có yêu cầu chia.</li></ul>
<div class="note">💡 <strong>Lưu ý:</strong> Nếu mất giấy đăng ký kết hôn, bạn xin trích lục tại UBND xã/phường nơi đã đăng ký.</div>
<h2>3. Nộp hồ sơ ở đâu, mất bao lâu?</h2>
<p>Nộp tại <strong>Tòa án nhân dân cấp huyện</strong> nơi vợ/chồng cư trú. Thuận tình thường 1–2 tháng; đơn phương thường 4–6 tháng.</p>"""),
    dict(slug="bai-tranh-chap-dat-dai", tag="Đất đai",
         title="Tranh chấp ranh đất với hàng xóm phải làm sao?",
         meta="Các bước xử lý tranh chấp ranh đất, lối đi: hòa giải tại xã, khi nào khởi kiện ra tòa và giấy tờ cần chuẩn bị. Tư vấn tại Tây Sơn, Bình Định.",
         body="""
<p>Tranh chấp ranh đất, lối đi chung rất hay gặp ở quê. Xử lý đúng cách giúp bạn giữ quyền lợi mà vẫn giữ tình làng nghĩa xóm.</p>
<h2>Bước 1: Thương lượng trực tiếp</h2>
<p>Hai bên ngồi lại trao đổi thiện chí. Nhiều trường hợp chỉ do hiểu lầm về mốc giới.</p>
<h2>Bước 2: Hòa giải tại UBND xã/phường</h2>
<p>Làm <strong>đơn yêu cầu hòa giải</strong> gửi UBND cấp xã. Đây là bước <strong>bắt buộc</strong> trước khi ra tòa.</p>
<div class="note">💡 <strong>Mẹo:</strong> Khi hòa giải nên có người làm chứng, cán bộ địa chính và mang theo sổ đỏ, sơ đồ thửa đất.</div>
<h2>Bước 3: Khởi kiện ra Tòa án</h2>
<p>Nếu hòa giải không thành, khởi kiện ra <strong>Tòa án nhân dân cấp huyện</strong> nơi có đất.</p>"""),
    dict(slug="bai-lam-di-chuc", tag="Thừa kế",
         title="Làm di chúc thế nào cho hợp pháp?",
         meta="Cách lập di chúc hợp pháp để con cháu không tranh chấp: nội dung cần có, có bắt buộc công chứng không. Tư vấn tại Tây Sơn, Bình Định.",
         body="""
<p>Lập di chúc rõ ràng từ sớm giúp con cháu thuận hòa, tránh tranh chấp tài sản về sau.</p>
<h2>1. Di chúc cần có nội dung gì?</h2>
<ul><li>Ngày tháng năm lập di chúc;</li><li>Họ tên, nơi cư trú người lập;</li>
<li>Người được hưởng di sản;</li><li>Di sản để lại và nơi có di sản.</li></ul>
<h2>2. Có bắt buộc công chứng không?</h2>
<p>Không bắt buộc, nhưng <strong>nên công chứng hoặc chứng thực</strong> để di chúc chắc chắn hợp pháp, khó bị tranh chấp.</p>
<div class="note">💡 <strong>Lưu ý:</strong> Người lập di chúc phải <strong>minh mẫn, tỉnh táo</strong>, tự nguyện thì di chúc mới có giá trị.</div>"""),
]
ART_BY_SLUG = {a["slug"]: a for a in ARTICLES}


def tellink():
    return "tel:" + PHONE

def nav_html(active):
    out = []
    for href, label in NAV:
        cur = ' aria-current="page"' if href == active else ''
        out.append(f'        <a href="{href}"{cur}>{label}</a>')
    return "\n".join(out)

def breadcrumb_html(trail):
    # trail: list of (href|None, label)
    parts = []
    for href, label in trail:
        if href:
            parts.append(f'<a href="{href}">{label}</a>')
        else:
            parts.append(html.escape(label))
    return ' › '.join(parts)

def ld_localbusiness():
    return (
        '{"@context":"https://schema.org","@type":"LegalService",'
        f'"name":"{FULL}",'
        '"areaServed":"Tây Sơn, Bình Định",'
        f'"telephone":"{PHONE}",'
        '"address":{"@type":"PostalAddress","addressLocality":"Tây Sơn","addressRegion":"Bình Định","addressCountry":"VN"},'
        '"openingHours":"Mo-Sa 07:30-18:00"}'
    )

CTA = """
  <section class="section section--cta">
    <div class="container container--narrow" style="text-align:center">
      <h2 class="section__title section__title--light">Cần tư vấn pháp luật?</h2>
      <p class="section__lead section__lead--light">Gọi ngay hoặc để lại thông tin — luật sư sẽ liên hệ lại với bạn. Lần đầu miễn phí.</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:8px">
        <a href="%TEL%" class="btn btn--gold btn--lg" data-phone-link>📞 Gọi: <span data-phone-text>%PHONE_D%</span></a>
        <a href="lien-he.html" class="btn btn--outline btn--lg">📝 Đặt lịch tư vấn</a>
      </div>
    </div>
  </section>
""".replace("%TEL%", tellink()).replace("%PHONE_D%", PHONE_D)


def page(filename, active, title, meta, h1content_after_header, extra_ld=""):
    """Khung HTML chung cho mọi trang."""
    ld_tag = '<script type="application/ld+json">' + ld_localbusiness() + '</script>'
    extra_tag = ('<script type="application/ld+json">' + extra_ld + '</script>') if extra_ld else ''
    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{html.escape(meta)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{filename}" />
  <meta property="og:title" content="{html.escape(title)}" />
  <meta property="og:description" content="{html.escape(meta)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="vi_VN" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Noto+Serif:wght@600;700&display=swap&subset=vietnamese" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
  {ld_tag}
  {extra_tag}
</head>
<body>
  <div class="topbar">
    <div class="container topbar__inner">
      <span class="topbar__item">🕑 Làm việc: 7h30 – 18h00 (Thứ 2 – Thứ 7)</span>
      <span class="topbar__item">📍 Tây Sơn, Bình Định</span>
      <span class="topbar__item">📞 <span data-phone-text>{PHONE_D}</span></span>
    </div>
  </div>
  <header class="header" id="top">
    <div class="container header__inner">
      <a href="index.html" class="brand">
        <span class="brand__mark">⚖</span>
        <span class="brand__text"><strong>VĂN PHÒNG LUẬT SƯ</strong><em>{NAME}</em></span>
      </a>
      <nav class="nav" id="nav">
{nav_html(active)}
      </nav>
      <a href="{tellink()}" class="header__call" data-phone-link>
        <span class="header__call-icon">📞</span>
        <span class="header__call-text"><small>Gọi tư vấn miễn phí</small><strong data-phone-text>{PHONE_D}</strong></span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Mở menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>
{h1content_after_header}
{footer_html()}
  <script src="js/main.js"></script>
</body>
</html>
"""

def footer_html():
    svc_links = "".join(f'<a href="{s["slug"]}.html">{s["name"]}</a>' for s in SERVICES[:4])
    return f"""
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__col">
        <div class="brand brand--footer"><span class="brand__mark">⚖</span><span class="brand__text"><strong>VĂN PHÒNG LUẬT SƯ</strong><em>{NAME}</em></span></div>
        <p class="footer__desc">Đồng hành pháp lý tận tâm cùng bà con tại Tây Sơn, Bình Định và các vùng lân cận.</p>
      </div>
      <div class="footer__col"><h4>Dịch vụ</h4>{svc_links}</div>
      <div class="footer__col"><h4>Liên kết</h4><a href="gioi-thieu.html">Giới thiệu</a><a href="bang-phi.html">Bảng phí</a><a href="cam-nang.html">Cẩm nang</a><a href="lien-he.html">Liên hệ</a></div>
      <div class="footer__col"><h4>Liên hệ</h4><p>📞 <a href="{tellink()}" data-phone-link><span data-phone-text>{PHONE_D}</span></a></p><p>📍 {ADDR}</p><p>🕑 Thứ 2 – Thứ 7: 7h30 – 18h00</p></div>
    </div>
    <div class="footer__bottom"><div class="container"><p>© <span id="year"></span> {FULL}. Bảo lưu mọi quyền.</p></div></div>
  </footer>
  <div class="floating">
    <a href="{tellink()}" class="floating__btn floating__btn--call" data-phone-link aria-label="Gọi điện"><span class="floating__ring"></span>📞</a>
    <a href="#" class="floating__btn floating__btn--zalo" data-zalo-link aria-label="Nhắn Zalo">💬</a>
  </div>
"""

def page_header(eyebrow, h1, trail):
    return f"""
  <div class="page-head">
    <div class="container">
      <p class="breadcrumb">{breadcrumb_html(trail)}</p>
      <p class="page-head__eyebrow">{eyebrow}</p>
      <h1>{h1}</h1>
    </div>
  </div>
"""

# ----- Khối tái sử dụng -----
def services_grid():
    cards = []
    for s in SERVICES:
        lis = "".join(f"<li>{i}</li>" for i in s["items"][:4])
        cards.append(f"""        <article class="card service">
          <div class="service__icon">{s['icon']}</div><h3>{s['name']}</h3>
          <ul>{lis}</ul>
          <a href="{s['slug']}.html" class="service__link">Xem chi tiết →</a>
        </article>""")
    return '<div class="grid grid--3">\n' + "\n".join(cards) + '\n      </div>'

def whyus():
    feats = [("🤝","Nói chuyện dễ hiểu","Giải thích gần gũi, không dùng từ ngữ khó hiểu."),
             ("💰","Chi phí rõ ràng","Báo trước chi phí, tư vấn lần đầu miễn phí."),
             ("🔒","Giữ kín thông tin","Bảo mật tuyệt đối theo quy định nghề luật."),
             ("📍","Ngay tại địa phương","Văn phòng tại Tây Sơn, gặp trực tiếp dễ dàng."),
             ("⏱️","Phản hồi nhanh","Gọi điện hoặc Zalo là được hỗ trợ ngay."),
             ("📚","Kinh nghiệm thực tế","Hiểu rõ thủ tục và vụ việc tại địa phương.")]
    cards = "".join(f'<div class="feature"><div class="feature__icon">{i}</div><h3>{t}</h3><p>{d}</p></div>' for i,t,d in feats)
    return f'<div class="grid grid--3">{cards}</div>'

def process():
    steps = [("1","Liên hệ","Gọi điện, nhắn Zalo hoặc để lại số."),
             ("2","Tư vấn miễn phí","Luật sư lắng nghe và chỉ rõ hướng giải quyết."),
             ("3","Báo phí & ký kết","Thống nhất công việc, chi phí rõ ràng."),
             ("4","Thực hiện","Làm thủ tục, đại diện, bảo vệ quyền lợi đến cùng.")]
    s = "".join(f'<div class="step"><div class="step__num">{n}</div><h3>{t}</h3><p>{d}</p></div>' for n,t,d in steps)
    return f'<div class="steps">{s}</div>'

def stats_band():
    items = [("15+","Năm kinh nghiệm"),("500+","Vụ việc đã hỗ trợ"),("98%","Khách hàng hài lòng"),("24/7","Sẵn sàng lắng nghe")]
    s = "".join(f'<div class="stat"><div class="stat__num">{n}</div><div class="stat__label">{l}</div></div>' for n,l in items)
    return f'<section class="section--stats"><div class="container stats">{s}</div></section>'

def testimonials():
    t = [("★★★★★","Vụ tranh chấp đất nhà tôi kéo dài mấy năm, nhờ văn phòng hướng dẫn tận tình mà giải quyết xong.","H","Cô Hoa","Tây Sơn"),
         ("★★★★★","Luật sư nói chuyện dễ hiểu, thủ tục ly hôn làm nhanh gọn, chi phí rõ ràng từ đầu.","T","Anh Tuấn","Phú Phong"),
         ("★★★★★","Tôi ở xa, chỉ gọi điện mà được tư vấn rất kỹ về thừa kế. Rất đáng tin cậy.","L","Bác Lâm","Bình Định")]
    cards = "".join(f'<div class="testi"><div class="testi__stars">{st}</div><p class="testi__quote">{q}</p><div class="testi__author"><div class="testi__avatar">{av}</div><div><div class="testi__name">{nm}</div><div class="testi__loc">{lo}</div></div></div></div>' for st,q,av,nm,lo in t)
    return f'<div class="grid grid--3">{cards}</div>'

def article_cards(slugs=None):
    arts = ARTICLES if slugs is None else [ART_BY_SLUG[s] for s in slugs]
    cards = "".join(f'<a class="card post" href="{a["slug"]}.html"><div class="post__tag">{a["tag"]}</div><h3>{a["title"]}</h3><p>{a["meta"][:90]}…</p><span class="post__more">Đọc tiếp →</span></a>' for a in arts)
    return f'<div class="grid grid--3">{cards}</div>'

def booking_form():
    return f"""
      <form class="bookform" data-quickform>
        <div class="bookform__row">
          <label>Họ và tên *<input type="text" name="ten" placeholder="Nguyễn Văn A" required /></label>
          <label>Số điện thoại *<input type="tel" name="sdt" placeholder="09xx xxx xxx" required pattern="[0-9 ]{{9,15}}" inputmode="numeric" /></label>
        </div>
        <label>Lĩnh vực cần tư vấn
          <select name="linhvuc"><option>Đất đai – Nhà ở</option><option>Thừa kế – Di chúc</option><option>Hôn nhân – Gia đình</option><option>Hình sự</option><option>Dân sự – Hợp đồng</option><option>Doanh nghiệp – Lao động</option><option>Vấn đề khác</option></select>
        </label>
        <label>Mô tả ngắn vấn đề của bạn<textarea name="noidung" rows="3" placeholder="Ví dụ: Tôi muốn hỏi về tranh chấp ranh đất…"></textarea></label>
        <button type="submit" class="btn btn--gold btn--lg btn--block">📩 Gửi yêu cầu tư vấn</button>
        <p class="bookform__note">Bằng việc gửi, bạn đồng ý để văn phòng liên hệ lại với bạn.</p>
      </form>
"""

# ==========================================================================
#  TẠO TỪNG TRANG
# ==========================================================================
def build():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, "css"))
    os.makedirs(os.path.join(OUT, "js"))

    # CSS = styles.css + phần bổ sung (stats/team/pricing/testimonials) + style trang con
    with open(os.path.join(SRC, "css", "styles.css"), encoding="utf-8") as f:
        css = f.read()
    extra_path = "/tmp/extra.css"
    if os.path.exists(extra_path):
        with open(extra_path, encoding="utf-8") as f:
            css += "\n" + f.read()
    css += PAGE_CSS
    with open(os.path.join(OUT, "css", "styles.css"), "w", encoding="utf-8") as f:
        f.write(css)
    shutil.copy(os.path.join(SRC, "js", "main.js"), os.path.join(OUT, "js", "main.js"))

    pages = {}

    # ---- TRANG CHỦ ----
    home = f"""
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="hero__eyebrow">⚖ Đồng hành pháp lý cùng bà con quê mình</p>
        <h1 class="hero__title">Bảo vệ quyền lợi của bạn bằng sự tận tâm &amp; uy tín</h1>
        <p class="hero__sub">{FULL} tại <strong>Tây Sơn, Bình Định</strong> — tư vấn rõ ràng, dễ hiểu về đất đai, thừa kế, ly hôn, hình sự, dân sự và doanh nghiệp.</p>
        <div class="hero__actions">
          <a href="{tellink()}" class="btn btn--gold btn--lg" data-phone-link>📞 Gọi ngay: <span data-phone-text>{PHONE_D}</span></a>
          <a href="lien-he.html" class="btn btn--outline btn--lg">📝 Đặt lịch tư vấn</a>
        </div>
        <ul class="hero__trust"><li>✔ Tư vấn ban đầu <strong>miễn phí</strong></li><li>✔ Giữ <strong>bí mật</strong> thông tin</li><li>✔ Chi phí <strong>rõ ràng</strong></li></ul>
      </div>
      <div class="hero__card">
        <h3>Cần hỏi gấp một việc?</h3>
        <p>Để lại số điện thoại, luật sư sẽ gọi lại cho bạn sớm nhất.</p>
        <form class="quickform" data-quickform>
          <label>Họ tên<input type="text" name="ten" placeholder="Nguyễn Văn A" required /></label>
          <label>Số điện thoại<input type="tel" name="sdt" placeholder="09xx xxx xxx" required pattern="[0-9 ]{{9,15}}" inputmode="numeric" /></label>
          <button type="submit" class="btn btn--gold btn--block">Gửi yêu cầu gọi lại</button>
          <p class="quickform__note">Hoặc gọi/nhắn Zalo trực tiếp.</p>
        </form>
      </div>
    </div>
  </section>
  {stats_band()}
  <section class="section">
    <div class="container">
      <div class="section__head"><p class="section__eyebrow">Lĩnh vực tư vấn</p><h2 class="section__title">Chúng tôi hỗ trợ bạn việc gì?</h2><p class="section__lead">Bấm vào lĩnh vực để xem chi tiết chúng tôi giúp được gì.</p></div>
      {services_grid()}
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      <div class="section__head"><p class="section__eyebrow">Vì sao chọn chúng tôi</p><h2 class="section__title">Gần gũi – Tận tâm – Đáng tin cậy</h2></div>
      {whyus()}
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section__head"><p class="section__eyebrow">Khách hàng nói gì</p><h2 class="section__title">Cảm nhận của bà con</h2></div>
      {testimonials()}
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      <div class="section__head"><p class="section__eyebrow">Cẩm nang pháp luật</p><h2 class="section__title">Kiến thức hữu ích cho bạn</h2></div>
      {article_cards()}
      <div style="text-align:center;margin-top:28px"><a href="cam-nang.html" class="btn btn--ghost-maroon">Xem tất cả bài viết →</a></div>
    </div>
  </section>
  {CTA}
"""
    pages["index.html"] = page("index.html", "index.html",
        f"{FULL} – Tư vấn pháp luật tại Tây Sơn, Bình Định",
        f"{FULL} tại Tây Sơn, Bình Định. Tư vấn đất đai, thừa kế, ly hôn, hình sự, dân sự, doanh nghiệp. Gọi ngay để được luật sư tư vấn tận tình.",
        home)

    # ---- GIỚI THIỆU ----
    gt = page_header("Về chúng tôi", f"Giới thiệu {FULL}", [("index.html","Trang chủ"),(None,"Giới thiệu")]) + f"""
  <section class="section">
    <div class="container about">
      <div class="about__media"><div class="about__placeholder"><span class="about__placeholder-ic">👨‍⚖️</span><span>Ảnh luật sư / văn phòng</span></div><div class="about__badge"><strong>15+</strong><span>năm kinh nghiệm</span></div></div>
      <div class="about__content">
        <h2 class="section__title">Tận tâm – Uy tín – Gần gũi với bà con</h2>
        <p>Với nhiều năm kinh nghiệm tư vấn và tranh tụng, chúng tôi thấu hiểu những vướng mắc pháp lý thường gặp của bà con — từ đất đai, thừa kế đến hôn nhân, dân sự. Phương châm của văn phòng là <strong>lắng nghe tận tâm, tư vấn dễ hiểu và bảo vệ quyền lợi của khách hàng đến cùng</strong>.</p>
        <ul class="about__list"><li>Hơn <strong>15</strong> năm kinh nghiệm tư vấn &amp; tranh tụng</li><li>Thành viên <strong>Đoàn Luật sư địa phương</strong></li><li>Đã đồng hành cùng <strong>hàng trăm</strong> vụ việc</li><li>Giữ <strong>bí mật</strong> thông tin tuyệt đối</li></ul>
        <div class="about__actions"><a href="lien-he.html" class="btn btn--gold">📝 Đặt lịch gặp luật sư</a><a href="{tellink()}" class="btn btn--ghost-maroon" data-phone-link>📞 Gọi tư vấn</a></div>
      </div>
    </div>
  </section>
  <section class="section section--alt"><div class="container"><div class="section__head"><p class="section__eyebrow">Đội ngũ</p><h2 class="section__title">Luật sư &amp; cộng sự</h2></div>
    <div class="grid grid--3">
      <div class="member"><div class="member__photo">👨‍⚖️</div><div class="member__body"><h3>Luật sư [Họ và tên]</h3><p class="member__role">Trưởng Văn phòng</p><p class="member__desc">Hơn 15 năm kinh nghiệm đất đai, dân sự, hình sự.</p></div></div>
      <div class="member"><div class="member__photo">👩‍⚖️</div><div class="member__body"><h3>Luật sư [Họ và tên]</h3><p class="member__role">Luật sư cộng sự</p><p class="member__desc">Chuyên hôn nhân – gia đình và thừa kế.</p></div></div>
      <div class="member"><div class="member__photo">🧑‍💼</div><div class="member__body"><h3>Chuyên viên [Họ và tên]</h3><p class="member__role">Chuyên viên pháp lý</p><p class="member__desc">Hỗ trợ soạn thảo hồ sơ, thủ tục hành chính.</p></div></div>
    </div></div></section>
  <section class="section"><div class="container"><div class="section__head"><p class="section__eyebrow">Vì sao chọn chúng tôi</p><h2 class="section__title">Giá trị chúng tôi mang lại</h2></div>{whyus()}</div></section>
  {CTA}
"""
    pages["gioi-thieu.html"] = page("gioi-thieu.html","gioi-thieu.html",
        f"Giới thiệu – {FULL}",
        f"Giới thiệu {FULL} tại Tây Sơn, Bình Định: đội ngũ luật sư giàu kinh nghiệm, tận tâm, uy tín, gần gũi với bà con.", gt)

    # ---- DỊCH VỤ (tổng) ----
    dv = page_header("Dịch vụ pháp lý", "Lĩnh vực tư vấn &amp; dịch vụ", [("index.html","Trang chủ"),(None,"Dịch vụ")]) + f"""
  <section class="section"><div class="container">
    <div class="section__head"><p class="section__lead">Đầy đủ các lĩnh vực pháp lý thường gặp của bà con và doanh nghiệp. Bấm vào từng mục để xem chi tiết.</p></div>
    {services_grid()}
  </div></section>
  <section class="section section--alt"><div class="container"><div class="section__head"><p class="section__eyebrow">Quy trình</p><h2 class="section__title">4 bước đơn giản</h2></div>{process()}</div></section>
  {CTA}
"""
    pages["dich-vu.html"] = page("dich-vu.html","dich-vu.html",
        f"Dịch vụ pháp lý – {FULL}",
        "Các lĩnh vực tư vấn: đất đai, thừa kế, hôn nhân – gia đình, hình sự, dân sự, doanh nghiệp – lao động tại Tây Sơn, Bình Định.", dv)

    # ---- TỪNG TRANG DỊCH VỤ ----
    for s in SERVICES:
        items = "".join(f"<li>{i}</li>" for i in s["items"])
        related = ""
        if s["related"]:
            related = '<section class="section section--alt"><div class="container"><div class="section__head"><h2 class="section__title">Bài viết liên quan</h2></div>' + article_cards(s["related"]) + '</div></section>'
        ld_service = ('{"@context":"https://schema.org","@type":"Service","serviceType":"%s","provider":{"@type":"LegalService","name":"%s"},"areaServed":"Tây Sơn, Bình Định"}' % (s["name"], FULL))
        content = page_header("Dịch vụ", s["h1"], [("index.html","Trang chủ"),("dich-vu.html","Dịch vụ"),(None,s["name"])]) + f"""
  <section class="section"><div class="container container--narrow article__body">
    <p style="font-size:18px">{s['intro']}</p>
    <h2>Chúng tôi hỗ trợ những gì?</h2>
    <ul>{items}</ul>
    <h2>Quy trình làm việc</h2>
    <p>Bạn chỉ cần liên hệ và kể vắn tắt sự việc — chúng tôi tư vấn miễn phí lần đầu, báo phí rõ ràng rồi mới thực hiện. Xem chi tiết <a href="dich-vu.html">các dịch vụ</a> hoặc <a href="bang-phi.html">bảng phí tham khảo</a>.</p>
    <div class="article__cta"><h3>Cần tư vấn về {s['name'].lower()}?</h3><p>Gọi ngay để được luật sư hướng dẫn cụ thể cho trường hợp của bạn.</p><a href="{tellink()}" class="btn btn--gold btn--lg" data-phone-link>📞 Gọi: <span data-phone-text>{PHONE_D}</span></a></div>
  </div></section>
  {related}
"""
        pages[s["slug"] + ".html"] = page(s["slug"] + ".html","dich-vu.html",
            f"{s['name']} – {FULL}", s["meta"], content, extra_ld=ld_service)

    # ---- BẢNG PHÍ ----
    bp = page_header("Chi phí dịch vụ", "Bảng phí tham khảo", [("index.html","Trang chủ"),(None,"Bảng phí")]) + f"""
  <section class="section"><div class="container">
    <div class="section__head"><p class="section__lead">Mức phí minh bạch, thống nhất trước khi làm. Phí cụ thể tùy theo tính chất từng vụ việc.</p></div>
    <div class="pricing">
      <div class="price-card"><h3>Tư vấn pháp luật</h3><div class="price-card__price">Miễn phí</div><p class="price-card__note">Lần tư vấn đầu tiên</p><ul><li>Nghe &amp; phân tích vụ việc</li><li>Chỉ rõ hướng giải quyết</li><li>Tư vấn qua điện thoại / Zalo</li><li>Hẹn gặp tại văn phòng</li></ul><a href="lien-he.html" class="btn btn--ghost-maroon btn--block">Nhận tư vấn</a></div>
      <div class="price-card price-card--featured"><span class="price-card__badge">Được chọn nhiều</span><h3>Soạn thảo hồ sơ</h3><div class="price-card__price">Từ 300.000đ</div><p class="price-card__note">Tùy loại giấy tờ</p><ul><li>Soạn đơn từ, hợp đồng</li><li>Di chúc, văn bản thỏa thuận</li><li>Hồ sơ khởi kiện, khiếu nại</li><li>Rà soát giấy tờ pháp lý</li></ul><a href="lien-he.html" class="btn btn--gold btn--block">Đặt dịch vụ</a></div>
      <div class="price-card"><h3>Luật sư đại diện</h3><div class="price-card__price">Theo vụ việc</div><p class="price-card__note">Báo phí trọn gói</p><ul><li>Đại diện làm thủ tục</li><li>Tham gia hòa giải, tranh tụng</li><li>Bảo vệ quyền lợi tại tòa</li><li>Theo sát đến khi xong việc</li></ul><a href="lien-he.html" class="btn btn--ghost-maroon btn--block">Yêu cầu báo phí</a></div>
    </div>
    <p class="pricing-note">* Mức phí trên chỉ mang tính tham khảo. Văn phòng luôn báo giá rõ ràng và thống nhất với khách hàng trước khi thực hiện.</p>
  </div></section>
  {CTA}
"""
    pages["bang-phi.html"] = page("bang-phi.html","bang-phi.html",
        f"Bảng phí tham khảo – {FULL}",
        "Bảng phí dịch vụ pháp lý tham khảo: tư vấn miễn phí lần đầu, soạn thảo hồ sơ từ 300.000đ, luật sư đại diện báo phí theo vụ việc.", bp)

    # ---- CẨM NANG ----
    cn = page_header("Cẩm nang pháp luật", "Cẩm nang pháp luật", [("index.html","Trang chủ"),(None,"Cẩm nang")]) + f"""
  <section class="section"><div class="container">
    <div class="section__head"><p class="section__lead">Những bài viết giải thích luật bằng lời dễ hiểu, áp dụng được ngay.</p></div>
    {article_cards()}
  </div></section>
  {CTA}
"""
    pages["cam-nang.html"] = page("cam-nang.html","cam-nang.html",
        f"Cẩm nang pháp luật – {FULL}",
        "Cẩm nang pháp luật dễ hiểu: thủ tục ly hôn, tranh chấp đất đai, làm di chúc và nhiều chủ đề hữu ích cho bà con.", cn)

    # ---- TỪNG BÀI VIẾT ----
    for a in ARTICLES:
        ld_article = ('{"@context":"https://schema.org","@type":"Article","headline":"%s","author":{"@type":"Organization","name":"%s"}}' % (a["title"].replace('"','\''), FULL))
        content = page_header(a["tag"], a["title"], [("index.html","Trang chủ"),("cam-nang.html","Cẩm nang"),(None,a["tag"])]) + f"""
  <article class="section"><div class="container container--narrow article__body">
    {a['body']}
    <div class="article__cta"><h3>Bạn cần tư vấn về vấn đề này?</h3><p>Gọi cho chúng tôi để được hướng dẫn cụ thể — lần đầu miễn phí.</p><a href="lien-he.html" class="btn btn--gold btn--lg">📝 Đặt lịch tư vấn miễn phí</a></div>
    <p style="margin-top:28px"><a href="cam-nang.html">← Quay lại Cẩm nang</a></p>
  </div></article>
"""
        pages[a["slug"] + ".html"] = page(a["slug"] + ".html","cam-nang.html",
            f"{a['title']} – {FULL}", a["meta"], content, extra_ld=ld_article)

    # ---- LIÊN HỆ ----
    lh = page_header("Liên hệ", "Liên hệ với chúng tôi", [("index.html","Trang chủ"),(None,"Liên hệ")]) + f"""
  <section class="section"><div class="container">
    <div class="contact">
      <div class="contact__info">
        <a class="contact__item" href="{tellink()}" data-phone-link><span class="contact__ic">📞</span><span><small>Điện thoại / Zalo</small><strong data-phone-text>{PHONE_D}</strong></span></a>
        <a class="contact__item" href="mailto:{EMAIL}" data-email-link><span class="contact__ic">✉️</span><span><small>Email</small><strong data-email-text>{EMAIL}</strong></span></a>
        <div class="contact__item"><span class="contact__ic">📍</span><span><small>Địa chỉ</small><strong>{ADDR}</strong></span></div>
        <div class="contact__item"><span class="contact__ic">🕑</span><span><small>Giờ làm việc</small><strong>Thứ 2 – Thứ 7: 7h30 – 18h00</strong></span></div>
        <div class="contact__socials"><a href="#" class="btn btn--ghost-maroon" data-fanpage-link>📘 Facebook</a><a href="#" class="btn btn--gold" data-zalo-link>💬 Nhắn Zalo</a></div>
      </div>
      <div class="contact__map"><iframe title="Bản đồ văn phòng" src="https://www.google.com/maps?q=T%C3%A2y%20S%C6%A1n%2C%20B%C3%ACnh%20%C4%90%E1%BB%8Bnh&output=embed" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
    <div class="section__head" style="margin-top:50px"><p class="section__eyebrow">Đặt lịch tư vấn</p><h2 class="section__title">Để lại thông tin, chúng tôi gọi lại</h2></div>
    <div class="container--narrow" style="padding:0">{booking_form()}</div>
  </div></section>
"""
    pages["lien-he.html"] = page("lien-he.html","lien-he.html",
        f"Liên hệ – {FULL}",
        f"Liên hệ {FULL} tại Tây Sơn, Bình Định. Gọi {PHONE_D} hoặc để lại thông tin để được tư vấn pháp luật miễn phí.", lh)

    # ---- Ghi file ----
    for fn, content in pages.items():
        with open(os.path.join(OUT, fn), "w", encoding="utf-8") as f:
            f.write(content)

    # ---- sitemap.xml & robots.txt ----
    urls = "".join(f"<url><loc>{fn}</loc></url>" for fn in pages)
    with open(os.path.join(OUT, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + '</urlset>\n')
    with open(os.path.join(OUT, "robots.txt"), "w", encoding="utf-8") as f:
        f.write("User-agent: *\nAllow: /\nSitemap: sitemap.xml\n")

    print(f"Đã tạo {len(pages)} trang vào {OUT}")
    for fn in pages:
        print("  -", fn)


PAGE_CSS = """
/* ===== Tiêu đề trang con (đa trang) ===== */
.page-head { background: linear-gradient(135deg, var(--maroon-dark), var(--maroon)); color:#fff; padding: 38px 0 34px; }
.page-head .breadcrumb { color: var(--gold-light); font-size: 14.5px; margin-bottom: 12px; }
.page-head .breadcrumb a { color: var(--gold-light); }
.page-head__eyebrow { color: var(--gold-light); font-weight:600; text-transform:uppercase; letter-spacing:1.2px; font-size:13px; margin-bottom:6px; }
.page-head h1 { color:#fff; font-size: clamp(1.7rem, 2.4vw + 1rem, 2.4rem); }
.nav a[aria-current="page"] { color: var(--gold-light); background: rgba(255,255,255,.12); }
"""

if __name__ == "__main__":
    build()
