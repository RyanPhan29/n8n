#!/usr/bin/env bash
# ============================================================================
# EXPORT PRESET KHÓA — 1 công thức xuất bản duy nhất cho kênh Chuyện Tiền.
# Sửa 3 lỗi export: (1) loudness -14 LUFS, (2) bitrate master cao cho YouTube,
# (5) chuẩn cố định 1080p / 48kHz stereo (hết lẫn lộn preset).
#
# Dùng: bash export_master.sh <raw.mp4> <giong.mp3> <phude.ass> <slug>
#   -> out/<slug>_YT_MASTER.mp4   (UP YOUTUBE: 1080p CRF18, -14 LUFS, 48k stereo)
#   -> out/<slug>_SUB30.mp4       (gửi nhanh/mobile: tốt nhất dưới ~28MB, cùng loudness)
# ============================================================================
set -e
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
RAW="$1"; VOICE="$2"; ASS="$3"; SLUG="$4"
OUT="$(dirname "$RAW")"
[ -z "$SLUG" ] && { echo "Dùng: bash export_master.sh <raw.mp4> <giong.mp3> <phude.ass> <slug>"; exit 1; }

# ---- CHUẨN KHÓA ----
LUFS_I=-14; LUFS_TP=-1.5; LUFS_LRA=11   # chuẩn nền tảng (YouTube/FB/TikTok ~ -14 LUFS)
VOL=1.15                                # gain giọng trước khi mix SFX
CRF=18                                   # master YouTube: bitrate cao, giữ đường mảnh/chữ nhỏ
AMIX="[1:a]volume=$VOL[vo];[0:a][vo]amix=inputs=2:duration=first:normalize=0"

echo "== [1/3] Đo loudness (loudnorm pass 1) =="
MEAS=$("$FF" -i "$RAW" -i "$VOICE" -filter_complex "${AMIX},loudnorm=I=$LUFS_I:TP=$LUFS_TP:LRA=$LUFS_LRA:print_format=json[a]" -map "[a]" -f null - 2>&1)
MI=$(echo "$MEAS"  | grep '"input_i"'      | grep -oE '\-?[0-9.]+')
MTP=$(echo "$MEAS" | grep '"input_tp"'     | grep -oE '\-?[0-9.]+')
MLRA=$(echo "$MEAS"| grep '"input_lra"'    | grep -oE '\-?[0-9.]+')
MTH=$(echo "$MEAS" | grep '"input_thresh"' | grep -oE '\-?[0-9.]+')
MOFF=$(echo "$MEAS"| grep '"target_offset"'| grep -oE '\-?[0-9.]+')
echo "   input_i=$MI  tp=$MTP  lra=$MLRA  thresh=$MTH  offset=$MOFF"
LN="loudnorm=I=$LUFS_I:TP=$LUFS_TP:LRA=$LUFS_LRA:measured_I=$MI:measured_TP=$MTP:measured_LRA=$MLRA:measured_thresh=$MTH:offset=$MOFF:linear=true"

echo "== [2/3] MASTER YouTube (1080p CRF$CRF, -14 LUFS 2-pass, 48k stereo) =="
"$FF" -y -i "$RAW" -i "$VOICE" -filter_complex "[0:v]subtitles=$ASS[v];${AMIX},${LN}[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf $CRF -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 256k -ar 48000 -ac 2 -movflags +faststart "$OUT/${SLUG}_YT_MASTER.mp4"

echo "== [3/3] Bản gửi nhanh dưới ~28MB (CRF thích ứng, cùng loudness) =="
# CRF cao hơn cho vừa kênh chat; đồ hoạ phẳng nên vẫn sắc. KHÔNG dùng cho YouTube.
"$FF" -y -i "$OUT/${SLUG}_YT_MASTER.mp4" -c:v libx264 -crf 25 -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart "$OUT/${SLUG}_SUB30.mp4"

echo ""
echo "XONG:"
echo "  YouTube master : $OUT/${SLUG}_YT_MASTER.mp4  ($(( $(stat -c%s "$OUT/${SLUG}_YT_MASTER.mp4")/1048576 ))MB)"
echo "  Gửi nhanh 30MB : $OUT/${SLUG}_SUB30.mp4       ($(( $(stat -c%s "$OUT/${SLUG}_SUB30.mp4")/1048576 ))MB)"
echo "  -> Kiểm loudness: ffmpeg -i <file> -af loudnorm=print_format=summary -f null -"
