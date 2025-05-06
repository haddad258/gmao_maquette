"use client"

import { useState } from "react"
import {
  PenToolIcon as Tool,
  Clock,
  Calendar,
  FileText,
  Activity,
  Battery,
  Gauge,
  Timer,
  Wrench,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Download,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useRouter } from "next/navigation"

// Sample data for the equipment
const equipmentData = {
  id: "underground-drill",
  name: "Underground Drill",
  model: "HD-2000X",
  manufacturer: "DrillTech Industries",
  serialNumber: "DT20230789",
  installationDate: "2022-05-15",
  location: "Underground Site - Level 3",
  department: "Mining Operations",
  status: "Operational",
  lastMaintenance: "2024-02-15",
  nextMaintenance: "2024-03-15",
  lifetime: "5 years",
  specifications: {
    power: "750 HP",
    weight: "15,000 kg",
    dimensions: "8.5m x 2.4m x 3.2m",
    drillBitSize: "150mm",
    maxDrillDepth: "50m",
  },
  components: [
    {
      name: "Drill Head",
      health: 85,
      status: "Good",
      lastInspection: "2024-02-10",
    },
    {
      name: "Hydraulic System",
      health: 92,
      status: "Excellent",
      lastInspection: "2024-02-12",
    },
    {
      name: "Control Panel",
      health: 78,
      status: "Fair",
      lastInspection: "2024-02-08",
    },
    {
      name: "Motor",
      health: 88,
      status: "Good",
      lastInspection: "2024-02-15",
    },
  ],
  performanceMetrics: {
    availability: 92,
    reliability: 88,
    efficiency: 85,
    mtbf: "168 hours",
    mttr: "4.2 hours",
  },
  maintenanceHistory: [
    {
      date: "2024-02-15",
      type: "Preventive",
      description: "Regular maintenance and inspection",
      technician: "John Smith",
      duration: "4 hours",
      cost: 2500,
    },
    {
      date: "2024-01-20",
      type: "Corrective",
      description: "Hydraulic system pressure adjustment",
      technician: "Mike Johnson",
      duration: "2 hours",
      cost: 1500,
    },
    {
      date: "2023-12-10",
      type: "Preventive",
      description: "Oil change and lubrication",
      technician: "Sarah Williams",
      duration: "3 hours",
      cost: 1800,
    },
  ],
  documents: [
    {
      name: "Operating Manual",
      type: "PDF",
      size: "2.5 MB",
      lastUpdated: "2023-01-15",
    },
    {
      name: "Maintenance Guide",
      type: "PDF",
      size: "1.8 MB",
      lastUpdated: "2023-03-20",
    },
    {
      name: "Safety Procedures",
      type: "PDF",
      size: "1.2 MB",
      lastUpdated: "2023-02-10",
    },
  ],
  performanceData: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
    availability: 85 + Math.random() * 10,
    efficiency: 80 + Math.random() * 15,
  })),
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "excellent":
      return "text-green-500"
    case "good":
      return "text-blue-500"
    case "fair":
      return "text-yellow-500"
    case "poor":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "excellent":
      return CheckCircle2
    case "good":
      return CheckCircle2
    case "fair":
      return AlertCircle
    case "poor":
      return XCircle
    default:
      return AlertCircle
  }
}

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen space-y-8 bg-gray-50/50 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{equipmentData.name}</h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">Model: {equipmentData.model}</p>
            <span className="text-muted-foreground">•</span>
            <Badge variant={equipmentData.status === "Operational" ? "default" : "destructive"}>
              {equipmentData.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => router.push(`${params.id}/tree`)}>
            <FileText className="h-4 w-4" />
            Tree View
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => router.push(`${params.id}/details`)}>
            <FileText className="h-4 w-4" />
            Details
          </Button>
          <Button className="gap-2">
            <Wrench className="h-4 w-4" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Availability</p>
              <p className="text-2xl font-bold">{equipmentData.performanceMetrics.availability}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Battery className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Reliability</p>
              <p className="text-2xl font-bold">{equipmentData.performanceMetrics.reliability}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Efficiency</p>
              <p className="text-2xl font-bold">{equipmentData.performanceMetrics.efficiency}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Timer className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">MTBF</p>
              <p className="text-2xl font-bold">{equipmentData.performanceMetrics.mtbf}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="space-y-6">
            {/* Equipment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Equipment Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Manufacturer</p>
                    <p className="font-medium">{equipmentData.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Serial Number</p>
                    <p className="font-medium">{equipmentData.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Installation Date</p>
                    <p className="font-medium">{equipmentData.installationDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{equipmentData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{equipmentData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Lifetime</p>
                    <p className="font-medium">{equipmentData.lifetime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Components Health */}
            <Card>
              <CardHeader>
                <CardTitle>Component Health Status</CardTitle>
                <CardDescription>Current status of major components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {equipmentData.components.map((component) => {
                    const StatusIcon = getStatusIcon(component.status)
                    return (
                      <div key={component.name}>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`h-4 w-4 ${getStatusColor(component.status)}`} />
                            <span className="font-medium">{component.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Last inspected: {component.lastInspection}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={component.health} className="h-2" />
                          <span className="min-w-[3ch] text-sm font-medium">{component.health}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(equipmentData.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Tool className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Equipment performance over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={equipmentData.performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="availability" stroke="hsl(var(--primary))" name="Availability" />
                      <Line type="monotone" dataKey="efficiency" stroke="#ff7300" name="Efficiency" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            {/* Maintenance Schedule */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Maintenance Schedule</CardTitle>
                    <CardDescription>Upcoming and past maintenance activities</CardDescription>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentData.maintenanceHistory.map((maintenance, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg border bg-muted/50 p-4">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${
                          maintenance.type === "Preventive" ? "bg-green-500" : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{maintenance.description}</p>
                            <p className="text-sm text-muted-foreground">Technician: {maintenance.technician}</p>
                          </div>
                          <Badge variant="secondary">{maintenance.type}</Badge>
                        </div>
                        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {maintenance.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {maintenance.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />${maintenance.cost}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Related Documents</CardTitle>
                <CardDescription>Access manuals, guides, and other important documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentData.documents.map((document, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {document.type} • {document.size}
                          </p>
                        </div>
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Last updated</p>
                            <p className="text-sm text-muted-foreground">{document.lastUpdated}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

