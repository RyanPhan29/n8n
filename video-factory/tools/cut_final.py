#!/usr/bin/env python3
import json, subprocess, os

SCRATCH = "/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad"
SRC = "/root/.claude/uploads/9ed80c3f-0197-53dc-95c7-0baab5a1694e/c3dbe2db-cung_bo_ra_mot_tram_trieu_nguoi_gui_bank_nguoi_c0348477b5074c2d9463dd625a169f04.mp3"
OUT = "/home/user/n8n/video-factory/content/short_audio"
os.makedirs(OUT, exist_ok=True)

cuts = [float(x) for x in open(f"{SCRATCH}/cuts_whisper.txt")]
FF = "/usr/bin/ffmpeg"
for i in range(30):
    s, e = cuts[i], cuts[i+1]
    n = f"{i+1:02d}"
    subprocess.run([FF, "-y", "-v", "error", "-i", SRC, "-ss", f"{s:.3f}", "-to", f"{e:.3f}",
                    "-c:a", "libmp3lame", "-q:a", "3", f"{OUT}/short{n}.mp3"], check=True)
    print(f"short{n}  {s:8.2f}->{e:8.2f}  {e-s:5.1f}s")
print("DONE cutting 30 clips")
