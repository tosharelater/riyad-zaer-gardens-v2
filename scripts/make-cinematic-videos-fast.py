"""Fast cinematic Ken Burns clips from stills (single-image zoom + pan)."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(r"D:\Astral-Digital\Riyad Zaer\site-v2")
FFMPEG = next((ROOT / "tools" / "ffmpeg-extract").rglob("ffmpeg.exe"))
OUT = ROOT / "public" / "cinematic"
G = ROOT / "public" / "gallery"
C = OUT

JOBS = [
    # skip hero if already present
    {"name": "lifestyle", "src": C / "lifestyle.png", "seconds": 14, "zoom": "out"},
    {"name": "facade", "src": C / "facade.png", "seconds": 12, "zoom": "in"},
    {"name": "courtyard", "src": G / "render-12.jpg", "seconds": 10, "zoom": "in"},
]


def build(job: dict) -> None:
    src = job["src"]
    if not src.exists():
        print("skip missing", src)
        return
    out = OUT / f"{job['name']}.mp4"
    if out.exists() and out.stat().st_size > 500_000:
        print("exists", out.name)
        return
    secs = job["seconds"]
    fps = 30
    frames = secs * fps
    if job["zoom"] == "in":
        z = "min(zoom+0.0012,1.22)"
    else:
        z = "if(eq(on,1),1.22,max(1.0,zoom-0.0012))"
    vf = (
        f"scale=1920:1080:force_original_aspect_ratio=increase,"
        f"crop=1920:1080,setsar=1,"
        f"zoompan=z='{z}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s=1920x1080:fps={fps},"
        f"format=yuv420p"
    )
    cmd = [
        str(FFMPEG), "-y",
        "-loop", "1", "-i", str(src),
        "-vf", vf,
        "-t", str(secs),
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
        str(out),
    ]
    print("encoding", out.name)
    subprocess.run(cmd, check=True)
    print("ok", out.name, f"{out.stat().st_size/1e6:.1f}MB")


def main() -> None:
    for job in JOBS:
        build(job)


if __name__ == "__main__":
    main()
