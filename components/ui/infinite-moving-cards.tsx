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
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {logos.map((logo, idx) => (
          <li
            key={idx}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-[#4B2022] bg-[#000] px-8 py-6 md:w-[450px] overflow-hidden"
          >
            {/* Neon top and left borders with sharp + blur lines */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none">
  {/* Top Line */}
  <div className="absolute top-0 left-0 right-[20px] h-px bg-[#ff2d55]" />
  <div className="absolute top-0 left-0 right-[20px] h-[2px] bg-[#ff2d55] blur-sm opacity-60" />

  {/* Left Line */}
  <div className="absolute top-[20px] bottom-0 left-0 w-px bg-[#ff2d55]" />
  <div className="absolute top-[20px] bottom-0 left-0 w-[2px] bg-[#ff2d55] blur-sm opacity-60" />

  {/* Top-left smooth rounded corner (SVG) */}
  <svg
    className="absolute top-0 left-0"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    {/* Solid neon arc */}
    <path
      d="M20,0 A20,20 0 0,0 0,20"
      stroke="#ff2d55"
      strokeWidth="1"
      fill="none"
    />
    {/* Blurred glowing arc */}
    <path
      d="M20,0 A20,20 0 0,0 0,20"
      stroke="#ff2d55"
      strokeWidth="3"
      opacity="0.4"
      filter="url(#glow)"
      fill="none"
    />
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
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
