"use client"

import Image from "next/image"
import LayoutWrapper from "@/components/ui/LayoutWrapper"

export default function Footer() {
  const quickLinks = ["Home", "Services", "Projects", "Contact"]
  const otherLinks = ["About", "Clients", "Testimonials"]

  return (
    <footer className="bg-[#000000] text-white py-16">
      <LayoutWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Logo and Company Description */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-12 lg:space-x-20">
              
              {/* Logo Section */}
              <div className="flex flex-col items-center space-y-2 mb-6 sm:mb-0">
                <Image
                  src="/logo.webp"
                  alt="Capsicum Digital Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <span className="text-2xl font-bold text-white">Capsicum</span>
              </div>

              {/* Content Section */}
              <div className="space-y-6 text-center sm:text-left">
                <p className="text-gray-300 text-base leading-relaxed">
                  At Capsicum Digital, we bring the right minds<br />
                  together to spark results that matter fueled<br />
                  by insight and creativity
                </p>
                <div className="space-y-2">
                  <a href="tel:+94767962610" className="text-gray-300 hover:text-brand transition-colors inline-block">
                    +94 767962610
                  </a>
                  <br />
                  <a href="mailto:info@capsicum.lk" className="text-gray-300 underline hover:text-brand transition-colors inline-block">
                    info@capsicum.lk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 lg:col-span-2 flex flex-row gap-x-6 w-full">
            {/* Quick Links */}
            <div className="space-y-4 w-1/2">
              <h3 className="text-lg font-semibold text-[#ff4757]">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "")}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Links */}
            <div className="space-y-4 w-1/2">
              <h3 className="text-lg font-semibold text-[#ff4757]">Other Links</h3>
              <ul className="space-y-3">
                {otherLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "")}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </LayoutWrapper>
    </footer>
  )
}

