import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "default";
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full px-6 py-1.5 transition-all duration-300 font-medium",
        variant === "outline"
          ? "border-2 border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white"
          : "bg-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)]",
        className
      )}
      {...props}
    />
  );
}