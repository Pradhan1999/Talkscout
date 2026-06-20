import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Neo-Brutalist base: thick border, hard shadow, rounded corners, physical-press
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-sm font-black uppercase tracking-wide",
    "border-[3px] border-nb-black rounded-xl",
    "shadow-[4px_4px_0px_#111111]",
    "transition-none select-none cursor-pointer",
    "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#111111]",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-nb-black focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-nb-yellow text-nb-black hover:bg-nb-yellow/80",
        destructive:
          "bg-destructive-100 text-nb-white hover:bg-destructive-200 shadow-[4px_4px_0px_#111111]",
        outline:
          "bg-nb-white text-nb-black hover:bg-nb-cream",
        secondary:
          "bg-nb-black text-nb-yellow shadow-[4px_4px_0px_#F5C800] hover:bg-nb-black/80 active:shadow-[2px_2px_0px_#F5C800]",
        ghost:
          "border-transparent shadow-none bg-transparent text-nb-black hover:bg-nb-black/10 active:translate-x-0 active:translate-y-0 active:shadow-none",
        teal:
          "bg-nb-teal text-nb-white hover:bg-nb-teal/80",
        pink:
          "bg-nb-pink text-nb-white hover:bg-nb-pink/80",
        link: "border-transparent shadow-none text-nb-black underline-offset-4 hover:underline active:translate-x-0 active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs rounded-lg shadow-[3px_3px_0px_#111111] active:shadow-[1px_1px_0px_#111111]",
        lg: "h-13 px-8 text-base rounded-xl",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
