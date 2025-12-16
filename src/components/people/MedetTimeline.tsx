'use client'
import React, { useState, useEffect } from 'react'
import { BasePanel } from '@/components/panel'
import Link from '@/components/custom-ui/Link'
import { cn } from '@/lib/utils'

interface TimelinePoint {
  id: number
  year: string
  x: number // percentage
  y: number // percentage
  title: string
  content: React.ReactNode
  width?: number // panel width in pixels
}

const MedetTimeline: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(1200)

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Define timeline points with zig-zag positioning
  const timelinePoints: TimelinePoint[] = [
    {
      id: 1,
      year: '2018',
      x: 5, // top left
      y: 0, // Will be adjusted with transform for 25px margin
      title: 'Graduated Computer Science',
      width: 320,
      content: (
        <div className="space-y-3">
          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Shanghai, China
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            SIT.edu 2018
          </div>
          {/* Simple China map with Shanghai marker */}
          <div className="relative w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden mt-3">
            <svg viewBox="0 0 200 120" className="w-full h-full">
              {/* Simplified China outline */}
              <path
                d="M20,30 Q30,20 50,25 T90,30 T130,35 T160,40 T180,50 T190,60 T185,75 T170,85 T150,90 T120,95 T90,100 T60,95 T40,85 T25,70 Z"
                fill="rgb(241 245 249)"
                stroke="rgb(148 163 184)"
                strokeWidth="1"
                className="dark:fill-slate-700 dark:stroke-slate-600"
              />
              {/* Shanghai marker */}
              <circle
                cx="140"
                cy="50"
                r="4"
                fill="#ef4444"
                className="animate-pulse"
              />
              <circle
                cx="140"
                cy="50"
                r="8"
                fill="#ef4444"
                opacity="0.3"
                className="animate-ping"
              />
              <text
                x="140"
                y="40"
                textAnchor="middle"
                className="text-xs font-semibold fill-red-600 dark:fill-red-400"
              >
                Shanghai
              </text>
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      year: '2010',
      x: 75, // top right
      y: 5,
      title: 'Learnt computer and taught since childhood',
      width: 280,
      content: (
        <div className="space-y-2">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            2010 in high school
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Early passion for computers and teaching others
          </p>
        </div>
      ),
    },
    {
      id: 3,
      year: '2015',
      x: 10, // slightly bottom and left
      y: 25,
      title: 'First Programming Language',
      width: 360,
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            First programming language intentionally written from scratch without any reference in C
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-500 italic">
            Programming language written in Turkmen language that translates to C
          </div>
          <Link
            uri="https://github.com/ahmetson"
            asNewTab={true}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Archived GitHub →
          </Link>
        </div>
      ),
    },
    {
      id: 4,
      year: '2019',
      x: 70,
      y: 35,
      title: 'Blocklords Version 1',
      width: 320,
      content: (
        <div className="space-y-2">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Joined to work on games on blockchain
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-500 italic border-l-2 border-blue-500 pl-2">
            No token, no NFT. Strictly gameplay on smart contracts
          </div>
        </div>
      ),
    },
    {
      id: 5,
      year: '2021-2023',
      x: 15,
      y: 50,
      title: 'Blocklords and Seascape CTO',
      width: 380,
      content: (
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">Blocklords</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Led technical development and architecture
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-100">Seascape</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                CTO role - Strategic technical leadership
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-500">
            Code launched and deployed to production
          </div>
        </div>
      ),
    },
    {
      id: 6,
      year: '2018-2021',
      x: 65,
      y: 65,
      title: 'Blockchain Experiments',
      width: 400,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Experimenting learning blockchain outside of game use, solving and researching technical challenging parts
          </p>
          <div className="space-y-3 text-xs">
            <div className="border-l-2 border-purple-500 pl-3">
              <div className="font-semibold text-slate-900 dark:text-slate-100">2018: Element Words</div>
              <p className="text-slate-600 dark:text-slate-400">
                Pixel crafting on blockchain by card game
              </p>
              <Link
                uri="https://github.com/ahmetson/element-words"
                asNewTab={true}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub →
              </Link>
            </div>
            <div className="border-l-2 border-blue-500 pl-3">
              <div className="font-semibold text-slate-900 dark:text-slate-100">2019: Devoircloud</div>
              <p className="text-slate-600 dark:text-slate-400">
                A decentralized virtual cloud from hosting providers. No to single vendor lock-in. Instead, small hosting providers together organize a cloud
              </p>
              <Link
                uri="https://github.com/devoircloud"
                asNewTab={true}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub →
              </Link>
            </div>
            <div className="border-l-2 border-green-500 pl-3">
              <div className="font-semibold text-slate-900 dark:text-slate-100">2021: RNG</div>
              <p className="text-slate-600 dark:text-slate-400">
                Random number generation in blockchain
              </p>
              <Link
                uri="https://github.com/ahmetson/rng"
                asNewTab={true}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub →
              </Link>
            </div>
            <div className="border-l-2 border-orange-500 pl-3">
              <div className="font-semibold text-slate-900 dark:text-slate-100">2021: Rigidity</div>
              <p className="text-slate-600 dark:text-slate-400">
                Programming language experiment
              </p>
              <Link
                uri="https://github.com/ahmetson/rigidity"
                asNewTab={true}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                GitHub →
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      year: 'Since 2023',
      x: 20,
      y: 85,
      title: 'Ara Project',
      width: 350,
      content: (
        <div className="space-y-2">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Working on Ara project. Finally demonstrating it in the end of 2025
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-500 italic">
            A visual social media for open source projects that tracks project ownership, collaboration, and funds on blockchain
          </div>
        </div>
      ),
    },
  ]

  // Generate SVG path for connecting lines (zig-zag pattern)
  const generatePath = (points: TimelinePoint[]): string => {
    if (points.length < 2) return ''

    let path = `M ${points[0].x}% ${points[0].y}%`

    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x}% ${points[i].y}%`
    }

    return path
  }

  const pathData = generatePath(timelinePoints)

  return (
    <div className="relative w-full min-h-[200vh] py-20 px-4 md:px-8">
      {/* SVG for dashed lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
        preserveAspectRatio="none"
      >
        <path
          d={pathData}
          fill="none"
          stroke="rgb(148 163 184)"
          strokeWidth="2"
          strokeDasharray="8 4"
          strokeLinecap="round"
          className="dark:stroke-slate-600"
          style={{
            opacity: 0.6,
          }}
        />
      </svg>

      {/* Timeline Points */}
      {timelinePoints.map((point, index) => (
        <div
          key={point.id}
          className="absolute"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: index === 0 ? 'translateY(25px)' : 'translateY(-25px)', // First point: 25px from top, others: adjust for panel height
            zIndex: 10,
          }}
        >
          {/* Year Badge */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-blue-500 text-white shadow-lg">
              {point.year}
            </span>
          </div>

          {/* Panel */}
          <BasePanel
            className="shadow-xl max-w-[90vw] md:max-w-full"
            style={{
              width: point.width ? `${Math.min(point.width, windowWidth * 0.9)}px` : '320px',
              maxWidth: '90vw',
            }}
          >
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {point.title}
              </h3>
              <div className="text-sm">{point.content}</div>
            </div>
          </BasePanel>
        </div>
      ))}
    </div>
  )
}

export default MedetTimeline
