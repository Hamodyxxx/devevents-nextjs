"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface FloatingSearchResultsProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  isVisible: boolean;
  className?: string;
}

export const FloatingSearchResults = <T,>({ 
  items, 
  renderItem, 
  isVisible, 
  className 
}: FloatingSearchResultsProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isVisible) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: -20, scaleY: 0.8, transformOrigin: "top" },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.4, ease: "expo.out", display: "block" }
      );
      gsap.fromTo(".result-item", 
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.05, delay: 0.1, duration: 0.3 }
      );
    } else {
      gsap.to(containerRef.current, { 
        opacity: 0, y: -10, duration: 0.2, ease: "power2.in", 
        onComplete: () => { 
            gsap.set(containerRef.current, { display: "none" }) 
        }
      });
    }
  }, { dependencies: [isVisible] });

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute top-[calc(100%+12px)] left-0 w-full z-60",
        "bg-zinc-950/95 backdrop-blur-2xl",
        "border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]", // Subtle border + heavy shadow
        "rounded-3xl overflow-hidden hidden",
        className
      )}
    >
      <div className={cn(
        "max-h-[400px] overflow-y-auto p-3",
        "scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
      )}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="result-item">
              {renderItem(item, index)}
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-zinc-500 text-sm italic">
            No results found...
          </div>
        )}
      </div>
    </div>
  );
};