import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type CortiEmptyStateProps = {
  title: string
  description: string
  primaryActionLabel?: string
  secondaryActionLabel?: string
}

export function CortiEmptyState({
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
}: CortiEmptyStateProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Add this component when a list, inbox, or queue has no items yet.
      </CardContent>
      <CardFooter className="flex gap-2">
        {secondaryActionLabel ? (
          <Button variant="outline" className="flex-1">
            {secondaryActionLabel}
          </Button>
        ) : null}
        {primaryActionLabel ? (
          <Button className="flex-1">{primaryActionLabel}</Button>
        ) : null}
      </CardFooter>
    </Card>
  )
}
