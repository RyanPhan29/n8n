import React from 'react';
import {
  AbsoluteFill, Img, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig,
  staticFile, Easing,
} from 'remotion';

const NAVY='#16305c', NAVY2='#0a1830', GOLD='#e0a400', YELLOW='#FFD400', INK='#10203c', RED='#e11d2a';
const F="DejaVu Sans, sans-serif";
export const LAIKEP_DURATION=1725; // ~57.5s @30fps

const fmt=(n:number)=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')+'đ';

const Char:React.FC<{name:string;h?:number}>=({name,h=540})=>{
  const f=useCurrentFrame();const{fps}=useVideoConfig();
  const s=spring({frame:f-4,fps,config:{damping:12,mass:.6}});
  return <Img src={staticFile(`kit/anhhai_${name}.png`)}
    style={{position:'absolute',bottom:-8,right:36,height:h,
      transform:`translateY(${(1-s)*40}px) scale(${interpolate(s,[0,1],[.7,1])})`,
      transformOrigin:'bottom right',filter:'drop-shadow(0 12px 20px rgba(0,0,0,.5))'}}/>;
};
const Cap:React.FC<{children:React.ReactNode;size?:number;delay?:number;right?:number;color?:string}>=
({children,size=68,delay=6,right=620,color=YELLOW})=>{
  const f=useCurrentFrame();const{fps}=useVideoConfig();const a=spring({frame:f-delay,fps,config:{damping:15}});
  return <div style={{position:'absolute',bottom:90,left:70,right,transform:`translateY(${(1-a)*40}px)`,opacity:a}}>
    <span style={{color,fontWeight:900,fontSize:size,lineHeight:1.08,fontFamily:F,
      WebkitTextStroke:`8px ${INK}`,paintOrder:'stroke fill',textShadow:'0 6px 0 rgba(0,0,0,.4)'}}>{children}</span></div>;
};
const Label:React.FC<{children:React.ReactNode;bg?:string;color?:string}>=({children,bg=YELLOW,color=NAVY})=>{
  const f=useCurrentFrame();const{fps}=useVideoConfig();const a=spring({frame:f,fps,config:{damping:13}});
  return <div style={{position:'absolute',top:56,left:60,transform:`scale(${a})`,transformOrigin:'left top'}}>
    <span style={{background:bg,color,fontWeight:900,fontSize:44,fontFamily:F,padding:'12px 30px',
      borderRadius:16,border:`4px solid ${INK}`,boxShadow:'0 8px 0 rgba(0,0,0,.18)'}}>{children}</span></div>;
};
const Part:React.FC<{n:string}>=({n})=>(
  <div style={{position:'absolute',top:64,right:60,background:'rgba(255,255,255,.14)',border:'3px solid rgba(255,255,255,.35)',
    borderRadius:30,padding:'8px 24px'}}>
    <span style={{color:'#fff',fontWeight:800,fontSize:34,fontFamily:F,letterSpacing:1}}>{n}</span></div>);
const fade=(f:number,dur:number)=>interpolate(f,[0,10,dur-10,dur],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

// 1 · HOOK
const B1:React.FC=()=>{const f=useCurrentFrame();const{fps}=useVideoConfig();
  const t1=spring({frame:f-6,fps,config:{damping:11}});
  const t2=interpolate(f,[45,60],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const t3=interpolate(f,[90,108],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity:fade(f,150),background:`radial-gradient(circle at 50% 30%,${NAVY} 0%,${NAVY2} 75%)`,fontFamily:F}}>
    <div style={{position:'absolute',top:150,width:'100%',textAlign:'center',transform:`scale(${t1})`}}>
      <span style={{color:YELLOW,fontWeight:900,fontSize:200,WebkitTextStroke:`10px ${INK}`,paintOrder:'stroke fill'}}>LÃI KÉP</span></div>
    <div style={{position:'absolute',top:430,width:'100%',textAlign:'center',opacity:t2}}>
      <span style={{color:'#fff',fontWeight:900,fontSize:88}}>Kỳ quan thứ 8? 🏛️</span></div>
    <div style={{position:'absolute',top:560,width:'100%',textAlign:'center',opacity:t3}}>
      <span style={{color:RED,fontWeight:900,fontSize:96,WebkitTextStroke:`6px ${INK}`,paintOrder:'stroke fill'}}>hay CÚ LỪA THẾ KỶ? 😈</span></div>
    <Char name="suspicious" h={520}/></AbsoluteFill>;};

// 2 · ĐỊNH NGHĨA — lãi đơn (phẳng lì)
const B2:React.FC=()=>{const f=useCurrentFrame();
  const w=interpolate(f,[12,150],[0,1180],{extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity:fade(f,165),background:'linear-gradient(#bfeee7,#e8f7f2 65%,#fdf6e3)',fontFamily:F}}>
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:300,background:'linear-gradient(#a7ddd0,#8ccabd)'}}/>
    {/* flat line */}
    <div style={{position:'absolute',left:120,top:430,width:w,height:16,background:'#2e7d5b',borderRadius:8,boxShadow:'0 6px 0 rgba(0,0,0,.15)'}}/>
    <div style={{position:'absolute',left:120,top:360,color:'#2e7d5b',fontWeight:900,fontSize:56}}>10tr → 20tr</div>
    <Label bg='#2e7d5b' color='#fff'>LÃI ĐƠN</Label><Part n="② ĐỊNH NGHĨA"/>
    <Cap size={64} color='#0d5a44'>Đều đặn, phẳng lì như mặt hồ 🌊</Cap>
    <Char name="explain" h={510}/></AbsoluteFill>;};

// 3 · ĐỊNH NGHĨA — lãi kép (cầu tuyết)
const B3:React.FC=()=>{const f=useCurrentFrame();
  const grow=interpolate(f,[10,150],[80,420],{extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  const roll=interpolate(f,[10,160],[-200,760]);
  return <AbsoluteFill style={{opacity:fade(f,165),background:'linear-gradient(#cfe6ff,#eef7ff 70%,#fdf6e3)',fontFamily:F}}>
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:360,background:'linear-gradient(#e9f3ff,#cfe0f0)'}}/>
    <div style={{position:'absolute',bottom:300,left:roll,width:grow,height:grow,borderRadius:'50%',
      background:'radial-gradient(circle at 40% 35%,#fff,#dfe9f5)',border:`8px solid ${INK}`,boxShadow:'0 14px 26px rgba(0,0,0,.2)'}}/>
    <div style={{position:'absolute',bottom:300,left:roll+grow*0.28,fontSize:grow*0.34}}>💰</div>
    <Label>LÃI KÉP</Label>
    <Cap size={62}>Lãi đẻ ra lãi — cuộn như quả cầu tuyết ⛄</Cap>
    <Char name="explain" h={510}/></AbsoluteFill>;};

// 4 · ĐÀO INSIGHT — số nhảy + bars
const B4:React.FC=()=>{const f=useCurrentFrame();const{fps}=useVideoConfig();
  const n=interpolate(f,[15,150],[10_000_000,450_000_000],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
  const pop=spring({frame:f-10,fps,config:{damping:12}});const barA=spring({frame:f-20,fps,config:{damping:13}});
  const bars=[['10 năm',26,'#8fb3ff'],['30 năm',175,'#4f86ff'],['40 năm',450,GOLD]] as const;
  return <AbsoluteFill style={{opacity:fade(f,200),background:`radial-gradient(circle at 45% 30%,${NAVY} 0%,${NAVY2} 78%)`,fontFamily:F}}>
    <div style={{position:'absolute',top:60,width:'100%',textAlign:'center',transform:`scale(${pop})`}}>
      <div style={{color:'#9fb3d6',fontSize:40,fontWeight:800,letterSpacing:2}}>BỎ 10 TRIỆU · KHÔNG LÀM GÌ</div>
      <div style={{color:YELLOW,fontWeight:900,fontSize:140,WebkitTextStroke:`8px ${INK}`,paintOrder:'stroke fill'}}>{fmt(n)}</div></div>
    <Part n="③ ĐÀO INSIGHT"/>
    <div style={{position:'absolute',bottom:110,left:0,width:'100%',height:430,display:'flex',alignItems:'flex-end',justifyContent:'center',gap:90}}>
      {bars.map(([lab,v,col],i)=>(<div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{color:'#fff',fontWeight:900,fontSize:40,marginBottom:10}}>{v}tr</div>
        <div style={{width:150,height:((v as number)/450*350)*barA,background:col,borderRadius:'14px 14px 0 0',boxShadow:'0 0 0 4px rgba(255,255,255,.12)'}}/>
        <div style={{color:'#cdd9ee',fontWeight:800,fontSize:34,marginTop:12}}>{lab}</div></div>))}
    </div><Char name="money" h={450}/></AbsoluteFill>;};

// 5 · ĐÀO INSIGHT — kiếm tiền lúc ngủ (đêm)
const B5:React.FC=()=>{const f=useCurrentFrame();
  const drop=(i:number)=>((f*4+i*60)%600);
  return <AbsoluteFill style={{opacity:fade(f,165),background:'radial-gradient(circle at 70% 20%,#3a2b6b,#16123a 80%)',fontFamily:F}}>
    <div style={{position:'absolute',top:80,left:140,fontSize:120}}>🌙</div>
    {[0,1,2,3,4,5].map(i=>(<div key={i} style={{position:'absolute',left:200+i*230,top:drop(i),fontSize:60}}>🪙</div>))}
    <div style={{position:'absolute',bottom:280,left:220,fontSize:230}}>🛏️</div>
    <div style={{position:'absolute',bottom:470,left:470,fontSize:110}}>😴</div>
    <Part n="③ ĐÀO INSIGHT"/>
    <Cap size={60} color='#ffe27a'>Hiểu lãi kép: kiếm tiền cả lúc đang ngủ 💤</Cap>
    <Char name="cool" h={520}/></AbsoluteFill>;};

// 6 · ĐÀO INSIGHT — sớm vs muộn
const B6:React.FC=()=>{const f=useCurrentFrame();const{fps}=useVideoConfig();const barA=spring({frame:f-14,fps,config:{damping:13}});
  return <AbsoluteFill style={{opacity:fade(f,175),background:'linear-gradient(#fff2cf,#fff9ec 65%,#fdf6e3)',fontFamily:F}}>
    <Label>BÍ MẬT: THỜI GIAN</Label><Part n="③ ĐÀO INSIGHT"/>
    <div style={{position:'absolute',bottom:120,left:0,width:'100%',height:520,display:'flex',alignItems:'flex-end',justifyContent:'center',gap:160}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{fontSize:90}}>👦</div><div style={{color:NAVY,fontWeight:900,fontSize:40}}>bắt đầu 20t</div>
        <div style={{width:180,height:360*barA,background:GOLD,borderRadius:'16px 16px 0 0',border:`5px solid ${INK}`}}/></div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{fontSize:90}}>🧔</div><div style={{color:'#7a6a3a',fontWeight:900,fontSize:40}}>bắt đầu 35t</div>
        <div style={{width:180,height:150*barA,background:'#c9b98a',borderRadius:'16px 16px 0 0',border:`5px solid ${INK}`}}/></div>
    </div>
    <Cap size={58} color='#8a6d00'>Bắt đầu sớm ĂN ĐỨT — dù bỏ ít tiền hơn!</Cap>
    <Char name="amazed" h={480}/></AbsoluteFill>;};

// 7 · CÁI BẪY — nợ lãi kép
const B7:React.FC=()=>{const f=useCurrentFrame();
  const n=interpolate(f,[20,150],[10_000_000,55_000_000],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.in(Easing.cubic)});
  return <AbsoluteFill style={{opacity:fade(f,190),background:`radial-gradient(circle at 50% 30%,#7a0d12,#2a0406 78%)`,fontFamily:F}}>
    <div style={{position:'absolute',top:70,width:'100%',textAlign:'center'}}>
      <div style={{color:'#ffb3b3',fontSize:42,fontWeight:800}}>NHƯNG NỢ CŨNG CÓ LÃI KÉP…</div>
      <div style={{color:'#fff',fontWeight:900,fontSize:140,WebkitTextStroke:`8px ${INK}`,paintOrder:'stroke fill'}}>{fmt(n)}</div>
      <div style={{color:'#ffd0d0',fontSize:42,fontWeight:800}}>nợ 10tr · lãi 30%/năm · để vài năm 😱</div></div>
    <Part n="④ CÁI BẪY"/>
    <div style={{position:'absolute',bottom:230,left:120,fontSize:210}}>💳</div>
    <Cap size={60} right={640} color='#fff'>Giờ quả cầu tuyết lăn về phía BẠN.</Cap>
    <Char name="shocked" h={510}/></AbsoluteFill>;};

// 8 · CÁI BẪY — app vay quái vật
const B8:React.FC=()=>{const f=useCurrentFrame();const{fps}=useVideoConfig();
  const shake=Math.sin(f/3)*6;const a=spring({frame:f-8,fps,config:{damping:12}});
  return <AbsoluteFill style={{opacity:fade(f,175),background:'radial-gradient(circle at 40% 30%,#4a0a2a,#1a0410 80%)',fontFamily:F}}>
    <Part n="④ CÁI BẪY"/>
    <div style={{position:'absolute',top:130,left:0,width:'100%',textAlign:'center',transform:`scale(${a})`}}>
      <span style={{color:'#ff5a7a',fontWeight:900,fontSize:78,WebkitTextStroke:`6px ${INK}`,paintOrder:'stroke fill'}}>APP VAY "5 PHÚT"</span></div>
    <div style={{position:'absolute',top:300,left:0,width:'100%',textAlign:'center'}}>
      <span style={{color:'#fff',fontWeight:900,fontSize:120}}>= 300%/NĂM 🔪</span></div>
    <div style={{position:'absolute',bottom:250,left:180,fontSize:200,transform:`translateX(${shake}px)`}}>📱</div>
    <div style={{position:'absolute',bottom:410,left:360,fontSize:120}}>🦷</div>
    <Cap size={58} right={640} color='#ffd0d0'>Cái "nhanh" trả bằng giá cắt cổ.</Cap>
    <Char name="broke" h={520}/></AbsoluteFill>;};

// 9 · CHỐT — CHO/CHỐNG
const B9:React.FC=()=>{const f=useCurrentFrame();const{fps}=useVideoConfig();const a=spring({frame:f-6,fps,config:{damping:13}});
  return <AbsoluteFill style={{opacity:fade(f,190),background:`radial-gradient(circle at 42% 28%,${NAVY} 0%,${NAVY2} 76%)`,fontFamily:F}}>
    <Part n="⑤ CHỐT"/>
    <div style={{position:'absolute',top:150,width:'100%',textAlign:'center',padding:'0 90px',transform:`scale(${a})`}}>
      <div style={{color:YELLOW,fontWeight:900,fontSize:76,WebkitTextStroke:`6px ${INK}`,paintOrder:'stroke fill'}}>LÃI KÉP LÀ CÔNG CỤ</div>
      <div style={{color:'#8fe3a0',fontWeight:900,fontSize:64,marginTop:28}}>▲ Đầu tư sớm → CHO mình</div>
      <div style={{color:'#ff8a8a',fontWeight:900,fontSize:64,marginTop:8}}>▼ Mắc nợ lãi cao → CHỐNG mình</div></div>
    <Cap size={54} right={640}>Bắt đầu càng sớm, quả cầu tuyết càng to!</Cap>
    <Char name="smirk" h={520}/></AbsoluteFill>;};

// 10 · CTA
const B10:React.FC=()=>{const f=useCurrentFrame();const{fps}=useVideoConfig();const a=spring({frame:f-6,fps,config:{damping:12}});
  const ring=1+Math.sin(f/6)*0.06;
  return <AbsoluteFill style={{opacity:fade(f,150),background:`radial-gradient(circle at 50% 35%,#1d3f77,#0a1830 80%)`,fontFamily:F}}>
    <div style={{position:'absolute',top:200,width:'100%',textAlign:'center',transform:`scale(${a})`}}>
      <div style={{fontSize:150,transform:`scale(${ring})`}}>🔔</div>
      <div style={{color:'#fff',fontWeight:900,fontSize:82,fontFamily:F,marginTop:10}}>THEO DÕI ANH HAI</div>
      <div style={{color:YELLOW,fontWeight:900,fontSize:64,marginTop:6,WebkitTextStroke:`5px ${INK}`,paintOrder:'stroke fill'}}>GIỮ VÍ CHO CHẶT! 💰</div></div>
    <Char name="thumbsup" h={540}/></AbsoluteFill>;};

export const LaiKep:React.FC=()=>(
  <AbsoluteFill style={{backgroundColor:'#000'}}>
    <Sequence durationInFrames={150}><B1/></Sequence>
    <Sequence from={150} durationInFrames={165}><B2/></Sequence>
    <Sequence from={315} durationInFrames={165}><B3/></Sequence>
    <Sequence from={480} durationInFrames={200}><B4/></Sequence>
    <Sequence from={680} durationInFrames={165}><B5/></Sequence>
    <Sequence from={845} durationInFrames={175}><B6/></Sequence>
    <Sequence from={1020} durationInFrames={190}><B7/></Sequence>
    <Sequence from={1210} durationInFrames={175}><B8/></Sequence>
    <Sequence from={1385} durationInFrames={190}><B9/></Sequence>
    <Sequence from={1575} durationInFrames={150}><B10/></Sequence>
  </AbsoluteFill>
);
