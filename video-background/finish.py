from pathlib import Path
import sys, subprocess
root = Path(__file__).resolve().parent
sys.path.insert(0,str(root.parent / '.video-tools'))
import imageio_ffmpeg
output = root / 'Simple-CRM-Navy-Honeycomb-12s.mp4'
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-i', str(root / 'simple-crm-navy-honeycomb-1920x1080.mp4'), '-vf', 'scale=1920:1080', '-c:v', 'libx264', '-crf','18','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(output)],check=True,capture_output=True)
reader=imageio_ffmpeg.read_frames(str(output))
meta=next(reader)
count=sum(1 for _ in reader)
print(meta)
print('Decoded frames:',count,'File MB:',round(output.stat().st_size/1048576,2))
assert meta['size']==(1920,1080) and count==360
