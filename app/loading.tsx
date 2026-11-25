import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="container-page section-y flex flex-col gap-4">
      <Skeleton className="h-10 w-full max-w-md" />
      <Skeleton className="h-4 w-full max-w-lg" />
      <Skeleton className="mt-8 h-64 w-full" />
    </div>
  );
}
