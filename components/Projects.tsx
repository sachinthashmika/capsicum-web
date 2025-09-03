'use client'

import { useState, useEffect } from 'react'
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

 

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  return (
    <section id="projects" className="w-full px-4 py-20 md:px-12 bg-gradient-to-b from-[#262626] to-[#4b2022] text-white">
      <h1 className="text-[28px] sm:text-[32px] md:text-[48px] leading-tight font-extrabold tracking-tight uppercase text-center mb-6">
        OUR PROJECTS
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop chart only */}
        <div className="md:w-2/3 sticky top-28 z-0 hidden md:block">
          <div className="mt-8">
            <ChartComponent data={chartData} />
          </div>
        </div>

        {/* Client details & metrics */}
        <div className="md:w-1/3 flex flex-col justify-center gap-6 max-h-[600px] relative z-10">
          <div className="rounded-2xl p-4 flex flex-col gap-4 md:bg-transparent md:backdrop-blur-0 md:shadow-none mt-6 md:mt-0">
            
            {/* Navigation */}
            <div className="flex items-center justify-between px-4 py-2 border border-[#ff2d55] bg-[#2b2b2b] rounded-xl shadow-inner shadow-[#ff2d55]/20 select-none">
              <button onClick={prevClient} aria-label="Previous Client">
                <ChevronLeft className="w-8 h-8 text-[#ff2d55] hover:scale-110 transition-transform" />
              </button>
              <div className="flex items-center justify-center flex-1 mx-4">
                <span className="text-lg font-medium text-white whitespace-nowrap">
                  {selectedClient.name}
                </span>
              </div>
              <button onClick={nextClient} aria-label="Next Client">
                <ChevronRight className="w-8 h-8 text-[#ff2d55] hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Metrics - Mobile & Desktop (but no chart on mobile) */}
            <div className="grid grid-cols-2 gap-4 mt-6">
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
                  </div>
                  <p className="text-2xl font-bold text-white leading-tight mt-1">
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
                  </div>
                  <p className="text-2xl font-bold text-white leading-tight mt-1">
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
