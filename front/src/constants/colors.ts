export const BG_COLORS = [
  'bg-red-400',
  'bg-teal-400',
  'bg-purple-400',
  'bg-amber-400',
  'bg-green-400',
  'bg-pink-400',
  'bg-orange-400',
  'bg-fuchsia-400',
  'bg-sky-400',
  'bg-lime-400',
]

export type ColorKey = typeof BG_COLORS[number]

export const COLOR_VALUE: Record<ColorKey, string> = {
  'bg-red-400': '#f87171',
  'bg-teal-400': '#2dd4bf',
  'bg-purple-400': '#c084fc',
  'bg-amber-400': '#fbbf24',
  'bg-green-400': '#4ade80',
  'bg-pink-400': '#f472b6',
  'bg-orange-400': '#fb923c',
  'bg-fuchsia-400': '#e879f9',
  'bg-sky-400': '#38bdf8',
  'bg-lime-400': '#a3e635',
}
