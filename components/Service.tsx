'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FloatingIcons from './ui/FloatingIcon'

const services = [
  {
    title: 'Social Media Marketing',
    description:
      'Harness the full potential of social platforms to build meaningful relationships and grow your brand. We craft data driven strategies and engaging content to keep your audience connected, loyal, and ready to act.',
    image: '/V0.PNG',
  },
  {
    title: 'Performance Marketing',
    description:
      'Drive measurable growth with data backed ad strategies that maximize ROI and reach your ideal audience effectively. From paid search to social ads, we fine tune every campaign for peak performance.',
    image: '/V1.PNG',
  },
  {
    title: 'Content Creation & Copywriting',
    description:
      'Craft compelling stories, blogs, and messaging that resonate with your audience and strengthen your brand voice. We blend creativity and strategy to turn words into results.',
    image: '/V2.PNG',
  },
  {
    title: 'Search Engine Optimization',
    description:
      'Boost your visibility with onpage and off page SEO strategies that bring more organic traffic and higher search rankings. Stay ahead of the algorithm with techniques that evolve with the web.',
    image: '/V3.png',
  },
  {
    title: 'Analytics & Reporting',
    description:
      'Track performance with clear, actionable insights and reports that help you make smarter marketing decisions. We turn data into direction, helping you grow with confidence.',
    image: '/V4.png',
  },
  {
    title: 'Web Development',
    description:
      'Get sleek, responsive websites and landing pages that are optimized for user experience and conversion. Designed to not just look good, but convert effortlessly.',
    image: '/V5.PNG',
  },
  {
    title: 'Video Production',
    description:
      'Captivate your audience with scroll stopping visuals, animations, and video content tailored to your brand. Bring your ideas to life through powerful storytelling and visuals.',
    image: '/V6.PNG',
  },
  {
    title: 'Content Marketing',
    description:
      'Deliver value with strategic content that builds authority, nurtures leads, and supports your overall digital strategy. We create content with purpose, built to engage and drive results.',
    image: '/V7.PNG',
  },
  {
    title: 'Influencer Marketing',
    description:
      "Leverage the power of creators and influencers to expand your brand's reach and credibility in authentic ways. We connect you with voices your audience already trusts.",
    image: '/V8.PNG',
  },
]

export default function Service() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const serviceSectionRef = useRef<HTMLDivElement>(null)
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  const scrollLeft = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  // Desktop: update index based on which vertical section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            if (!isNaN(index)) {
              setActiveIndex(index)
            }
          }
        })
      },
      {
        root: null,
        threshold: 0.6,
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Observe section visibility for floating icons
  useEffect(() => {
    if (!serviceSectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0,
      }
    )

    observer.observe(serviceSectionRef.current)

    return () => observer.disconnect()
  }, [])

  // Mobile: update activeIndex based on scroll position
  useEffect(() => {
    if (!horizontalScrollRef.current) return

    const handleScroll = () => {
      const scrollLeft = horizontalScrollRef.current!.scrollLeft
      const childWidth = horizontalScrollRef.current!.firstElementChild?.clientWidth || 1
      const newIndex = Math.round(scrollLeft / childWidth)
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    const scrollContainer = horizontalScrollRef.current
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [activeIndex])

  return (
    <div
      ref={serviceSectionRef}
      className="relative w-full bg-gradient-to-br from-[#262626] to-[#4b2022] text-white"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        {/* MOBILE VIEW: Sticky heading + content */}
        <div className="md:hidden">
          {/* Our Services heading outside the gray box */}
          <h2 className="sticky top-0 z-20 bg-transparent p-4 text-[28px] sm:text-[32px] leading-tight font-extrabold tracking-tight mb-4 text-white">
            OUR SERVICES
          </h2>

          {/* Content with gray background box */}
          <div className="sticky top-[3.5rem] z-20 bg-[#262626] p-4">
            <h3 className="text-lg font-semibold text-[#ff2d55] mb-2">
              {services[activeIndex].title}
            </h3>
            <p className="text-[15px] text-[#d9d9d9]">{services[activeIndex].description}</p>
          </div>
        </div>

        {/* MOBILE VIEW: Horizontal scroll with arrows */}
        <div className="md:hidden relative py-4">
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
            className="flex overflow-x-auto space-x-4 px-8 scrollbar-none"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[80vw] max-w-xs scroll-snap-align-center rounded-xl overflow-hidden relative"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={240}
                  className="rounded-xl object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-[#4B2022] hover:bg-[#5B2528] p-2 rounded-full"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* DESKTOP VIEW: Sticky left + vertical scroll right */}
        <div className="hidden md:grid md:grid-cols-[40%_60%] gap-x-16">
          {/* Sticky Text */}
          <div className="sticky top-32 self-start h-[80vh] flex flex-col z-10">
          <h2 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight mb-8 text-white">
            OUR SERVICES
          </h2>
            <div className="flex-grow" />
            <div className="transition-all duration-500 ease-in-out -mt-30">
              <h3 className="text-2xl font-semibold text-[#ff2d55] mb-4">
                {services[activeIndex].title}
              </h3>
              <p className="text-[17px] text-[#d9d9d9]">{services[activeIndex].description}</p>
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
                  src={service.image}
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

      {/* Floating Icons */}
      {isInView && (
        <div className="hidden md:block fixed bottom-[-40px] left-0 z-50 pointer-events-none pl-6">
          <FloatingIcons />
        </div>
      )}
    </div>
  )
}
