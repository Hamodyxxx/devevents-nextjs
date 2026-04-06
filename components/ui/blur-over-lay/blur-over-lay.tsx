"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BlurOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const BlurOverlay = ({ 
  isOpen, 
  onClose, 
  className = "z-40 bg-black/40" ,
}: BlurOverlayProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 transition-opacity duration-300 backdrop-blur-sm",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        className,
      )}
      aria-hidden="true"
    />,
    document.body 
  );
};