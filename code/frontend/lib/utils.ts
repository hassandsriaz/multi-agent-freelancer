import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function truncate(str: string, length: number): string {
  if (!str) return ""
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function getInitials(name: string): string {
  if (!name) return ""
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

// Generate a random color based on a string (for consistent avatar colors)
export function stringToColor(str: string): string {
  if (!str) return "#000000"
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = "#"
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
}

// For visualizing agent workload
export function getAgentWorkloadColor(workload: number): string {
  if (workload < 0.3) return "hsl(var(--ai-teal))"
  if (workload < 0.7) return "hsl(var(--quantum-blue))"
  return "hsl(var(--neural-purple))"
}

// For generating cyber grid background size based on screen size
export function getCyberGridSize(screenWidth: number): number {
  if (screenWidth < 640) return 20
  if (screenWidth < 1024) return 30
  return 40
} 