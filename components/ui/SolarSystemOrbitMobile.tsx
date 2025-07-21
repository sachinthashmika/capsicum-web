"use client";

import { useState, useEffect, Children, cloneElement, CSSProperties, ReactNode, ReactElement, isValidElement } from "react";
import { Facebook, Instagram, MonitorSmartphone, Brush, TrendingUp, Megaphone } from "lucide-react";
import Image from "next/image";

export default function SolarSystemOrbitMobile() {
  const backgroundStyle: CSSProperties = {
    width: "100%",
    height: "450px", 
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div style={backgroundStyle} className="flex items-center justify-center">
      <div className="relative w-full max-w-md h-full max-h-md">

 
        <OrbitRing radius={140} color="rgba(255, 0, 0, 0.3)" />
        <OrbitRing radius={100} color="rgba(255, 0, 0, 0.3)" />
        <OrbitRing radius={60} color="rgba(255, 0, 0, 0.3)" />

        {/* Outer orbit icons */}
        <OrbitPath radius={140}>
          <SocialIcon icon={<MonitorSmartphone size={26} />} bgColor="white" delay={0} />
          <SocialIcon icon={<Instagram size={26} />} bgColor="#ff3366" delay={60} />
        </OrbitPath>

        {/* Middle orbit icons */}
        <OrbitPath radius={100}>
          <SocialIcon icon={<Facebook size={26} />} bgColor="#ff3366" delay={0} />
          <SocialIcon icon={<Brush size={26} />} bgColor="white" delay={120} />
        </OrbitPath>

        {/* Inner orbit icons */}
        <OrbitPath radius={60}>
          <SocialIcon icon={<TrendingUp size={26} />} bgColor="#ff3366" delay={0} />
          <SocialIcon icon={<Megaphone size={26} />} bgColor="white" delay={180} />
        </OrbitPath>

        {/* Center image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <Image src="/icon.webp" alt="Capsicum" width={96} height={96} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface OrbitRingProps {
  radius: number;
  color?: string;
}

function OrbitRing({ radius, color = "rgba(255,0,0,0.3)" }: OrbitRingProps) {
  const ringStyle: CSSProperties = {
    width: radius * 2,
    height: radius * 2,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    border: `1px solid ${color}`,
    pointerEvents: "none",
  };

  return <div style={ringStyle} />;
}

interface OrbitPathProps {
  radius: number;
  children: ReactNode;
}

function OrbitPath({ radius, children }: OrbitPathProps): ReactElement {
  const childrenWithProps = Children.map(children, (child, index: number) => {
    if (isValidElement<SocialIconProps>(child)) {
      return cloneElement(child, {
        radius,
        speed: getRandomSpeed(20, 40),
        invert: index % 2 === 0,
        baseOffset: 0,
        index,
        total: Children.count(children),
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
}

interface SocialIconProps {
  icon: ReactElement;
  bgColor?: string;
  delay?: number;
  // These props are injected by OrbitPath, so they're optional in the interface
  // but required for the component to function properly
  radius?: number;
  speed?: number;
  invert?: boolean;
  baseOffset?: number;
  index?: number;
  total?: number;
}

function SocialIcon({
  icon,
  bgColor = "#ff3366",
  delay = 0,
  radius = 100,
  speed = 30,
  invert = false,
  baseOffset = 0,
  index = 0,
  total = 1,
}: SocialIconProps): ReactElement {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const now = Date.now() / 1000;
      const angle = ((now / speed) * 360 + delay + (invert ? 180 : 0) + (index * 360) / total + baseOffset) % 360;
      const radians = (angle * Math.PI) / 180;
      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;
      setPosition({ x, y });
    };

    updatePosition();
    const intervalId = setInterval(updatePosition, 16);
    return () => clearInterval(intervalId);
  }, [radius, delay, speed, invert, baseOffset, index, total]);

  const iconStyle: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
    backgroundColor: bgColor,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(255, 100, 100, 0.6)",
    zIndex: 5,
    transition: "transform 0.2s ease-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: bgColor === "white" ? "#333" : "white",
  };

  const hoverStyle: CSSProperties = {
    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(1.2)`,
  };

  return (
    <div
      style={isHovered ? { ...iconStyle, ...hoverStyle } : iconStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </div>
  );
}

function getRandomSpeed(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}