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
