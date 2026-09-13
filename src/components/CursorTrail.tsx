"use client";

import { useEffect, useRef } from "react";

const DOT_COUNT = 6;
const LERP_FACTOR = 0.35;

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const dots = Array.from({ length: DOT_COUNT }, (_, i) => {
      const size = 10 - i;
      const el = document.createElement("div");
      el.style.cssText = `
        position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
        width: ${size}px; height: ${size}px; border-radius: 50%;
        background: rgba(109, 40, 217, 0.35);
        transform: translate(-50%, -50%);
        opacity: 0;
        will-change: transform, opacity;
      `;
      container.appendChild(el);
      return { el, x: -100, y: -100 };
    });

    let mouseX = -100;
    let mouseY = -100;
    let active = false;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!active) {
        dots.forEach((d) => {
          d.x = mouseX;
          d.y = mouseY;
        });
      }
      active = true;
      dots.forEach((d) => {
        d.el.style.opacity = "1";
      });
    };

    const handleMouseLeave = () => {
      active = false;
      dots.forEach((d) => {
        d.el.style.opacity = "0";
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    function animate() {
      if (active) {
        let px = mouseX;
        let py = mouseY;
        dots.forEach((d) => {
          d.x += (px - d.x) * LERP_FACTOR;
          d.y += (py - d.y) * LERP_FACTOR;
          d.el.style.left = `${d.x}px`;
          d.el.style.top = `${d.y}px`;
          px = d.x;
          py = d.y;
        });
      }
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
      dots.forEach((d) => d.el.remove());
      document.body.style.cursor = "";
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
