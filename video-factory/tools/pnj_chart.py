#!/usr/bin/env python3
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
import numpy as np

# --- Bảng màu kênh ---
NAVY="#16305c"; GOLD="#f2c230"; RED="#e11d2a"; INK="#16223a"; GRAY="#6b7280"; PAPER="#f6f7f4"

quarters=["I-2024","II-2024","III-2024","IV-2024","I-2025","II-2025","III-2025","IV-2025","I-2026","II-2026"]
# Doanh thu (tỷ) — ước theo chiều cao cột bản gốc; II-2026 = 8.484 (số thật trong bài)
doanhthu=[12500,9500,7000,8500,9500,7500,8000,9500,17500,8484]
# Lợi nhuận sau thuế (tỷ) — số thật gắn nhãn như bản gốc
lnst=[738,429,216,733,678,437,496,1219,1467,-283]

x=np.arange(len(quarters)); w=0.42
fig,ax=plt.subplots(figsize=(12.8,7.4),dpi=150)
fig.patch.set_facecolor(PAPER); ax.set_facecolor(PAPER)

# cột doanh thu (không gắn nhãn — như bản gốc)
ax.bar(x-w/2, doanhthu, width=w, color=NAVY, label="Doanh thu", zorder=3)
# cột lợi nhuận: gold, riêng cột âm -> đỏ
colors=[RED if v<0 else GOLD for v in lnst]
bars=ax.bar(x+w/2, lnst, width=w, color=colors, label="Lợi nhuận sau thuế", zorder=3)

# nhãn số lợi nhuận (chỉ cột dương; cột âm ghi trong chú thích để khỏi đè)
for xi,v in zip(x,lnst):
    if v<0: continue
    txt = f"{v:,}".replace(",",".")
    ax.text(xi+w/2, v+230, txt, ha="center", va="bottom", fontsize=11, color=INK, zorder=5)

# đường 0
ax.axhline(0, color=INK, lw=1.1, zorder=4)

# chú thích LỖ KỶ LỤC vào cột -283
ax.annotate("–283 tỷ\nLỖ KỶ LỤC (từ 2008)",
            xy=(x[-1]+w/2, -283), xytext=(x[-1]-1.15, -3700),
            fontsize=14, fontweight="bold", color=RED, ha="center",
            arrowprops=dict(arrowstyle="-|>", color=RED, lw=2.2, connectionstyle="arc3,rad=-0.2"), zorder=6)

ax.set_ylim(-5000, 20000)
ax.set_yticks(range(-5000,20001,5000))
ax.set_yticklabels([f"{t//1000}k" if t!=0 else "0" for t in range(-5000,20001,5000)], fontsize=10, color=GRAY)
ax.set_xticks(x); ax.set_xticklabels(quarters, fontsize=10.5, color=INK)
ax.set_ylabel("tỷ đồng", fontsize=11, color=GRAY)
for s in ["top","right"]: ax.spines[s].set_visible(False)
for s in ["left","bottom"]: ax.spines[s].set_color("#c9cfd8")
ax.grid(axis="y", color="#dfe3ea", lw=0.9, zorder=0)

ax.set_title("KẾT QUẢ KINH DOANH CỦA PNJ", fontsize=20, fontweight="bold", color=INK, pad=48, loc="left")
ax.text(0,1.075,"Doanh thu vẫn tăng — nhưng lợi nhuận lộn nhào xuống âm  ·  đơn vị: tỷ đồng",
        transform=ax.transAxes, fontsize=12.5, color=GRAY)

ax.legend(loc="upper left", frameon=False, fontsize=12, ncol=2, bbox_to_anchor=(0,0.965))
fig.text(0.985,0.02,"Nguồn: VnExpress · Đồ họa: Chuyện Tiền · Anh Hai Kể", ha="right", fontsize=9.5, color=GRAY)

plt.tight_layout(rect=[0,0.02,1,1])
out="/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad/PNJ_bieudo.png"
plt.savefig(out, facecolor=PAPER, bbox_inches="tight", pad_inches=0.3)
print("saved", out)
