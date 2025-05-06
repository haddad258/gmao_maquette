"use client"

import { useState } from "react"
import {
  Search,
  ChevronDown,
  PenToolIcon as Tool,
  AlertCircle,
  Calendar,
  Shield,
  MapPin,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TreeView } from "./tree-view"

// Sample equipment hierarchy data
const equipmentHierarchy = {
  id: "root",
  name: "Main Factory",
  children: [
    {
      id: "prod-line-1",
      name: "Production Line 1",
      children: [
        {
          id: "machine-1",
          name: "Assembly Machine 1",
          children: [
            { id: "component-1", name: "Motor Unit" },
            { id: "component-2", name: "Control Panel" },
            { id: "component-3", name: "Conveyor Belt" },
          ],
        },
        {
          id: "machine-2",
          name: "Packaging Unit 1",
          children: [
            { id: "component-4", name: "Sealing Mechanism" },
            { id: "component-5", name: "Label Printer" },
          ],
        },
      ],
    },
    {
      id: "prod-line-2",
      name: "Production Line 2",
      children: [
        {
          id: "machine-3",
          name: "Assembly Machine 2",
          children: [
            { id: "component-6", name: "Motor Unit" },
            { id: "component-7", name: "Control Panel" },
          ],
        },
      ],
    },
  ],
}

// Sample equipment data
const equipmentList = [
  {
    id: "EQ001",
    name: "Assembly Machine 1",
    description: "Main assembly line machine for product A",
    location: "Building A - Floor 1",
    department: "Production",
    type: "Assembly",
    manufacturer: "TechCorp",
    status: "Operational",
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-03-15",
    warrantyEnd: "2025-12-31",
    maintenanceProgress: 65,
    criticalityLevel: "High",
    timeUntilMaintenance: "20 days",
  },
  {
    id: "EQ002",
    name: "Packaging Unit 1",
    description: "Primary packaging machine for finished products",
    location: "Building A - Floor 1",
    department: "Packaging",
    type: "Packaging",
    manufacturer: "PackSystems",
    status: "Needs Attention",
    lastMaintenance: "2024-01-30",
    nextMaintenance: "2024-03-01",
    warrantyEnd: "2025-06-30",
    maintenanceProgress: 85,
    criticalityLevel: "Medium",
    timeUntilMaintenance: "5 days",
  },
  {
    id: "EQ003",
    name: "Assembly Machine 2",
    description: "Secondary assembly line machine",
    location: "Building B - Floor 2",
    department: "Production",
    type: "Assembly",
    manufacturer: "TechCorp",
    status: "Under Maintenance",
    lastMaintenance: "2024-02-20",
    nextMaintenance: "2024-03-20",
    warrantyEnd: "2025-12-31",
    maintenanceProgress: 15,
    criticalityLevel: "High",
    timeUntilMaintenance: "25 days",
  },
]

const departments = ["All Departments", "Production", "Packaging", "Maintenance"]
const types = ["All Types", "Assembly", "Packaging", "Testing", "Quality Control"]
const statuses = ["All Statuses", "Operational", "Needs Attention", "Under Maintenance"]

export default function EquipmentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-500"
      case "Needs Attention":
        return "bg-yellow-500"
      case "Under Maintenance":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCriticalityColor = (level: string) => {
    switch (level) {
      case "High":
        return "text-red-500"
      case "Medium":
        return "text-yellow-500"
      case "Low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const filteredEquipment = equipmentList.filter((equipment) => {
    const matchesDepartment = selectedDepartment === "All Departments" || equipment.department === selectedDepartment
    const matchesType = selectedType === "All Types" || equipment.type === selectedType
    const matchesStatus = selectedStatus === "All Statuses" || equipment.status === selectedStatus
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesDepartment && matchesType && matchesStatus && matchesSearch
  })

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Equipment Hierarchy Sidebar */}
      <div className="w-80 border-r bg-white p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Equipment Hierarchy</h2>
          <p className="text-sm text-muted-foreground">View equipment structure</p>
        </div>
        <TreeView
          data={equipmentHierarchy}
          onSelect={(id) => setSelectedEquipment(id)}
          selectedId={selectedEquipment}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Equipment Management</h1>
          <p className="text-muted-foreground">Monitor and manage your equipment inventory</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search equipment..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <Building2 className="mr-2 h-4 w-4" />
                  {selectedDepartment}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {departments.map((dept) => (
                    <DropdownMenuItem key={dept} onSelect={() => setSelectedDepartment(dept)}>
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <Tool className="mr-2 h-4 w-4" />
                  {selectedType}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {types.map((type) => (
                    <DropdownMenuItem key={type} onSelect={() => setSelectedType(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {selectedStatus}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {statuses.map((status) => (
                    <DropdownMenuItem key={status} onSelect={() => setSelectedStatus(status)}>
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Equipment Table */}
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Warranty Ends</TableHead>
                <TableHead className="text-right">Maintenance Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((equipment) => (
                <TableRow key={equipment.id}>
                  <TableCell className="font-medium">{equipment.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{equipment.name}</div>
                      <div className="text-sm text-muted-foreground">{equipment.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {equipment.location}
                    </div>
                  </TableCell>
                  <TableCell>{equipment.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(equipment.status)}`} />
                      {equipment.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {equipment.nextMaintenance}
                      <span className="text-sm text-muted-foreground">({equipment.timeUntilMaintenance})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      {equipment.warrantyEnd}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24">
                        <Progress value={equipment.maintenanceProgress} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{equipment.maintenanceProgress}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

