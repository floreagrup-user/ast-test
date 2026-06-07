import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
  alt: string
}

export function ImageWithFallback({
  src,
  alt,
  fallback = '/images/placeholder.jpg',
  className,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-border', className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 img-placeholder animate-pulse" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  )
}
