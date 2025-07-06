"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export const InfiniteMovingCards = ({
  logos,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  logos: string[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [start, setStart] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      // Clear existing duplicates
      const originalLength = logos.length
      while (scrollerRef.current.children.length > originalLength) {
        scrollerRef.current.removeChild(scrollerRef.current.lastChild!)
      }

      // Add duplicates for infinite scroll
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        scrollerRef.current?.appendChild(duplicatedItem)
      })

      containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse")
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
      )

      setStart(true)
    }
  }, [direction, speed, logos.length])

  // Simple touch handlers
  const handleTouchStart = () => {
    setIsUserInteracting(true)
  }

  const handleTouchEnd = () => {
    // Resume animation after user stops interacting
    setTimeout(() => {
      setIsUserInteracting(false)
    }, 1000)
  }

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsUserInteracting(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsUserInteracting(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        // Adjusted mask gradient to show more content and fade less aggressively
        "[mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]",
        className,
      )}
    >
      <div
        className="overflow-x-auto overflow-y-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            // Added more padding to ensure logos are visible even at edges
            "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4 px-16",
            start && !isUserInteracting && "animate-scroll",
          )}
          style={{
            animation: start && !isUserInteracting ? undefined : "none",
          }}
        >
          {logos.map((logo, idx) => (
            <li
              key={idx}
              className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-[#4B2022] bg-[#000] px-8 py-6 md:w-[450px] overflow-hidden select-none"
              style={{ userSelect: "none" }}
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
                <svg className="absolute top-0 left-0" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  {/* Solid neon arc */}
                  <path d="M20,0 A20,20 0 0,0 0,20" stroke="#ff2d55" strokeWidth="1" fill="none" />
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
              <div className="flex items-center justify-center h-full pointer-events-none">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={`Client logo ${idx + 1}`}
                  width={160}
                  height={80}
                  className="w-32 sm:w-36 md:w-40 object-contain"
                  draggable={false}
                  unoptimized
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Hide scrollbar with CSS */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
