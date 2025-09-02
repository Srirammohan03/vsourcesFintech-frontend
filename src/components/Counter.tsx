
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

const Counter = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className,
  title,
  subtitle,
}: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - startValue) + startValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={observerRef} className={cn("text-center", className)}>
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {prefix}
        <span ref={countRef}>{count}</span>
        {suffix}
        <span className="text-primary">+</span>
      </div>
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      {subtitle && <p className="text-sm mt-1 text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default Counter;
