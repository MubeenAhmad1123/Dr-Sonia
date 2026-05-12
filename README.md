# Dr. Sonia Imran — Birthday Tribute Website

A cinematic, premium, scrolling tribute website built for Dr. Sonia Imran's 26th birthday.

## ✨ Key Features
- **Custom Crown Reveal:** Sticky scroll mechanical dropping a vector crown onto portrait framing.
- **Tribute Timeline:** Interleaving responsive narrative flow with staggered emergence triggers.
- **Interactive Impact Matrix:** JavaScript counter deceleration loops representing core legacy analytics.
- **Lenis Smooth Scrolling:** Highly decoupled high-FPS rendering stack via synchronous tick listeners.
- **Confetti Finale:** Dynamic particle physics detonation via Framer Motion layout calculations.

---

## 🛠 Step 1: Add Your Photos

Place your images in the `public/images/` folder using these precise filenames:

1. `photo_hero.jpg`: The very first picture in the hero section.
2. `photo_crown.jpg`: The pivotal landing image. **CRITICAL:** Head must be visible at the top of this shot for the crown to land on it correctly.
3. `photo_timeline_1.jpg` through `photo_timeline_4.jpg`: Interleaved landscape memories.

> Read `public/images/PHOTO_GUIDE.md` for optimized aspect ratios and dimension requirements.

---

## ✏️ Step 2: Customizing Text

If you wish to modify the copy, edit the following TypeScript Component manifest arrays:

- **Quotes/Timeline**: Edit the `timelineItems` static constant inside `components/Timeline.tsx`.
- **Impact Numbers**: Update the metric definitions in `components/Impact.tsx`.
- **Ending Message**: Modify typography node content in `components/Ending.tsx`.

---

## 🚀 Step 3: Run Locally or Build

### Develop
Ensure dependencies are satisfied, then launch the local Next dev server:
```bash
npm install
npm run dev
```
View at `http://localhost:3000`

### Production Optimization
To lock the distribution bundle for server-less deployment nodes (Vercel/Netlify):
```bash
npm run build
npm run start
```

---

**Crafted with respect and precision by Mubeen.**
