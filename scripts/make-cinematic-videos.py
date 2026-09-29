"""Generate cinematic Ken Burns MP4s from project stills."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(r"D:\Astral-Digital\Riyad Zaer\site-v2")
FFMPEG = next((ROOT / "tools" / "ffmpeg-extract").rglob("ffmpeg.exe"))
OUT = ROOT / "public" / "cinematic"
GALLERY = ROOT / "public" / "gallery"
PUBLIC_CIN = ROOT / "public" / "cinematic"

OUT.mkdir(parents=True, exist_ok=True)

# Jobs: name, source images (crossfade sequence), zoom direction
JOBS = [
    {
        "name": "hero",
        "images": [
            PUBLIC_CIN / "hero.png",
            GALLERY / "render-11.jpg",
            GALLERY / "render-5.jpg",
            GALLERY / "render-6.jpg",
        ],
        "duration_each": 5.5,
        "zoom": "in",
    },
    {
        "name": "lifestyle",
        "images": [
            PUBLIC_CIN / "lifestyle.png",
            GALLERY / "render-12.jpg",
            GALLERY / "render-3.jpg",
            GALLERY / "render-7.jpg",
        ],
        "duration_each": 5.0,
        "zoom": "out",
    },
    {
        "name": "facade",
        "images": [
            PUBLIC_CIN / "facade.png",
            GALLERY / "render-1.jpg",
            GALLERY / "render-4.jpg",
            GALLERY / "render-8.jpg",
        ],
        "duration_each": 4.5,
        "zoom": "in",
    },
]


def ken_burns_filter(n: int, duration: float, fps: int, zoom: str) -> str:
    """Build filter_complex for n images with Ken Burns + crossfade."""
    parts = []
    fade = 1.0
    hold = max(duration - fade, 2.0)
    # scale up then zoompan
    for i in range(n):
        if zoom == "in":
            zexpr = f"min(zoom+0.0009,1.18)"
            xexpr = "iw/2-(iw/zoom/2)"
            yexpr = "ih/2-(ih/zoom/2)"
        else:
            zexpr = f"if(eq(on,1),1.18,max(1.001,zoom-0.0009))"
            xexpr = "iw/2-(iw/zoom/2)"
            yexpr = "ih/2-(ih/zoom/2)"
        frames = int(duration * fps)
        parts.append(
            f"[{i}:v]scale=1920:1080:force_original_aspect_ratio=increase,"
            f"crop=1920:1080,setsar=1,"
            f"zoompan=z='{zexpr}':x='{xexpr}':y='{yexpr}':d={frames}:s=1920x1080:fps={fps},"
            f"format=yuv420p[v{i}]"
        )

    if n == 1:
        parts.append(f"[v0]trim=duration={duration},setpts=PTS-STARTPTS[outv]")
        return ";".join(parts)

    # xfade chain
    cur = "v0"
    t = hold
    for i in range(1, n):
        out = "outv" if i == n - 1 else f"x{i}"
        parts.append(
            f"[{cur}][v{i}]xfade=transition=fade:duration={fade}:offset={t}[{out}]"
        )
        cur = out
        t += hold
    return ";".join(parts)


def render(job: dict) -> Path:
    images = [p for p in job["images"] if p.exists()]
    if not images:
        raise SystemExit(f"No images for {job['name']}")
    out = OUT / f"{job['name']}.mp4"
    fps = 30
    duration = float(job["duration_each"])
    fc = ken_burns_filter(len(images), duration, fps, job["zoom"])

    cmd = [str(FFMPEG), "-y"]
    for img in images:
        # loop each still long enough for zoompan
        cmd += ["-loop", "1", "-t", str(duration + 0.5), "-i", str(img)]
    cmd += [
        "-filter_complex",
        fc,
        "-map",
        "[outv]",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "22",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-an",
        str(out),
    ]
    print("RUN", job["name"], "from", [p.name for p in images])
    subprocess.run(cmd, check=True)
    print("OK", out, f"{out.stat().st_size / 1e6:.1f} MB")
    return out


def main() -> None:
    print("ffmpeg:", FFMPEG)
    for job in JOBS:
        render(job)


if __name__ == "__main__":
    main()
