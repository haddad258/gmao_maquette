"use client"

import { useState } from "react"
import { addDays, format, startOfToday } from "date-fns"
import { fr } from "date-fns/locale"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  PenToolIcon as Tool,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Sample calendar events
const events = [
  {
    id: 1,
    title: "Maintenance Préventive - Pompe #123",
    type: "maintenance",
    priority: "normal",
    time: "08:00",
    duration: "2h",
    assignee: "Jean Dupont",
    location: "Zone A - Niveau 2",
  },
  {
    id: 2,
    title: "Inspection - Convoyeur Principal",
    type: "inspection",
    priority: "high",
    time: "10:30",
    duration: "1h",
    assignee: "Marie Martin",
    location: "Zone B - Niveau 1",
  },
  {
    id: 3,
    title: "Alerte - Surchauffe Moteur",
    type: "alert",
    priority: "urgent",
    time: "11:45",
    duration: "30min",
    assignee: "Pierre Durand",
    location: "Zone C - Niveau 3",
  },
  {
    id: 4,
    title: "Maintenance Terminée - Unité #456",
    type: "completed",
    priority: "normal",
    time: "14:15",
    duration: "3h",
    assignee: "Sophie Bernard",
    location: "Zone A - Niveau 1",
  },
]

const getEventIcon = (type: string) => {
  switch (type) {
    case "maintenance":
      return Tool
    case "inspection":
      return CalendarIcon
    case "alert":
      return AlertCircle
    case "completed":
      return CheckCircle
    default:
      return CalendarIcon
  }
}

const getEventColor = (type: string) => {
  switch (type) {
    case "maintenance":
      return "bg-blue-500"
    case "inspection":
      return "bg-yellow-500"
    case "alert":
      return "bg-red-500"
    case "completed":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "normal":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export function CalendarCard() {
  const [selectedDate, setSelectedDate] = useState(startOfToday())
  const today = startOfToday()

  const nextDays = Array.from({ length: 5 }, (_, i) => addDays(today, i))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier des Interventions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Date Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {nextDays.map((date, index) => (
                <Button
                  key={date.toString()}
                  variant={date.getTime() === selectedDate.getTime() ? "default" : "outline"}
                  className="h-auto min-w-[4rem] flex-col gap-1 px-2 py-1"
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-[0.7rem] font-normal">{format(date, "EEE", { locale: fr })}</span>
                  <span className="text-xl font-bold">{format(date, "dd")}</span>
                </Button>
              ))}
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => {
            const EventIcon = getEventIcon(event.type)
            return (
              <HoverCard key={event.id}>
                <HoverCardTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <div className={`mt-1 rounded-full p-2 ${getEventColor(event.type)} bg-opacity-10`}>
                      <EventIcon className={`h-4 w-4 ${getEventColor(event.type)} text-opacity-100`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                            <span>•</span>
                            <span>{event.duration}</span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${getPriorityColor(event.priority)} text-white hover:${getPriorityColor(
                            event.priority,
                          )}`}
                        >
                          {event.priority}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="text-sm">
                      <p>
                        <span className="font-medium">Assigné à:</span> {event.assignee}
                      </p>
                      <p>
                        <span className="font-medium">Localisation:</span> {event.location}
                      </p>
                      <p>
                        <span className="font-medium">Durée:</span> {event.duration}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

