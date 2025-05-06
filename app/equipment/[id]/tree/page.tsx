"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Circle, PenToolIcon as Tool, AlertCircle } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TreeNode {
  id: string
  name: string
  type: string
  status: "operational" | "warning" | "critical"
  children?: TreeNode[]
  specifications?: {
    model: string
    manufacturer: string
    installationDate: string
    lastMaintenance: string
    nextMaintenance: string
  }
  image?: string
}

// Sample hierarchical data
const equipmentTree: TreeNode = {
  id: "mining-ops",
  name: "Mining Operations",
  type: "Department",
  status: "operational",
  children: [
    {
      id: "underground-ops",
      name: "Underground Operations",
      type: "Section",
      status: "operational",
      children: [
        {
          id: "drilling-eq",
          name: "Drilling Equipment",
          type: "Category",
          status: "warning",
          children: [
            {
              id: "drill-1",
              name: "Underground Drill HD-2000X",
              type: "Equipment",
              status: "operational",
              specifications: {
                model: "HD-2000X",
                manufacturer: "DrillTech Industries",
                installationDate: "2022-05-15",
                lastMaintenance: "2024-02-15",
                nextMaintenance: "2024-03-15",
              },
              image: "/placeholder.svg",
              children: [
                {
                  id: "drill-head",
                  name: "Drill Head Assembly",
                  type: "Component",
                  status: "warning",
                  specifications: {
                    model: "DH-500",
                    manufacturer: "DrillTech Industries",
                    installationDate: "2022-05-15",
                    lastMaintenance: "2024-02-10",
                    nextMaintenance: "2024-03-10",
                  },
                  image: "/placeholder.svg",
                },
                {
                  id: "hydraulic-system",
                  name: "Hydraulic System",
                  type: "Component",
                  status: "operational",
                  specifications: {
                    model: "HS-1000",
                    manufacturer: "HydrauliCorp",
                    installationDate: "2022-05-15",
                    lastMaintenance: "2024-02-12",
                    nextMaintenance: "2024-03-12",
                  },
                  image: "/placeholder.svg",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const getStatusColor = (status: TreeNode["status"]) => {
  switch (status) {
    case "operational":
      return "text-green-500"
    case "warning":
      return "text-yellow-500"
    case "critical":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

interface TreeItemProps {
  node: TreeNode
  level?: number
  onSelect: (node: TreeNode) => void
  selectedId: string | null
}

function TreeItem({ node, level = 0, onSelect, selectedId }: TreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <button
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-2 py-1 text-sm transition-colors hover:bg-accent",
          selectedId === node.id && "bg-accent",
          level > 0 && "ml-4",
        )}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded)
          }
          onSelect(node)
        }}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          )
        ) : (
          <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className={cn("truncate", getStatusColor(node.status))}>{node.name}</span>
        <Badge variant="secondary" className="ml-auto">
          {node.type}
        </Badge>
      </button>
      {hasChildren && isExpanded && (
        <div className="mt-1">
          {node.children?.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function EquipmentTreePage() {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Tree View */}
      <div className="w-96 border-r bg-white p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Equipment Hierarchy</h2>
          <p className="text-sm text-muted-foreground">View equipment structure and components</p>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <TreeItem node={equipmentTree} onSelect={setSelectedNode} selectedId={selectedNode?.id ?? null} />
        </ScrollArea>
      </div>

      {/* Details Panel */}
      <div className="flex-1 p-6">
        {selectedNode ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{selectedNode.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Type: {selectedNode.type} • Status:{" "}
                    <span className={getStatusColor(selectedNode.status)}>
                      {selectedNode.status.charAt(0).toUpperCase() + selectedNode.status.slice(1)}
                    </span>
                  </p>
                </div>
                {selectedNode.status !== "operational" && (
                  <Button variant="outline" className="gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Report Issue
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedNode.specifications ? (
                <div className="grid gap-6">
                  {selectedNode.image && (
                    <div className="relative aspect-video overflow-hidden rounded-lg border">
                      <Image
                        src={selectedNode.image || "/placeholder.svg"}
                        alt={selectedNode.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">Model</p>
                      <p className="font-medium">{selectedNode.specifications.model}</p>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">Manufacturer</p>
                      <p className="font-medium">{selectedNode.specifications.manufacturer}</p>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">Installation Date</p>
                      <p className="font-medium">{selectedNode.specifications.installationDate}</p>
                    </div>
                    <div className="space-y-2 rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">Last Maintenance</p>
                      <p className="font-medium">{selectedNode.specifications.lastMaintenance}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border">
                  <div className="text-center">
                    <Tool className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No specifications available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex h-[calc(100vh-8rem)] items-center justify-center rounded-lg border">
            <div className="text-center">
              <Tool className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Select an item to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

