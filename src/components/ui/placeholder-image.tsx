"use client"

import { BookOpen } from "lucide-react"

interface PlaceholderImageProps {
  title: string
  className?: string
}

export default function PlaceholderImage({ title, className = "" }: PlaceholderImageProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
      <BookOpen className="h-12 w-12 text-gray-400 mb-2" />
      <span className="text-xs text-gray-500 text-center px-2 line-clamp-2">
        {title}
      </span>
    </div>
  )
}
