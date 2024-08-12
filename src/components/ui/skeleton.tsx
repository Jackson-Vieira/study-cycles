import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-mainAccent border border-mainAccent/40',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
