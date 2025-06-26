"use client";

import { motion } from "framer-motion";
import BellPepperOrbit from "./ui/SolarSystemOrbit";
import SolarSystemOrbitMobile from "./ui/SolarSystemOrbitMobile";
import LayoutWrapper from "./ui/LayoutWrapper";
import { AnimatedButton } from "./ui/moving-border";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-[calc(100vh-80px)] bg-gradient-to-br from-[var(--color-dark-bg)] via-[var(--color-dark-bg)] to-[var(--color-dark-gradient)] text-white overflow-hidden"
    >
      <LayoutWrapper className="h-full flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16 pt-20 md:pt-0">
        {/* Left: Text content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.25 } },
            hidden: {},
          }}
          className="w-full md:w-1/2 max-w-full md:max-w-xl space-y-6 z-10 text-center md:text-left px-4"
        >
          {/* Intro text */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[var(--color-brand)] text-base md:text-lg"
          >
            We Are Capsicum Digital
          </motion.p>

          {/* Animated Heading */}
          <motion.h1
            className="!text-[30px] md:!text-[53px] !leading-tight !font-extrabold tracking-tight"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {},
            }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block"
            >
              HIGH PERFORMANCE
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="block"
            >
              DIGITAL AGENCY
            </motion.span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-[var(--color-text-muted)] text-sm md:text-base"
          >
            From scroll stopping social posts to high converting campaigns, we do it all.
          </motion.p>

          {/* Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="flex justify-center md:justify-start"
          >
            <AnimatedButton
              borderRadius="1.75rem"
              className="px-6 py-2 text-sm font-medium text-[#ff2d55] bg-transparent hover:bg-[#ff2d55] hover:text-white transition-all shadow-md"
            >
              Get Started
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Right: Orbit animation */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div className="block md:hidden h-[360px] w-full -translate-y-20">
            <SolarSystemOrbitMobile />
          </div>
          <div className="hidden md:block h-[600px] w-full max-w-[500px] -translate-y-5 translate-x-10">
            <BellPepperOrbit />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
