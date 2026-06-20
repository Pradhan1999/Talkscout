import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Neo-Brutalist input: thick black border, cream bg, hard focus shadow
        "flex h-12 w-full min-w-0 rounded-xl px-4 py-2",
        "bg-nb-white text-nb-black font-medium text-sm",
        "border-[3px] border-nb-black",
        "placeholder:text-nb-black/40",
        "shadow-[3px_3px_0px_#111111]",
        "outline-none transition-none",
        "focus:border-nb-teal focus:shadow-[3px_3px_0px_#00B8A0]",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        "file:border-0 file:bg-transparent file:text-sm file:font-bold",
        className
      )}
      {...props}
    />
  );
}

export { Input };
