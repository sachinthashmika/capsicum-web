"use client";

import BellPepperOrbit from "./ui/SolarSystemOrbit";
import SolarSystemOrbitMobile from "./ui/SolarSystemOrbitMobile";
import LayoutWrapper from "./ui/LayoutWrapper";
import { AnimatedButton } from "./ui/moving-border";

export default function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] bg-gradient-to-br from-[var(--color-dark-bg)] via-[var(--color-dark-bg)] to-[var(--color-dark-gradient)] text-white overflow-hidden">

      <LayoutWrapper className="h-full flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16 md:-translate-y-6 pt-20 md:pt-0">

        {/* Left: Text content */}
        <div className="w-full max-w-full md:max-w-xl space-y-6 z-10 text-center md:text-left px-4">
          <p className="text-[var(--color-brand)] text-base md:text-lg">
            We Are Capsicum Digital
          </p>
          <h1 className="!text-[30px] md:!text-[53px] !leading-tight !font-extrabold tracking-tight">
            HIGH PERFORMANCE<br />DIGITAL AGENCY
          </h1>

          <p className="text-[var(--color-text-muted)] text-sm md:text-base">
            From scroll stopping social posts to high converting campaigns, we do it all.
          </p>

          <div className="flex justify-center md:justify-start">
          <AnimatedButton
          borderRadius="1.75rem"
          className="px-6 py-2 text-sm font-medium text-[#ff2d55] bg-transparent hover:bg-[#ff2d55] hover:text-white transition-all shadow-md"
          >
          Get Started
          </AnimatedButton>

          </div>
        </div>

        {/* Right: Orbit animation */}
        <div className="w-full flex items-center justify-center relative">
  <div className="block md:hidden h-[360px] w-full -translate-y-20">
    <SolarSystemOrbitMobile />
  </div>
  <div className="hidden md:block h-[600px] w-full translate-x-[60px] -translate-y-5">
    <BellPepperOrbit />
  </div>
</div>


      </LayoutWrapper>
    </section>
  );
}
