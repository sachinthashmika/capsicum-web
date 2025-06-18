"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function ClientTestimonialsPage() {
  const clientLogos = ["/b1.png", "/b2.png", "/b3.png", "/b4.png", "/b5.png"];

  const testimonials = [
    {
      quote:
        "The clarity and precision in your design perfectly reflect our educational mission. It’s refreshing to work with a team that truly understands our vision",
      name: "Lakshitha Prasad",
      designation: "Founder, English in 7 Boxes",
      src: "/cl2.jpg",
    },
    {
      quote:
        "The seamless blend of innovation and elegance in your work has elevated our digital presence and operational flow. It’s exactly what we needed to grow with confidence.",
      name: "Indeevari Wijerathne",
      designation: "Executive Director, Sapphire Luxury Aesthetics",
      src: "/cl1.jpg",
    },
    {
      quote:
        "Capsicum’s innovative yet elegant approach has transformed our digital presence and operations, exactly what we needed to grow confidently.",
      name: "Prem Durairajah",
      designation: "Director - Elegance Wellness Retreat",
      src: "/cl3.jpg",
    },
    
    
    
  ];

  return (
    <div className="relative bg-[#262626] text-white overflow-hidden">
      {/* Background radial gradient overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(75,32,34,0.6)_0%,_#262626_70%)] pointer-events-none" />

      {/* Client Logos Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
        <h1 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight uppercase text-center mb-4">
  Clients Portfolio
</h1>
<h2 className="text-base sm:text-lg md:text-xl text-[#d9d9d9] text-center max-w-xl mx-auto mb-6 mt-1">
  Trusted by brands and professionals across industries.
</h2>


          <div className="relative">
            <InfiniteMovingCards
              logos={clientLogos}
              direction="right"
              speed="slow"
              className="py-8"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight uppercase text-center mb-4">
            What Our Clients Say
          </h1>
        </div>

        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </section>
    </div>
  );
}
