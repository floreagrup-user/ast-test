import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  light?: boolean
  id?: string
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className,
  titleClassName,
  light = false,
  id,
}: SectionTitleProps) {
  return (
    <div className={cn('text-center max-w-3xl mx-auto', className)}>
      {eyebrow && (
        <span
          className={cn(
            'inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3',
            light ? 'text-accent-light' : 'text-accent'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={cn(
          'font-display font-normal tracking-tight',
          light ? 'text-white' : 'text-text',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed max-w-2xl mx-auto',
            light ? 'text-white/80' : 'text-text-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
