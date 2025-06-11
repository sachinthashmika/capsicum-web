"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export function AnimatedButton({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  duration = 9000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "relative h-11 w-33 overflow-hidden bg-transparent p-[2px] text-sm",
        containerClassName,
      )}
      style={{
        borderRadius,
      }}
      {...otherProps}
    >
      {/* Animated Border */}
      <div
        className="absolute inset-0 z-10"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%" />
      </div>

      {/* Button Inner Content */}
      <div
        className={cn(
          "relative z-20 flex h-full w-full items-center justify-center border border-[var(--color-brand)] bg-[var(--color-dark-bg)] backdrop-blur-md font-medium",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  duration = 3000,
  rx,
  ry,
}: {
  duration?: number;
  rx?: string;
  ry?: string;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      {/* Path for motion reference */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute h-full w-full"
        preserveAspectRatio="none"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>

      {/* Glowing Dot (primary) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform,
          zIndex: 10,
        }}
      >
        <div className="h-3 w-3 rounded-full bg-[#ff2d55] shadow-[0_0_8px_4px_#ff2d55] opacity-90" />
      </motion.div>
    </>
  );
};
