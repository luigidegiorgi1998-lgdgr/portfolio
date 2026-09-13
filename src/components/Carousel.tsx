"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";

export type CarouselSlide = {
  src: string;
  alt: string;
};

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%" }),
};

export default function Carousel({
  slides,
  frameClassName = "",
  imageClassName = "",
  aspectClassName = "aspect-[164/388]",
}: {
  slides: CarouselSlide[];
  frameClassName?: string;
  imageClassName?: string;
  aspectClassName?: string;
}) {
  const [[index, direction], setIndex] = useState([0, 0]);

  const goTo = (newIndex: number, dir: number) => {
    const wrapped = (newIndex + slides.length) % slides.length;
    setIndex([wrapped, dir]);
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -50) goTo(index + 1, 1);
    else if (info.offset.x > 50) goTo(index - 1, -1);
  };

  return (
    <div
      className={`relative h-[400px] w-full overflow-hidden rounded-2xl bg-card-dark ${frameClassName}`}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute flex h-full w-full items-center justify-center"
          >
            <div
              className={`relative ${aspectClassName} h-[92%] overflow-hidden rounded-[18px] border border-white/10 bg-[#0a090d] shadow-[0px_14px_24px_-8px_rgba(0,0,0,0.4)]`}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                sizes="480px"
                className={`object-cover pointer-events-none select-none ${imageClassName}`}
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1, -1)}
            className="absolute left-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-bg backdrop-blur-sm transition-colors hover:bg-white/20 min-[400px]:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1, 1)}
            className="absolute right-4 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-bg backdrop-blur-sm transition-colors hover:bg-white/20 min-[400px]:flex"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === index ? "bg-bg" : "bg-bg/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
