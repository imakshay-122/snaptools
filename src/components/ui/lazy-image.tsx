import React from 'react';
import { useLazyLoading } from '@/hooks/use-lazy-loading';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  threshold?: number;
  rootMargin?: string;
  loadingClassName?: string;
  errorClassName?: string;
}

export const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  (
    {
      src,
      placeholderSrc = '/placeholder.svg',
      threshold = 0.1,
      rootMargin = '50px',
      alt = '',
      className,
      loadingClassName = 'animate-pulse bg-muted',
      errorClassName = 'opacity-50',
      ...props
    },
    ref
  ) => {
    const { imageSrc, isLoaded, error, imageRef } = useLazyLoading({
      src,
      placeholderSrc,
      threshold,
      rootMargin,
    });

    return (
      <img
        ref={(node) => {
          // Handle both forwardRef and internal ref
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          imageRef.current = node;
        }}
        src={imageSrc}
        alt={alt}
        className={cn(
          'transition-all duration-300 ease-in-out',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          !isLoaded && loadingClassName,
          error && errorClassName,
          className
        )}
        {...props}
      />
    );
  }
);

LazyImage.displayName = 'LazyImage';