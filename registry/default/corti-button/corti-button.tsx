import { type ButtonProps, Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CortiButtonProps = ButtonProps & {
  emphasis?: "primary" | "secondary"
}

export function CortiButton({
  className,
  emphasis = "primary",
  ...props
}: CortiButtonProps) {
  return (
    <Button
      data-slot="corti-button"
      className={cn(
        emphasis === "primary" ? "font-medium" : "font-normal",
        className
      )}
      {...props}
    />
  )
}
