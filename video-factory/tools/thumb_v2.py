# -*- coding: utf-8 -*-
import subprocess,os
OUT="/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad"
AH=OUT+"/remotion-demo/public/ah"   # ảnh Anh Hai cartoon (trong suốt)
CHROME="/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
FB=OUT+"/fonts/bvp/package/files"; FM=OUT+"/fonts/mont/package/files"
VN="U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB"
def face(f,w,vn,lt): return f"@font-face{{font-family:'{f}';font-weight:{w};src:url(file://{vn}) format('woff2');unicode-range:{VN};}}@font-face{{font-family:'{f}';font-weight:{w};src:url(file://{lt}) format('woff2');unicode-range:U+0000-00FF,U+2000-206F,U+20AC;}}"
FONTS=(face("M",900,f"{FM}/montserrat-vietnamese-900-normal.woff2",f"{FM}/montserrat-latin-900-normal.woff2")+face("M",800,f"{FM}/montserrat-vietnamese-800-normal.woff2",f"{FM}/montserrat-latin-800-normal.woff2")+face("B",800,f"{FB}/be-vietnam-pro-vietnamese-800-normal.woff2",f"{FB}/be-vietnam-pro-latin-800-normal.woff2"))
HEAD='<div style="position:absolute;top:12px;left:0;width:100%;height:10px;background:#e11d2a"></div><div style="position:absolute;top:34px;left:44px;font-family:M;font-weight:900;color:#16305c;font-size:34px">CHUYỆN TIỀN <span style="color:#c99700">· ANH HAI KỂ</span></div>'
def AHimg(pose,h=700,right=40,bottom=0):
    return ''
PAGE="""<!doctype html><html><head><meta charset="utf-8"><style>%s
*{margin:0;padding:0;box-sizing:border-box}html,body{width:1280px;height:720px;overflow:hidden}
.s{position:relative;width:1280px;height:720px;background:#f4f1ec;
 background-image:radial-gradient(circle at 20%% 15%%,rgba(0,0,0,.03) 0 2px,transparent 2px),radial-gradient(circle at 70%% 60%%,rgba(0,0,0,.03) 0 2px,transparent 2px),repeating-linear-gradient(0deg,rgba(20,40,80,.05) 0 1px,transparent 1px 46px),repeating-linear-gradient(90deg,rgba(20,40,80,.05) 0 1px,transparent 1px 46px)}
.stroke{-webkit-text-stroke:9px #fff;paint-order:stroke fill}
.pill{display:inline-block;font-family:B;font-weight:800;font-size:46px;padding:12px 34px;border-radius:16px;background:#16305c;color:#fff}
</style></head><body>%s</body></html>"""
def render(name,body):
    open(f"{OUT}/thumbs2/{name}.html","w").write(PAGE%(FONTS,HEAD+body))
    subprocess.run([CHROME,"--headless=new","--no-sandbox","--hide-scrollbars","--force-device-scale-factor=1","--window-size=1280,720",f"--screenshot={OUT}/thumbs2/{name}.png",f"file://{OUT}/thumbs2/{name}.html"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    print("ok",name)
os.makedirs(OUT+"/thumbs2",exist_ok=True)
def T(cls,top,left,width,html): return f'<div style="position:absolute;top:{top}px;left:{left}px;width:{width}px;font-family:M;font-weight:900;line-height:1.0" class="{cls}">{html}</div>'

# ===== VAY NHÀ =====
render("vn1", T("stroke",128,56,760,'<div style="color:#16223a;font-size:88px">MUA NHÀ 1 TỶ</div><div style="color:#e11d2a;font-size:148px">TRẢ 1,73 TỶ?!</div>')+'<div class="pill" style="position:absolute;top:522px;left:56px">Trả góp 20 năm 😱</div>'+'<div style="position:absolute;bottom:150px;left:560px;font-size:140px">🏠</div>'+AHimg("shock"))
render("vn2", T("stroke",110,56,780,'<div style="color:#159a86;font-size:116px">AN CƯ</div><div style="color:#16223a;font-size:66px">hay</div><div style="color:#e11d2a;font-size:116px">CÁI BẪY 20 NĂM?</div>')+'<div class="pill" style="position:absolute;top:560px;left:56px">Vay 1 tỷ mua nhà</div>'+AHimg("worried"))
render("vn3", T("stroke",150,56,780,'<div style="color:#16223a;font-size:72px">Vay mua nhà, mất</div><div style="color:#e11d2a;font-size:132px">734 TRIỆU</div><div style="color:#16223a;font-size:60px">tiền lãi mà không hay 😱</div>')+'<div style="position:absolute;top:60px;left:600px;font-size:96px;transform:rotate(-12deg)">💸</div>'+AHimg("broke"))

# ===== LÃI KÉP =====
render("lk1", T("stroke",130,56,770,'<div style="color:#16223a;font-size:82px">BỎ 10 TRIỆU</div><div style="color:#1657d6;font-size:150px">THÀNH 450 TR!</div>')+'<div class="pill" style="position:absolute;top:540px;left:56px">Phép màu lãi kép 💰📈</div>'+AHimg("greedy"))
render("lk2", T("stroke",120,56,760,'<div style="color:#16223a;font-size:80px">Bạn đang NUÔI</div><div style="color:#e11d2a;font-size:112px">một con</div><div style="color:#e11d2a;font-size:112px">QUÁI VẬT?</div>')+'<div class="pill" style="position:absolute;top:560px;left:56px">Nợ cũng có lãi kép 👹</div>'+AHimg("shock"))
render("lk3", T("stroke",140,56,760,'<div style="color:#16223a;font-size:128px">LÃI KÉP</div><div style="color:#159a86;font-size:74px">Kỳ quan hay</div><div style="color:#e11d2a;font-size:112px">CÚ LỪA?</div>')+'<div class="pill" style="position:absolute;top:470px;left:56px">Sự thật ít ai nói</div>'+AHimg("sly"))

FF="/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2"
subprocess.run([FF,"-y","-i",OUT+"/thumbs2/vn1.png","-i",OUT+"/thumbs2/vn2.png","-i",OUT+"/thumbs2/vn3.png","-filter_complex","[0]scale=760:-1[a];[1]scale=760:-1[b];[2]scale=760:-1[c];[a][b][c]vstack=3",OUT+"/thumbs2/vn_tile.png"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
subprocess.run([FF,"-y","-i",OUT+"/thumbs2/lk1.png","-i",OUT+"/thumbs2/lk2.png","-i",OUT+"/thumbs2/lk3.png","-filter_complex","[0]scale=760:-1[a];[1]scale=760:-1[b];[2]scale=760:-1[c];[a][b][c]vstack=3",OUT+"/thumbs2/lk_tile.png"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
print("tiled")
