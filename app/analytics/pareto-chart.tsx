"use client"

import { useState, useMemo } from "react"
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, ResponsiveContainer, Legend } from "recharts"
import { AlertTriangle, Info } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useRouter } from "next/navigation"

// Sample data
const rawData = [
  {
    equipment: "Underground Drill",
    category: "Mechanical",
    location: "Underground Site",
    shift: "Day",
    downtime: 48,
    incidents: 12,
    cost: 25000,
  },
  {
    equipment: "Conveyor Belt",
    category: "Electrical",
    location: "Surface Operations",
    shift: "Night",
    downtime: 36,
    incidents: 8,
    cost: 18000,
  },
  {
    equipment: "Hydraulic Pump",
    category: "Parts Failure",
    location: "Underground Site",
    shift: "Day",
    downtime: 24,
    incidents: 6,
    cost: 15000,
  },
  {
    equipment: "Excavator",
    category: "Mechanical",
    location: "Surface Operations",
    shift: "Day",
    downtime: 18,
    incidents: 5,
    cost: 12000,
  },
  {
    equipment: "Ventilation System",
    category: "Electrical",
    location: "Underground Site",
    shift: "Night",
    downtime: 12,
    incidents: 4,
    cost: 8000,
  },
  {
    equipment: "Mining Truck",
    category: "Wear and Tear",
    location: "Surface Operations",
    shift: "Day",
    downtime: 8,
    incidents: 3,
    cost: 6000,
  },
  {
    equipment: "Rock Crusher",
    category: "Mechanical",
    location: "Surface Operations",
    shift: "Night",
    downtime: 6,
    incidents: 2,
    cost: 4000,
  },
  {
    equipment: "Water Pump",
    category: "Parts Failure",
    location: "Underground Site",
    shift: "Day",
    downtime: 4,
    incidents: 1,
    cost: 2000,
  },
]

const categories = Array.from(new Set(rawData.map((item) => item.category)))
const locations = Array.from(new Set(rawData.map((item) => item.location)))
const shifts = Array.from(new Set(rawData.map((item) => item.shift)))
const timeframes = ["Weekly", "Monthly", "Quarterly", "Yearly"]

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-3 shadow-lg">
        <p className="mb-2 font-medium">{label}</p>
        <div className="space-y-1 text-sm">
          <p>Downtime: {payload[0].value} hours</p>
          <p>Incidents: {payload[0].payload.incidents}</p>
          <p>Cost: ${payload[0].payload.cost.toLocaleString()}</p>
          <p className="text-primary">Cumulative: {payload[1].value.toFixed(1)}%</p>
        </div>
      </div>
    )
  }
  return null
}

export default function ParetoChart() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedShift, setSelectedShift] = useState("All Shifts")
  const [selectedTimeframe, setSelectedTimeframe] = useState("Monthly")

  const router = useRouter()

  const filteredData = useMemo(() => {
    let filtered = [...rawData]

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }
    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter((item) => item.location === selectedLocation)
    }
    if (selectedShift !== "All Shifts") {
      filtered = filtered.filter((item) => item.shift === selectedShift)
    }

    // Sort by downtime in descending order
    filtered.sort((a, b) => b.downtime - a.downtime)

    // Calculate cumulative percentage
    const total = filtered.reduce((sum, item) => sum + item.downtime, 0)
    let cumulative = 0

    return filtered.map((item) => {
      cumulative += item.downtime
      return {
        ...item,
        percentage: (cumulative / total) * 100,
      }
    })
  }, [selectedCategory, selectedLocation, selectedShift])

  // Calculate insights
  const insights = useMemo(() => {
    const total = filteredData.reduce((sum, item) => sum + item.downtime, 0)
    const paretoThreshold = Math.ceil(filteredData.length * 0.2) // Top 20%
    const topCauses = filteredData.slice(0, paretoThreshold)
    const topDowntime = topCauses.reduce((sum, item) => sum + item.downtime, 0)
    const topPercentage = (topDowntime / total) * 100

    return {
      totalDowntime: total,
      topCausesCount: paretoThreshold,
      topDowntime,
      topPercentage,
      topEquipment: topCauses.map((item) => item.equipment).join(", "),
    }
  }, [filteredData])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Pareto Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">Equipment downtime analysis showing the 80/20 principle</p>
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">About Pareto Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  The Pareto principle states that roughly 80% of consequences come from 20% of causes. This chart helps
                  identify the vital few causes that contribute to most of the downtime.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe} value={timeframe}>
                  {timeframe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Locations">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Shifts">All Shifts</SelectItem>
              {shifts.map((shift) => (
                <SelectItem key={shift} value={shift}>
                  {shift}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chart */}
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={filteredData}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
              onClick={(data) => {
                if (data && data.activePayload) {
                  router.push(`/equipment/${data.activePayload[0].payload.equipment.toLowerCase().replace(/ /g, "-")}`)
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="equipment"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis yAxisId="left" label={{ value: "Downtime (hours)", angle: -90, position: "insideLeft" }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{ value: "Cumulative %", angle: 90, position: "insideRight" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="downtime"
                fill="hsl(var(--primary))"
                name="Downtime Hours"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="percentage"
                stroke="#ff7300"
                name="Cumulative %"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="mt-6 rounded-lg border bg-muted/50 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
            <div className="space-y-1">
              <h4 className="font-medium">Key Insights</h4>
              <p className="text-sm text-muted-foreground">
                The top {insights.topCausesCount} causes ({insights.topEquipment}) account for{" "}
                {insights.topPercentage.toFixed(1)}% of total downtime ({insights.totalDowntime} hours).
              </p>
              <p className="text-sm text-muted-foreground">
                Focus maintenance efforts on these critical equipment to significantly reduce overall downtime.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

