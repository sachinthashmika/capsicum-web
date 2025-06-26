'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import { useEffect, useState } from 'react';

// Props
type ChartProps = {
  data: { metric: string; value: number }[];
};

export const ChartComponent = ({ data }: ChartProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [animatedData, setAnimatedData] = useState(data);

  // Detect screen size for responsive bar width
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Animate bars on data change
  useEffect(() => {
    setAnimatedData(data.map(item => ({ ...item, value: 0 })));
    const timeout = setTimeout(() => setAnimatedData(data), 100);
    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <>
      <ResponsiveContainer width="100%" height={460}>
        <BarChart data={animatedData} barSize={isMobile ? 28 : 60}>
          {/* Axes */}
          <XAxis
            dataKey="metric"
            tick={{
              fill: '#fff',
              fontSize: isMobile ? 10 : 16,
              fontWeight: 600,
            }}
            axisLine={{ stroke: '#ff2d55' }}
            tickLine={false}
          />
          <YAxis
            tick={{
              fill: '#fff',
              fontSize: isMobile ? 10 : 16,
            }}
            axisLine={{ stroke: '#ff2d55' }}
            tickLine={false}
          />

          {/* Gradients and Shine */}
          <defs>
            {/* Glass-style bar fill */}
            <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
            </linearGradient>

            {/* Shine animation mask */}
            <mask id="shineMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                className="shine"
                x="-40%"
                y="0"
                width="30%"
                height="100%"
                fill="url(#shineGradient)"
                transform="rotate(20)"
              />
            </mask>

            {/* Shine gradient */}
            <linearGradient id="shineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.7" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Bars with animation + glass effect + shine */}
          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            fill="url(#glassGradient)"
            fillOpacity={0.3}
            mask="url(#shineMask)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={1}
            isAnimationActive={true}
            animationDuration={800}
          >
            {animatedData.map((_, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Shine animation CSS */}
      <style jsx>{`
        .shine {
          animation: shineMove 2.5s infinite;
        }

        @keyframes shineMove {
          0% {
            transform: translateX(-100%) rotate(20deg);
          }
          100% {
            transform: translateX(200%) rotate(20deg);
          }
        }
      `}</style>
    </>
  );
};
