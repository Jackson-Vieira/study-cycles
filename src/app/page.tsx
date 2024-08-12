'use client'

import { StudyCyclesSkeleton } from '@/components/skeletons/study-cycles-skeleton'
import { StudyCycles } from '@/components/study-cycles'
import { useIsClient } from '@uidotdev/usehooks'

export default function Home() {
  const isClient = useIsClient()
  return isClient ? <StudyCycles /> : <StudyCyclesSkeleton />
}
