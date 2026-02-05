
import React, { useRef, useEffect } from 'react';
import { Dot } from '../types';

interface PlexusShapeProps {
  backgroundColor: string;
  dotColor: string;
  lineColor: string; // RGB string, e.g. "236, 2, 139"
  className?: string;
  density?: number;
}

const PlexusShape: React.FC<PlexusShapeProps> = ({
  backgroundColor,
  dotColor,
  lineColor,
  className = '',
  density = 60
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const dots = useRef<Dot[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resizing
    let width = container.clientWidth;
    let height = container.clientHeight;

    const initDots = () => {
      dots.current = [];
      // Heuristic for dot count based on area
      const numDots = Math.floor((width * height) / (150000 / density));

      for (let i = 0; i < Math.max(10, numDots); i++) {
        dots.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;
        initDots();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Initial setup
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    initDots();

    // Mouse interaction relative to canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Update dots
      dots.current.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off walls
        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });

      // Connections
      const connectDistance = 80;
      const mouseDistance = 120;

      for (let i = 0; i < dots.current.length; i++) {
        for (let j = i + 1; j < dots.current.length; j++) {
          const dx = dots.current[i].x - dots.current[j].x;
          const dy = dots.current[i].y - dots.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(dots.current[i].x, dots.current[i].y);
            ctx.lineTo(dots.current[j].x, dots.current[j].y);
            const opacity = 1 - dist / connectDistance;
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      if (mouse.current.x !== null && mouse.current.y !== null) {
        dots.current.forEach(dot => {
          const dx = dot.x - mouse.current.x!;
          const dy = dot.y - mouse.current.y!;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseDistance) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.current.x!, mouse.current.y!);
            const opacity = 1 - dist / mouseDistance;
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [backgroundColor, dotColor, lineColor, density]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
};

export default PlexusShape;
