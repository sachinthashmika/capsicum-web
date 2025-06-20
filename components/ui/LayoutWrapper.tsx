import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LayoutWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function LayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>


      {children}
    </div>
  );
}

