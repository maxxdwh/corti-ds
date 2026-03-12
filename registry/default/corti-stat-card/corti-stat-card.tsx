import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type CortiStatCardProps = {
  title: string
  value: string
  delta?: string
  tone?: "neutral" | "positive" | "negative"
}

export function CortiStatCard({
  title,
  value,
  delta,
  tone = "neutral",
}: CortiStatCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {delta ? (
          <Badge
            variant="secondary"
            className={cn(
              tone === "positive" &&
                "border-[color:var(--variant-success-border)] bg-[color:var(--variant-success-bg)] text-[color:var(--variant-success-text)]",
              tone === "negative" &&
                "border-[color:var(--variant-error-border)] bg-[color:var(--variant-error-bg)] text-[color:var(--variant-error-text)]"
            )}
          >
            {delta}
          </Badge>
        ) : null}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  )
}
