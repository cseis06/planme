"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { navItems } from "./nav-items";

const ACTIVE_SCALE = 1.15;
const BUBBLE_PADDING = 7;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const getActiveIndex = (pathname: string) => {
  const index = navItems.findIndex(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return index === -1 ? 2 : index;
};

export default function BottomNav() {
  const pathname = usePathname();
  const activeIndex = getActiveIndex(pathname);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLSpanElement | null>(null);
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glyphRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevIndexRef = useRef(activeIndex);
  const mountedRef = useRef(false);

  const measure = (slot: HTMLSpanElement) => {
    const container = containerRef.current!.getBoundingClientRect();
    const rect = slot.getBoundingClientRect();
    return {
      x: rect.left - container.left - BUBBLE_PADDING,
      y: rect.top - container.top - BUBBLE_PADDING,
      width: rect.width + BUBBLE_PADDING * 2,
      height: rect.height + BUBBLE_PADDING * 2,
    };
  };

  useIsoLayoutEffect(() => {
    const bubble = bubbleRef.current;
    const slot = slotRefs.current[activeIndex];
    if (!bubble || !slot) return;

    const pos = measure(slot);
    const activeGlyph = glyphRefs.current[activeIndex];

    if (!mountedRef.current) {
      gsap.set(bubble, pos);
      gsap.set(glyphRefs.current.filter(Boolean), { scale: 1 });
      gsap.set(activeGlyph, { scale: ACTIVE_SCALE });
      mountedRef.current = true;
      prevIndexRef.current = activeIndex;
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const slideDur = reduceMotion ? 0.25 : 0.65;
    const slideEase = reduceMotion ? "power2.out" : "elastic.out(1, 0.75)";
    const popEase = reduceMotion ? "power2.out" : "back.out(2.5)";

    const prevIndex = prevIndexRef.current;
    const prevGlyph = glyphRefs.current[prevIndex];
    const tl = gsap.timeline();

    if (prevGlyph && prevIndex !== activeIndex) {
      tl.to(prevGlyph, { scale: 1, duration: 0.2, ease: "power2.out" }, 0);
    }

    tl.to(bubble, { x: pos.x, duration: slideDur, ease: slideEase }, 0)
      .to(
        bubble,
        { y: pos.y, width: pos.width, height: pos.height, duration: 0.3, ease: "power3.out" },
        0,
      )
      .to(activeGlyph, { scale: ACTIVE_SCALE, duration: 0.3, ease: popEase }, 0.32);

    prevIndexRef.current = activeIndex;

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  useEffect(() => {
    const reposition = () => {
      const bubble = bubbleRef.current;
      const slot = slotRefs.current[prevIndexRef.current];
      if (bubble && slot && containerRef.current) gsap.set(bubble, measure(slot));
    };
    window.addEventListener("resize", reposition, { passive: true });
    return () => window.removeEventListener("resize", reposition);
  }, []);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[env(safe-area-inset-bottom)]">
      <div
        ref={containerRef}
        className="relative grid w-full max-w-md grid-cols-5 items-center rounded-t-[2rem] border-x border-t border-brown-line/20 bg-paper px-2 pt-3 pb-2 shadow-[0_-8px_30px_-12px_rgba(110,86,69,0.25)]"
      >
        <span
          ref={bubbleRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 rounded-2xl border border-pink-deep/30 bg-pink-soft/80"
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
                  slotRefs.current[index] = el;
                }}
                className="flex size-11 items-center justify-center rounded-2xl"
              >
                <span
                  ref={(el) => {
                    glyphRefs.current[index] = el;
                  }}
                  className="flex items-center justify-center"
                >
                  <Icon
                    strokeWidth={1.75}
                    className={`size-6 transition-colors duration-300 ${
                      isActive ? "text-pink-deep" : "text-brown-line"
                    }`}
                  />
                </span>
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
    </nav>
  );
}