import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type CortiStatusPillProps = {
  label: string
  status?: "neutral" | "success" | "warning" | "critical"
}

export function CortiStatusPill({
  label,
  status = "neutral",
}: CortiStatusPillProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        status === "success" &&
          "border-[color:var(--variant-success-border)] bg-[color:var(--variant-success-bg)] text-[color:var(--variant-success-text)]",
        status === "warning" &&
          "border-[color:var(--variant-warning-border)] bg-[color:var(--variant-warning-bg)] text-[color:var(--variant-warning-text)]",
        status === "critical" &&
          "border-[color:var(--variant-error-border)] bg-[color:var(--variant-error-bg)] text-[color:var(--variant-error-text)]"
      )}
    >
      {label}
    </Badge>
  )
}
