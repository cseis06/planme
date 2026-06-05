"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { navItems } from "./nav-items";

const ACTIVE_SCALE = 1.5;

const getActiveIndex = (pathname: string) => {
  const index = navItems.findIndex(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return index === -1 ? 2 : index;
};

export default function BottomNav() {
  const pathname = usePathname();
  const activeIndex = getActiveIndex(pathname);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLSpanElement | null>(null);
  const glyphRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevIndexRef = useRef<number | null>(null);
  const indexRef = useRef(activeIndex);

  const bubbleX = (index: number) => {
    const track = trackRef.current;
    const bubble = bubbleRef.current;
    if (!track || !bubble) return 0;
    const step = track.clientWidth / navItems.length;
    return index * step + (step - bubble.offsetWidth) / 2;
  };

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;

    indexRef.current = activeIndex;
    const activeGlyph = glyphRefs.current[activeIndex];
    const prevIndex = prevIndexRef.current;

    if (prevIndex === null) {
      gsap.set(bubble, { x: bubbleX(activeIndex)});
      gsap.set(glyphRefs.current.filter(Boolean), { scale: 1 });
      gsap.set(activeGlyph, { scale: ACTIVE_SCALE });
      prevIndexRef.current = activeIndex;
      return;
    }

    if (prevIndex === activeIndex) return;

    const prevGlyph = glyphRefs.current[prevIndex];
    const tl = gsap.timeline();

    tl.to(prevGlyph, { scale: 1, duration: 0.2, ease: "power2.out" }, 0)
      .to(bubble, { x: bubbleX(activeIndex), duration: 0.65, ease: "elastic.out(1, 0.75)" }, 0)
      .to(activeGlyph, { scale: ACTIVE_SCALE, duration: 0.3, ease: "back.out(2.5)" }, 0.25);

    prevIndexRef.current = activeIndex;

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => {
      const bubble = bubbleRef.current;
      if (bubble) gsap.set(bubble, { x: bubbleX(indexRef.current) });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[env(safe-area-inset-bottom)]">
      <div className="w-full max-w-md rounded-t-[2rem] border-x border-t border-brown-line/20 bg-paper px-2 pt-3 pb-2 shadow-[0_-8px_30px_-12px_rgba(110,86,69,0.25)]">
        <div ref={trackRef} className="relative grid grid-cols-5 items-center">
          <span
            ref={bubbleRef}
            aria-hidden
            className="pointer-events-none absolute top-[2.5px] left-0 z-0 h-12 w-12 rounded-2xl border border-pink-deep/30 bg-pink-soft/80"
          />
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="z-10 flex flex-col items-center gap-1 py-1 outline-none focus-visible:opacity-80"
              >
                <span
                  ref={(el) => {
                    glyphRefs.current[index] = el;
                  }}
                  className="flex size-11 items-center justify-center"
                >
                  <Icon
                    strokeWidth={1.5}
                    className={`size-5 transition-all duration-500 ${
                      isActive ? "text-pink-deep" : "text-brown-line"
                    }`}
                  />
                </span>
                <span
                  className={`text-[11px] font-medium transition-colors duration-300 ${
                    isActive ? "text-pink-deep" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}