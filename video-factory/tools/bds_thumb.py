# -*- coding: utf-8 -*-
# 3 thumbnail BĐS: render chữ+nền bằng Chromium -> overlay Anh Hai cartoon bằng ffmpeg -> _f.png
import subprocess, os
from PIL import Image
OUT="/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad"
AH=OUT+"/remotion-demo/public/ah"
CHROME="/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
FB=OUT+"/fonts/bvp/package/files"; FM=OUT+"/fonts/mont/package/files"
TH=OUT+"/thumbs_bds"; os.makedirs(TH, exist_ok=True)
VN="U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB"
def face(f,w,vn,lt): return f"@font-face{{font-family:'{f}';font-weight:{w};src:url(file://{vn}) format('woff2');unicode-range:{VN};}}@font-face{{font-family:'{f}';font-weight:{w};src:url(file://{lt}) format('woff2');unicode-range:U+0000-00FF,U+2000-206F,U+20AC;}}"
FONTS=(face("M",900,f"{FM}/montserrat-vietnamese-900-normal.woff2",f"{FM}/montserrat-latin-900-normal.woff2")+face("M",800,f"{FM}/montserrat-vietnamese-800-normal.woff2",f"{FM}/montserrat-latin-800-normal.woff2")+face("B",800,f"{FB}/be-vietnam-pro-vietnamese-800-normal.woff2",f"{FB}/be-vietnam-pro-latin-800-normal.woff2"))
HEAD='<div style="position:absolute;top:12px;left:0;width:100%;height:10px;background:#e11d2a"></div><div style="position:absolute;top:34px;left:44px;font-family:M;font-weight:900;color:#16305c;font-size:34px">CHUYỆN TIỀN <span style="color:#c99700">· ANH HAI KỂ</span></div>'
PAPERBG="background:#f4f1ec;background-image:radial-gradient(circle at 20%% 15%%,rgba(0,0,0,.03) 0 2px,transparent 2px),radial-gradient(circle at 70%% 60%%,rgba(0,0,0,.03) 0 2px,transparent 2px),repeating-linear-gradient(0deg,rgba(20,40,80,.05) 0 1px,transparent 1px 46px),repeating-linear-gradient(90deg,rgba(20,40,80,.05) 0 1px,transparent 1px 46px)"
PAGE="""<!doctype html><html><head><meta charset="utf-8"><style>%%s
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1280px;height:720px;overflow:hidden;%s}
.s{position:absolute;top:0;left:0;right:0;bottom:0;%s}
.stroke{-webkit-text-stroke:9px #fff;paint-order:stroke fill}
.pill{display:inline-block;font-family:B;font-weight:800;font-size:44px;padding:12px 34px;border-radius:16px;background:#16305c;color:#fff}
</style></head><body><div class="s">%%s</div></body></html>"""%(PAPERBG,PAPERBG)
def T(cls,top,left,width,html): return f'<div style="position:absolute;top:{top}px;left:{left}px;width:{width}px;font-family:M;font-weight:900;line-height:1.0" class="{cls}">{html}</div>'
def render(name,body):
    open(f"{TH}/{name}.html","w").write(PAGE%(FONTS,HEAD+body))
    subprocess.run([CHROME,"--headless=new","--no-sandbox","--hide-scrollbars","--force-device-scale-factor=1","--window-size=1280,720",f"--screenshot={TH}/{name}.png",f"file://{TH}/{name}.html"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)

# 3 concept — chữ bên trái, Anh Hai bên phải
render("bds1", T("stroke",132,56,780,'<div style="color:#16223a;font-size:66px">GIÁ NHÀ =</div><div style="color:#e11d2a;font-size:196px">23,7</div><div style="color:#16223a;font-size:62px">LẦN THU NHẬP!</div>')+'<div class="pill" style="position:absolute;top:560px;left:56px">Nhịn ăn 24 năm mới mua nổi 😱</div>')
render("bds2", T("stroke",120,56,800,'<div style="color:#16223a;font-size:80px">VÌ SAO GIÁ NHÀ</div><div style="color:#e11d2a;font-size:118px">KHÔNG CHỊU</div><div style="color:#e11d2a;font-size:118px">GIẢM?</div>')+'<div class="pill" style="position:absolute;top:560px;left:56px">3 lý do ít ai nói thẳng</div>')
render("bds3", T("stroke",118,56,780,'<div style="color:#16223a;font-size:74px">MUA NHÀ 5 TỶ</div><div style="color:#e11d2a;font-size:150px">TRẢ 50TR</div><div style="color:#16223a;font-size:74px">MỖI THÁNG 😱</div>')+'<div class="pill" style="position:absolute;top:560px;left:56px">Giấc mơ thành ác mộng nợ</div>')

# overlay Anh Hai cartoon (góc phải), xuất _f.png
POSE={"bds1":"facepalm","bds2":"think","bds3":"angry"}
H=705; RIGHT=36
for name,pose in POSE.items():
    ci=Image.open(f"{AH}/{pose}.png"); w,h=ci.size
    cw=round(H*w/h); x=1280-RIGHT-cw; y=720-H
    subprocess.run([FF,"-y","-i",f"{TH}/{name}.png","-i",f"{AH}/{pose}.png",
        "-filter_complex",f"[1]scale={cw}:{H}[c];[0][c]overlay={x}:{y}:format=auto",
        f"{TH}/{name}_f.png"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    print("ok",name,pose)

# tile để xem nhanh
subprocess.run([FF,"-y","-i",f"{TH}/bds1_f.png","-i",f"{TH}/bds2_f.png","-i",f"{TH}/bds3_f.png",
    "-filter_complex","[0]scale=760:-1[a];[1]scale=760:-1[b];[2]scale=760:-1[c];[a][b][c]vstack=3",f"{TH}/bds_tile.png"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
print("tiled")
