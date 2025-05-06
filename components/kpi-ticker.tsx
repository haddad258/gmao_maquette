"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { Line, LineChart, ResponsiveContainer } from "recharts"

interface KPIData {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  chartData: { value: number }[]
  color: string
}

const generateChartData = (trend: "up" | "down" | "neutral", points = 20) => {
  const data = []
  let value = 50
  for (let i = 0; i < points; i++) {
    if (trend === "up") {
      value += Math.random() * 10 - 3
    } else if (trend === "down") {
      value -= Math.random() * 10 - 3
    } else {
      value += Math.random() * 6 - 3
    }
    value = Math.max(0, Math.min(100, value))
    data.push({ value })
  }
  return data
}

const kpiData: KPIData[] = [
  {
    label: "MTBF",
    value: "168.5h",
    change: "+2.3h",
    trend: "up",
    chartData: generateChartData("up"),
    color: "#22c55e",
  },
  {
    label: "MTTR",
    value: "4.2h",
    change: "-0.5h",
    trend: "down",
    chartData: generateChartData("down"),
    color: "#3b82f6",
  },
  {
    label: "OEE",
    value: "87.5%",
    change: "+1.2%",
    trend: "up",
    chartData: generateChartData("up"),
    color: "#8b5cf6",
  },
  {
    label: "Equipment Availability",
    value: "92.8%",
    change: "-0.3%",
    trend: "down",
    chartData: generateChartData("down"),
    color: "#f59e0b",
  },
  {
    label: "Team Availability",
    value: "95.2%",
    change: "+0.8%",
    trend: "up",
    chartData: generateChartData("up"),
    color: "#ec4899",
  },
]

export function KPITicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    const startScrolling = async () => {
      if (!containerRef.current || isPaused) return

      const containerWidth = containerRef.current.scrollWidth
      const viewportWidth = containerRef.current.offsetWidth

      if (containerWidth > viewportWidth) {
        await controls.start({
          x: -containerWidth / 2,
          transition: {
            duration: 30,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          },
        })
      }
    }

    startScrolling()
  }, [controls, isPaused])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setIsPaused(true)
    controls.stop()
    setStartX(e.pageX - containerRef.current!.offsetLeft)
    setScrollLeft(containerRef.current!.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsPaused(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - containerRef.current!.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current!.scrollLeft = scrollLeft - walk
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
    controls.stop()
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    setIsDragging(false)
  }

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 overflow-hidden border-b bg-zinc-900 py-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div ref={containerRef} className="relative overflow-hidden whitespace-nowrap">
        <motion.div animate={controls} className="inline-flex gap-8 px-4">
          {[...kpiData, ...kpiData].map((kpi, index) => (
            <div key={`${kpi.label}-${index}`} className="inline-flex items-center gap-6 text-white">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" style={{ color: kpi.color }} />
                  <span className="text-sm font-medium text-gray-400">{kpi.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold tabular-nums">{kpi.value}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm tabular-nums ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                      {kpi.change}
                    </span>
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                </div>
                <div className="h-8 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={kpi.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={kpi.color}
                        strokeWidth={1.5}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

