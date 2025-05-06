"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Clock, Users, Building2, ChevronDown } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Sample data
const workers = [
  {
    id: 1,
    name: "John Smith",
    matricule: "EMP001",
    photo: "/placeholder.svg",
    group: "Maintenance",
    location: "Building A - Floor 2",
    shift: "Morning",
    shiftTime: "06:00 - 14:00",
    workTimeMonth: 145,
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    matricule: "EMP002",
    photo: "/placeholder.svg",
    group: "Operations",
    location: "Building B - Floor 1",
    shift: "Afternoon",
    shiftTime: "14:00 - 22:00",
    workTimeMonth: 132,
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    matricule: "EMP003",
    photo: "/placeholder.svg",
    group: "Technicians",
    location: "Building A - Floor 1",
    shift: "Night",
    shiftTime: "22:00 - 06:00",
    workTimeMonth: 128,
    status: "On Break",
  },
  {
    id: 4,
    name: "Emily Davis",
    matricule: "EMP004",
    photo: "/placeholder.svg",
    group: "Maintenance",
    location: "Building C - Floor 3",
    shift: "Morning",
    shiftTime: "06:00 - 14:00",
    workTimeMonth: 138,
    status: "Active",
  },
  {
    id: 5,
    name: "David Wilson",
    matricule: "EMP005",
    photo: "/placeholder.svg",
    group: "Operations",
    location: "Building B - Floor 2",
    shift: "Afternoon",
    shiftTime: "14:00 - 22:00",
    workTimeMonth: 142,
    status: "On Leave",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    matricule: "EMP006",
    photo: "/placeholder.svg",
    group: "Technicians",
    location: "Building A - Floor 3",
    shift: "Night",
    shiftTime: "22:00 - 06:00",
    workTimeMonth: 136,
    status: "Active",
  },
]

const groups = ["All Groups", "Maintenance", "Operations", "Technicians"]
const shifts = ["All Shifts", "Morning", "Afternoon", "Night"]
const locations = ["All Locations", "Building A", "Building B", "Building C"]

export default function TeamPage() {
  const [selectedGroup, setSelectedGroup] = useState("All Groups")
  const [selectedShift, setSelectedShift] = useState("All Shifts")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [searchQuery, setSearchQuery] = useState("")

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "Morning":
        return "bg-blue-500"
      case "Afternoon":
        return "bg-orange-500"
      case "Night":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "On Break":
        return "bg-yellow-500"
      case "On Leave":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredWorkers = workers.filter((worker) => {
    const matchesGroup = selectedGroup === "All Groups" || worker.group === selectedGroup
    const matchesShift = selectedShift === "All Shifts" || worker.shift === selectedShift
    const matchesLocation = selectedLocation === "All Locations" || worker.location.includes(selectedLocation)
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.matricule.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.location.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesGroup && matchesShift && matchesLocation && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <p className="text-muted-foreground">Manage and monitor your workforce in real-time</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, matricule, or location..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search workers"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9" aria-label="Filter by group">
                <Users className="mr-2 h-4 w-4" />
                {selectedGroup}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Group</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {groups.map((group) => (
                  <DropdownMenuItem key={group} onSelect={() => setSelectedGroup(group)}>
                    {group}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9" aria-label="Filter by shift">
                <Clock className="mr-2 h-4 w-4" />
                {selectedShift}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Shift</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {shifts.map((shift) => (
                  <DropdownMenuItem key={shift} onSelect={() => setSelectedShift(shift)}>
                    {shift}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9" aria-label="Filter by location">
                <Building2 className="mr-2 h-4 w-4" />
                {selectedLocation}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Location</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {locations.map((location) => (
                  <DropdownMenuItem key={location} onSelect={() => setSelectedLocation(location)}>
                    {location}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Worker Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="grid" aria-label="Workers list">
        {filteredWorkers.map((worker) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            role="gridcell"
          >
            <Card className="group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-primary ring-offset-2">
                    <AvatarImage src={worker.photo} alt={`${worker.name}'s profile photo`} />
                    <AvatarFallback>
                      {worker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{worker.name}</h3>
                        <p className="text-sm text-muted-foreground" aria-label="Employee ID">
                          {worker.matricule}
                        </p>
                      </div>
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusColor(worker.status)}`}
                        aria-label={`Status: ${worker.status}`}
                      />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      <Badge variant="secondary">{worker.group}</Badge>
                      <Badge
                        className={`${getShiftColor(worker.shift)} text-white hover:${getShiftColor(worker.shift)}`}
                      >
                        {worker.shift}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{worker.shiftTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{worker.location}</span>
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Work Time (This Month)</span>
                      <span className="font-medium">{worker.workTimeMonth}h</span>
                    </div>
                    <Progress
                      value={(worker.workTimeMonth / 160) * 100}
                      aria-label={`Monthly work progress: ${worker.workTimeMonth} hours`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

