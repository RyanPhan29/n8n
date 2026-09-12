# Faceless YouTube Audit — pipeline khảo sát 100 kênh

Bộ script kéo data gốc YouTube bằng **yt-dlp** (KHÔNG cần API key), phục vụ báo cáo
`KHUNG_KHAOSAT_faceless_youtube.md`. Chạy được **khi network policy đã mở** `youtube.com`,
`*.googlevideo.com`, `i.ytimg.com` (mặc định sandbox chặn — xem log `/__agentproxy/status`).

## Cài
```bash
pip install -q yt-dlp        # đã test cài được qua pypi trong sandbox
```

## Chạy (tuần tự)
```bash
cd video-factory/tools/faceless_audit
python3 audit.py discover seeds.txt   # -> data/channels.json  (kênh sub 10k-100k)
python3 audit.py collect              # -> data/videos.jsonl   (30 video gần nhất/kênh)
python3 audit.py analyze              # -> data/report_tables.md + faceless_audit.csv
python3 audit.py subs 40              # -> data/subs/*.vtt      (phụ đề 40 video breakout)
python3 audit.py thumbs 40            # -> data/thumbs/*.jpg + contact_sheet.html
```

## Thiết kế tốc độ / chống rate-limit
- `discover` + `collect` dùng `--flat-playlist` → 1 request/kênh cho danh sách video (nhanh, nhẹ).
- Chỉ `subs`/`thumbs`/enrich trên **nhóm breakout** (mặc định top 40) để tiết kiệm request.
- Mọi bước log số vào/ra để tái lập khung mẫu. Lỗi từng item không làm gãy pipeline.

## Tinh chỉnh
- Ngưỡng sub: sửa `SUB_MIN/SUB_MAX` trong `audit.py`.
- Số video/kênh: `N_VIDEOS`.
- Seeds: sửa `seeds.txt` (mỗi dòng 1 query; `#` = ghi chú). Hiện gồm cả VN + nhóm faceless global.

## Output (đưa vào báo cáo)
- `data/faceless_audit.csv` — dataset đầy đủ (title features + velocity + breakout).
- `data/report_tables.md` — bảng đặc trưng title→view + top 50 breakout (auto).
- `data/subs/` — phụ đề để bóc hook/retention.
- `data/contact_sheet.html` — lưới thumbnail top-performer để mã hoá thị giác.

> Lưu ý: `data/` được gitignore (nặng + nhiều item). Commit báo cáo tổng hợp, không commit raw dump.
