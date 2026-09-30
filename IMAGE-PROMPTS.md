# Image prompts — Riyad Zaer Gardens home page

The Bugatti site feels expensive mostly because **every image shares one art direction**: dusk light, warm windows, wide calm framing, nothing cluttered. Ours currently mixes flat daylight renders, a children's bedroom, a kitchen with a fridge, and two renders with thumbnail strips baked in. This set replaces all of them with one coherent series.

## Rules for every image

1. **Keep the real building.** Always upload the listed reference render and use image-to-image / "reference image" mode (Midjourney `--cref`/`--sref` + image prompt, Nano Banana / Gemini edit, GPT image edit, Krea, Magnific). The façade, number of floors, window rhythm and ground-floor shops must match. Never invent a pool, a tower, a sea view or amenities the project doesn't have — it's a sales document.
2. **One grade across the set:** blue hour or late golden hour, warm 3000–3200K interior light, cool deep-blue shadows, soft contrast, no HDR look, no oversaturated greens.
3. **Leave room for text** where noted (the site darkens that side with a gradient).
4. **Export:** at least **2560 px** on the long side, JPG quality 90. Put them in `public/photos/` with the exact file names below; I'll convert to AVIF/WebP and wire responsive sizes.
5. **Append to every prompt:**
   `photorealistic architectural visualization, shot on full-frame camera, 24mm tilt-shift lens, straight verticals, natural materials, subtle film grain, no text, no watermark, no logos`
6. **Negative prompt (where supported):**
   `warped windows, bent verticals, melting geometry, extra floors, glass skyscraper, swimming pool, sea, mountains, neon, oversaturated, HDR halo, cartoon, CGI plastic look, distorted faces, crowd, text, watermark, collage, thumbnails, split screen`

---

## 01 — Hero · `hero.jpg` · 16:9 (2560×1440) · ref: `gallery/render-5.jpg`

```
Eye-level three-quarter view of a modern Moroccan six-storey residential building at blue hour, beige stone and dark grey banded façade, warm golden light glowing from many apartment windows, fully glazed ground-floor shops lit from inside, a few young palm trees and low landscape lighting along a clean new sidewalk, deep indigo sky with a faint last glow on the horizon, calm and quiet street, two or three distant pedestrians, building occupies the right two-thirds of the frame, left third is darker open sky and street for headline text
```

## 02 — Hero mobile · `hero-mobile.jpg` · 9:16 (1440×2560) · ref: `hero.jpg` (01)

```
Same scene and lighting as the reference, recomposed vertically: the building corner fills the upper two-thirds, lower third is dark street and soft landscape lights to leave room for text, blue hour, warm windows
```

## 03 — Introducing · `intro-aerial.jpg` · 4:5 (2048×2560) · ref: `gallery/render-4.jpg`

```
High aerial view of a U-shaped modern residential block around a planted central courtyard at golden hour, long soft shadows, courtyard full of trees, lawns and a small children's play area, rooftops clean and light grey, surrounding new streets with a few cars, warm sunlight grazing the beige façades, calm, orderly, premium
```

## 04 — Card "Appartements F3 et F4" · `card-apartment.jpg` · 4:5 · ref: `gallery/render-9.jpg` (kitchen, for finish level)

```
Interior of a bright, finished mid-standing Moroccan apartment living room, light oak laminate floor, white walls, large aluminium sliding door open onto a balcony with late-afternoon sun, simple modern sofa in warm grey, linen curtains, one plant, a dining table for four, uncluttered, calm, lived-in but tidy, no television, no people
```

## 05 — Card "À partir de 420 000 DH" · `card-entrance.jpg` · 4:5 · ref: `gallery/render-11.jpg`

```
Residential building entrance at dusk seen at eye level, glass entrance door with warm lobby light inside, stone cladding, house number plaque without readable text, a young couple with a shopping bag walking in, seen from behind, small palm and planting beside the door, welcoming, safe, premium
```

## 06 — Card "49 fonds de commerce" · `card-shops.jpg` · 4:5 · ref: `gallery/render-8.jpg`

```
Ground-floor retail arcade of a modern residential building at early evening, continuous row of fully glazed shopfronts lit warmly from inside, a small café with three outdoor tables, a pharmacy and a bakery suggested by interior shapes only, no readable signage, wide clean sidewalk, a few relaxed passers-by, apartments above with warm windows
```

## 07 — Lifestyle "Un cœur d'îlot végétalisé" · `life-courtyard.jpg` · 16:9 · ref: `gallery/render-1.jpg`

```
Inside the private planted courtyard of a residential complex at golden hour, winding stone path between lawns, olive and palm trees, flowering shrubs, low bollard lights just switching on, a parent on a bench and a child riding a scooter in the distance, façades framing both sides, subject and path on the left half, right half softer and darker for text
```

## 08 — Lifestyle "À 20 minutes de Rabat" · `life-avenue.jpg` · 16:9 · ref: `gallery/render-6.jpg`

```
Wide boulevard in Morocco at blue hour with gentle car light trails, modern residential buildings with lit ground-floor shops on the left side, palm-lined median, road leading toward a soft glowing horizon suggesting a city in the distance, sense of easy connection, left half holds the buildings, right half is sky and road for text
```

## 09 — Lifestyle "Des appartements livrés finis" · `life-bathroom.jpg` · 16:9 · ref: `gallery/render-9.jpg`

```
Finished modern bathroom with a walk-in Italian shower behind a clear glass panel, large-format light stone-look tiles, matte black mixer, wall-hung vanity in light oak, soft warm evening light from a small window, folded white towels, spotless, nothing else, composition weighted to the left, right side calmer wall surface for text
```

## 10 — Lifestyle "Un prix juste" · `life-balcony.jpg` · 16:9 · ref: `gallery/render-12.jpg`

```
A Moroccan family of three on their apartment balcony at sunset, seen from slightly behind and to the side so faces are not the focus, mint tea on a small table, warm sunlight, view over low green neighbourhood rooftops and palms, relaxed and proud, subject on the left third, right side open sky for text
```

## 11 — Location band · `location.jpg` · 21:9 (3360×1440) · ref: `gallery/render-11.jpg`

```
Cinematic ultra-wide view along Avenue Mohammed VI at sunset, the residential complex on the left with warm lights starting in windows, palm trees, clean wide sidewalk, low sun flaring softly through palms, gentle traffic, calm suburban atmosphere, lower third darker for text
```

## 12 — Closing band · `closing-detail.jpg` · 21:9 · ref: `gallery/render-5.jpg`

```
Abstract close-up of the building façade at blue hour, repeating horizontal balcony bands in beige stone and dark grey, warm light from a few windows, strong geometric rhythm, shallow depth of field, minimal, almost graphic, no sky
```

---

## Not images — ask the architect (Mabani Architects)

- **Clean floor plans of each F3 and F4 type** (PDF or DWG). The only board we have, `A.01 PLANCHE AIN AOUDA`, is the basement parking level. With real plans I'll draw white-line-on-black plans like Bugatti's "Floor plans" carousel.
- **Confirmed travel times** (Rabat centre, Témara, highway exit, nearest school / mosque / supermarket). I'll turn them into a dark line-art map in SVG, no image generation needed.
