"use client"
import {
  Phone,
  Mail,
  Calendar,
  Clock,
  Shield,
  PenToolIcon as Tool,
  HardHat,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Timer,
  BarChart3,
} from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Sample data for the team member
const teamMember = {
  id: "TM001",
  name: "John Anderson",
  title: "Senior Maintenance Technician",
  tagline: "Expert in Heavy Machinery Repairs",
  photo: "/placeholder.svg",
  contact: {
    email: "j.anderson@mining.com",
    phone: "+1 (555) 123-4567",
    shift: "Day Shift (6:00 AM - 2:00 PM)",
    status: "On Duty",
  },
  expertise: [
    { name: "Hydraulic Systems", level: 95 },
    { name: "Electrical Maintenance", level: 90 },
    { name: "Welding", level: 85 },
    { name: "Machine Troubleshooting", level: 92 },
    { name: "Preventive Maintenance", level: 88 },
  ],
  certifications: [
    {
      name: "MSHA Safety Certification",
      issuer: "Mine Safety and Health Administration",
      date: "2023",
      icon: Shield,
    },
    {
      name: "Advanced Hydraulic Systems",
      issuer: "Mining Technical Institute",
      date: "2022",
      icon: Tool,
    },
    {
      name: "First Aid & Emergency Response",
      issuer: "Red Cross",
      date: "2023",
      icon: AlertTriangle,
    },
    {
      name: "Heavy Equipment Operation",
      issuer: "Mining Equipment Association",
      date: "2021",
      icon: HardHat,
    },
  ],
  projects: [
    {
      title: "Mining Drill System Overhaul",
      description: "Led complete overhaul of primary drilling system",
      duration: "3 months",
      impact: "Improved efficiency by 35%",
      status: "Completed",
    },
    {
      title: "Conveyor Belt Maintenance",
      description: "Preventive maintenance and repair of main conveyor system",
      duration: "1 month",
      impact: "Reduced downtime by 45%",
      status: "In Progress",
    },
    {
      title: "Safety Protocol Implementation",
      description: "Developed and implemented new safety procedures",
      duration: "2 months",
      impact: "Zero incidents since implementation",
      status: "Completed",
    },
  ],
  equipment: [
    { name: "Underground Drills", expertise: "Expert" },
    { name: "Conveyor Systems", expertise: "Expert" },
    { name: "Mining Trucks", expertise: "Advanced" },
    { name: "Hydraulic Systems", expertise: "Expert" },
    { name: "Welding Equipment", expertise: "Advanced" },
  ],
  stats: {
    tasksCompleted: 128,
    safetyScore: 98,
    avgResponseTime: "15 minutes",
    preventiveMaintenance: 92,
  },
  schedule: [
    { day: "Monday", shift: "Day", hours: "6:00 AM - 2:00 PM" },
    { day: "Tuesday", shift: "Day", hours: "6:00 AM - 2:00 PM" },
    { day: "Wednesday", shift: "Day", hours: "6:00 AM - 2:00 PM" },
    { day: "Thursday", shift: "Day", hours: "6:00 AM - 2:00 PM" },
    { day: "Friday", shift: "Day", hours: "6:00 AM - 2:00 PM" },
  ],
}

export default function TeamMemberPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 p-6">
      {/* Profile Header */}
      <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="relative h-32 w-32 overflow-hidden rounded-xl border-4 border-primary/10 md:h-40 md:w-40">
            <Image src={teamMember.photo || "/placeholder.svg"} alt={teamMember.name} fill className="object-cover" />
            <div className="absolute bottom-2 right-2">
              <Badge
                variant={teamMember.contact.status === "On Duty" ? "default" : "secondary"}
                className="font-medium"
              >
                {teamMember.contact.status}
              </Badge>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{teamMember.name}</h1>
              <p className="text-lg text-muted-foreground">{teamMember.title}</p>
              <p className="mt-1 text-sm text-primary">{teamMember.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border bg-zinc-50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{teamMember.contact.shift}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{teamMember.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{teamMember.contact.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Expertise & Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Expertise & Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMember.expertise.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamMember.projects.map((project) => (
                  <div key={project.title} className="flex gap-4">
                    <div
                      className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                        project.status === "Completed" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <Badge variant="secondary">{project.status}</Badge>
                      </div>
                      <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                        <span>Duration: {project.duration}</span>
                        <span>Impact: {project.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Equipment Expertise */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {teamMember.equipment.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 rounded-lg border bg-zinc-50 p-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Tool className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.expertise} Level</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tasks Completed</p>
                    <p className="text-2xl font-bold">{teamMember.stats.tasksCompleted}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Safety Score</p>
                    <p className="text-2xl font-bold">{teamMember.stats.safetyScore}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Timer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Response Time</p>
                    <p className="text-2xl font-bold">{teamMember.stats.avgResponseTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Preventive Maintenance</p>
                    <p className="text-2xl font-bold">{teamMember.stats.preventiveMaintenance}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMember.certifications.map((cert) => {
                  const Icon = cert.icon
                  return (
                    <HoverCard key={cert.name}>
                      <HoverCardTrigger asChild>
                        <div className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">{cert.date}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm">Issued by: {cert.issuer}</p>
                          <p className="text-sm">Date: {cert.date}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMember.schedule.map((day) => (
                  <div key={day.day} className="flex items-center justify-between rounded-lg border p-4">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-sm text-muted-foreground">{day.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

