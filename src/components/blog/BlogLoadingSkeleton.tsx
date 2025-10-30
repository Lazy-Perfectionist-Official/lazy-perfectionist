import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export default function BlogLoadingSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="linktree-button backdrop-blur-md border-black/20 overflow-hidden">
          <CardContent className="p-0">
            {/* Image skeleton */}
            <div className="relative aspect-video">
              <Skeleton className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            </div>

            {/* Content skeleton */}
            <div className="p-6">
              {/* Tags skeleton */}
              <div className="flex gap-2 mb-3">
                <Skeleton className="h-5 w-16 rounded-full bg-black/20" />
                <Skeleton className="h-5 w-20 rounded-full bg-black/20" />
              </div>

              {/* Title skeleton */}
              <Skeleton className="h-6 w-full mb-2 bg-black/20 rounded" />
              <Skeleton className="h-6 w-3/4 mb-4 bg-black/20 rounded" />

              {/* Description skeleton */}
              <Skeleton className="h-4 w-full mb-2 bg-black/10 rounded" />
              <Skeleton className="h-4 w-5/6 mb-4 bg-black/10 rounded" />

              {/* Footer skeleton */}
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24 bg-black/10 rounded" />
                <Skeleton className="h-3 w-20 bg-black/10 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}