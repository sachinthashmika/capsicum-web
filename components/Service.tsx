"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import FloatingIcons from "./ui/FloatingIcon"

const services = [
  {
    title: "Social Media Marketing",
    description:
      "Harness the full potential of social platforms to build meaningful relationships and grow your brand. We craft data driven strategies and engaging content to keep your audience connected, loyal, and ready to act.",
    image: "/V0-min.webp",
  },
  {
    title: "Performance Marketing",
    description:
      "Drive measurable growth with data backed ad strategies that maximize ROI and reach your ideal audience effectively. From paid search to social ads, we fine tune every campaign for peak performance.",
    image: "/V1-min.webp",
  },
  {
    title: "Content Creation & Copywriting",
    description:
      "Craft compelling stories, blogs, and messaging that resonate with your audience and strengthen your brand voice. We blend creativity and strategy to turn words into results.",
    image: "/V2-min.webp",
  },
  {
    title: "Search Engine Optimization",
    description:
      "Boost your visibility with onpage and off page SEO strategies that bring more organic traffic and higher search rankings. Stay ahead of the algorithm with techniques that evolve with the web.",
    image: "/V3-min.webp",
  },
  {
    title: "Analytics & Reporting",
    description:
      "Track performance with clear, actionable insights and reports that help you make smarter marketing decisions. We turn data into direction, helping you grow with confidence.",
    image: "/V4-min.webp",
  },
  {
    title: "Web Development",
    description:
      "Get sleek, responsive websites and landing pages that are optimized for user experience and conversion. Designed to not just look good, but convert effortlessly. Experience it with Capsicum Digital",
    image: "/V5-min.webp",
  },
  {
    title: "Video Production",
    description:
      "Captivate your audience with scroll stopping visuals, animations, and video content tailored to your brand. Bring your ideas to life through powerful storytelling and visuals.",
    image: "/V6-min.webp",
  },
  {
    title: "Content Marketing",
    description:
      "Deliver value with strategic content that builds authority, nurtures leads, and supports your overall digital strategy. We create content with purpose, built to engage and drive results.",
    image: "/V7-min.webp",
  },
  {
    title: "Influencer Marketing",
    description:
      "Leverage the power of creators and influencers to expand your brand's reach and credibility in authentic ways. We connect you with voices your audience already trusts.",
    image: "/V8-min.webp",
  },
]

export default function Service() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const serviceSectionRef = useRef<HTMLDivElement>(null)
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const [showFloatingIcons, setShowFloatingIcons] = useState(false)

  // Enhanced scroll functions to center the image
  const scrollLeft = () => {
    if (horizontalScrollRef.current) {
      const newIndex = Math.max(0, activeIndex - 1)
      const cardWidth = horizontalScrollRef.current.firstElementChild?.clientWidth ?? 300
      const gap = 32
      const scrollPosition = newIndex * (cardWidth + gap)
      horizontalScrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (horizontalScrollRef.current) {
      const newIndex = Math.min(services.length - 1, activeIndex + 1)
      const cardWidth = horizontalScrollRef.current.firstElementChild?.clientWidth ?? 300
      const gap = 32
      const scrollPosition = newIndex * (cardWidth + gap)
      horizontalScrollRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" })
    }
  }

  // Desktop: update index based on which vertical section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            if (!isNaN(index)) {
              setActiveIndex(index)
            }
          }
        })
      },
      {
        root: null,
        threshold: 0.6,
      },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Enhanced floating icons visibility logic
  useEffect(() => {
    const handleScroll = () => {
      if (!serviceSectionRef.current) return

      const rect = serviceSectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Check if we're in the service section
      const isInServiceSection = rect.top <= 0 && rect.bottom >= windowHeight

      if (isInServiceSection) {
        // For desktop: Show icons when Social Media Marketing (index 0) is fully visible
        // Hide when Influencer Marketing (index 8) is visible and user starts scrolling away
        if (window.innerWidth >= 768) {
          // Desktop logic
          if (activeIndex >= 0 && activeIndex <= 8) {
            // Show icons from Social Media Marketing to Influencer Marketing
            setShowFloatingIcons(true)
          } else {
            setShowFloatingIcons(false)
          }
        } else {
          // Mobile logic - show when first service is active and hide when last service is passed
          if (activeIndex >= 0 && activeIndex <= 8) {
            setShowFloatingIcons(true)
          } else {
            setShowFloatingIcons(false)
          }
        }
      } else {
        // Not in service section
        setShowFloatingIcons(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeIndex])

  // Mobile: update activeIndex based on scroll position
  useEffect(() => {
    if (!horizontalScrollRef.current) return

    const handleScroll = () => {
      const scrollLeft = horizontalScrollRef.current!.scrollLeft
      const childWidth = horizontalScrollRef.current!.firstElementChild?.clientWidth || 1
      const gap = 32 // space-x-8 = 2rem = 32px gap
      const newIndex = Math.round(scrollLeft / (childWidth + gap))
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    const scrollContainer = horizontalScrollRef.current
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [activeIndex])

  return (
    <div
      id="services"
      ref={serviceSectionRef}
      className="relative w-full bg-gradient-to-br from-[#262626] to-[#4b2022] text-white"
      style={{ minHeight: "100vh" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        {/* MOBILE VIEW: Sticky heading + content */}
        <div className="md:hidden">
          <h2 className="sticky top-0 z-20 bg-transparent p-4 text-[28px] sm:text-[32px] leading-tight font-extrabold tracking-tight mb-4 text-white">
            OUR SERVICES
          </h2>

          {/* Professional Black Glass Content Box */}
          <div className="sticky top-[3.5rem] z-20 mx-4">
            <div className="bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl shadow-black/50">
              {/* Subtle Red Accent Line */}
              <div className="w-12 h-0.5 bg-[#ff2d55] mb-4 rounded-full"></div>

              {/* Animated Title */}
              <h3
                key={`title-${activeIndex}`}
                className="text-xl font-bold text-white mb-4 leading-tight animate-fade-in"
              >
                {services[activeIndex].title}
              </h3>

              {/* Animated Description */}
              <p
                key={`desc-${activeIndex}`}
                className="text-[15px] text-gray-300 leading-relaxed animate-fade-in-delay"
              >
                {services[activeIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Horizontal scroll with arrows */}
        <div className="md:hidden relative pt-20 pb-4">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-[#4B2022] hover:bg-[#5B2528] p-2 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          {/* Scrollable Image Row */}
          <div
            ref={horizontalScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory space-x-8 px-12 pb-6 scrollbar-none scroll-smooth"
            style={{ scrollPaddingLeft: "64px", scrollPaddingRight: "64px" }}
          >
            {services.map((service, index) => {
              const isActive = index === activeIndex
              return (
                <div
                  key={index}
                  className="snap-center flex-shrink-0 w-[90vw] sm:w-[85vw] rounded-2xl overflow-hidden transition-transform duration-300"
                  style={{
                    transform: isActive ? "translateX(-40px)" : "none",
                  }}
                >
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={600}
                    height={320}
                    className="w-full h-[230px] sm:h-[260px] object-cover rounded-2xl"
                  />
                </div>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-[#4B2022] hover:bg-[#5B2528] p-2 rounded-full"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:grid md:grid-cols-[40%_60%] gap-x-16">
          {/* Sticky Text */}
          <div className="sticky top-32 self-start h-[80vh] flex flex-col z-10">
            <h2 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight mb-8 text-white">
              OUR SERVICES
            </h2>
            <div className="flex-grow" />
            {/* Desktop Sticky Text Content - Replace the existing div */}
            <div className="transition-all duration-500 ease-in-out -mt-30 max-w-xl">
              <h3
                key={`desktop-title-${activeIndex}`}
                className="text-2xl font-semibold text-[#ff2d55] mb-4 animate-fade-in"
              >
                {services[activeIndex].title}
              </h3>
              <p key={`desktop-desc-${activeIndex}`} className="text-[17px] text-[#d9d9d9] animate-fade-in-delay">
                {services[activeIndex].description}
              </p>
            </div>
            <div className="flex-grow" />
          </div>

          {/* Stacked Images */}
          <div className="flex flex-col space-y-[-42vh] z-10">
            {services.map((service, index) => (
              <div
                key={index}
                data-index={index}
                ref={(el) => {
                  sectionRefs.current[index] = el
                }}
                className="min-h-[100vh] flex items-center justify-center"
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={320}
                  className="rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Floating Icons with smooth transitions */}
      {showFloatingIcons && (
        <div className="hidden md:block fixed bottom-[-40px] left-0 z-50 pointer-events-none pl-6 transition-all duration-500 ease-in-out">
          <FloatingIcons />
        </div>
      )}

      {/* Simple CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 0.6s ease-out 0.1s both;
        }
      `}</style>
    </div>
  )
}
