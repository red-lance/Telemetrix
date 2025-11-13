"use client"

import { useDrag } from "react-dnd"
import { GripVertical } from "lucide-react"

export function DraggableWidget({ id, children, isDragMode }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "widget",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={dragPreview}
      className={`relative transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"
      } ${isDragMode ? "cursor-move" : ""}`}
    >
      {/* Drag Handle */}
      {isDragMode && (
        <div
          ref={drag}
          className="absolute top-2 right-2 z-10 p-1 bg-background/80 backdrop-blur-sm rounded border border-border/50 cursor-grab active:cursor-grabbing hover:bg-background/90 transition-colors"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Widget Content */}
      <div className={isDragMode ? "pointer-events-none" : ""}>{children}</div>

      {/* Drag Mode Overlay */}
      {isDragMode && (
        <div className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-lg pointer-events-none" />
      )}
    </div>
  )
}
