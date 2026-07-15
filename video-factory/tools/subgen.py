# -*- coding: utf-8 -*-
# Phụ đề .ass TRỌN NGHĨA: gộp cụm SỐ thành 1 khối (không tách), ngắt ở dấu phẩy/hết câu, canh giờ + snap lặng.
# Dùng: python3 subgen.py <script.txt> <audio.mp3> <out.ass>
import subprocess, re, sys
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
script, audio, outass = sys.argv[1], sys.argv[2], sys.argv[3]

NUMW={'không','một','mốt','hai','ba','bốn','tư','năm','lăm','sáu','bảy','tám','chín',
      'mười','mươi','trăm','ngàn','nghìn','triệu','tỷ','tỉ','lẻ','phẩy','phần'}
def isnum(w): return w.strip('.,;:?!…').lower() in NUMW

def duration(mp3):
    out=subprocess.run([FF,'-i',mp3],capture_output=True,text=True).stderr
    m=re.search(r'Duration: (\d+):(\d+):([\d.]+)',out); return float(m[1])*3600+float(m[2])*60+float(m[3])
def pauses(mp3,d=0.26,noise=-34):
    out=subprocess.run([FF,'-i',mp3,'-af',f'silencedetect=noise={noise}dB:d={d}','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',out)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',out)]
    return [ (st[i]+en[i])/2 for i in range(min(len(st),len(en))) ]

total=duration(audio); cand=sorted(pauses(audio,d=0.20))  # nhiều mốc lặng để neo
text=' '.join(l.strip() for l in open(script,encoding='utf-8') if l.strip())
sents=re.split(r'(?<=[\.\?!…])\s+', text)

# ----- gộp thành UNIT: cụm số liền nhau = 1 unit (wc = số từ đọc, để canh giờ) -----
def to_units(sent):
    words=sent.split(); units=[]; i=0
    while i<len(words):
        if isnum(words[i]):
            j=i
            while j<len(words) and isnum(words[j]) and not re.search(r'[.,;:?!…]$',words[j-1] if j>i else ''):
                j+=1
            run=words[i:j]; units.append((' '.join(run),len(run),bool(re.search(r'[,;:]$',run[-1])))); i=j
        else:
            w=words[i]; units.append((w,1,bool(re.search(r'[,;:]$',w)))); i+=1
    return units

# ----- gom unit thành CHUNK (ưu tiên ngắt ở dấu phẩy; số & cụm không bị tách) -----
# mỗi chunk giữ danh sách unit -> để wrap ngắt ĐÚNG ranh khối
chunks=[]  # (units:[(txt,wc)], weight)
for s in sents:
    cur=[]; wc=0
    for (txt,n,soft) in to_units(s):
        cur.append((txt,n)); wc+=n
        if (wc>=4 and soft) or wc>=12:
            chunks.append((cur,wc)); cur=[]; wc=0
    if cur: chunks.append((cur,wc))

clauses=[]  # (units, weight)
for units,wc in chunks:
    # bỏ dấu , ; : cuối unit cuối (giữ ? !)
    if units:
        t=units[-1][0].rstrip(' ,;:.'); units=units[:-1]+[(t,units[-1][1])] if t else units[:-1]
    if not units: continue
    if clauses and wc<3:
        clauses[-1]=(clauses[-1][0]+units, clauses[-1][1]+wc)
    else:
        clauses.append((units,wc))

# ----- canh giờ: TÁI ĐỊNH MỐC tại mỗi khoảng lặng thật (chống trôi) -----
weights=[w for _,w in clauses]
bounds=[0.0]; prev=0.0
for i in range(len(clauses)-1):
    remw=sum(weights[i:])                       # trọng số còn lại (dòng i trở đi)
    est=prev+(total-prev)*(weights[i]/remw)     # ước lượng dựa trên phần CÒN LẠI -> không dồn sai số
    cs=[p for p in cand if p>prev+0.55]
    if cs:
        b=min(cs,key=lambda x:abs(x-est))
        if abs(b-est)>1.1: b=max(prev+0.85,est) # lặng gần nhất quá xa -> dùng ước lượng
    else:
        b=max(prev+0.85,est)
    b=max(b,prev+0.85)
    bounds.append(b); prev=b
bounds.append(max(prev+0.85,total))

def ts(t):
    h=int(t//3600); m=int((t%3600)//60); s=t%60; cs=int(round((s-int(s))*100)); return f'{h}:{m:02d}:{int(s):02d}.{cs:02d}'
def wrap(units):
    tot=sum(n for _,n in units)
    if tot<=6: return ' '.join(t for t,_ in units)
    # tìm ranh KHỐI gần giữa nhất -> số/cụm không bị chẻ
    best=1; bestd=1e9; run=0
    for k in range(1,len(units)):
        run+=units[k-1][1]
        d=abs(run-(tot-run))
        if d<bestd: bestd=d; best=k
    l1=' '.join(t for t,_ in units[:best]); l2=' '.join(t for t,_ in units[best:])
    return l1+'\\N'+l2

HEAD="""[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Sub,DejaVu Sans,46,&H00FFFFFF,&H00FFFFFF,&H00202018,&H90000000,-1,0,0,0,100,100,0,0,1,4,1,2,120,120,60,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
lines=[HEAD]
for i,(c,_) in enumerate(clauses):
    lines.append(f'Dialogue: 0,{ts(bounds[i])},{ts(bounds[i+1])},Sub,,0,0,0,,{wrap(c)}')
open(outass,'w',encoding='utf-8').write('\n'.join(lines))
print(f'OK {outass}: {len(clauses)} dòng phụ đề (số không bị tách), audio {total:.1f}s')
