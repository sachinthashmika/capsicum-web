'use client';

import LayoutWrapper from "@/components/ui/LayoutWrapper";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Card = ({
  title,
  description,
}: {
  title: React.ReactNode;
  description: string;
}) => (
  <div className="relative min-h-[14rem] w-full list-none overflow-visible">
    <div
      className="group relative h-full rounded-2xl border border-[#262626] p-2 md:rounded-3xl md:p-3 shadow-[0_0_24px_#1a1a1a] overflow-visible transition duration-300 ease-in-out"
      style={{
        background: 'linear-gradient(-135deg, #202020 20%, #292929 80%)',
      }}
    >
      {/* Neon Glow Lines (Top and Right) */}
      <div className="absolute inset-0 pointer-events-none z-10 rounded-3xl overflow-visible">
  {/* Top Line */}
  <div className="absolute top-0 left-0 right-[20px] h-px bg-gradient-to-r from-transparent via-[#ff2d55] to-[#ff2d55]" />
  <div className="absolute top-0 left-0 right-[20px] h-[2px] bg-gradient-to-r from-transparent via-[#ff2d55] to-[#ff2d55] blur-sm opacity-60" />

  {/* Right Line */}
  <div className="absolute top-[20px] bottom-0 right-0 w-px bg-gradient-to-b from-[#ff2d55] via-[#ff2d55] to-transparent" />
  <div className="absolute top-[20px] bottom-0 right-0 w-[2px] bg-gradient-to-b from-[#ff2d55] via-[#ff2d55] to-transparent blur-sm opacity-60" />

  {/* Smooth Rounded Corner using SVG */}
  <svg
  className="absolute top-0 right-0"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
>
  {/* Solid neon arc */}
  <path
    d="M0,0 A20,20 0 0,1 20,20"
    stroke="#ff2d55"
    strokeWidth="1"
    fill="none"
  />
  {/* Glowing blurred arc */}
  <path
    d="M0,0 A20,20 0 0,1 20,20"
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





      {/* Glowing Effect */}
      <GlowingEffect
        proximity={100}
        spread={50}
        glow={true}
        disabled={false}
        blur={0}
        movementDuration={2}
        className="z-0"
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-4 rounded-xl p-6 md:p-6">
        <div className="flex flex-col justify-between gap-3 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#ff2d55] mb-2 leading-tight">
            {title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
);


export default function About() {
  return (
    <section className="relative w-full h-auto md:h-[calc(100vh-80px)] bg-gradient-to-tr from-[var(--color-dark-bg)] via-[var(--color-dark-bg)] to-[var(--color-dark-gradient)] text-white overflow-hidden">
      <LayoutWrapper className="h-full flex flex-col justify-center gap-16 py-16 md:py-20">
        {/* Heading and Paragraph */}
        <div className="flex flex-col lg:flex-row items-start gap-8 md:gap-12">
          <h1 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight w-full lg:w-[40%] text-center lg:text-left">
            GET TO KNOW <br /> CAPSICUM
          </h1>

          <p className="text-gray-400 text-base md:text-lg font-light w-full lg:w-[50%] leading-relaxed">
            At Capsicum Digital, we are more than just a digital agency.
            We are your strategic creative partners, committed to delivering
            innovative and impactful digital solutions. With a strong focus on
            creativity and precision, we transform your brand’s vision into
            engaging experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card
            title={<>Our <br /> Team</>}
            description="A passionate group of innovators, creatives, and marketers driving brand success through collaboration."
          />
          <Card
            title={<>Our <br /> Vision</>}
            description="To empower brands with cutting-edge digital strategies that foster growth and long-term success."
          />
          <Card
            title={<>Our <br /> Approach</>}
            description="A results-driven approach combining creativity, technology, and data to craft tailored solutions."
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
