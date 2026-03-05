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
        status === "success" && "bg-emerald-100 text-emerald-800",
        status === "warning" && "bg-amber-100 text-amber-800",
        status === "critical" && "bg-red-100 text-red-800"
      )}
    >
      {label}
    </Badge>
  )
}
