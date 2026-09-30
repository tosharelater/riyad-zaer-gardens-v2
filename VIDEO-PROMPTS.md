# Cinematic video prompts — Riyad Zaer Gardens

Do **not** use Ken Burns / zoompan on a still and call it video.
Generate real motion in Kling, Runway Gen-3, Luma Ray, or Hailuo, then drop the MP4s into `public/cinematic/`.

## How to use

1. Upload the matching still as image reference (image-to-video).
2. Paste the prompt.
3. Settings: **1920×1080**, **5–8 s**, **24 or 30 fps**, camera motion subtle, loop-friendly.
4. Export H.264, ~4–8 Mbps.
5. Replace files:

| File | Use on site |
|---|---|
| `hero.mp4` | Hero background |
| `facade.mp4` | Intro / projet |
| `lifestyle.mp4` | Lifestyle slide 1 |
| `courtyard.mp4` | Localisation media |

Then wire `<video>` back in `Home.astro` (hero / intro / lifestyle / location).

---

## 1 — Hero (`public/cinematic/hero.png`)

**Prompt:**
```
Cinematic aerial push-in toward a modern Moroccan mid-rise residential complex at blue hour, warm interior lights glowing in glass façades, palm trees gently swaying in light wind, soft landscape lighting on gardens, deep indigo sky, photoreal architecture, luxury real-estate film, slow elegant camera move, no text, no watermark, no logos, no shaky cam
```

**Negative:**
```
ken burns, slide show, morphing buildings, warped windows, melting architecture, cartoon, people faces, text, watermark
```

---

## 2 — Facade (`public/cinematic/facade.png`)

**Prompt:**
```
Slow lateral tracking shot along a contemporary residential façade at night, curved balconies with warm gold underlighting, textured stone and glass reflecting city glow, subtle parallax, cinematic luxury real-estate look, photoreal, Morocco, calm atmosphere, no text
```

**Negative:**
```
zoom only, still photo, morphing geometry, plastic materials, oversaturated neon
```

---

## 3 — Lifestyle / courtyard (`public/cinematic/lifestyle.png`)

**Prompt:**
```
Gentle forward walk through a landscaped residential courtyard at golden hour, soft palms and planting, warm path lights flickering lightly, modern apartment buildings framing the garden, peaceful luxury atmosphere, photoreal cinematic, shallow depth of field, no crowds, no text
```

**Negative:**
```
busy street, cars racing, distorted plants, morphing trees, slideshow
```

---

## 4 — Localisation / avenue (`public/gallery/render-11.jpg`)

**Prompt:**
```
Slow drone rise revealing Avenue Mohammed VI near Aïn Aouda with a modern residential complex and planted central courtyard, late afternoon light, Morocco, photoreal cinematic establishing shot, smooth vertical move, no text
```

**Negative:**
```
wrong city landmarks, Eiffel tower, desert dunes only, glitchy geometry
```

---

## After you have the MP4s

Put them in `site-v2/public/cinematic/` and tell the agent to re-enable the video tags on the homepage.
