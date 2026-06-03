import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDistance(km) {
  if (km >= 1_000_000_000) {
    return `${(km / 1_000_000_000).toFixed(1)} billion km`
  }
  if (km >= 1_000_000) {
    return `${(km / 1_000_000).toFixed(1)} million km`
  }
  return `${km.toLocaleString()} km`
}

export function formatDiameter(km) {
  return `${km.toLocaleString()} km`
}

export function getPlanetColor(name) {
  const colors = {
    sun: '#fbbf24',
    mercury: '#9ca3af',
    venus: '#f472b6',
    earth: '#3b82f6',
    mars: '#ef4444',
    jupiter: '#d97706',
    saturn: '#f59e0b',
    uranus: '#06b6d4',
    neptune: '#6366f1',
  }
  return colors[name.toLowerCase()] || '#ffffff'
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
