'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import FloatingIcons from './ui/FloatingIcon'

const services = [
  {
    title: 'Performance Marketing',
    description:
      'Drive measurable growth with data-backed ad strategies that maximize ROI and reach your ideal audience effectively. From paid search to social ads, we fine-tune every campaign for peak performance.',
    image: '/S1.jpg',
  },
  {
    title: 'Content Creation & Copywriting',
    description:
      'Craft compelling stories, blogs, and messaging that resonate with your audience and strengthen your brand voice. We blend creativity and strategy to turn words into results.',
    image: '/S2.jpg',
  },
  {
    title: 'Search Engine Optimization (SEO)',
    description:
      'Boost your visibility with on-page and off-page SEO strategies that bring more organic traffic and higher search rankings. Stay ahead of the algorithm with techniques that evolve with the web.',
    image: '/S3.jpg',
  },
  {
    title: 'Analytics & Reporting',
    description:
      'Track performance with clear, actionable insights and reports that help you make smarter marketing decisions. We turn data into direction, helping you grow with confidence.',
    image: '/S4.png',
  },
  {
    title: 'Web Design & Landing Pages',
    description:
      'Get sleek, responsive websites and landing pages that are optimized for user experience and conversion. Designed to not just look good, but convert effortlessly.',
    image: '/S5.jpg',
  },
  {
    title: 'Creative Design & Video',
    description:
      'Captivate your audience with scroll-stopping visuals, animations, and video content tailored to your brand. Bring your ideas to life through powerful storytelling and visuals.',
    image: '/S6.jpg',
  },
  {
    title: 'Content Marketing',
    description:
      'Deliver value with strategic content that builds authority, nurtures leads, and supports your overall digital strategy. We create content with purpose, built to engage and drive results.',
    image: '/S7.jpg',
  },
  {
    title: 'Influencer Marketing',
    description:
      "Leverage the power of creators and influencers to expand your brand's reach and credibility in authentic ways. We connect you with voices your audience already trusts.",
    image: '/S8.jpg',
  },
]

export default function Service() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const serviceSectionRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

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

  return (
    <div
      ref={serviceSectionRef}
      className="relative w-full bg-gradient-to-br from-[#262626] to-[#4b2022] text-white"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-[40%_60%] gap-x-16">
        {/* Left: Sticky Text */}
        <div className="md:sticky top-32 self-start h-[80vh] flex flex-col z-10">
          <h2 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight mb-8 text-white">
            OUR SERVICES
          </h2>

          <div className="flex-grow" />

          <div className="transition-all duration-500 ease-in-out -mt-30">
            <h3 className="text-xl font-semibold text-[#ff2d55] mb-2">
              {services[activeIndex].title}
            </h3>
            <p className="text-[#d9d9d9]">{services[activeIndex].description}</p>
          </div>

          <div className="flex-grow" />
        </div>

        {/* Right: Cards stacked with main scroll */}
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
                width={640}
                height={360}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Social Icons - fixed bottom-left only when service section is in view */}

      {isInView && (
  <div className="fixed bottom-[-40px] left-0 z-50 pointer-events-none pl-6">
    <FloatingIcons />
  </div>
)}
      
    </div>
  )
}
