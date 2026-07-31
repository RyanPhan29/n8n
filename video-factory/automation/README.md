# Xưởng Chuyện Tiền — Tự động hoá (n8n + GitHub + Vbee + Claude)

> POC bán tự động **2 cửa duyệt**. Anh đi từ *"thu giọng + build + chờ"* → chỉ còn *"gật kịch bản → liếc thành phẩm → đăng"*.
> ⚠️ Đây là **khung POC** — cần import vào n8n, cắm credential, và chạy thử 1 vòng. Chưa test end-to-end (em không chạy được n8n trong sandbox).

## Luồng tổng thể

```
[n8n] Lịch/thủ công
   └─► RSS VnExpress KD  ─► lọc tin mới, chưa làm
        └─► Claude API: viết KỊCH BẢN Vbee (prose sạch, số khoảng, có nguồn)
             └─► Telegram  🚪 CỬA 1: anh /approve hay /edit
                  └─► Vbee API: kịch bản → file .mp3 (giọng nam Bắc)   ⭐
                       └─► GitHub: commit .mp3 + kích Action "render-short"
                            └─► [GitHub Action] Claude Code: viết Spec → render →
                                 subgen → export_master (-14 LUFS) → commit master
                                 └─► gọi webhook n8n báo "xong"
                                      └─► Telegram  🚪 CỬA 2: gửi master + SEO
                                           └─► anh ĐĂNG
```

## File trong folder này
- `chuyentien_poc.n8n.json` — workflow n8n (import vào n8n: *Workflows → Import from File*).
- `../../.github/workflows/render-short.yml` — Action render khi n8n kích (repository_dispatch).
- `env.example` — danh sách biến/credential cần khai.

## Credential cần cắm (một lần)
| Tên | Dùng ở | Lấy ở đâu |
|---|---|---|
| `ANTHROPIC_API_KEY` | Node Claude (viết kịch bản) | console.anthropic.com |
| `VBEE_APP_ID` + `VBEE_TOKEN` | Node Vbee TTS | Dashboard Vbee của anh (mục API) |
| `VBEE_VOICE_CODE` | Node Vbee | Mã giọng **nam Bắc** anh đang dùng (vd `hn_male_...`) |
| `GITHUB_TOKEN` (repo scope) | Node commit + dispatch | github.com → Settings → Developer → Tokens |
| `TELEGRAM_BOT_TOKEN` + `CHAT_ID` | 2 cửa duyệt | @BotFather tạo bot |

## Cách 2 cửa duyệt hoạt động
- n8n dùng node **Wait (resume on webhook)**: gửi Telegram kèm 2 nút *Approve / Edit* → n8n **dừng chờ** đến khi anh bấm → chạy tiếp.
- Cửa 1 = duyệt **kịch bản** (quan trọng nhất — chốt trung lập/số liệu).
- Cửa 2 = liếc **thành phẩm** trước khi đăng (bắt lỗi layout/nhạy cảm).

## Vbee API — chỗ cần anh xác nhận theo doc của anh
Node `Vbee TTS` đang để **mẫu** (endpoint + field theo pattern Vbee AI Voice). Anh mở doc API trong dashboard Vbee, đối chiếu và sửa cho khớp:
```jsonc
POST https://vbee.vn/api/v1/tts            // TODO: đúng endpoint của gói anh
Headers: Authorization: Bearer {{VBEE_TOKEN}}
Body: {
  "app_id":     "{{VBEE_APP_ID}}",
  "input_text": "{{ $json.script }}",       // kịch bản đã duyệt
  "voice_code": "{{VBEE_VOICE_CODE}}",      // giọng nam Bắc
  "audio_type": "mp3",
  "bitrate":    128,
  "speed_rate": "1.0"
}
// Trả về: link .mp3 (sync) hoặc request_id để poll (indirect) — tuỳ gói.
```

## Ranh giới thật (đừng kỳ vọng full-auto)
1. **Still-check layout khó auto 100%** → giữ Cửa 2.
2. **Chủ đề nhạy cảm** (đại án, chính trị) → người gác ở Cửa 1, không auto đăng.
3. **Render cần môi trường** (chromium + node_modules). Trên GitHub Action (internet thật) tải chromium OK; trong sandbox này thì bị 403 nên phải dùng chromium cài sẵn.

## Bước tiếp
1. Anh import `chuyentien_poc.n8n.json` vào n8n.
2. Cắm credential ở bảng trên.
3. Sửa node `Vbee TTS` cho khớp doc Vbee.
4. Chạy thử Manual 1 vòng với 1 tin → báo em lỗi ở đâu, em chỉnh workflow.
