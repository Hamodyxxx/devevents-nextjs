"use client";

interface BlurOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: string;
  opacity?: string;
}

export const BlurOverlay = ({ 
  isOpen, 
  onClose, 
  zIndex = "z-40", 
  opacity = "bg-black/40" 
}: BlurOverlayProps) => {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 w-screen h-screen transition-opacity duration-300 ${zIndex} ${opacity} backdrop-blur-sm
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}
      aria-hidden="true"
    />
  );
};