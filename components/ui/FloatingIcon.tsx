'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const icons = [
  { src: '/facebook.png', alt: 'Facebook', x: 0, y: 100 },
  { src: '/tiktok.png', alt: 'TikTok', x: 90, y: 50 },
  { src: '/youtube.png', alt: 'YouTube', x: 180, y: 120 },
  { src: '/instagram.png', alt: 'Instagram', x: 270, y: 60 },
]

export default function FloatingIcons() {
  return (
    <div className="relative w-[400px] h-[200px]">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: icon.x,
            top: icon.y,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={80}
            height={80}
            className="opacity-100"
          />
        </motion.div>
      ))}
    </div>
  )
}
