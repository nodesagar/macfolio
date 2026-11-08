# Macfolio — Improvement Audit

Audited 2026-11-06. At the time: `npm run lint` fails with 1 error, and `npm run build` passes but the main JS bundle is 821 KB (261 KB gzip) and `dist/` is 29 MB.

Ranked by impact within each section.

## Performance

- [x] **1. ~17 MB of unused assets ship in every deploy.** Nothing in `src/`, `index.html`, or `oneko.js` references these:

  | File | Size |
  |---|---|
  | `public/images/landour_ sagar.JPG` | 5.9 MB |
  | `public/images/me_1.jpg` | 4.9 MB |
  | `public/images/microsoft_2.jpg` | 4.8 MB |
  | `public/images/Wallpaper.jpeg` | 780 KB |
  | `public/oneko/image.png` | 612 KB |
  | `public/images/GOOGLE_CONF_ME.jpeg` | 240 KB |
  | `public/images/microsoft_visit.jpeg` | 88 KB |
  | `public/images/intab_preview.png` | 72 KB |
  | `public/images/landour_sagar_sm.JPG` | 40 KB |
  | `public/images/figma.png` | 8 KB |
  | `public/vite.svg` | 2 KB |
  | `public/icons/{atom,edit,rotate,share}.svg` | ~10 KB |

  Delete them, or move originals out of `public/`.

- [x] **2. Some images that are used are too heavy.** Convert to WebP at ~1600px wide (roughly 90% smaller):
  - `public/images/build3x_home.png`: 3.4 MB (Build3X image window)
  - `public/images/me_badhraj_temple.jpg`: 2.4 MB (`about-me.txt` header)
  - `public/images/ownurgrowth_home.png`: 852 KB
  - `public/images/dit_view.jpg`: 512 KB (wallpaper, preloaded on every visit)

- [x] **3. The PDF library is in the main bundle.** `react-pdf` and pdfjs load on first visit even though most visitors never open the resume. Lazy-load the Resume window in `src/App.jsx`:
  ```jsx
  const Resume = lazy(() => import('#windows/Resume.jsx'));
  // render inside <Suspense fallback={null}>
  ```
  Because the window returns `null` while closed, the chunk only downloads when Resume is first opened.

- [x] **4. Every window re-renders on any store change.** `src/hoc/WindowWrapper.jsx:13` subscribes to the whole store with `useWindowStore()`, so focusing one window re-renders all of them. Select only what each component needs:
  ```js
  const { isOpen, zIndex } = useWindowStore((s) => s.windows[windowKey]);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  ```
  `src/components/Dock.jsx:11`, `src/components/Home.jsx:13-14`, `src/windows/Text.jsx:9`, and `src/windows/Image.jsx:7` have the same pattern.

- [x] **5. Desktop folder `Draggable` is recreated on every render.** At `src/components/Home.jsx:10,26`, `projects` is a new array each render and is a `useGSAP` dependency, so `Draggable.create(".folder")` re-runs on every window open or focus. Move the filter to module scope and use `[]` as the dependency.

- [x] **6. The Google Fonts `@import` blocks rendering.** `src/index.css:1` loads fonts through a CSS `@import`. Move them to `index.html` so they load in parallel:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Georama:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" />
  ```

## Bugs

- [x] **7. The navbar clock never updates.** `src/components/Navbar.jsx:50` renders `dayjs()` once at page load. Also, `datetime=""` should be `dateTime` in React. Fix with a `useState` and a `setInterval` that ticks every minute.

- [x] **8. Debug log in production.** `src/components/Dock.jsx:96` has `console.log(windows)`. In the same function, `const window` (line 82) hides the browser's `window`; rename it to `win`.

- [x] **9. The Skills (Terminal) window has wrong data.**
  - `src/windows/Terminal.jsx:48` hardcodes "5 of 5 stacks" but `techStack` has 6 entries. Use `techStack.length`.
  - `src/constants/index.js:108` has the typo `"AndriodStudio"`; it should be `"Android Studio"`.
  - `src/constants/index.js:116` has a leading space in `" NestJS"`.

- [x] **10. Intab shows placeholder text.** Its description is just `"Intab is a new project."` (`src/constants/index.js:351`). It's hidden from the desktop but still listed in the Finder "My Projects" sidebar, and `intab_preview.png` exists but is never used. Write real copy and add the image, or remove the entry.

- [x] **11. Wrong favicon MIME type.** `index.html:6` declares `type="image/svg+xml"` for `/macbook.png`; it should be `type="image/png"`.

- [x] **12. Lint error.** `public/oneko/oneko.js:113`: `catch (e)` is unused. Change it to `catch {}`, or add `public/` to the ESLint ignores.

- [x] **13. Missing guard in `focusWindow`.** `src/store/window.js:28` doesn't check that the window exists, unlike `openWindow` and `closeWindow`. Add `if (!win) return;`.

## SEO and sharing

- [x] **14. No meta description or Open Graph tags.** Links shared on LinkedIn or X show no preview card. Add to `index.html`:
  ```html
  <meta name="description" content="Sagar's interactive macOS-style portfolio." />
  <meta property="og:title" content="Sagar's Portfolio" />
  <meta property="og:description" content="Sagar's interactive macOS-style portfolio." />
  <meta property="og:image" content="https://<domain>/images/og.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  ```

## Accessibility

- [x] **15. Some click targets don't work with a keyboard.** These are `div`/`li` elements with `onClick`, so they can't be focused or triggered with the keyboard:
  - `src/components/WindowControls.jsx:10`: close button
  - `src/components/Navbar.jsx:25`: nav links
  - `src/windows/Finder.jsx:45,112`: sidebar and content items
  - `src/components/Home.jsx:32`: desktop folders

  Use `<button type="button">` and add an `aria-label` where there's no visible text.

## Cleanup

- [x] **16. Dead code and leftovers:**
  - `src/App.css` is never imported; delete it.
  - `src/App.jsx:10` registers `Draggable` again; `WindowWrapper.jsx` already does.
  - `src/hoc/WindowWrapper.jsx:56-60`: the `useLayoutEffect` is dead because the component returns `null` when closed.
  - `src/windows/Text.jsx:7`: commented-out line.
  - `package.json`: the name is still `test_exp`.
  - `src/windows/Contact.jsx:7-10`: social links are re-sorted at runtime; put them in the right order in `constants` and drop the sort.

## Suggested order

1. Items 1–3: the biggest load-time wins, all low risk.
2. Items 7–9 and 11–13: quick bug fixes.
3. Items 4–5: render performance.
4. Items 14–15: sharing and accessibility.
5. Items 6, 10, 16: polish.
