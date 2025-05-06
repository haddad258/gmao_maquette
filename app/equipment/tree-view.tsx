"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

interface TreeViewProps {
  data: TreeNode
  onSelect: (id: string) => void
  selectedId: string | null
}

interface TreeItemProps {
  node: TreeNode
  level?: number
  onSelect: (id: string) => void
  selectedId: string | null
}

export function TreeView({ data, onSelect, selectedId }: TreeViewProps) {
  return (
    <div className="rounded-lg border bg-white">
      <TreeItem node={data} onSelect={onSelect} selectedId={selectedId} />
    </div>
  )
}

export function TreeItem({ node, level = 0, onSelect, selectedId }: TreeItemProps) {
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
          onSelect(node.id)
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
        <span className="truncate">{node.name}</span>
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

