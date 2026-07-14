---
name: chuyen-tien-short-sosanh
description: TEM KHÓA — Dựng SHORT SO SÁNH dọc 9:16 (X vs Y) cho kênh "Chuyện Tiền · Anh Hai Kể", dùng card 2D + badge VS animate. Dùng khi muốn 1 short đối chiếu 2 lựa chọn/khái niệm. Chỉ VIẾT SPEC, KHÔNG sửa engine.
---

# TEM 2 — SHORT SO SÁNH (9:16)

> TEM ĐÃ KHÓA. Sản xuất = điền spec, KHÔNG sửa code.

## Thành phẩm
- 1080×1920, 9:16. Nền giấy động. **Nội dung chính (card so sánh) LUÔN Ở GIỮA**; Anh Hai căn giữa đáy, full người, THỨ YẾU (chỉ tạo cảm xúc). SFX + SAFE ZONE.
- Ý tưởng: đối chiếu 2 phương án bằng **2 card 2D** (header màu + icon emoji + nhãn), có **badge "VS" đỏ nảy** ở giữa, card "thắng" phát sáng + icon đập + trôi nhẹ. Card "thua" để `dim:true` (xám mờ).

## File
- Engine (KHÓA): `video-factory/remotion-demo/src/Short.tsx`, `Kit.tsx`, assets (`public/ah`, `public/sfx`, `public/paper_bg.mp4`).
- **CHỈ SỬA**: `video-factory/remotion-demo/src/ShortSpecs.tsx` — thêm `ShortSpec` vào `ALL_SHORTS`.

## Bố cục KHÓA (safe zone TikTok/Reels/Shorts)
- Chừa **đáy ~360px** (caption/tên/nhạc), **phải ~130px** (nút like/cmt/share), **đỉnh ~120px** (thanh UI). Đã khóa trong `SZ` — không cần chỉnh.
- Nội dung/số/card ở GIỮA khung an toàn; Anh Hai căn giữa đáy (không lẹm).

## Công thức 3-4 cảnh
1. **Hook** (`head` + `icon` metaphor): nêu vấn đề/2 phe.
2. **CARD SO SÁNH** (`cards`): 2 card đối chiếu — đây là cảnh chính.
3. (tùy chọn) chốt ý bằng `label` hoặc `stat`.
4. **Câu hỏi** (`q`): kéo comment.

## Trường VBlock hay dùng
`d`(frame), `bar`, `head:Seg[]`, `size`, `pose`, `ahH`(cao Anh Hai), `icon`(emoji)/`iconTop`/`iconSize`, `value/suffix/decimals/numColor/numTop/numSize`, `label:Seg[]`/`labelTop`/`labelC`, `q:Seg[]`, `ah:false`(ẩn Anh Hai).
- **`cards`**: mảng `{header, icon, label, c, dim}`. Đúng 2 phần tử → tự chèn badge VS + animate. `dim:true` = phe thua (xám).
- `Seg` = `'chữ'` | `{t:'chữ', c:'teal'}`.

## Ví dụ cảnh card (mẫu đã chạy)
```ts
{d: 173, bar: 'teal', pose: 'aha', ahH: 600,
 head: ['Bí mật là ', {t: 'THỜI GIAN', c: 'teal'}], size: 82,
 cards: [
   {header: 'BẮT ĐẦU SỚM', icon: '🌱', label: 'Lời chồng lời', c: 'teal'},
   {header: 'ĐỂ TRỄ', icon: '🐌', label: 'Thiệt đủ đường', c: 'gray', dim: true},
 ], cardsTop: 440}
```

## Quy trình
1. Viết script ~25-40s (hook độc lập + kết bằng CÂU HỎI), prose sạch cho Vbee.
2. Anh thu Vbee.
3. `python3 video-factory/tools/autotime.py <mp3> <N>` (N=3-4). Nếu short pacing nhanh, dò khoảng lặng ngưỡng thấp (silencedetect d=0.22) rồi chọn ranh câu thủ công.
4. Viết `ShortSpec` trong `ShortSpecs.tsx`, thêm vào `ALL_SHORTS`.
5. Render + mux (lệnh giống Tem 3).

## Anh Hai, màu, pose, giờ đăng, bất biến
→ Giống Tem 1 (`chuyen-tien-longform`). Anh Hai ở đây **căn giữa đáy** (cx), full người, thứ yếu. Nội dung KHÔNG bao giờ để Anh Hai che.
