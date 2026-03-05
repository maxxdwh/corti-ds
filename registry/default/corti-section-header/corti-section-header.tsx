import { Button } from "@/components/ui/button"

type CortiSectionHeaderProps = {
  title: string
  description?: string
  actionLabel?: string
}

export function CortiSectionHeader({
  title,
  description,
  actionLabel,
}: CortiSectionHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actionLabel ? <Button>{actionLabel}</Button> : null}
    </div>
  )
}
