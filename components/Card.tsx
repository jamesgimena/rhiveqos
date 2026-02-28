import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  showAccents?: boolean;
}

const Card: React.FC<CardProps> = ({ title, children, footer, className = '', showAccents = true }) => {
  const chamferSize = 24;

  // CLIP PATH for Backgrounds
  const clipPathValue = `polygon(
    ${chamferSize}px 0,
    100% 0,
    100% calc(100% - ${chamferSize}px),
    calc(100% - ${chamferSize}px) 100%,
    0 100%,
    0 ${chamferSize}px
  )`;

  return (
    <div className={cn("relative flex flex-col group isolate", className)}>
      {/* 1. Background Layers (Clipped) */}
      <div
        className="absolute inset-0 bg-black/80 dark:bg-black/60 backdrop-blur-md transition-colors duration-300 -z-10"
        style={{ clipPath: clipPathValue }}
      />

      {/* 2. SVG BORDERS (Manual Placement for Perfect Control) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-[5] overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={`M ${chamferSize},0 L 100,0 L 100,${100 - chamferSize} L ${100 - chamferSize},100 L 0,100 L 0,${chamferSize} Z`}
          vectorEffect="non-scaling-stroke"
          stroke="currentColor"
          className="text-white/10 dark:text-white/5"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* 3. Accents */}
      {showAccents && (
        <>
          <svg className="absolute top-0 left-0 w-6 h-6 z-10 overflow-visible pointer-events-none">
            <line x1="8" y1="16" x2="16" y2="8" stroke="#ec028b" strokeWidth="2" strokeLinecap="square" className="drop-shadow-[0_0_3px_rgba(236,2,139,0.8)]" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-6 h-6 z-10 overflow-visible pointer-events-none">
            <line x1="8" y1="16" x2="16" y2="8" stroke="#ec028b" strokeWidth="2" strokeLinecap="square" className="drop-shadow-[0_0_3px_rgba(236,2,139,0.8)]" />
          </svg>
        </>
      )}

      {/* 4. Card Content */}
      {title && (
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
          <h3 className="text-sm font-bold text-white dark:text-white tracking-widest uppercase">{title}</h3>
          <div className="h-1.5 w-1.5 rounded-full bg-[#ec028b] animate-pulse shadow-[0_0_10px_#ec028b]"></div>
        </div>
      )}
      <div className="p-6 flex-grow">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-white/5 bg-black/40">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
