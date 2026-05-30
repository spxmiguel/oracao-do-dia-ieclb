import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[28px] border border-white/60 bg-white/72 p-5 shadow-soft backdrop-blur-md night:border-white/10 night:bg-white/8 ${className}`}
      {...props}
    />
  );
}
