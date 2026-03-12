import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--button-radius,var(--radius))] text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button-default-bg,var(--primary))] text-[var(--button-default-fg,var(--primary-foreground))] hover:bg-[var(--button-default-hover-bg,var(--primary))]",
        destructive:
          "bg-[var(--button-destructive-bg,var(--destructive))] text-[var(--button-destructive-fg,var(--destructive-foreground))] hover:bg-[var(--button-destructive-hover-bg,var(--destructive))] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-[var(--button-outline-bg,var(--background))] text-[var(--button-outline-fg,var(--foreground))] shadow-xs hover:bg-[var(--button-outline-hover-bg,var(--accent))] hover:text-[var(--button-outline-hover-fg,var(--accent-foreground))] dark:border-input",
        secondary:
          "bg-[var(--button-secondary-bg,var(--secondary))] text-[var(--button-secondary-fg,var(--secondary-foreground))] hover:bg-[var(--button-secondary-hover-bg,var(--secondary))]",
        ghost:
          "hover:bg-[var(--button-ghost-hover-bg,var(--accent))] hover:text-[var(--button-ghost-hover-fg,var(--accent-foreground))]",
        link: "text-[var(--button-link-fg,var(--primary))] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[var(--button-height,2.25rem)] px-[var(--button-px,1rem)] py-[var(--button-py,0.5rem)] has-[>svg]:px-[var(--button-icon-px,0.75rem)]",
        xs: "h-6 gap-1 rounded-[var(--button-radius,var(--radius))] px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-[var(--button-radius,var(--radius))] px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-[var(--button-radius,var(--radius))] px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-[var(--button-radius,var(--radius))] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
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
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
