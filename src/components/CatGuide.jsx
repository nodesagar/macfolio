import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Cat, MousePointer2, Hand, Moon, Palette, Sparkles, X } from "lucide-react";

const SEEN_KEY = "oneko:guideSeen";

const tips = [
  {
    Icon: MousePointer2,
    title: "It follows you",
    text: "The little pet chases your cursor around the screen and perks up when you move fast.",
  },
  {
    Icon: Hand,
    title: "Pick it up",
    text: "Click and drag the pet to fling it anywhere. It scratches in the direction you toss it.",
  },
  {
    Icon: Moon,
    title: "Send it to nap",
    text: "Double-click the pet to make it curl up and sleep. Double-click again to wake it.",
  },
  {
    Icon: Palette,
    title: "Flip the colours",
    text: "Right-click the pet to invert it into a sleek black cat. Right-click once more to undo.",
  },
  {
    Icon: Sparkles,
    title: "It has a life of its own",
    text: "Leave your mouse still for a bit and it'll sit, scratch, yawn, and doze off on its own.",
  },
  {
    Icon: Cat,
    title: "Swap pets",
    text: "Type “oneko” anywhere, or hit the button below, to switch between Classic, Dog, Tora, Maia and Vaporwave.",
  },
];

const CatGuide = () => {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(
    () => localStorage.getItem(SEEN_KEY) === "true"
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openGuide = () => {
    setOpen(true);
    setSeen(true);
    localStorage.setItem(SEEN_KEY, "true");
  };

  const openPicker = () => {
    setOpen(false);
    window.onekoTogglePicker?.();
  };

  const renderTrigger = (className) => (
    <button
      type="button"
      onClick={openGuide}
      aria-label="Meet the cat"
      title="Meet the cat"
      className={`flex items-center justify-center p-1 rounded transition-colors cursor-pointer ${className}`}
    >
      <Cat size={18} className="text-black" />
      {!seen && (
        <span className="absolute -top-0.5 -right-0.5 flex size-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#238DCA] opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full size-2 bg-[#238DCA]" />
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Desktop: lives in the navbar (its parent is hidden on mobile). */}
      {renderTrigger("relative hover:bg-black/10")}

      {/* Mobile: the navbar group is hidden, so float a reachable trigger.
          `fixed` (not `relative`) both pins it and anchors the dot. */}
      {createPortal(
        renderTrigger(
          "sm:hidden fixed top-2 right-3 z-[1500] bg-white/70 backdrop-blur-md shadow-md"
        ),
        document.body
      )}

      {open && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="relative flex flex-col w-full max-w-sm sm:max-w-md max-h-[85dvh] rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 flex items-center justify-center size-7 rounded-lg text-gray-600 hover:bg-black/10 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="shrink-0 pr-8">
              <div className="flex items-center gap-2">
                <Cat size={20} className="text-black" />
                <h2 className="text-base sm:text-lg font-bold text-black">Say hi to the cat 🐾</h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                A tiny pixel pet roams this site. Here's what it can do.
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 mt-3 min-h-0 flex-1 overflow-y-auto">
              {tips.map((tip) => (
                <li key={tip.title} className="flex gap-2.5">
                  <span className="flex items-center justify-center size-8 shrink-0 rounded-lg bg-black/5 text-black">
                    <tip.Icon size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-black leading-tight">{tip.title}</p>
                    <p className="text-xs text-gray-600 leading-snug">{tip.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openPicker}
              className="shrink-0 mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-black text-white text-sm font-medium py-2.5 hover:bg-black/85 transition-colors cursor-pointer"
            >
              <Cat size={16} /> Choose your pet
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default CatGuide;
