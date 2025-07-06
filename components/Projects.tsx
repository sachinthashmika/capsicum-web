'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  BarChart2,
  Users,
  Eye,
  TrendingUp,
  UserCheck,
} from 'lucide-react'

import { clients } from './data/clients'
import { ChartComponent } from './ui/ChartComponent'

const metricIcons: Record<string, React.ReactNode> = {
  Engagement: <TrendingUp className="w-6 h-6" />, 
  Reach: <Users className="w-6 h-6" />, 
  Impressions: <BarChart2 className="w-6 h-6" />, 
  Views: <Eye className="w-6 h-6" />, 
  Followers: <UserCheck className="w-6 h-6" />,
}

function getMetricDescription(metric: string) {
  switch (metric) {
    case 'Reach':
      return 'Total unique viewers reached'
    case 'Impressions':
      return 'Number of times shown'
    case 'Engagement':
      return 'Likes, shares & comments'
    case 'Views':
      return 'Total video views'
    case 'Followers':
      return 'New followers gained'
    default:
      return ''
  }
}

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showChart, setShowChart] = useState(false)
  const selectedClient = clients[currentIndex]

  const latestData = selectedClient.data
  const chartData = [
    { metric: 'Reach', value: latestData.find(d => d.metric === 'Reach')?.value || 0 },
    { metric: 'Impressions', value: latestData.find(d => d.metric === 'Impressions')?.value || 0 },
    { metric: 'Engagement', value: latestData.find(d => d.metric === 'Engagement')?.value || 0 },
    { metric: 'Views', value: latestData.find(d => d.metric === 'Views')?.value || 0 },
    { metric: 'Followers', value: latestData.find(d => d.metric === 'Followers')?.value || 0 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const nextClient = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length)
  }

  const prevClient = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length)
  }

  // Swipe gesture handling for mobile
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      const deltaX = touchEndX - touchStartX

      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          setShowChart(true)
        } else {
          setShowChart(false)
        }
      }
    }

    const container = document.getElementById('mobile-chart-toggle')
    container?.addEventListener('touchstart', handleTouchStart)
    container?.addEventListener('touchend', handleTouchEnd)

    return () => {
      container?.removeEventListener('touchstart', handleTouchStart)
      container?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <section id="projects" className="w-full px-4 py-20 md:px-12 bg-gradient-to-b from-[#262626] to-[#4b2022] text-white">
      <h1 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight uppercase text-center mb-6">
        OUR PROJECTS
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 sticky top-28 z-0 hidden md:block">
          <div className="mt-8">
            <ChartComponent data={chartData} />
          </div>
        </div>

        <div className="md:w-1/3 flex flex-col justify-center gap-6 max-h-[600px] relative z-10">
          <div className="rounded-2xl p-4 flex flex-col gap-4 md:bg-transparent md:backdrop-blur-0 md:shadow-none mt-6 md:mt-0">
            <div className="flex items-center justify-between px-4 py-2 border border-[#ff2d55] bg-[#2b2b2b] rounded-xl shadow-inner shadow-[#ff2d55]/20 select-none">
              <button onClick={prevClient} aria-label="Previous Client">
                <ChevronLeft className="w-8 h-8 text-[#ff2d55] hover:scale-110 transition-transform" />
              </button>
              <div className="flex items-center justify-center gap-4 flex-1 mx-4">
                <Image
                  src={selectedClient.logo}
                  alt={selectedClient.name}
                  width={60}
                  height={60}
                  className="rounded-md object-contain"
                />
                <span className="text-lg font-medium text-white whitespace-nowrap">
                  {selectedClient.name}
                </span>
              </div>
              <button onClick={nextClient} aria-label="Next Client">
                <ChevronRight className="w-8 h-8 text-[#ff2d55] hover:scale-110 transition-transform" />
              </button>
            </div>

            <div
              id="mobile-chart-toggle"
              className="md:hidden flex flex-row gap-4 overflow-x-auto no-scrollbar mt-6"
            >
              {!showChart ? (
                <div className="min-w-full grid grid-cols-2 gap-4">
                  {chartData.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item.metric}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#1a1a1a] border border-[#ff2d55] rounded-2xl p-3 shadow-md shadow-[#ff2d55]/20 flex flex-col items-center gap-1"
                    >
                      <div className="flex flex-col items-center text-[#ff2d55]">
                        {metricIcons[item.metric]}
                        <p className="mt-2 uppercase text-sm font-semibold tracking-wider">
                          {item.metric}
                        </p>
                        <p className="text-xs text-white/60 max-w-[120px] text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                          {getMetricDescription(item.metric)}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white leading-tight mt-2">
                        {item.value.toLocaleString()}
                      </p>
                    </motion.div>
                  ))}

                  {chartData[4] && (
                    <motion.div
                      key={chartData[4].metric}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="col-span-2 bg-[#1a1a1a] border border-[#ff2d55] rounded-2xl p-3 shadow-md shadow-[#ff2d55]/20 flex flex-col items-center gap-1"
                    >
                      <div className="flex flex-col items-center text-[#ff2d55]">
                        {metricIcons[chartData[4].metric]}
                        <p className="mt-2 uppercase text-sm font-semibold tracking-wider">
                          {chartData[4].metric}
                        </p>
                        <p className="text-xs text-white/60 max-w-[120px] text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                          {getMetricDescription(chartData[4].metric)}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white leading-tight mt-2">
                        {chartData[4].value.toLocaleString()}
                      </p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="min-w-full mt-6">
                  <ChartComponent data={chartData} />
                </div>
              )}
            </div>

            <div className="md:hidden flex justify-center mt-4 gap-4">
              <button
                onClick={() => setShowChart(false)}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-[#686868] hover:bg-[#515151] transition-colors"
              >
                <ChevronLeft className={`h-5 w-5 text-white transition-transform duration-300 group-hover/button:rotate-12 ${!showChart ? 'text-[#ff2d55]' : ''}`} />
              </button>
              <button
                onClick={() => setShowChart(true)}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-[#686868] hover:bg-[#515151] transition-colors"
              >
                <ChevronRight className={`h-5 w-5 text-white transition-transform duration-300 group-hover/button:-rotate-12 ${showChart ? 'text-[#ff2d55]' : ''}`} />
              </button>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              {chartData.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1a1a] border border-[#ff2d55] rounded-2xl p-3 shadow-md shadow-[#ff2d55]/20 flex flex-col items-center gap-1"
                >
                  <div className="flex flex-col items-center text-[#ff2d55]">
                    {metricIcons[item.metric]}
                    <p className="mt-2 uppercase text-sm font-semibold tracking-wider">
                      {item.metric}
                    </p>
                    <p className="text-xs text-white/60 max-w-[120px] text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                      {getMetricDescription(item.metric)}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-white leading-tight mt-2">
                    {item.value.toLocaleString()}
                  </p>
                </motion.div>
              ))}
              {chartData[4] && (
                <motion.div
                  key={chartData[4].metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="col-span-2 bg-[#1a1a1a] border border-[#ff2d55] rounded-2xl p-3 shadow-md shadow-[#ff2d55]/20 flex flex-col items-center gap-1"
                >
                  <div className="flex flex-col items-center text-[#ff2d55]">
                    {metricIcons[chartData[4].metric]}
                    <p className="mt-2 uppercase text-sm font-semibold tracking-wider">
                      {chartData[4].metric}
                    </p>
                    <p className="text-xs text-white/60 max-w-[120px] text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                      {getMetricDescription(chartData[4].metric)}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-white leading-tight mt-2">
                    {chartData[4].value.toLocaleString()}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
