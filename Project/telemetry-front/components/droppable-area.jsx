"use client"

import { useDrop } from "react-dnd"

export function DroppableArea({ onDrop, children, className = "" }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "widget",
    drop: (item) => {
      if (onDrop) {
        onDrop(item.id)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop}
      className={`transition-colors duration-200 ${isOver ? "bg-primary/10 border-primary/50" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
