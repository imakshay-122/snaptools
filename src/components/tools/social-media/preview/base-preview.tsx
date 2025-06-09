import React from 'react';
import { cn } from '@/lib/utils';

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const BasePreview: React.FC<PreviewProps> = ({ children, className, title }) => {
  return (
    <div className="w-full mb-6">
      {title && (
        <h3 className="text-lg font-medium mb-2">{title}</h3>
      )}
      <div className={cn(
        "border rounded-lg p-4 bg-background/50 backdrop-blur-sm",
        "flex items-center justify-center min-h-[200px]",
        className
      )}>
        {children}
      </div>
    </div>
  );
};

export default BasePreview;