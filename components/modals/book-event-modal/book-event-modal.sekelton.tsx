"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const BookEventModalSkeleton = () => {
  return (
    <div className="max-w-4xl! w-full! border-[#1f2f38] bg-[#0d161a] overflow-hidden fixed top-1/2 left-1/2 -translate-1/2 rounded-2xl z-40">
      <div
        className="w-full border-[#1f2f38] bg-[#0d161a] p-0 mx-2 overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row w-full">
          
          {/* Left Side: Image & About Area */}
          <div className="relative w-full lg:w-1/2 shrink-0 bg-[#162228]">
            <div className="relative h-56 lg:h-full lg:min-h-105 w-full">
              {/* Image Placeholder */}
              <Skeleton className="h-full w-full bg-[#1f2f38] rounded-none" />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <Skeleton className="h-3 w-12 bg-[#59deca]/20 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full bg-white/10" />
                <Skeleton className="h-3 w-4/5 bg-white/10" />
              </div>
            </div>
          </div>

          {/* Right Side: Form & Info Area */}
          <div className="flex flex-col gap-6 flex-1 p-7 pt-9">
            <div className="space-y-3">
              {/* Small Header Label */}
              <Skeleton className="h-3 w-24 bg-[#59deca]/20" />
              
              {/* Title */}
              <Skeleton className="h-7 w-3/4 bg-white/10" />

              {/* Icon Badges (Date/Location) */}
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-4 w-20 bg-[#1f2f38]" />
                <Skeleton className="h-4 w-24 bg-[#1f2f38]" />
              </div>

              {/* Booking Count Text */}
              <Skeleton className="h-3 w-40 bg-white/5 mt-2" />
            </div>

            {/* Simulated Booking Form / Button Area */}
            <div className="space-y-4 py-4">
              <Skeleton className="h-10 w-full bg-[#1f2f38]" />
              <Skeleton className="h-10 w-full bg-[#59deca]/10" />
            </div>

            <div className="h-px w-full bg-[#1f2f38]" />

            {/* Bottom Link */}
            <div className="flex justify-center">
              <Skeleton className="h-3 w-32 bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEventModalSkeleton;