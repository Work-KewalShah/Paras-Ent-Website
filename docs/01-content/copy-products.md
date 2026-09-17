# Product Suite Copy

All 9 product/service categories. Each block is ready to drop into a ProductCard component as-is. Order below is the intended display order.

---

## 1. CCTV Cameras
**Tagline:** Eyes in Every Corner
**Camera types:** IP, HD, PTZ, WiFi
**Features:** Night-vision color, AI Enabled, Audio Enabled
**Also includes:** Camera accessories
**Use cases:** Homes, retail stores, warehouses, offices, educational institutions

## 2. PTZ Camera
**Tagline:** 360° Coverage, Total Control
**Features:** 360° coverage, mobile access, 45x zoom
**Use cases:** Parking areas, large campuses, warehouses, outdoor perimeters

## 3. WiFi Camera
**Tagline:** Wire-Free, Worry-Free
**Features:** Wire-free installation, mobile app access, auto-tracking
**Use cases:** Homes, small offices, shops, quick-deploy setups

## 4. Video Door Phone
**Tagline:** See Who's at the Door, Anywhere
**Features:** Smart alerts, night vision, remote unlock
**Use cases:** Homes, apartments, gated communities, offices

## 5. Burglar Alarms
**Tagline:** Protection That Never Sleeps
**Panels:** GSM, IP, Fire
**Sensors:** Vibration, temperature, glass break, gas leak, magnetic contact, motion, smoke, and more
**Use cases:** Homes, warehouses, offices, industrial sites, retail stores

## 6. PBX Systems
**Tagline:** Efficient Communication for Every Scale
**Systems:** Digital PBX, IP PBX
**Use cases:** Residential societies, hotels, corporate offices, hostels and dormitories, educational institutions, hospitals

## 7. Biometric Access
**Tagline:** Seamless Access, Maximum Security
**Types:** Face, thumb, RFID card
**Use cases:** Attendance, access control, electric doorlocks, boom barriers

## 8. Networking
**Tagline:** Connectivity Without Compromise
**Products:** Networking switches, access points, WiFi routers, point-to-point switches
**Use cases:** Corporate office networking, WiFi zone creation, remote area connectivity

## 9. Audio Systems
**Tagline:** Crystal-Clear Audio, Anywhere You Need
**Products:** Amplifiers, speakers (wired, Bluetooth)
**Use cases:** Public address, offices, lecture halls, home theatre

---

## Section intro copy

**Headline:** A Complete Range of Security & Automation Solutions
**Subheadline:** Complete Security. Smart Living.

## Notes for Claude Code / component-spec.md

- Confirmed: no filter tabs for v1 — `ProductGrid` renders as a flat grid. See `decisions.md`.
- Cards should display: tagline as the card headline, then a short feature/spec list, matching the visual pattern from `motion-guide.md`'s card hover-state spec.
- Keep category order as listed above unless `component-spec.md` specifies a different grid arrangement.
- Note on Use Cases: The "Use cases" lists for categories 1-5 (CCTV, PTZ, WiFi Camera, Video Door Phone, Burglar Alarms) are newly approved copy added per user direction to ensure consistency across all 9 product cards (the original booklet only had use cases for PBX, Biometric, Networking, and Audio). Recorded in `decisions.md`.
