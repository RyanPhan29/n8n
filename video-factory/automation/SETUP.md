# SETUP — Runbook bàn giao (cho Cowork / người thao tác)

> Mục tiêu: đưa POC `chuyentien_poc.n8n.json` chạy được 1 vòng. Ai làm cũng theo được (Cowork tự thao tác, hoặc anh Hai bấm tay).
> ⚠️ **Secret**: người thao tác nhập giá trị thật lúc cắm — **KHÔNG ghi vào bất kỳ file nào trong repo**.

## 0) Chuẩn bị (cần có)
- n8n đang chạy (Cloud hoặc self-host). Nếu chưa có → dựng nhanh: `docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`
- Các secret trong tay: `VBEE_APP_ID`, `VBEE_TOKEN`, `VBEE_VOICE_CODE`, `ANTHROPIC_API_KEY`, `GITHUB_TOKEN` (scope repo+workflow), Telegram bot token + chat_id.

## A) Import workflow vào n8n
1. Tải file `video-factory/automation/chuyentien_poc.n8n.json` từ repo.
2. n8n → **Workflows → Import from File** → chọn file.
3. Workflow "Chuyện Tiền — POC bán tự động (2 cửa duyệt · đa nguồn)" hiện ra.

## B) Cắm biến (n8n → Settings → Variables)
Thêm đúng các key sau (giá trị thật):
`VBEE_APP_ID`, `VBEE_TOKEN`, `VBEE_VOICE_CODE`, `ANTHROPIC_API_KEY`, `GITHUB_TOKEN`,
`TELEGRAM_CHAT_ID`, `N8N_RENDER_CALLBACK` (điền ở bước E).

## C) GitHub (render Action đã có sẵn trong repo)
1. Repo → Settings → **Secrets and variables → Actions** → New secret: `ANTHROPIC_API_KEY`.
2. File `.github/workflows/render-short.yml` đã có sẵn — không cần tạo. n8n sẽ kích nó qua `repository_dispatch`.

## D) Telegram (2 cửa duyệt)
1. Chat với **@BotFather** → `/newbot` → lấy **bot token**.
2. Node **Telegram · Cửa 1/Cửa 2** → tạo Credential Telegram, dán bot token.
3. Lấy **chat_id**: nhắn cho bot 1 tin, mở `https://api.telegram.org/bot<TOKEN>/getUpdates` → copy `chat.id` → điền biến `TELEGRAM_CHAT_ID`.

## E) Nối webhook cửa duyệt + callback render
1. Mở node **⏸ Chờ render xong** → chế độ *Resume: On webhook call* → copy **Production URL** → dán vào biến `N8N_RENDER_CALLBACK` (Action sẽ gọi về đây khi render xong).
2. Node **⏸ Chờ duyệt Cửa 1** cũng *Resume on webhook* → đây là link "Approve". Cách đơn giản: gắn link resume này thành nút bấm trong tin Telegram Cửa 1 (reply_markup → inline_keyboard). *(Phần nút bấm hơi fiddly — nếu vướng, báo Anh Hai/Claude repo để chỉnh chính xác reply_markup.)*

## F) Chỉnh node Vbee cho khớp gói thật
1. Chạy thử riêng node **Vbee · sinh giọng** với 1 câu ngắn.
2. Xem response:
   - Nếu trả **`result.audio_link`** ngay → OK (node đang set `response_type: direct`).
   - Nếu chỉ trả **`request_id`** (indirect) → cần thêm 1 node HTTP poll `GET .../tts/{request_id}` tới khi có link. Báo Claude repo để thêm.

## G) Chạy thử 1 vòng
1. Bấm **▶ Chạy thử (Manual)**.
2. Kỳ vọng: quét RSS đa nguồn → Claude ra kịch bản → Telegram gửi Cửa 1 (kèm shortlist) → (approve) → Vbee ra mp3 → kích Action render → (Action xong gọi về) → Telegram Cửa 2 gửi link master.
3. Chỗ nào đỏ: chụp node lỗi + copy message → gửi về repo, Claude sửa workflow.

## Checklist nghiệm thu
- [ ] Import OK, không node nào báo thiếu credential.
- [ ] Manual run: RSS ra tin, Claude ra kịch bản.
- [ ] Telegram Cửa 1 nhận được tin.
- [ ] Vbee trả link mp3 (hoặc đã thêm node poll).
- [ ] Action render chạy (tab Actions trên GitHub thấy job `render-short`).
- [ ] Telegram Cửa 2 nhận link thành phẩm.

> 🔁 Sau khi chạy được: **tạo lại token Vbee mới** (token cũ đã lộ qua chat) và cập nhật biến `VBEE_TOKEN`.
