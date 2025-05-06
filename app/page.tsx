"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Clock,
  PenToolIcon as Tool,
  AlertCircle,
  Settings,
  Activity,
  Timer,
  Gauge,
  Users,
  BarChart3,
  Building2,
  Bell,
  Search,
  Clipboard,
  PackageOpen,
  FileBarChart,
  Calendar,
  CheckCircle2,
  Menu,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalendarCard } from "@/components/calendar-card"

const quickStats = [
  {
    title: "Total Equipment",
    value: "234",
    change: "+12.5%",
    trend: "up",
    icon: Tool,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Active Alerts",
    value: "12",
    change: "-2",
    trend: "down",
    icon: AlertCircle,
    color: "from-red-500 to-pink-400",
  },
  {
    title: "MTBF",
    value: "168.5h",
    change: "+2.3h",
    trend: "up",
    icon: Activity,
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "MTTR",
    value: "4.2h",
    change: "-0.5h",
    trend: "down",
    icon: Timer,
    color: "from-purple-500 to-violet-400",
  },
  {
    title: "OEE",
    value: "87.5%",
    change: "+1.2%",
    trend: "up",
    icon: Gauge,
    color: "from-yellow-500 to-orange-400",
  },
  {
    title: "Team Availability",
    value: "95.2%",
    change: "+0.8%",
    trend: "up",
    icon: Users,
    color: "from-pink-500 to-rose-400",
  },
]

const recentActivities = [
  {
    title: "Equipment Maintenance",
    description: "Scheduled maintenance for Pump #123",
    time: "2 hours ago",
    status: "In Progress",
    statusColor: "bg-yellow-500",
  },
  {
    title: "Inventory Alert",
    description: "Low stock warning for spare parts",
    time: "4 hours ago",
    status: "Urgent",
    statusColor: "bg-red-500",
  },
  {
    title: "Work Order Completed",
    description: "Repair work completed on Machine #456",
    time: "6 hours ago",
    status: "Completed",
    statusColor: "bg-green-500",
  },
]

export default function DashboardPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      {isSidebarExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setIsSidebarExpanded(false)}
        />
      )}
      <div className="flex min-h-screen flex-col">
        {/* Top Bar */}
        <header className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center border-b bg-white/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Building2 className="h-5 w-5 text-primary" />
                <motion.div
                  className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <span className="font-semibold">CMMS Pro</span>
            </div>
          </div>

          <div className="ml-8 flex flex-1 items-center gap-4">
            <div className="relative w-96">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="h-8 pl-8" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Profile</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <Avatar className="h-20 w-20 ring-2 ring-primary ring-offset-4">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Maintenance Manager</p>
                    </div>
                    <Badge variant="secondary">Premium Plan</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Tool className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Active Tasks</p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Completed</p>
                        <p className="text-2xl font-bold">128</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Sidebar */}
        <motion.aside
          className="fixed left-0 top-12 z-40 flex h-[calc(100vh-3rem)] flex-col border-r bg-white shadow-lg"
          initial={{ x: -240 }}
          animate={{
            x: 0,
            width: isSidebarExpanded ? 240 : 56,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          <nav className="flex-1 space-y-1 p-2">
            {[
              { icon: BarChart3, label: "Dashboard", isActive: true },
              { icon: Tool, label: "Equipment" },
              { icon: Clipboard, label: "Work Orders" },
              { icon: PackageOpen, label: "Inventory" },
              { icon: FileBarChart, label: "Reports" },
              { icon: Calendar, label: "Schedule" },
              { icon: Users, label: "Team" },
            ].map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant={item.isActive ? "secondary" : "ghost"}
                    className={`h-8 w-full justify-start gap-2 ${!isSidebarExpanded && "justify-center px-2"}`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {isSidebarExpanded && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {!isSidebarExpanded && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          className="flex-1 pt-12"
          animate={{
            marginLeft: isSidebarExpanded ? 240 : 56,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            },
          }}
        >
          {/* Dashboard Content */}
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Quick Stats */}
            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {quickStats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`rounded-full bg-gradient-to-br ${stat.color} p-2 text-white`}>
                      <stat.icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline space-x-3">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {stat.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Calendar Card */}
              <CalendarCard />

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`mt-1 h-2 w-2 rounded-full ${activity.statusColor}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <Badge variant="secondary">{activity.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Tool className="h-4 w-4 text-muted-foreground" />
                          <span>Equipment Inspection</span>
                        </div>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-muted-foreground" />
                          <span>Work Orders</span>
                        </div>
                        <span className="font-medium">62%</span>
                      </div>
                      <Progress value={62} />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <PackageOpen className="h-4 w-4 text-muted-foreground" />
                          <span>Inventory Check</span>
                        </div>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.main>
      </div>
    </TooltipProvider>
  )
}

