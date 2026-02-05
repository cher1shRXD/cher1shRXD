"use client";

interface AdSlotProps {
  position?: "top" | "middle" | "bottom" | "sidebar";
  className?: string;
}

export default function AdSlot({ position = "middle", className = "" }: AdSlotProps) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="border-2 border-dashed border-surface rounded-lg p-6 text-center">
        <div className="text-text/50 text-sm mb-2">
          광고 영역 ({position})
        </div>
        <div className="text-text/30 text-xs">
          Advertisement Space
        </div>
      </div>
    </div>
  );
}
