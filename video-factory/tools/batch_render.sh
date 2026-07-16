#!/usr/bin/env bash
# ============================================================================
# DỰNG SONG SONG nhiều short/video cùng lúc (fan-out ở tầng shell).
# Mỗi item = render + ghép giọng + loudnorm -14, chạy độc lập, tối đa MAXJOBS đồng thời.
#
# Dùng (chạy trong video-factory/remotion-demo — nơi có node_modules):
#   bash ../tools/batch_render.sh <slug1>:<audio1.mp3> <slug2>:<audio2.mp3> ...
#   - audio để trống  -> chỉ render, KHÔNG ghép giọng:  <slug>:
#   - MAXJOBS=3 bash ... để đổi số job đồng thời (mặc định 2)
#
# Kết quả: out/<slug>_final.mp4 (nếu có audio) hoặc out/<slug>_raw.mp4 (nếu không).
# Ghi log riêng mỗi item: out/<slug>.buildlog
# ============================================================================
set -u
HS="/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
MAXJOBS="${MAXJOBS:-2}"
[ $# -eq 0 ] && { echo "Dùng: bash batch_render.sh <slug>:<audio.mp3> [<slug>:<audio.mp3> ...]"; exit 1; }
mkdir -p out

build_one() {
  local slug="${1%%:*}" audio="${1#*:}" log="out/${1%%:*}.buildlog"
  {
    echo "[$slug] render…"
    node_modules/.bin/remotion render "$slug" "out/${slug}_raw.mp4" --browser-executable="$HS" --concurrency=3 --log=error || { echo "[$slug] RENDER FAIL"; exit 1; }
    if [ -n "$audio" ] && [ -f "$audio" ]; then
      echo "[$slug] mux giọng + loudnorm…"
      "$FF" -y -i "out/${slug}_raw.mp4" -i "$audio" \
        -filter_complex "[1:a]volume=1.15[vo];[0:a][vo]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" \
        -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -shortest "out/${slug}_final.mp4" \
        && echo "[$slug] XONG -> out/${slug}_final.mp4" || echo "[$slug] MUX FAIL"
    else
      echo "[$slug] XONG (không giọng) -> out/${slug}_raw.mp4"
    fi
  } >"$log" 2>&1
}

pids=()
for item in "$@"; do
  build_one "$item" &
  pids+=($!)
  # giới hạn job đồng thời
  while [ "$(jobs -rp | wc -l)" -ge "$MAXJOBS" ]; do sleep 1; done
done
wait

echo "===== KẾT QUẢ BATCH ====="
for item in "$@"; do
  slug="${item%%:*}"
  tail -1 "out/${slug}.buildlog" 2>/dev/null | sed "s/^/[$slug] /"
done
