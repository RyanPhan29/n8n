#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# AUTO-TIMER: đọc file mp3 Vbee -> tự dò khoảng lặng -> chia N cảnh -> in thời lượng (frames@30) khớp lời.
# Dùng: python3 autotime.py <file.mp3> <N cảnh>
# Tự chỉnh ngưỡng khoảng lặng để ra ĐÚNG N đoạn (nếu được), rồi in mảng `d` để dán vào spec.
import subprocess, sys, re
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
FPS=30

def duration(mp3):
    out=subprocess.run([FF,"-i",mp3],capture_output=True,text=True).stderr
    m=re.search(r"Duration: (\d+):(\d+):([\d.]+)",out)
    h,mi,s=float(m.group(1)),float(m.group(2)),float(m.group(3))
    return h*3600+mi*60+s

def gaps(mp3, d, noise=-33):
    out=subprocess.run([FF,"-i",mp3,"-af",f"silencedetect=noise={noise}dB:d={d}","-f","null","-"],
                       capture_output=True,text=True).stderr
    starts=[float(x) for x in re.findall(r"silence_start: ([\d.]+)",out)]
    ends=[float(x) for x in re.findall(r"silence_end: ([\d.]+)",out)]
    n=min(len(starts),len(ends))
    return [((starts[i]+ends[i])/2.0) for i in range(n)]  # điểm giữa mỗi khoảng lặng

def best_gaps(mp3, N):
    total=duration(mp3); target=N-1
    best=None
    for d in [round(0.40+0.05*i,2) for i in range(0,17)]:  # 0.40 -> 1.20
        g=gaps(mp3,d)
        if len(g)==target:
            return g,total,d,True
        if best is None or abs(len(g)-target)<abs(len(best[0])-target):
            best=(g,d)
    return best[0],total,best[1],False

def main():
    mp3=sys.argv[1]; N=int(sys.argv[2])
    g,total,d,ok=best_gaps(mp3,N)
    bounds=[0.0]+g+[total]
    # nếu số đoạn != N, gộp/chia cho khớp N (gộp đoạn ngắn nhất vào hàng xóm)
    segs=[bounds[i+1]-bounds[i] for i in range(len(bounds)-1)]
    while len(segs)>N:  # gộp đoạn ngắn nhất vào đoạn kề nhỏ hơn
        i=min(range(len(segs)),key=lambda k:segs[k])
        j=i-1 if (i==len(segs)-1 or (i>0 and segs[i-1]<=segs[i+1])) else i+1
        segs[min(i,j)]=segs[i]+segs[j]; del segs[max(i,j)]
    while len(segs)<N:  # chia đôi đoạn dài nhất
        i=max(range(len(segs)),key=lambda k:segs[k]); half=segs[i]/2; segs[i]=half; segs.insert(i+1,half)
    frames=[round(s*FPS) for s in segs]
    # bù sai số để tổng khớp đúng tổng thời lượng
    diff=round(total*FPS)-sum(frames); frames[-1]+=diff
    print(f"# audio={total:.2f}s  ngưỡng lặng d={d}s  khớp_N={ok}  N={N}")
    print("d: [" + ", ".join(str(x) for x in frames) + "]")
    print(f"# tổng frames={sum(frames)} = {sum(frames)/FPS:.2f}s")

if __name__=="__main__": main()
