import { type ButtonProps, Button } from "@/components/ui/button"

export type CortiButtonProps = ButtonProps

export function CortiButton({
  ...props
}: CortiButtonProps) {
  return <Button data-slot="corti-button" {...props} />
}
