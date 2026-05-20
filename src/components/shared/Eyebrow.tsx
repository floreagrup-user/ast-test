import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: string
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3',
        className
      )}
    >
      {children}
    </span>
  )
}
