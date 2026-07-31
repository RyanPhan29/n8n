#!/usr/bin/env bash
# ============================================================================
# overlay_chart.sh — Ghép 1 ẢNH (biểu đồ) vào 1 ĐOẠN của short + mux giọng + loudnorm -14 LUFS.
# Dùng cho cảnh "biểu đồ" (spec để ah:false, chừa giữa trống).
#
# Dùng: bash overlay_chart.sh <raw.mp4> <giong.mp3> <chart.png> <t_start> <t_end> <out.mp4>
#   t_start/t_end = giây (đầu→cuối cảnh biểu đồ, tính từ frame cảnh / 30).
# ============================================================================
set -e
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
[ -x "$FF" ] || FF="ffmpeg"   # máy khác không có imageio-ffmpeg → dùng ffmpeg hệ thống
RAW="$1"; VOICE="$2"; CHART="$3"; A="$4"; B="$5"; OUT="$6"
[ -z "$OUT" ] && { echo "Dùng: bash overlay_chart.sh <raw.mp4> <giong.mp3> <chart.png> <t_start> <t_end> <out.mp4>"; exit 1; }

AMIX="[1:a]volume=1.15[vo];[0:a][vo]amix=inputs=2:duration=first:normalize=0"

echo "== pass1: đo loudness =="
MEAS=$("$FF" -i "$RAW" -i "$VOICE" -filter_complex "${AMIX},loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json[a]" -map "[a]" -f null - 2>&1)
MI=$(echo "$MEAS"|grep '"input_i"'|grep -oE '\-?[0-9.]+'); MTP=$(echo "$MEAS"|grep '"input_tp"'|grep -oE '\-?[0-9.]+')
MLRA=$(echo "$MEAS"|grep '"input_lra"'|grep -oE '\-?[0-9.]+'); MTH=$(echo "$MEAS"|grep '"input_thresh"'|grep -oE '\-?[0-9.]+')
MOFF=$(echo "$MEAS"|grep '"target_offset"'|grep -oE '\-?[0-9.]+')
LN="loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$MI:measured_TP=$MTP:measured_LRA=$MLRA:measured_thresh=$MTH:offset=$MOFF:linear=true"

echo "== pass2: overlay chart ${A}s–${B}s + master =="
"$FF" -y -i "$RAW" -i "$VOICE" -i "$CHART" -filter_complex \
"[2:v]scale=1040:-1[ch];[0:v][ch]overlay=(W-w)/2:685:enable='between(t,${A},${B})'[v];${AMIX},${LN}[a]" \
-map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p \
-c:a aac -b:a 256k -ar 48000 -ac 2 -movflags +faststart "$OUT"

echo "XONG: $OUT"
"$FF" -i "$OUT" -af loudnorm=print_format=summary -f null - 2>&1 | grep "Input Integrated" || true
