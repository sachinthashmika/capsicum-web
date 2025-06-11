"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  logos,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  logos: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );

      setStart(true);
    }
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4", // bigger gap
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {logos.map((logo, idx) => (
          <li
            key={idx}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-[#4B2022] bg-[#202020] px-8 py-6 md:w-[450px] overflow-hidden"
          >
            {/* Neon top and left borders with sharp + blur lines */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none">
              {/* Top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff2d55] to-[#ff2d55] opacity-100" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff2d55] to-[#ff2d55] blur-md opacity-60" />

              {/* Left border */}
              <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-[#ff2d55] via-[#ff2d55] to-transparent opacity-100" />
              <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff2d55] via-[#ff2d55] to-transparent blur-md opacity-60" />

              {/* Top-left corner glow */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#ff2d55] rounded-full blur-md opacity-70" />
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center h-full">
              <img
                src={logo}
                alt={`Client logo ${idx + 1}`}
                className="w-32 sm:w-36 md:w-40 object-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
