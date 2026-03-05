import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type CortiActivityRowProps = {
  actor: string
  action: string
  time: string
  status?: "neutral" | "success" | "warning" | "critical"
}

export function CortiActivityRow({
  actor,
  action,
  time,
  status = "neutral",
}: CortiActivityRowProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-md border p-3">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{actor.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{actor}</p>
          <p className="truncate text-xs text-muted-foreground">{action}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge
          variant="secondary"
          className={cn(
            status === "success" && "text-emerald-700",
            status === "warning" && "text-amber-700",
            status === "critical" && "text-red-700"
          )}
        >
          {status}
        </Badge>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  )
}
