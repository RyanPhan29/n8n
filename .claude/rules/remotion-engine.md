---
description: Quy tắc khi đụng vào engine Remotion của video factory
paths: ["video-factory/remotion-demo/src/**"]
---

# Engine Remotion — ĐÃ KHÓA

- **KHÔNG sửa** engine: `Kit.tsx`, `Blocks.tsx`, `Short.tsx`, `Root.tsx`, `fonts.css`. Chỉ sửa `Specs.tsx` / `ShortSpecs.tsx` (thêm spec).
- Sửa engine CHỈ khi vá bug layout thật (tràn viền / đè Anh Hai / mồ côi chữ). Sau khi vá: giữ tối giản, cập nhật SKILL, khóa lại.
- Chữ Việt CHỈ do component render (không để AI/ảnh chứa chữ Việt — hỏng dấu).
- Bảng màu & 23 pose Anh Hai là bất biến. Anh Hai góc/đáy, THỨ YẾU; nội dung chính luôn ở giữa.
- Render phải qua headless_shell: `--browser-executable="$HS"`. Node_modules chỉ có ở bản scratchpad.
- Bố cục dài: title trên → caption ngay dưới title → nội dung giữa → Anh Hai phải → đáy chừa cho phụ đề. Title tự shrink + `text-wrap:balance` + né Anh Hai ở cảnh center.

## COVER / THUMBNAIL — MẪU KHÓA (mọi video/short BẮT ĐẦU bằng cover)
- **Cảnh 0 LUÔN là `cover(...)`** (helper trong `ShortSpecs.tsx`). Frame đầu = ẢNH BÌA luôn, khỏi thiết kế thumbnail tay.
- Công thức khóa: **dòng1 (đen) + KEYWORD (đỏ) + dòng3 (đen)** chữ TO (size 122) chiếm ~1/2 khung trên → **pill HOOK (navy)** → **Anh Hai cảm xúc** (shock/sly/greedy/worried) nửa dưới.
- Ràng buộc chữ: mỗi dòng head **≤ ~10 ký tự**, hook **≤ ~26 ký tự** (không tràn viền khi size lớn). Từ khóa muốn nhấn → cho vào dòng 2 (đỏ).
- Cú pháp: `scenes: [ cover('DÒNG 1','KEYWORD','DÒNG 3','Hook phụ đề', 'shock'), …các cảnh nội dung ]`
- Giữ cover **~1.2–1.5s** (d mặc định 40 frame) rồi vào nội dung. KHÔNG bỏ cover.
- **Xuất thumbnail:** `remotion still <slug> out/<slug>_THUMB.png --frame=20 --browser-executable="$HS"` → PNG bìa 1080×1920.
- Helper `cover()` chỉ dùng field có sẵn (head/label/pose) → KHÔNG tính là sửa engine.
