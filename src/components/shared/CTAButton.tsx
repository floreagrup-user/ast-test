import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight, Loader2 } from 'lucide-react'

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  loading?: boolean
  showArrow?: boolean
  as?: 'button' | 'a'
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      loading = false,
      showArrow = false,
      as = 'button',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
      primary: 'bg-accent text-primary hover:bg-accent-light active:bg-accent',
      secondary: 'bg-primary text-white hover:bg-primary-light active:bg-primary',
      outline: 'border-2 border-white text-white hover:bg-white hover:text-primary active:bg-white/90',
      ghost: 'text-primary hover:bg-primary/5 active:bg-primary/10',
    }

    const sizeClasses = {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    }

    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

    if (as === 'a' && href) {
      return (
        <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
          {!loading && showArrow && <ArrowRight className="w-4 h-4" />}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        {!loading && showArrow && <ArrowRight className="w-4 h-4" />}
      </button>
    )
  }
)

CTAButton.displayName = 'CTAButton'
