"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ClientTestimonialsPage() {
  const clientLogos = [
    "/b1.webp",
    "/b2.webp",
    "/b8.webp",
    "/b4.webp",
    "/b5.webp",
    "/b7.webp",
    "/b6.webp",
    "/b3.webp",
    "/b9.webp",
    "/b10.webp",
  ]

  const testimonials = [
    {
      quote:
        "The clarity and precision in your design perfectly reflect our educational mission. It's refreshing to work with a team that truly understands our vision",
      name: "Lakshitha Prasad",
      designation: "Founder - English in 7 Boxes",
      src: "/Lakshitha.jpg",
    },
    {
      quote:
        "The seamless blend of innovation and elegance in your work has elevated our digital presence and operational flow. It's exactly what we needed to grow with confidence.",
      name: "Indeevari Wijerathne",
      designation: "Executive Director - Sapphire Luxury Aesthetics",
      src: "/indi.webp",
    },
    {
      quote:
        "Capsicum's innovative yet elegant approach has transformed our digital presence and operations, exactly what we needed to grow confidently.",
      name: "Prem Durairajah",
      designation: "Director - Elegance Wellness Retreat",
      src: "/prem.webp",
    },
  ]

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const tileVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <div id="clients" className="relative bg-gradient-to-br from-[#262626] to-[#4b2022] text-white overflow-hidden">
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(75,32,34,0.6)_0%,_#262626_70%)]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#ff2d55]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-[#ff2d55]/3 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Client Logos Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced header animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h1 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight uppercase text-center mb-4 relative z-10">
                Clients Portfolio
              </h1>
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#ff2d55] to-transparent"
              />
            </div>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg md:text-xl text-[#d9d9d9] text-center max-w-xl mx-auto mt-6"
            >
              Trusted by brands and professionals across industries.
            </motion.h2>
          </motion.div>

          {/* Clean Logo Grid - No Background Boxes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 max-w-7xl mx-auto px-8"
          >
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                variants={tileVariants}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group relative flex items-center justify-center"
              >
                {/* Logo Container - Optimized for 930x370 aspect ratio */}
                <div className="relative w-full aspect-[930/370] flex items-center justify-center px-2">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`Client logo ${index + 1}`}
                    width={930}
                    height={370}
                    className="object-contain max-w-full max-h-full filter brightness-90 group-hover:brightness-110 transition-all duration-500 drop-shadow-lg group-hover:drop-shadow-xl"
                  />

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-[#ff2d55]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight uppercase text-center mb-4"
          >
            What Our Clients Say
          </motion.h1>
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </section>
    </div>
  )
}
