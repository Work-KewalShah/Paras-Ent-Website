# Assets Manifest

Maps every visual asset the site needs to where it comes from (`assets/reference/`) and where it ends up (`assets/site/`). Updated after the client supplied real asset folders and made two scope decisions (see `decisions.md`).

## Important: File Extensions Are Mixed — Read Before Coding

Supplied assets are **not** uniformly one file type — Product Showcase images are `.png`, case study/stock photos may be `.jpg`/`.jpeg`. **Never assume a fixed extension when building file paths in code** (e.g. do not construct `` `/images/${slug}.jpg` `` and assume it always resolves). Instead, store the **exact filename including its real extension** as a field in `lib/content/products.ts` and `lib/content/case-studies.ts` (e.g. `image: 'product-cctv.png'`, not just `image: 'product-cctv'`). This is now an explicit rule — see also `conventions.md`.

## Reference Folder Structure

```
assets/reference/
├── product-pdfs/PE_Booklet_1.pdf
├── logo-source/                  ← PE logo (incl. .cdr) + partner brand logos
├── product-photos-raw/           ← individual device photos (cameras, NVR, access points, speakers)
├── stock-images/                 ← stock used in the booklet + unused extras — SEE WARNING BELOW
└── old-site-exports/             ← full downloaded old website files
```

**⚠ Warning on `stock-images/`:** this pool includes the leftover Canva template pages flagged in `design-system.md` ("About Us," "Apex Adventure Co.," generic team bios) — these are NOT Paras Enterprises content and must never be used as source material for any section, even though they physically sit in this folder alongside real usable stock.

## Logo & Brand — RESOLVED

| Asset | Reference source | Site destination | Status |
|---|---|---|---|
| PE Logo | `logo-source/` (incl. .cdr) | `logo/logo-black.svg`, `logo/logo-white.svg` | **Available** — export from .cdr/source file into web-ready SVG/PNG |
| Partner/brand logos | `logo-source/` | not currently used in any section — kept for reference | N/A |
| Favicon | derived from PE logo | `logo/favicon.ico` + `.svg` | Generate once logo is exported |

## Hero

| Asset | Reference source | Site destination | Status |
|---|---|---|---|
| Hero background visual | **not yet identified** — check `product-photos-raw/` for a suitable wide shot, or fall back to the booklet's PTZ silhouette | `images/hero-bg.[ext]` | Still open |

## Product Category Images (9 categories) — 8 of 9 RESOLVED

| # | Category | Source file | Site destination | Status |
|---|---|---|---|---|
| 1 | CCTV Cameras | `product-cctv.png` (client's renamed IP Camera image — confirmed choice) | `images/product-cctv.png` | **Available** |
| 2 | PTZ Camera | `PE - Product Showcase/PTZ Camera.png` | `images/product-ptz.png` | **Available** |
| 3 | WiFi Camera | `PE - Product Showcase/WIFI Camera.png` | `images/product-wifi-camera.png` | **Available** |
| 4 | Video Door Phone | `PE - Product Showcase/Video Door Phone.png` | `images/product-video-door-phone.png` | **Available** |
| 5 | Burglar Alarms | `PE - Product Showcase/Burglar Alarms.png` | `images/product-burglar-alarms.png` | **Available** |
| 6 | PBX Systems | `PE - Product Showcase/PBX - Intercom.png` | `images/product-pbx.png` | **Available** |
| 7 | Biometric Access | `PE - Product Showcase/Biometrics.png` | `images/product-biometric.png` | **Available** |
| 8 | Networking | `PE - Product Showcase/Networking.png` | `images/product-networking.png` | **Available** |
| 9 | Audio Systems | `PE - Product Showcase/PA System.png` | `images/product-audio.png` | **Available** |

**Confirmed dropped from scope entirely:** Home Automation and Nurse/PA Calling — not included anywhere on the site. See `decisions.md`. No images needed for these; do not reference them in any component, content file, or copy.

**Supplementary pool:** `product-photos-raw/` (individual CCTV/NVR/access point/speaker photos) available to enrich any of the 9 categories above if wanted later.

## Case Studies — RESOLVED

| Asset | Source file | Site destination | Status |
|---|---|---|---|
| Chouksey Engineering College photo | `Client's Pictures - Case Study/` | `images/case-study-chouksey.[ext]` | **Available** — real client photo, use directly. Confirm actual extension (jpg/jpeg/png) when placing. |
| Sanjivani Hospital photo | `Client's Pictures - Case Study/` | `images/case-study-sanjivani.[ext]` | **Available** — real client photo, use directly. Confirm actual extension when placing. |

## CTA Reference Graphic

| Asset | Source file | Site destination | Status |
|---|---|---|---|
| `CTA.png` | `PE - Product Showcase/CTA.png` | `images/CTA.png` | **Placed as-is**, per client instruction. Not currently mapped to any component — kept available as a style reference for CTA framing (the old site's "Book a Free Site Visit" treatment). Do not build a new section around it unless requested. |

## Process / Trust Section

| Asset | Reference source | Site destination | Status |
|---|---|---|---|
| Design & Consultation visual | check `stock-images/` for a suitable non-template photo, or fall back to `extracted-booklet-assets/` | `images/process-design.[ext]` | Open — check stock pool first (excluding template leftovers) |
| Long-Term Support visual | same as above | `images/process-support.[ext]` | Open |

## Icons — STILL FULLY UNSOURCED

No icon files were included in any supplied folder. All icons still need to be recreated as clean SVGs:
- 3 pillar icons, 4 trust badge icons, **9 product icons** (was 11 — 2 dropped with the categories above), 4 process step icons, 1 cyclical loop icon
- Booklet icons remain style reference only (low-res, not for direct use)

## Reference Documents (not shipped to site)

| Asset | Location | Purpose |
|---|---|---|
| `PE_Booklet_1.pdf` | `reference/product-pdfs/` | Permanent content/asset source |
| Old site exports | `reference/old-site-exports/` | Historical reference; also the origin of the Product Showcase images above |
| Stock images pool | `reference/stock-images/` | Supplementary — exclude Canva-template leftovers, see warning above |
| Raw product photos | `reference/product-photos-raw/` | Supplementary device photos |

## Remaining Open Items

1. **Hero visual** — no clear candidate yet; needs a decision before Session 01.
2. **Icons** — all still need creating; no source files exist for any of them.
3. **Process section visuals** — check `stock-images/` (excluding template leftovers) before defaulting to booklet extracts.
4. **Exact file extensions for case study photos** — confirm jpg/jpeg/png when actually placing the files; the content data file must record the real extension.
