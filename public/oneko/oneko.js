// oneko.js — web port of https://github.com/kyrie25/spicetify-oneko
// (itself based on https://github.com/adryd325/oneko.js)
// Behaviours: follow cursor, idle animations (sit / scratch / yawn / sleep),
// wall-scratch at screen edges, grab-and-drag, double-click to force-sleep,
// right-click to toggle kuroneko (black cat). Type "oneko" anywhere to open a
// picker and switch between variants (persists across reloads).

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  if (isReducedMotion) return;

  const curScript = document.currentScript;
  const nekoFile =
    (curScript && curScript.dataset.cat) || "/oneko/oneko-classic.gif";

  // Where the sprite gifs live (derived from the data-cat path).
  const SPRITE_BASE = nekoFile.replace(/oneko-[a-z]+\.gif.*$/i, "");
  const variants = [
    ["classic", "Classic"],
    ["dog", "Dog"],
    ["tora", "Tora"],
    ["maia", "Maia"],
    ["vaporwave", "Vaporwave"],
  ];
  const spriteUrl = (v) => `${SPRITE_BASE}oneko-${v}.gif`;
  let variant = "classic";

  const nekoEl = document.createElement("div");
  let nekoPosX = 32,
    nekoPosY = 32,
    mousePosX = 32,
    mousePosY = 32,
    frameCount = 0,
    idleTime = 0,
    idleAnimation = null,
    idleAnimationFrame = 0,
    forceSleep = false,
    grabbing = false,
    grabStop = true,
    nudge = false,
    kuroNeko = false;

  const nekoSpeed = 10;

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function parseLocalStorage(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(`oneko:${key}`));
      return typeof value === typeof fallback ? value : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function sleep() {
    forceSleep = !forceSleep;
    nudge = false;
    localStorage.setItem("oneko:forceSleep", forceSleep);
    if (!forceSleep) {
      resetIdleAnimation();
      return;
    }
    // Sleep where it currently stands.
    mousePosX = nekoPosX;
    mousePosY = nekoPosY;
  }

  function resolveVariant() {
    // Persisted picker choice wins; otherwise derive from the data-cat path.
    const stored = parseLocalStorage("variant", null);
    if (variants.some((v) => v[0] === stored)) return stored;
    const match = nekoFile.match(/oneko-([a-z]+)\.gif/i);
    if (match && variants.some((v) => v[0] === match[1])) return match[1];
    return "classic";
  }

  function setVariant(name) {
    variant = name;
    localStorage.setItem("oneko:variant", JSON.stringify(name));
    nekoEl.style.backgroundImage = `url('${spriteUrl(name)}')`;
  }

  function create() {
    kuroNeko = parseLocalStorage("kuroneko", false);
    forceSleep = parseLocalStorage("forceSleep", false);
    variant = resolveVariant();

    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.backgroundImage = `url('${spriteUrl(variant)}')`;
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.filter = kuroNeko ? "invert(100%)" : "none";
    nekoEl.style.cursor = "grab";
    nekoEl.style.touchAction = "none";
    nekoEl.style.zIndex = "99";

    document.body.appendChild(nekoEl);

    let lastKuroToggle = 0;
    function toggleKuroneko() {
      const now = Date.now();
      // De-dupe a long-press that some browsers also report as contextmenu.
      if (now - lastKuroToggle < 400) return;
      lastKuroToggle = now;
      kuroNeko = !kuroNeko;
      localStorage.setItem("oneko:kuroneko", kuroNeko);
      nekoEl.style.filter = kuroNeko ? "invert(100%)" : "none";
    }

    // Pointer move drives the chase: mouse hover on desktop, finger while
    // touching on mobile.
    window.addEventListener("pointermove", (e) => {
      if (forceSleep || grabbing) return;
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    });

    // Tap/click empty space to send the pet walking there (key for touch,
    // where there is no cursor to follow).
    window.addEventListener("pointerdown", (e) => {
      if (forceSleep || grabbing) return;
      if (e.target === nekoEl) return; // pet's own gestures handled below
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    });

    // Grab & drag the pet (mouse or touch). On touch this also powers
    // double-tap → sleep and long-press → invert.
    let lastTap = 0;
    nekoEl.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const isTouch = e.pointerType === "touch";
      grabbing = true;
      nekoEl.style.cursor = "grabbing";
      nekoEl.setPointerCapture?.(e.pointerId);

      let startX = e.clientX;
      let startY = e.clientY;
      let startNekoX = nekoPosX;
      let startNekoY = nekoPosY;
      let moved = false;
      let grabInterval;
      let longPress = null;

      if (isTouch) {
        longPress = setTimeout(() => {
          if (!moved) {
            moved = true; // handled as a long-press, not a tap or drag
            toggleKuroneko();
          }
        }, 500);
      }

      const pointermove = (e) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > 6 || absDeltaY > 6) {
          moved = true;
          clearTimeout(longPress);
        }

        // Scratch in the opposite direction of the drag.
        if (absDeltaX > absDeltaY && absDeltaX > 10) {
          setSprite(deltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
        } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
          setSprite(deltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
        }

        if (
          grabStop ||
          absDeltaX > 10 ||
          absDeltaY > 10 ||
          Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10
        ) {
          grabStop = false;
          clearTimeout(grabInterval);
          grabInterval = setTimeout(() => {
            grabStop = true;
            nudge = false;
            startX = e.clientX;
            startY = e.clientY;
            startNekoX = nekoPosX;
            startNekoY = nekoPosY;
          }, 150);
        }

        nekoPosX = startNekoX + e.clientX - startX;
        nekoPosY = startNekoY + e.clientY - startY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      };

      const pointerup = () => {
        clearTimeout(longPress);
        clearTimeout(grabInterval);
        grabbing = false;
        nudge = true;
        nekoEl.style.cursor = "grab";
        resetIdleAnimation();
        window.removeEventListener("pointermove", pointermove);
        window.removeEventListener("pointerup", pointerup);

        // A tap on the pet (no drag / no long-press): double-tap → sleep.
        // This also covers double-click with a mouse.
        if (!moved) {
          const now = Date.now();
          if (now - lastTap < 300) {
            sleep();
            lastTap = 0;
          } else {
            lastTap = now;
          }
        }
      };

      window.addEventListener("pointermove", pointermove);
      window.addEventListener("pointerup", pointerup);
    });

    // Right-click (mouse) toggles kuroneko; touch uses long-press above.
    nekoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      toggleKuroneko();
    });

    // Type "oneko" anywhere to open the variant picker.
    let typed = "";
    window.addEventListener("keydown", (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      typed = (typed + e.key.toLowerCase()).slice(-5);
      if (typed === "oneko") togglePicker();
    });

    window.onekoInterval = setInterval(frame, 100);
  }

  let pickerEl = null;
  let pickerKeyHandler = null;

  function ensurePickerStyles() {
    if (document.getElementById("oneko-picker-style")) return;
    const style = document.createElement("style");
    style.id = "oneko-picker-style";
    style.textContent = `
      .oneko-overlay {
        position: fixed; inset: 0; z-index: 2147483646;
        display: flex; align-items: center; justify-content: center;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
        animation: oneko-fade 0.15s ease-out;
        font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
      }
      @keyframes oneko-fade { from { opacity: 0 } to { opacity: 1 } }
      .oneko-card {
        position: relative; width: min(420px, calc(100vw - 32px));
        padding: 22px; border-radius: 20px;
        background: #1b1b1f; border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 20px 60px rgba(0,0,0,0.55);
      }
      .oneko-title { margin: 0; color: #fff; font-size: 17px; font-weight: 650; }
      .oneko-hint { margin: 4px 0 18px; color: #9a9aa2; font-size: 12.5px; line-height: 1.45; }
      .oneko-close {
        position: absolute; top: 14px; right: 14px;
        width: 30px; height: 30px; border: none; border-radius: 9px;
        background: rgba(255,255,255,0.06); color: #c8c8cf;
        font-size: 18px; line-height: 1; cursor: pointer; transition: background 0.15s, color 0.15s;
      }
      .oneko-close:hover { background: rgba(255,255,255,0.14); color: #fff; }
      .oneko-grid {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(78px, 1fr)); gap: 10px;
      }
      .oneko-item {
        display: flex; flex-direction: column; align-items: center; gap: 8px;
        padding: 12px 6px 10px; border-radius: 14px; cursor: pointer;
        background: rgba(255,255,255,0.03); border: 2px solid transparent;
        transition: transform 0.12s ease, background 0.12s, border-color 0.12s;
      }
      .oneko-item:hover { background: rgba(255,255,255,0.09); transform: translateY(-2px); }
      .oneko-item.selected { border-color: #6f8cff; background: rgba(111,140,255,0.14); }
      .oneko-sprite {
        width: 64px; height: 64px; image-rendering: pixelated;
        background-repeat: no-repeat; background-size: 512px 256px;
      }
      .oneko-label { color: #e6e6ec; font-size: 12.5px; font-weight: 550; }
      .oneko-item.selected .oneko-label { color: #fff; }
    `;
    document.head.appendChild(style);
  }

  function togglePicker() {
    if (pickerEl) {
      pickerEl.remove();
      pickerEl = null;
      window.removeEventListener("keydown", pickerKeyHandler);
      return;
    }

    ensurePickerStyles();

    pickerEl = document.createElement("div");
    pickerEl.className = "oneko-overlay";
    pickerEl.addEventListener("click", (e) => {
      if (e.target === pickerEl) togglePicker();
    });

    pickerKeyHandler = (e) => {
      if (e.key === "Escape") togglePicker();
    };
    window.addEventListener("keydown", pickerKeyHandler);

    const card = document.createElement("div");
    card.className = "oneko-card";

    const title = document.createElement("h2");
    title.className = "oneko-title";
    title.textContent = "Choose your companion";

    const hint = document.createElement("p");
    hint.className = "oneko-hint";
    hint.textContent =
      "Drag to move · double-click to nap · right-click to invert. Type “oneko” to reopen.";

    const close = document.createElement("button");
    close.className = "oneko-close";
    close.setAttribute("aria-label", "Close");
    close.textContent = "×";
    close.addEventListener("click", togglePicker);

    const grid = document.createElement("div");
    grid.className = "oneko-grid";

    const idle = spriteSets.idle[0];
    for (const [name, label] of variants) {
      const item = document.createElement("button");
      item.className = "oneko-item" + (name === variant ? " selected" : "");
      item.setAttribute("aria-label", label);
      if (name === variant) item.setAttribute("aria-current", "true");

      const sprite = document.createElement("div");
      sprite.className = "oneko-sprite";
      sprite.style.backgroundImage = `url('${spriteUrl(name)}')`;
      sprite.style.backgroundPosition = `${idle[0] * 64}px ${idle[1] * 64}px`;
      sprite.style.filter = kuroNeko ? "invert(100%)" : "none";

      const text = document.createElement("span");
      text.className = "oneko-label";
      text.textContent = label;

      item.append(sprite, text);
      item.addEventListener("click", () => {
        setVariant(name);
        togglePicker();
      });
      grid.appendChild(item);
    }

    card.append(close, title, hint, grid);
    pickerEl.appendChild(card);
    document.body.appendChild(pickerEl);
  }

  function getSprite(name, frame) {
    return spriteSets[name][frame % spriteSets[name].length];
  }

  function setSprite(name, frame) {
    const sprite = getSprite(name, frame);
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let availableIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
      if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
      if (nekoPosX > window.innerWidth - 32)
        availableIdleAnimations.push("scratchWallE");
      if (nekoPosY > window.innerHeight - 32)
        availableIdleAnimations.push("scratchWallS");
      idleAnimation =
        availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
        ];
    }

    if (forceSleep) {
      idleAnimation = "sleeping";
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8 && nudge && forceSleep) {
          setSprite("idle", 0);
          break;
        } else if (nudge) {
          nudge = false;
          resetIdleAnimation();
        }
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192 && !forceSleep) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;

    if (grabbing) {
      grabStop && setSprite("alert", 0);
      return;
    }

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (
      forceSleep &&
      Math.abs(diffY) < nekoSpeed &&
      Math.abs(diffX) < nekoSpeed
    ) {
      nekoPosX = mousePosX;
      nekoPosY = mousePosY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      idle();
      return;
    }

    if ((distance < nekoSpeed || distance < 48) && !forceSleep) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  // Allow the rest of the page (e.g. the navbar guide button) to open the picker.
  window.onekoTogglePicker = togglePicker;

  create();
})();
