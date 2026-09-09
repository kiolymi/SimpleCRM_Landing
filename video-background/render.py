from pathlib import Path
import sys, math, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parent / '.video-tools'))
import imageio_ffmpeg

W, H, FPS, SECONDS = 1920, 1080, 30, 12
out = ROOT / 'Simple-CRM-Amber-Honeycomb-12s.mp4'
# Sample every edge before warping so the cells bend like a flowing mesh.
mask = Image.new('L', (W*2, H*2))
draw = ImageDraw.Draw(mask)
r = 72
def warp(px, py):
    u, v = px/W, py/H
    return (2*(px + 95*math.sin(v*4.7+u*2.1) + 34*math.sin(v*9-u*2)),
            2*(py + 90*math.sin(u*4.8-.7) + 30*math.sin(u*8+v*3)))

for col in range(-4, 24):
    for row in range(-4, 15):
        cx = col * r * 1.5
        cy = (row + (col % 2)*.5) * math.sqrt(3)*r
        corners = [(cx+r*math.cos(k*math.pi/3), cy+r*math.sin(k*math.pi/3)) for k in range(6)]
        points = []
        for k in range(6):
            a,b = corners[k],corners[(k+1)%6]
            points.extend(warp(a[0]+(b[0]-a[0])*s/12,a[1]+(b[1]-a[1])*s/12) for s in range(12))
        draw.line(points+[points[0]], fill=255, width=2, joint='curve')
grid = np.asarray(mask.resize((W,H), Image.Resampling.LANCZOS), dtype=np.float32)/255
halo = np.asarray(mask.resize((W,H), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(4)),dtype=np.float32)/255
x = np.linspace(0,1,W,dtype=np.float32)[None,:]
y = np.linspace(0,1,H,dtype=np.float32)[:,None]
base = np.array([14,37,61], dtype=np.float32)
writer = imageio_ffmpeg.write_frames(str(out), (W,H), fps=FPS, codec='libx264',
    pix_fmt_out='yuv420p', macro_block_size=1, quality=None, output_params=['-crf','18','-preset','fast','-movflags','+faststart'])
writer.send(None)
for frame in range(FPS*SECONDS):
    t = frame/(FPS*SECONDS)*2*math.pi
    u = x + .085*np.sin(y*7+x*3+t*.0)
    v = y + .095*np.sin(x*8-y*2)
    glow = np.exp(-(((u-(.70+.10*math.cos(t)))/.28)**2 + ((v-(.26+.10*math.sin(t)))/.34)**2)*1.6)
    sheen = np.exp(-(((u-(.26+.09*math.sin(t)))/.30)**2 + ((v-(.74+.08*math.cos(t)))/.27)**2)*1.6)
    pool = np.exp(-(((u-.94)/.25)**2+((v-.87)/.30)**2)*2)
    # Positive time in x+time moves crests from right to left; full-cycle loop.
    phase = 2*math.pi*x + t + .26*np.sin(y*6)
    wave = (.5+.5*np.cos(phase))**5
    violet = (.5+.5*np.cos(phase-1.0))**4
    vignette = np.clip(1-((x-.5)**2*.55+(y-.5)**2*.4),0,1)
    # Keep the left copy area quiet; luminous cells concentrate on the right.
    line_strength = grid * (.8+5.2*wave) + halo*wave*5
    rgb = base[None,None,:]*vignette[:,:,None]
    rgb = rgb + glow[:,:,None]*np.array([0,21,33]) + sheen[:,:,None]*np.array([15,5,29]) + pool[:,:,None]*np.array([0,12,17])
    # Warm, translucent amber contours; the travelling crest shifts to gold.
    rgb = rgb + line_strength[:,:,None]*np.array([13,7,1.2]) + (grid*violet)[:,:,None]*np.array([12,5,.4])
    pixels = np.clip(rgb,0,255).astype(np.uint8)
    if frame in (0,120,240):
        Image.fromarray(pixels).save(ROOT / f'amber-preview-{frame//30:02d}s.jpg', quality=94)
    writer.send(pixels)
    if frame % 90 == 0: print(f'Rendered {frame}/{FPS*SECONDS}', flush=True)
writer.close()
print(f'Created {out} ({out.stat().st_size/1024/1024:.1f} MB)', flush=True)
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-i', str(out), '-f', 'null', '-'], check=True, capture_output=True)
print('Video decode verified', flush=True)
