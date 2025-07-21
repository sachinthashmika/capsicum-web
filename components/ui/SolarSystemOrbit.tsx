"use client";

import {
  useState,
  useEffect,
  Children,
  cloneElement,
  CSSProperties,
  ReactNode,
  ReactElement,
  isValidElement,
} from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  MonitorSmartphone,
  Brush,
  TrendingUp,
  Megaphone,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";

export default function BellPepperOrbit() {
  const backgroundStyle: CSSProperties = {
    width: "100%",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div style={backgroundStyle} className="flex items-center justify-center">
      <div className="relative w-full max-w-xl h-full max-h-xl">
        {/* Outer orbit (slowest, upright) */}
        <OrbitPath radius={220} color="rgba(255, 0, 0, 0.5)" speed={60} orientation="upright">
          <SocialIcon icon={<MonitorSmartphone size={24} />} bgColor="white" />
          <SocialIcon icon={<Brush size={24} />} bgColor="#ff3366" />
          <SocialIcon icon={<TrendingUp size={24} />} bgColor="white" />
        </OrbitPath>

        {/* Middle orbit (medium, inverted, reverse) */}
        <OrbitPath radius={160} color="rgba(255, 0, 0, 0.5)" speed={40} orientation="inverted" alternate={true}>
          <SocialIcon icon={<Lightbulb size={24} />} bgColor="white" />
          <SocialIcon icon={<Instagram size={24} />} bgColor="#ff3366" />
          <SocialIcon icon={<Megaphone size={24} />} bgColor="white" />
        </OrbitPath>

        {/* Inner orbit (fastest, upright) */}
        <OrbitPath radius={100} color="rgba(255, 0, 0, 0.5)" speed={25} orientation="upright">
          <SocialIcon icon={<Facebook size={24} />} bgColor="#ff3366" />
          <SocialIcon icon={<Linkedin size={24} />} bgColor="#ff3366" />
          <SocialIcon icon={<Instagram size={24} />} bgColor="#ff3366" />
        </OrbitPath>

        {/* Center image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-32 h-32 rounded-full flex items-center justify-center">
            <Image src="/icon.webp" alt="Capsicum" width={100} height={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface OrbitPathProps {
  radius: number;
  color?: string;
  children: ReactNode;
  speed: number;
  alternate?: boolean;
  orientation?: "upright" | "inverted";
}

export function OrbitPath({ radius, color = "rgba(255,0,0,0.5)", children, speed, alternate = false, orientation = "upright" }: OrbitPathProps): ReactElement {
  const total = Children.count(children);
  // For triangle: upright = 0, inverted = 180/N
  const baseOffset = orientation === "inverted" ? 180 / total : 0;

  const pathStyle = {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    border: `1px solid ${color}`,
  };

  const childrenWithProps = Children.map(children, (child, index: number) => {
    if (isValidElement<SocialIconProps>(child)) {
      return cloneElement(child, {
        radius,
        speed,
        invert: alternate,
        baseOffset,
        index,
        total,
      });
    }
    return child;
  });

  return <div style={pathStyle}>{childrenWithProps}</div>;
}

interface SocialIconProps {
  icon: ReactElement;
  bgColor?: string;
  index?: number;
  total?: number;
  radius?: number;
  speed?: number;
  invert?: boolean;
  baseOffset?: number;
}

export function SocialIcon({
  icon,
  bgColor = "#ff3366",
  index = 0,
  total = 1,
  radius = 100,
  speed = 30,
  invert = false,
  baseOffset = 0,
}: SocialIconProps): ReactElement {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const now = Date.now() / 1000;
      const baseAngle = (360 / total) * index + baseOffset;
      const rotation = ((now / speed) * 360 + baseAngle) % 360;
      const angle = invert ? 360 - rotation : rotation;
      const radians = (angle * Math.PI) / 180;
      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;
      setPosition({ x, y });
    };

    updatePosition();
    const intervalId = setInterval(updatePosition, 16);
    return () => clearInterval(intervalId);
  }, [index, total, radius, speed, invert, baseOffset]);

  const iconStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
    backgroundColor: bgColor,
    overflow: "hidden" as const,
    boxShadow: "0 0 15px rgba(255, 100, 100, 0.6)",
    zIndex: 5 as const,
    transition: "transform 0.2s ease-out",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: bgColor === "white" ? "#333" : "white",
  };

  const hoverStyle = {
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