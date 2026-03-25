import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FONT_WEIGHTS = {
  subtitle: { min: 300, max: 600, default: 300 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span key={i} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  // Skip hover effect on mobile/touch devices
  if (window.matchMedia('(max-width: 639px)').matches) return () => {};

  const letters = container.querySelectorAll('span');
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetters = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: 'power2.out',
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetters(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => letters.forEach((letter) => animateLetters(letter, base, 0.3));

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, 'title');
    const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle');

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText("Hey I'm Sagar. Welcome to my", "text-2xl sm:text-3xl font-georama", 300)}
      </p>

      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio", "text-6xl sm:text-9xl italic font-georama")}
      </h1>
    </section>
  );
};

export default Welcome;
